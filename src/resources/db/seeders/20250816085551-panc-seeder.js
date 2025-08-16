'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
  async up(queryInterface, Sequelize) {
    const filePath = path.join(__dirname, 'pancs.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Add timestamps if your table has createdAt/updatedAt
    const timestamp = new Date();
    const dataWithTimestamps = data.map(item => ({
      ...item
    }));

    await queryInterface.bulkInsert('Pancs', dataWithTimestamps, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pancs', null, {});
  }
};
