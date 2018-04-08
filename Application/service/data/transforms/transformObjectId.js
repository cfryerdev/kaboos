var objectId = require('mongodb').ObjectID

// Will transform all _id instances to an ObjectId value.
// Will save all <table>_id keys as <table> with an ObjectId value.
// ================================================================
var transformObjectId = (unformattedData) => {
	return new Promise((resolve, reject) => {
		var formattedData = [];
		if (Array.isArray(unformattedData)) {
			for (var unformattedElement of unformattedData) {
				for (var unformattedKey in unformattedElement) {
					if (typeof unformattedElement[unformattedKey] === 'object') {
						transformObjectId(unformattedElement[unformattedKey]);
					}
					else {
						if (unformattedKey.indexOf('_id') != -1) {
							if (unformattedKey.indexOf('_id') > 0) {
								var newKey = unformattedKey.substring(0, unformattedKey.indexOf('_id'));
								var value = new objectId(unformattedElement[unformattedKey]);
								delete unformattedElement[unformattedKey];
								unformattedElement[newKey] = value;
							}
							else {
								unformattedElement[unformattedKey] = new objectId(unformattedElement[unformattedKey]);
							}
						}
					}
				}
				formattedData.push(unformattedElement);
			}
		}

		else {
			for (var unformattedKey in unformattedData) {
				if (typeof unformattedData[unformattedKey] === 'object') {
					transformObjectId(unformattedData[unformattedKey]);
				}
				else {
					if (unformattedKey.indexOf('_id') != -1) {
						if (unformattedKey.indexOf('_id') > 0) {
							var newKey = unformattedKey.substring(0, unformattedKey.indexOf('_id'));
							var value = new objectId(unformattedData[unformattedKey]);
							delete unformattedData[unformattedKey];
							unformattedData[newKey] = value;
						}
						else {
							unformattedData[unformattedKey] = new objectId(unformattedData[unformattedKey]);
						}
					}
				}
			}
			formattedData.push(unformattedData);
		}

		resolve(formattedData);
	});
}

module.exports = transformObjectId;