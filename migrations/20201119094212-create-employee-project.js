'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EmployeeProjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      EmployeeId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Employees',
          key:'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      ProjectId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Projects',
          key:'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      start_date: {
        type: Sequelize.DATE
      },
      finish_date: {
        type: Sequelize.DATE
      },
      task: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('EmployeeProjects');
  }
};