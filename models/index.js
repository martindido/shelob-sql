'use strict';

var Metric = require('./metric');
var Value = require('./value');

module.exports = function Models(database) {
    this.metric = new Metric(database);
    this.value = new Value(database);
    this.metric.hasMany(this.value);
    database.sync();
};
