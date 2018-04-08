var date = require('mongodb')

var transformDates = (unformattedData) => {
	return new Promise((resolve, reject) => {
		var formattedData = [];
		if (Array.isArray(unformattedData)) {
			for (var unformattedElement of unformattedData) {
				for (var unformattedKey in unformattedElement) {
					if (typeof unformattedElement[unformattedKey] === 'object') {
						transformObjectId(unformattedElement[unformattedKey]);
					}
					else {
						if (unformattedKey == 'updatedAt' || unformattedKey == 'createdAt') {
							unformattedElement[unformattedKey] = new Date(unformattedElement[unformattedKey]);
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
					if (unformattedKey == 'updatedAt' || unformattedKey == 'createdAt') {
						unformattedElement[unformattedKey] = new Date(unformattedElement[unformattedKey]);
					}
				}
			}
			formattedData.push(unformattedData);
		}

		resolve(formattedData);
	});
}

module.exports = transformDates;