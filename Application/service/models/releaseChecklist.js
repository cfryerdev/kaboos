var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReleaseChecklistSchema = new Schema({
   release: { type: Schema.Types.ObjectId, ref: 'Release' }
   name: String,
   description: String

}, {
   versionKey: false,
   dontVersionMe: true,
   strict: true
});

module.exports = mongoose.model('ReleaseChecklist', ReleaseChecklistSchema);
