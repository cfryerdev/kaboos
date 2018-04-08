var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectTypeSchema = new Schema({
	  company: { type: Schema.Types.ObjectId, ref: 'company' },
    name: String,
    description: String
}, {
    versionKey: false,
    dontVersionMe: true,
    strict: true
});

module.exports = mongoose.model('ProjectType', ProjectTypeSchema);
