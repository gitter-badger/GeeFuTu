var mongoose = require('mongoose'), Schema = mongoose.Schema;

/**
 *
 */
var genomeSchema = mongoose.Schema({
    organism: {type: String, required: true},
    description: {type: String, required: true},
    buildVersion: {type: String, required: true},
    meta: {type: String, required: true},
    createdAt: Date,
    updatedAt: Date
});

/**
 *
 * @param cb
 */
genomeSchema.statics.findAll = function search(cb) {
    Genome.find({}).exec(cb);
};
//
//genomeSchema.virtual('processedUsers').get(function () {
//
//}).set(function (progessedUsers) {
//    this.set('processedUsers', processedUsers)
//});
//
//genomeSchema.methods.getUsers = function (cb) {
//    var User = require('./user');
////    console.log('looking for: ' + this.users);
//    User.find({
//        '_id': {
//            $in: this.users
//        }
//    }).exec(cb);
//};
//

/**
 *
 */
genomeSchema.pre('save', function (next) {
    if (!this.createdAt) {
        this.createdAt = new Date;
    } else {
        this.updatedAt = new Date;
    }
    next();
});

/**
 *
 */
var Genome = mongoose.model('Genome', genomeSchema);

module.exports = Genome;