'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    contohInstanceMethod(){
      let fullName = this.first_name + this.last_name
      return fullName
    }

    static associate(models) {
      // define association here
      Employee.belongsTo(models.User)

      Employee.belongsToMany(models.Project, {
        through: models.EmployeeProject
      })
    }
  };
  Employee.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    role: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Employee',
  });
  
  Employee.beforeCreate((instance, options) => {
    instance.phone_number = `+62${instance.phone_number}`
  })



  return Employee;
};