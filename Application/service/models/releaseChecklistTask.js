var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReleaseChecklistTaskSchema = new Schema({
   releaseChecklist: { type: Schema.Types.ObjectId, ref: 'releaseChecklist' }
   name: String,
   description: String

}, {
   versionKey: false,
   dontVersionMe: true,
   strict: true
});

module.exports = mongoose.model('ReleaseChecklistTask', ReleaseChecklistTaskSchema);
