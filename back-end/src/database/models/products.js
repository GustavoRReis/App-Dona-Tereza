module.exports = (sequelize, DataTypes) => {
    const products= sequelize.define('products',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false,
            autoIncrement: true },
      name:{
        type:DataTypes.STRING,
      },
      price:{
        type:DataTypes.DECIMAL,
      },
      urlImage:{
        type:DataTypes.STRING,
      },
    },
      {
        timestamps: false,
        underscored: true, 
        tableName: 'products'
      },
    );

    products.associate = (models) => {
        products.hasMany(models.products,
          { foreignKey: 'id', as: 'productId' });
      };
  
  
      return products;
  };