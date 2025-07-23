module.exports = (sequelize, DataTypes) => {
  const ProductSupplier = sequelize.define('ProductSupplier', {
    productId: {
      type: DataTypes.INTEGER,
      references: { model: 'products', key: 'id' }
    },
    supplierId: {
      type: DataTypes.INTEGER,
      references: { model: 'suppliers', key: 'id' }
    }
  }, {
    tableName: 'product_suppliers'
  });
  return ProductSupplier;
};