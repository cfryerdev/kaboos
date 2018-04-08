var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanyMemberSchema = new Schema({
	company : {type: Schema.Types.ObjectId, ref: 'Company'},
	userProfile: {type: Schema.Types.ObjectId, ref: 'UserProfile'},
	companyMemberType: {type: Schema.Types.ObjectId, ref: 'CompanyMemberType'}
}, {
	versionKey: false,
	dontVersionMe: true,
	strict: true
});

module.exports = mongoose.model('CompanyMember', CompanyMemberSchema);
