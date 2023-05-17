module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
      id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true 
      },
      name:{
        type:DataTypes.STRING,
      },
      email:{
        type:DataTypes.STRING,
      },
      password:{
        type:DataTypes.STRING,
      },
      role:{
        defaultValue: 'customer',
        type:DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      timestamps: false,
      underscored: true, 
      tableName: 'users'
    },
  );

    users.associate = (models) => {
        users.hasMany(models.sales,
          { foreignKey: 'userId', as: 'sales' });
      };
  
    return users;
  };
