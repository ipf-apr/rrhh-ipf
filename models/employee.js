"use strict";
const fs = require("fs");

const { DataTypes, sequelize } = require("../config/database");
const environments = require("../config/environments");

const Employee = sequelize.define(
  "Employee",
  {
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.lastName + ", " + this.name;
      },
    },
    dni: DataTypes.STRING,
    gender: {
      type: DataTypes.ENUM,
      values: ["m", "f", "x", "o"],
    },
    phone: DataTypes.STRING,
    dateBirthday: {
      type: DataTypes.DATEONLY,
    },
    profileNro: DataTypes.STRING,
    address: {
      type: DataTypes.STRING,
    },
    dateIn: {
      type: DataTypes.DATEONLY,
    },
    antiquity: {
      type: DataTypes.VIRTUAL,
      get() {
        const today = new Date();
        const date_in = new Date(this.dateIn);
        let antiquity = today.getFullYear() - date_in.getFullYear();
        let m = today.getMonth() - date_in.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < date_in.getDate())) {
          antiquity--;
        }
        return antiquity;
      },
    },
    promotion: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
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
      },
    },
    imageUrl: {
      type: DataTypes.VIRTUAL,
      get() {
        if (
          this.image &&
          fs.existsSync(`${__dirname}/../public/uploads/${this.image}`)
        ) {
          return `${environments.APP_URL}:${environments.APP_PORT}/uploads/${this.image}`;
        }
        return `${environments.APP_URL}:${environments.APP_PORT}/uploads/default.png`;
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    paranoid: true,
    modelName: "Employee",
    tableName: "employees",
    underscored: true,
  }
);

console.log("Employee");
module.exports = Employee;
