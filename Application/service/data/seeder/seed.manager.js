var fs = require('fs')
	, path = require('path')
	, mongo = require('mongodb').MongoClient
	, fileManager = require('./file.manager')
	, transformationManager = require('./transformation.manager')
	, connectionString = 'mongodb://127.0.0.1:27017/kabooslite'

// GET COLLECTION NAMES
// ==================================================
var getCollectionNames = (directory) => {
	return new Promise((resolve, reject) => {
		var collectionNames = [];

		fs.readdir(directory, function (err, files) {
			if (err) {
				reject(err);
			}
			else {
				for (var file of files) {
					collectionNames.push(path.basename(file, '.json'))
				}
				resolve(collectionNames);
			}
		})
	})
}

// CREATE COLLECTIONS
// ==================================================
var createCollections = (collectionNames) => {
	return new Promise((resolve, reject) => {
		var createdCollections = [];
		mongo.connect(connectionString, function (err, db) {
			if (err) {
				reject(err);
			}
			else {
				for (var collectionName of collectionNames) {
					db.createCollection(collectionName, {});
					createdCollections.push(collectionName);
				}
				db.close();
				resolve(createdCollections);
			}
		})
	});
}

// SEED COLLECTION
// ==================================================
var seedCollection = (collectionName, data, transformations) => {
	return new Promise((resolve, reject) => {
		transformationManager.runTransformations(data, transformations)
			.then((transformedData) => {
				mongo.connect(connectionString, (err, db) => {
					if (err) {
						reject(err);
					}
					else {
						if (Array.isArray(transformedData)) {
							for (var item of transformedData) {
								//console.log(`SAVING => ${JSON.stringify(item)}`);
								db.collection(collectionName).save(item);
							}
							db.close();
						}
						else {
							//console.log(`SAVING => ${JSON.stringify(transformedData)}`);
							db.collection(collectionName).save(transformedData);
							db.close();
						}
					}
				})
			})
			.catch((err) => {
				console.log(`ERROR IN SEED!\r\nError: ${err}`);
			});
	})
}

module.exports = {
	getCollectionNames: getCollectionNames,
	createCollections: createCollections,
	seedCollection: seedCollection
}
