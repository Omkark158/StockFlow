module.exports = (sequelize, DataTypes) => {
  const InventoryHistory = sequelize.define('InventoryHistory', {
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
    quantityChange: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    changeType: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    reason: {
      type: DataTypes.TEXT
    },
    changedBy: {
      type: DataTypes.STRING(100)
    },
    changedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'inventory_history',
    timestamps: true,
  });

  return InventoryHistory;
};
