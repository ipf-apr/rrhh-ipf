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
      lastName: {
        type: Sequelize.STRING(50)
      },
      dni: {
        type: Sequelize.STRING(10)
      },
      phone: {
        type: Sequelize.STRING(10)
      },
      dateBirthday: {
        type: Sequelize.DATE
      },
      profileNro: {
        type: Sequelize.STRING(50)
      },
      address: {
        type: Sequelize.STRING
      },
      dateIn: {
        type: Sequelize.DATE
      },
      promotion: {
        type: Sequelize.INTEGER(1)
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employees');
  }
};