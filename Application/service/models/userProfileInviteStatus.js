var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserProfileInviteStatusSchema = new Schema({
	name: String,
	description: String
}, {
	versionKey: false,
	dontVersionMe: true,
	strict: true
});

module.exports = mongoose.model('UserProfileInviteStatus', UserProfileInviteStatusSchema);
