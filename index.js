'use strict';

var _ = require('underscore');
var Sequelize = require('sequelize');
var Models = require('./models');

module.exports = Sql;

function Sql(options) {
    options = options || {};
    this.name = options.name;
    this.username = options.username;
    this.password = options.password;
    this.options = options.options || {};
    this.start();
}

Sql.prototype.start = function start() {
    this.database = new Sequelize(this.name, this.username, this.password, this.options);
    this.models = new Models(this.database);
};

Sql.prototype.send = function send(metrics) {
    _.each(Object.keys(metrics), each, this);

    function each(key) {
        this.models.metric.findOrCreate({
            where: {
                key: key
            }
        })
        .then(createValue.bind(this));

        function createValue(results, created) {
            this.models.value.create({
                count: metrics[key]
            })
            .then(addValue.bind(this, results.shift()));
        }

        function addValue(metric, value) {
            metric.addValue(value);
        }
    }
};

Sql.prototype.get = function get(options, callback) {
    this.models.key.findAll({
        where: options.where,
        include: this.models.metric
    }).then(callback);
};
