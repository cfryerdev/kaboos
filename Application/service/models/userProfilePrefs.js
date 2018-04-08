var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserProfilePrefsSchema = new Schema({
	userProfile: {type: Schema.Types.ObjectId, ref: 'UserProfile'},
	allowEmailExposed: Boolean,
	allowEmailNotifications: Boolean,
	allowInAppNotifications: Boolean,
	showInactiveRecords: Boolean
}, {
	versionKey: false,
	dontVersionMe: true,
	strict: true
});

module.exports = mongoose.model('UserProfilePrefs', UserProfilePrefsSchema);
