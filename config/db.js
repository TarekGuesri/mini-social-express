var Sequelize = require('sequelize').Sequelize;
const config = require('./config');

let dbKeys;

const { database, username, password, host } = config;

module.exports = new Sequelize(
  database, // DB Name
  username, // Username
  password, // Password
  {
    host,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    logging: false,
  }
);
