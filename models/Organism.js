var mongoose = require('mongoose'), Schema = mongoose.Schema;

var organismSchema = mongoose.Schema({
    localName: {type: String, required: true},
    description: {type: String, required: true},
    genus: {type: String, required: true},
    species: {type: String, required: true},
    strain: {type: String, required: true},
    pathovar: String,
    ncbi: String,
    createdAt: Date,
    updatedAt: Date
});

organismSchema.statics.findAll = function(cb) {
    //err, findings
    Organism.find({}).exec(cb);
};
//
//organismSchema.virtual('processedUsers').get(function(){
//
//}).set(function(progessedUsers){
//    this.set('processedUsers', processedUsers)
//});
//
//organismSchema.methods.getUsers = function (cb) {
//    var User = require('./user');
////    console.log('looking for: ' + this.users);
//    User.find({'_id': {
//        $in: this.users
//    }}).exec(cb);
//};
//
organismSchema.pre('save', function (next) {
    if (!this.createdAt) {
        this.createdAt = new Date;
    } else {
        this.updatedAt = new Date;
    }
    next();
});

var Organism = mongoose.model('Organism', organismSchema);

module.exports = Organism;