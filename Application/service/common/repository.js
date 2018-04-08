var mongoose = require('mongoose');
var utils = require('../common/utils');

// CONSTRUCTOR
// ========================================
function Repository(schema) {
    this._Schema = schema;
}

// LIST - list(function(err, data){  });
// ========================================
Repository.prototype.list = function (callback) {
    this._Schema.find(function (err, data) {
        callback(err, data);
    });
}

// READ - get(req.body._id, function(err, data){  });
// ========================================
Repository.prototype.read = function (id, callback) {
    this._Schema.findById(id, function (err, data) {
        callback(err, data);
    });
}

// INSERT - insert(req.body, function(err, data){  });
// ========================================
Repository.prototype.insert = function (model, callback) {
    model.save(function (err, data) {
        callback(err, data);
    });
}

// UPDATE - update(req.body, function(err, data){  });
// ========================================
Repository.prototype.update = function (model, callback) {
	var repo = this;
    this._Schema.findById(model._id, function (err, data) {
        if (err) {
            callback(err, data);
        }

        if (!utils.isDefined(data) || data == null) {
          data = new repo._Schema();
        }
        for (var prop in model) {
            data[prop] = model[prop];
        }
        data.save(function (err, data) {
            callback(err, data);
        });
    });
}

// DELETE - remove(req.body._id, function(err, data){  });
// ========================================
Repository.prototype.delete = function (id, callback) {
    this._Schema.remove({
        _id: id
    },
    function (err, data) {
        callback(err, data);
    });
}

// FILTER - filter({name: name}, function(err, data){  });
// ========================================
Repository.prototype.filter = function (expression, callback) {
    this._Schema.find(expression, function (err, data) {
        callback(err, data);
    });
}

// HANDLE ERROR RESPONSES
// ========================================
Repository.prototype.handleResponse = function (res, err, item) {
    if (err) {
        return res.status(400).send({messages: [{ message: err.message, type: 'validation' }]});
    }
    // if (item == null) {
    //     return res.status(400).send([{ message: 'Unable to find record with id.', type: 'validation' }]);
    // }
    return res.json(item);
}


// SET AS OUR OBJECT
// ========================================
module.exports = Repository;
