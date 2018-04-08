var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamMemberRoleSchema = new Schema({
    name: String,
    description: String
}, {
    versionKey: false,
    dontVersionMe: true,
    strict: true
});

module.exports = mongoose.model('TeamMemberRole', TeamMemberRoleSchema);