module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define('Inventory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'products', key: 'id' }
    },
    warehouseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'warehouses', key: 'id' }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'inventory',
    indexes: [
      { fields: ['productId', 'warehouseId'], unique: true }
    ]
  });
  return Inventory;
};