module.exports = (sequelize, DataTypes) => {
  const sales = sequelize.define('sales',
    {
      id: {
        type: DataTypes.INTEGER, primaryKey: true, allowNull: false,
        autoIncrement: true
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      sellerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      totalPrice: {
        type: DataTypes.DECIMAL,
      },
      deliveryAddress: {
        type: DataTypes.STRING,
      },
      deliveryNumber: {
        type: DataTypes.STRING,
      },
      saleDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      status: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'sales'
    },
  );

  sales.associate = (models) => {
    sales.belongsTo(models.users,
      { foreignKey: 'userId', as: 'user' });
  };

  return sales;
};
