var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanyTeamMemberRoleSchema = new Schema({
    company: { type: Schema.Types.ObjectId, ref: 'Company' },
    name: String,
    description: String
}, {
    versionKey: false,
    dontVersionMe: true,
    strict: true
});

module.exports = mongoose.model('CompanyTeamMemberRole', CompanyTeamMemberRoleSchema);
