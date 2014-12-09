'use strict';

var Sequelize = require('sequelize');

module.exports = function Metric(database) {
    return database.define('Metric', {
        key: Sequelize.STRING
    });
};
