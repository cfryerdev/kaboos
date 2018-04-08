var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReleaseSchema = new Schema({
		company: { type: Schema.Types.ObjectId, ref: 'Company' },
    releaseStage: { type: Schema.Types.ObjectId, ref: 'ReleaseStage'},
    releaseStatus: { type: Schema.Types.ObjectId, ref: 'ReleaseStatus'},
    name: String,
    notes: String,
		startDate: Date,
		endDate: Date
}, {
    versionKey: false,
    dontVersionMe: true,
    strict: true
});

module.exports = mongoose.model('Release', ReleaseSchema);
