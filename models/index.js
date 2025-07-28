// Load Sequelize and connect to the database
const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

// Import models with schema definition
const Company = require('./Company')(sequelize, Sequelize.DataTypes);
const Warehouse = require('./Warehouse')(sequelize, Sequelize.DataTypes);
const Product = require('./Product')(sequelize, Sequelize.DataTypes);
const Inventory = require('./Inventory')(sequelize, Sequelize.DataTypes);
const Supplier = require('./Supplier')(sequelize, Sequelize.DataTypes);
const ProductSupplier = require('./ProductSupplier')(sequelize, Sequelize.DataTypes);
const SalesHistory = require('./salesHistory')(sequelize, Sequelize.DataTypes);
const InventoryHistory = require('./InventoryHistory')(sequelize, Sequelize.DataTypes);
const ProductBundle = require('./ProductBundle')(sequelize, Sequelize.DataTypes); 


// Associations between models

// Company → Warehouses
Company.hasMany(Warehouse, { foreignKey: 'companyId' });
Warehouse.belongsTo(Company, { foreignKey: 'companyId' });

// Product ↔ Warehouse through Inventory
Product.belongsToMany(Warehouse, { through: Inventory, foreignKey: 'productId' });
Warehouse.belongsToMany(Product, { through: Inventory, foreignKey: 'warehouseId' });

Inventory.belongsTo(Product, { foreignKey: 'productId' });
Inventory.belongsTo(Warehouse, { foreignKey: 'warehouseId' });

// Product ↔ Supplier through ProductSupplier
Product.belongsToMany(Supplier, { through: ProductSupplier, foreignKey: 'productId' });
Supplier.belongsToMany(Product, { through: ProductSupplier, foreignKey: 'supplierId' });

// SalesHistory → Product + Warehouse
SalesHistory.belongsTo(Product, { foreignKey: 'productId' });
SalesHistory.belongsTo(Warehouse, { foreignKey: 'warehouseId' });

// InventoryHistory → Product + Warehouse
InventoryHistory.belongsTo(Product, { foreignKey: 'productId' });
InventoryHistory.belongsTo(Warehouse, { foreignKey: 'warehouseId' });

// Supplier → Company (if required)
Supplier.belongsTo(Company, { foreignKey: 'companyId', allowNull: true });
Company.hasMany(Supplier, { foreignKey: 'companyId' });

// Self-referential Product (Product through ProductBundle)
// (Used for bundles that contain other products)
Product.belongsToMany(Product, {
  as: 'BundleItems', // alias for child products
  through: ProductBundle,
  foreignKey: 'parentProductId',
  otherKey: 'childProductId'
});


const db = {
  sequelize,
  Sequelize,
  Company,
  Warehouse,
  Product,
  Inventory,
  Supplier,
  ProductSupplier,
  SalesHistory,
  InventoryHistory,
  ProductBundle 
};

module.exports = db;
