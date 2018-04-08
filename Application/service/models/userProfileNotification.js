var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserProfileNotificationSchema = new Schema({
	userProfile: {type: Schema.Types.ObjectId, ref: 'UserProfile'},
	subject: String,
  body: String,
	isViewed: Boolean,
	isRead: Boolean
}, {
	versionKey: false,
	dontVersionMe: true,
	strict: true,
	timestamps: true
});

module.exports = mongoose.model('UserProfileNotification', UserProfileNotificationSchema);
