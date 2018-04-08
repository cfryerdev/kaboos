var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamMemberSchema = new Schema({
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
	  company: { type: Schema.Types.ObjectId, ref: 'Company' },
    // teamMemberRole: { type: Schema.Types.ObjectId, ref: 'TeamMemberRole' },
    companyMember: { type: Schema.Types.ObjectId, ref: 'CompanyMember' }
}, {
    versionKey: false,
    dontVersionMe: true,
    strict: true
});

module.exports = mongoose.model('TeamMember', TeamMemberSchema);
