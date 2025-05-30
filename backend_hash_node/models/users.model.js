import { Sequelize, DataTypes} from "sequelize";
import sequelize from "../db/db.js";


//Defining Empolyees sequelize model
const User = sequelize.define('User',
    {
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        pass : {
            type : DataTypes.STRING,
            allowNull : false
        },
        email : {
            type : DataTypes.STRING,
            allowNull : false
        }
    },
    {
        modelName : 'Employee',
        freezeTableName : true,
        tableName : 'Employee'
    }
)

export default User