var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReleaseProjetSchema = new Schema({
	release: { type: Schema.Types.ObjectId, ref: 'Release' },
	project: { type: Schema.Types.ObjectId, ref: 'Project' }
}, {
    versionKey: false,
    dontVersionMe: true,
    strict: true
});

module.exports = mongoose.model('ReleaseProjet', ReleaseProjetSchema);