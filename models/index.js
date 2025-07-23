const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const Company = require('./Company')(sequelize, Sequelize.DataTypes);
const Warehouse = require('./Warehouse')(sequelize, Sequelize.DataTypes);
const Product = require('./Product')(sequelize, Sequelize.DataTypes);
const Inventory = require('./Inventory')(sequelize, Sequelize.DataTypes);
const Supplier = require('./Supplier')(sequelize, Sequelize.DataTypes);
const ProductSupplier = require('./ProductSupplier')(sequelize, Sequelize.DataTypes);

// Define associations
Company.hasMany(Warehouse, { foreignKey: 'companyId' });
Warehouse.belongsTo(Company, { foreignKey: 'companyId' });

Product.belongsToMany(Warehouse, { through: Inventory, foreignKey: 'productId' });
Warehouse.belongsToMany(Product, { through: Inventory, foreignKey: 'warehouseId' });

Product.belongsToMany(Supplier, { through: ProductSupplier, foreignKey: 'productId' });
Supplier.belongsToMany(Product, { through: ProductSupplier, foreignKey: 'supplierId' });

Inventory.belongsTo(Product, { foreignKey: 'productId' });
Inventory.belongsTo(Warehouse, { foreignKey: 'warehouseId' });

const db = {
  sequelize,
  Sequelize,
  Company,
  Warehouse,
  Product,
  Inventory,
  Supplier,
  ProductSupplier
};

module.exports = db;