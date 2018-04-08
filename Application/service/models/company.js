var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = new Schema({
    name: { type: String, require: true, unique: true },
    description: String,
    isActive: { type: Boolean, default: true }
}, {
    versionKey: false,
    dontVersionMe: true,
    strict: true
});


CompanySchema.pre('validate', function (next) {
    // Store the model
    var model = this;

    // Name is required
    if (model.name == undefined || model.name == '') {
        next(new Error('Name is required on a company.'));
    }

    // Unique company name is required
    if (model.isNew) {
      mongoose.models["Company"].findOne({ name: model.name }, function (err, item) {
        if (err) {
          next(err);
        }
        if (item) {
          next(new Error('Company name is already taken.'));
        }
      });
    }

    // Continue the pipeline
    next();
});

module.exports = mongoose.model('Company', CompanySchema);
