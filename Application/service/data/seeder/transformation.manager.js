
// RETURN TRANSFORMED DATA
// ==================================================
var runTransformations = (data, transformations) => {
	return new Promise((resolve, reject) => {
		if (transformations == null || transformations == undefined) {
			resolve(data);
		}
		else {
			transformations.forEach((transform) => {
				transform(data)
					.then((transformedData) => {
						data = transformedData;
					})
					.catch((err) => {
						reject(err);
					});
			});
			resolve(data);
		}
	});
}

module.exports = {
	runTransformations: runTransformations
}