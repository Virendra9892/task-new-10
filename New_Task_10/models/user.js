'use strict';
const {
  Model
} = require('sequelize');
const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin:{
      type:DataTypes.BOOLEAN,
      defaultValue:true
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  user.generateToken = (userName,email,isAdmin)=>{
       const token = jwt.sign({userName,email,isAdmin},config.get("jwtPrivateKey"));
       return token;
  }
  return user;
};