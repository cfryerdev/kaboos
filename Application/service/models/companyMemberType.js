var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanyMemberTypeSchema = new Schema({
    name: String,
    description: String,
	  company: { type: Schema.Types.ObjectId, ref: 'Company' }
}, {
    versionKey: false,
    dontVersionMe: true,
    strict: true
});

module.exports = mongoose.model('CompanyMemberType', CompanyMemberTypeSchema);
