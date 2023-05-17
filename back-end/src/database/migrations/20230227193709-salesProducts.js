'use strict';
//a 
module.exports = {
  up:
    async (queryInterface, Sequelize) => {
      await queryInterface.createTable('sales_products',
        {
          sale_id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: 'sale_id',
            references: { model: 'sales', key: 'id', },
            onUpdate: 'CASCADE', onDelete: 'CASCADE',
          }, 
          product_id:{
            type: Sequelize.INTEGER,
            field: 'product_id',
            primaryKey: true, 
            references: { model: 'products', key: 'id', },
            onUpdate: 'CASCADE', onDelete: 'CASCADE', 
          },
          quantity: {
            allowNull: false,
            type: Sequelize.INTEGER,
          },
        });
    },
  down: async (queryInterface, Sequelize) => { await queryInterface.dropTable('sales_products'); }
}; 
