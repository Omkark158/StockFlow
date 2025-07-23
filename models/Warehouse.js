module.exports = (sequelize, DataTypes) => {
  const Warehouse = sequelize.define('Warehouse', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'companies', key: 'id' }
    }
  }, {
    tableName: 'warehouses'
  });
  return Warehouse;
};