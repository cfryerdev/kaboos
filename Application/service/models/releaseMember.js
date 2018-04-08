var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReleaseMemberSchema = new Schema({
	companyMember: { type: Schema.Types.ObjectId, ref: 'CompanyMember' },
	release: { type: Schema.Types.ObjectId, ref: 'Release' }
}, {
    versionKey: false,
    dontVersionMe: true,
    strict: true
});

module.exports = mongoose.model('ReleaseMember', ReleaseMemberSchema);