// Simple product controller without Sequelize
const mysql = require('mysql2/promise');

// Database connection helper
const getDbConnection = async () => {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
};

// Create new product
const createProduct = async (req, res) => {
  let connection;
  
  try {
    const { name, sku, price, warehouse_id, initial_quantity } = req.body;
    
    connection = await getDbConnection();
    await connection.beginTransaction();
    
    // Check if SKU already exists
    const [existingSku] = await connection.execute(
      'SELECT id FROM products WHERE sku = ?',
      [sku]
    );
    
    if (existingSku.length > 0) {
      await connection.rollback();
      return res.status(409).json({ error: 'SKU already exists' });
    }
    
    // Insert product
    const [result] = await connection.execute(
      'INSERT INTO products (name, sku, price, warehouse_id, created_at) VALUES (?, ?, ?, ?, NOW())',
      [name, sku, price, warehouse_id]
    );
    
    const productId = result.insertId;
    
    // Insert initial inventory if provided
    if (initial_quantity !== undefined && initial_quantity >= 0) {
      await connection.execute(
        'INSERT INTO inventory (product_id, warehouse_id, quantity, created_at) VALUES (?, ?, ?, NOW())',
        [productId, warehouse_id, initial_quantity]
      );
    }
    
    await connection.commit();
    
    res.status(201).json({
      message: 'Product created successfully',
      product: {
        id: productId,
        name,
        sku,
        price
      }
    });
    
  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  } finally {
    if (connection) await connection.end();
  }
};

// Get all products
const getProducts = async (req, res) => {
  let connection;
  
  try {
    connection = await getDbConnection();
    
    const [rows] = await connection.execute(`
      SELECT 
        p.id,
        p.name,
        p.sku,
        p.price,
        p.warehouse_id,
        p.created_at,
        COALESCE(i.quantity, 0) as current_stock
      FROM products p 
      LEFT JOIN inventory i ON p.id = i.product_id
      ORDER BY p.created_at DESC
    `);
    
    res.json({
      products: rows,
      total: rows.length
    });
    
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  } finally {
    if (connection) await connection.end();
  }
};

// Get single product by ID
const getProductById = async (req, res) => {
  let connection;
  
  try {
    const { id } = req.params;
    connection = await getDbConnection();
    
    const [rows] = await connection.execute(`
      SELECT 
        p.id,
        p.name,
        p.sku,
        p.price,
        p.warehouse_id,
        p.created_at,
        COALESCE(i.quantity, 0) as current_stock
      FROM products p 
      LEFT JOIN inventory i ON p.id = i.product_id
      WHERE p.id = ?
    `, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(rows[0]);
    
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  } finally {
    if (connection) await connection.end();
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById
};