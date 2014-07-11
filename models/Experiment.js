var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var experimentSchema = mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    file: { type: String, required: true},
    genome: { type: Number, required: true},
    meta: String,
    findParents: Boolean,
    createdAt: Date,
    updatedAt: Date
});

experimentSchema.statics.findAll = function search(cb) {
    Experiment.find({}).exec(cb);
};
//
//experimentSchema.virtual('processedUsers').get(function(){
//
//}).set(function(progessedUsers){
//    this.set('processedUsers', processedUsers)
//});
//
//experimentSchema.methods.getUsers = function (cb) {
//    var User = require('./user');
////    console.log('looking for: ' + this.users);
//    User.find({'_id': {
//        $in: this.users
//    }}).exec(cb);
//};
//
experimentSchema.pre('save', function (next) {
    if (!this.createdAt) {
        this.createdAt = new Date;
    } else {
        this.updatedAt = new Date;
    }
    next();
});

var Experiment = mongoose.model('Experiment', experimentSchema);

module.exports = Experiment;