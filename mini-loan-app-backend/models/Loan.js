const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Loan = sequelize.define('Loan', {
  amount: { type: DataTypes.FLOAT, allowNull: false },
  term: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.ENUM('PENDING', 'APPROVED', 'PAID'), defaultValue: 'PENDING' },
});

module.exports = Loan;
