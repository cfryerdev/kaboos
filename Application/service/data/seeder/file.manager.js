var fs = require('fs')

// RETURN JSON REPRESENTATION OF FILE
// ==================================================
var convertFileToJson = (fileName) => {
	return new Promise((resolve, reject) => {
		fs.readFile(`${fileName}`, (err, data) => {
			if (err) {
				reject(err);
			}
			else {
				var seedData = JSON.parse(data.toString());
				resolve(seedData);
			}
		})
	});
}

module.exports = {
	convertFileToJson: convertFileToJson
}