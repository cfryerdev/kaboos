var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamProjectSchema = new Schema({
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
	  company: { type: Schema.Types.ObjectId, ref: 'Company' }
}, {
    versionKey: false,
    dontVersionMe: true,
    strict: true
});

module.exports = mongoose.model('TeamProject', TeamProjectSchema);
