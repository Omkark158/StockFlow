// models/SalesHistory.js
module.exports = (sequelize, DataTypes) => {
  const SalesHistor = sequelize.define('SalesHistor', {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    warehouseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantitySold: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    saleDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'sales_history',
    timestamps: false, 
  });

  return SalesHistor;
};
