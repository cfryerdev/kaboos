var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FavoriteSchema = new Schema({
    company: { type: Schema.Types.ObjectId, ref: 'Company' },
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    userProfile: {type: Schema.Types.ObjectId, ref: 'UserProfile'}
}, {
    versionKey: false,
    dontVersionMe: true,
    strict: true
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
