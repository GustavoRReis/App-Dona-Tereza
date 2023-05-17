'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable
      ('sales',
        {
          id: {
            allowNull: false,
            type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true,
          },
          user_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          seller_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          total_price: { type: Sequelize.DECIMAL(9,2) },
          delivery_address: { type: Sequelize.STRING(100) },
          delivery_number: { type: Sequelize.STRING(50) }, 
          sale_date: { type: Sequelize.DATE }, 
          status: { type: Sequelize.STRING(50) }, 
        })
  }, down: async (queryInterface, Sequelize) => { await queryInterface.dropTable('sales'); }
}; 