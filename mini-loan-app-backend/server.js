const express = require('express');
const sequelize = require('./db'); // Import sequelize instance
const User = require('./models/User'); // Import the User model

const app = express();

// Test database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Sync models (creates tables if not exists)
    await sequelize.sync({ alter: true });
    console.log('Database synced.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

app.listen(3001, () => console.log('Server running on port 3000'));
