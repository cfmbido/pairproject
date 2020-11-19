'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    convertDate() {
      let convertDate = new Date(this.deadline).toISOString()
      convertDate = convertDate.split('T')[0]
      return convertDate
    }



    static associate(models) {
      // define association here
      Project.belongsToMany(models.Employee, {
        through: models.EmployeeProject
      })
    }
  };
  Project.init({
    name: DataTypes.STRING,
    deadline: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};