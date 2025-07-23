const { QueryTypes } = require('sequelize');
const db = require('../models');

const getLowStockAlerts = async (req, res) => {
  try {
    const { company_id } = req.params;

    // Verify company exists
    const company = await db.Company.findByPk(company_id);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    // Complex query to get low stock alerts
    const alertsQuery = `
      SELECT 
        p.id as product_id,
        p.name as product_name,
        p.sku,
        w.id as warehouse_id,
        w.name as warehouse_name,
        i.quantity as current_stock,
        p.lowStockThreshold as threshold,
        CASE 
          WHEN sales.avg_daily_sales > 0 
          THEN FLOOR(i.quantity / sales.avg_daily_sales)
          ELSE NULL 
        END as days_until_stockout,
        s.id as supplier_id,
        s.name as supplier_name,
        s.contactEmail as supplier_contact_email
      FROM products p
      JOIN inventory i ON p.id = i.productId
      JOIN warehouses w ON i.warehouseId = w.id
      LEFT JOIN product_suppliers ps ON p.id = ps.productId
      LEFT JOIN suppliers s ON ps.supplierId = s.id
      LEFT JOIN (
        SELECT 
          productId,
          warehouseId,
          AVG(quantity_sold) as avg_daily_sales
        FROM sales_history 
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        GROUP BY productId, warehouseId
        HAVING AVG(quantity_sold) > 0
      ) sales ON p.id = sales.productId AND w.id = sales.warehouseId
      WHERE w.companyId = :companyId
        AND i.quantity <= p.lowStockThreshold
        AND p.isActive = 1
        AND (sales.avg_daily_sales > 0 OR sales.avg_daily_sales IS NULL)
      ORDER BY (i.quantity / p.lowStockThreshold) ASC, p.name
    `;

    const alerts = await db.sequelize.query(alertsQuery, {
      replacements: { companyId: company_id },
      type: QueryTypes.SELECT
    });

    // Format response
    const formattedAlerts = alerts.map(alert => ({
      product_id: alert.product_id,
      product_name: alert.product_name,
      sku: alert.sku,
      warehouse_id: alert.warehouse_id,
      warehouse_name: alert.warehouse_name,
      current_stock: alert.current_stock,
      threshold: alert.threshold,
      days_until_stockout: alert.days_until_stockout,
      supplier: alert.supplier_id ? {
        id: alert.supplier_id,
        name: alert.supplier_name,
        contact_email: alert.supplier_contact_email
      } : null
    }));

    res.json({
      alerts: formattedAlerts,
      total_alerts: formattedAlerts.length
    });

  } catch (error) {
    console.error('Error fetching low stock alerts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getLowStockAlerts };