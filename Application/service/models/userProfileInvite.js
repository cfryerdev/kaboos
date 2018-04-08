var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserProfileInviteSchema = new Schema({
	userProfile: {type: Schema.Types.ObjectId, ref: 'UserProfile'},
	company: {type: Schema.Types.ObjectId, ref: 'Company'},
	companyMemberType: {type: Schema.Types.ObjectId, ref: 'CompanyMemberType'},
	status: {type: Schema.Types.ObjectId, ref: 'UserProfileInviteStatus'},
	inviteCode: String
}, {
	versionKey: false,
	dontVersionMe: true,
	strict: true
});

module.exports = mongoose.model('UserProfileInvite', UserProfileInviteSchema);
