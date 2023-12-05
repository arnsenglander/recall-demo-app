import { Sequelize } from "sequelize";

const DATABASE_URL = process.env.DATABASE_URL;

// If you want to use a different database, you can set the DATABASE_URL 
// environment variable.
// 
// Here we use sqlite for simplicity, but you can use any other supported by
// sequelize. 
// 
// i.e. for postgres: 
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')
//
// For more information please visit:
// https://sequelize.org/master/manual/dialects.html
//
const sequelize = new Sequelize(DATABASE_URL ?? 'sqlite::memory:', {
    dialect: 'sqlite', // or 'mysql', 'postgres', 'mariadb', etc.
    // logging: false,
    // models: [__dirname + './../models'] // or [Player, Team],
});

export default sequelize;