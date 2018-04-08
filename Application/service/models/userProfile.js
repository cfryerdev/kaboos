var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserProfileSchema = new Schema({
    emailAddress: { type: String, require: true, unique: true },
    displayName: { type: String, require: true },
    password: { type: String, select: false },
    title: String,
    firstName: String,
    lastName: String,
    website: String,
}, {
    versionKey: false,
    dontVersionMe: true,
    strict: true
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);
