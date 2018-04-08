module.exports = {
    forEach: function (collection, callback) {
        for (var i = 0; i < collection.length; i++) {
            callback(collection[i]);
        }
    },
    isDefined: function (item) {
        return !(item == undefined || item === undefined || item == 'undefined');
    },
    isNotSet: function (item) {
        return (item == undefined || item == null || item == '');
    },
    toArray: function (item) {
        var collection = [];
        collection.push(item);
        return collection;
    },
    isArray: function (variable) {
      return Array.isArray(variable);
    },
	
	// BUILD ERROR ARRAYS
	// ========================================
	buildError: function (statusCode, res, err) {
		if (this.isArray(err)) {
			return res.status(statusCode).send({ messages: err });
		}
		else {
			return res.status(statusCode).send({ messages: this.toArray(err) });
		}
	}
};
