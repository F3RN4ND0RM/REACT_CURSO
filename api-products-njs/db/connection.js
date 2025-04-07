import { Sequelize } from "sequelize";
import 'dotenv/config'


const db = new Sequelize(process.env.DBURL, {
    dialect : 'mysql'
})
export default db