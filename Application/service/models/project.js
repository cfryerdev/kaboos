var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    company: { type: Schema.Types.ObjectId, ref: 'company' },
    projectType: { type: Schema.Types.ObjectId, ref: 'ProjectType' },
    name: String,
    description: String
}, {
    versionKey: false,
    dontVersionMe: true,
    strict: true
});

module.exports = mongoose.model('Project', ProjectSchema);
