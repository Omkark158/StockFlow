module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define('Supplier', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    contactEmail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: { isEmail: true }
    }
  }, {
    tableName: 'suppliers'
  });
  return Supplier;
};