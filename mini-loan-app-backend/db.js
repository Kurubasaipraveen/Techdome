console.log('Sequelize Configuration:', {
  database: process.env.SQL_DB_NAME,
  user: process.env.SQL_DB_USER,
  password: process.env.SQL_DB_PASSWORD,
  host: process.env.SQL_DB_HOST,
  port: process.env.SQL_DB_PORT || 3306,
});

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.SQL_DB_NAME,
  process.env.SQL_DB_USER,
  process.env.SQL_DB_PASSWORD,
  {
    host: process.env.SQL_DB_HOST,
    port: process.env.SQL_DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = sequelize; // Export the instance
