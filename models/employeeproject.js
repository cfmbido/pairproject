'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployeeProject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  EmployeeProject.init({
    EmployeeId: DataTypes.INTEGER,
    ProjectId: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    finish_date: DataTypes.DATE,
    task: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EmployeeProject',
  });
  return EmployeeProject;
};