'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(50)
      },
      last_name: {
        type: Sequelize.STRING(50)
      },
      dni: {
        type: Sequelize.STRING(10)
      },
      phone: {
        type: Sequelize.STRING(10)
      },
      date_birthday: {
        type: Sequelize.DATE
      },
      profile_nro: {
        type: Sequelize.STRING(50)
      },
      address: {
        type: Sequelize.STRING
      },
      date_in: {
        type: Sequelize.DATE
      },
      promotion: {
        type: Sequelize.INTEGER(1)
      },
      user_id: {
        allowNull: false,        
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id'
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employees');
  }
};