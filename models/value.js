'use strict';

var Sequelize = require('sequelize');

module.exports = function Value(database) {
    return database.define('Value', {
        count: Sequelize.FLOAT
    });
};
