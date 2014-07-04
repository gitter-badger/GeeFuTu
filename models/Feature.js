var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var featureSchema = mongoose.Schema({
    name: { type: String, required: true},
    description: String,
    users: [],
    createdAt: Date,
    updatedAt: Date
});

featureSchema.statics.findAll = function search(cb) {
    Organism.find({}).exec(cb);
};

featureSchema.virtual('processedUsers').get(function(){

}).set(function(progessedUsers){
    this.set('processedUsers', processedUsers)
});

featureSchema.methods.getUsers = function (cb) {
    var User = require('./user');
//    console.log('looking for: ' + this.users);
    User.find({'_id': {
        $in: this.users
    }}).exec(cb);
};

featureSchema.pre('save', function (next) {
    console.log('creating project');
    if (!this.createdAt) {
        this.createdAt = new Date;
    } else {
        this.updatedAt = new Date;
    }
    next();
});

var Feature = mongoose.model('Feature', featureSchema);

module.exports = Feature;