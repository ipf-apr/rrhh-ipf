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
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'id'
    })
    }
  }
  Employee.init({
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.lastName + ', ' + this.name
      }
    },
    dni: DataTypes.STRING,
    phone: DataTypes.STRING,
    dateBirthday:{ 
      type: DataTypes.DATEONLY,            
    },
    profileNro: DataTypes.STRING,
    address: {
      type: DataTypes.STRING,
    },
    dateIn: {
      type: DataTypes.DATEONLY   
    },
    promotion: DataTypes.INTEGER,
    age: {
      type: DataTypes.VIRTUAL,
      get() {
        const today = new Date();
        const date_b = new Date(this.dateBirthday);
        let age = today.getFullYear() - date_b.getFullYear();
        let m = today.getMonth() - date_b.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < date_b.getDate())) {
          age--;
        }
        return age;
      }
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Employee',
    tableName: 'employees',
    underscored: true
  });
  return Employee;
};
