var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var organismSchema = mongoose.Schema({
    name: { type: String, required: true},
    description: String,
    users: [],
    createdAt: Date,
    updatedAt: Date
});

organismSchema.statics.findAll = function search(cb) {
    Organism.find({}).exec(cb);
};

organismSchema.virtual('processedUsers').get(function(){

}).set(function(progessedUsers){
    this.set('processedUsers', processedUsers)
});

organismSchema.methods.getUsers = function (cb) {
    var User = require('./user');
//    console.log('looking for: ' + this.users);
    User.find({'_id': {
        $in: this.users
    }}).exec(cb);
};

organismSchema.pre('save', function (next) {
    console.log('creating project');
    if (!this.createdAt) {
        this.createdAt = new Date;
    } else {
        this.updatedAt = new Date;
    }
    next();
});

var Organism = mongoose.model('Organism', organismSchema);

module.exports = Organism;