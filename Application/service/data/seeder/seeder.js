var seedManager = require('./seed.manager')
	, fileManager = require('./file.manager')
	, transformObjectId = require('../transforms/transformObjectId')
	, transformDates = require('../transforms/transformDates')



var runSeed = (seedsDir) => {
	return new Promise((resolve, reject) => {
		console.log('Running seed!');

		var transforms = [
			transformDates,
			transformObjectId
		];

		seedManager.getCollectionNames(seedsDir)
			.then((collectionNames) => {
				return seedManager.createCollections(collectionNames);
			})
			.then((collectionNames) => {
				collectionNames.forEach((collection) => {
					console.log(` -- Loading: ${collection}.json`);
					fileManager.convertFileToJson(`${seedsDir}/${collection}.json`)
						.then((json) => {
							seedManager.seedCollection(collection, json, transforms);
						})
						.catch((err) => {
							console.log(`Error converting to json\r\nError:${err}`);
						});
				});
			})
			.catch((err) => console.log(err));
	});
}

module.exports = {
	runSeed: runSeed
}
