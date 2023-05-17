module.exports = (sequelize, DataTypes) => {
    const salesProducts= sequelize.define('SaleProduct', {
      saleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      productId: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false 
      },
      quantity:{
        type:DataTypes.INTEGER,
      },
    }, {
      timestamps: false,
      underscored: true, 
      tableName: 'sales_products'
    },
);
    salesProducts.associate = (models) => {
        models.sales.belongsToMany(models.sales, {
          as: 'sales',
          through: salesProducts,
          foreignKey: 'saleId', 
          otherKey: 'productId',  
        });

        models.products.belongsToMany(models.products, {
          as: 'products',
          through: salesProducts,
          foreignKey: 'productId', 
          otherKey: 'saleId',
        });
      };
      
      salesProducts.associate = (models) => {
        salesProducts.belongsTo(models.sales, { foreignKey: "saleId" });
        salesProducts.belongsTo(models.products, { foreignKey: "productId" });
      };
      
      return salesProducts;
  };
