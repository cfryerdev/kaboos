var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReleaseTeamSchema = new Schema({
	team: { type: Schema.Types.ObjectId, ref: 'Team' },
	release: { type: Schema.Types.ObjectId, ref: 'Release' }
}, {
    versionKey: false,
    dontVersionMe: true,
    strict: true
});

module.exports = mongoose.model('ReleaseTeam', ReleaseTeamSchema);