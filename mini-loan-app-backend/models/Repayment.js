const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Repayment = sequelize.define('Repayment', {
  dueDate: { type: DataTypes.DATE, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.ENUM('PENDING', 'PAID'), defaultValue: 'PENDING' },
});

module.exports = Repayment;
