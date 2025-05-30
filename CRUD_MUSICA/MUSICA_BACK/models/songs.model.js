import { Sequelize, DataTypes} from "sequelize";
import sequelize from "../db/db.js";


//Defining Abilities sequelize model
const Songs = sequelize.define('',
    {
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        album : {
            type : DataTypes.STRING,
            allowNull : false
        },
        artist : {
            type : DataTypes.STRING,
            allowNull : false
        }
    },
    {
        modelName : 'songs',        
        tableName : 'songs',
        freezeTableName : true
    }
)

export default Songs