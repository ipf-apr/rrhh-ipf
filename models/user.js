'use strict';

const {
  Model, DataTypes, sequelize
} = require('../database/config');

const {Employee} = require('./employee')


class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate() {
    this.hasMany(Employee, {
      foreignKey: 'user_id',
      sourceKey: 'id'
  })
  }
}
User.init({
  name: {type: DataTypes.STRING},
  lastName: {type: DataTypes.STRING},
  username: {type: DataTypes.STRING},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING}
}, {
  sequelize,
  paranoid: true,
  modelName: 'User',
  tableName: 'users',
  underscored: true
});

User.sync();

module.exports = User;

