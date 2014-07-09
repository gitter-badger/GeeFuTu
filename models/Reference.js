var mongoose = require('mongoose'), Schema = mongoose.Schema;

var referenceSchema = mongoose.Schema({
    name: {type: String, required: true},
    sequence: {type: String, required: true},
    createdAt: Date,
    updatedAt: Date
});

// featureSchema.statics.findAll = function search(cb) {
//    Organism.find({}).exec(cb);
//};
//
//featureSchema.virtual('processedUsers').get(function(){
//
//}).set(function(progessedUsers){
//    this.set('processedUsers', processedUsers)
//});
//
//featureSchema.methods.getUsers = function (cb) {
//    var User = require('./user');
////    console.log('looking for: ' + this.users);
//    User.find({'_id': {
//        $in: this.users
//    }}).exec(cb);
//};

referenceSchema.pre('save', function (next) {
    if (!this.createdAt) {
        this.createdAt = new Date;
    } else {
        this.updatedAt = new Date;
    }
    next();
});

var Reference = mongoose.model('Reference', referenceSchema);

module.exports = Reference;