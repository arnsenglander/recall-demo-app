import { Sequelize } from "sequelize";

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
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./data/database.sqlite",
});

// Option 2: Specify the connection string
// const sequelize = new Sequelize(process.env.DATABASE_URL, {
// dialect: 'postgres', // or 'mysql', 'sqlite', 'mariadb', etc.
// logging: false,
// });

export default sequelize;
