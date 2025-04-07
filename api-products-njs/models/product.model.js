import {  DataTypes } from 'sequelize';
import Sequelize from '../db/connection.js';

const Product = Sequelize.define(
  'Product',
  {
    nombre : {
        type : DataTypes.STRING,
        allowNull : false
    },
    precio : {
        type : DataTypes.NUMBER,
        allowNull : false
    },
    existencia : {
        type : DataTypes.NUMBER,
        allowNull : false
    },
    descripcion : {
        type : DataTypes.STRING,
        allowNull : false
    }    
  },
  {
    modelName : 'products',
    freezeTableName : true,
    tableName : 'products'

  },
);


export default Product




