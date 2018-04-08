var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectDependencySchema = new Schema({
	  company: { type: Schema.Types.ObjectId, ref: 'Company' },
    projectParent: { type: Schema.Types.ObjectId, ref: 'Project' },
    projectChild: { type: Schema.Types.ObjectId, ref: 'Project' },
    name: String,
    description: String
}, {
    versionKey: false,
    dontVersionMe: true,
    strict: true
});

module.exports = mongoose.model('ProjectDependency', ProjectDependencySchema);
