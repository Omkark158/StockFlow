module.exports = (sequelize, DataTypes) => {
  const ProductBundle = sequelize.define('ProductBundle', {
    parentProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'products', key: 'id' }
    },
    childProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'products', key: 'id' }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: { min: 1 }
    }
  }, {
    tableName: 'product_bundles',
    timestamps: false
  });

  return ProductBundle;
};
