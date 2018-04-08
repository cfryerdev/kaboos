var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanyTeamMemberSchema = new Schema({
    company: { type: Schema.Types.ObjectId, ref: 'Company' },
    companyTeamMemberRole: { type: Schema.Types.ObjectId, ref: 'CompanyTeamMemberRole' },
    userProfile: { type: Schema.Types.ObjectId, ref: 'UserProfile' },
    isActive: Boolean
}, {
    versionKey: false,
    dontVersionMe: true,
    strict: true
});

module.exports = mongoose.model('CompanyTeamMember', CompanyTeamMemberSchema);
