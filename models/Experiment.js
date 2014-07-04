var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var experimentSchema = mongoose.Schema({
    name: { type: String, required: true},
    description: String,
    users: [],
    createdAt: Date,
    updatedAt: Date
});

experimentSchema.statics.findAll = function search(cb) {
    Organism.find({}).exec(cb);
};

experimentSchema.virtual('processedUsers').get(function(){

}).set(function(progessedUsers){
    this.set('processedUsers', processedUsers)
});

experimentSchema.methods.getUsers = function (cb) {
    var User = require('./user');
//    console.log('looking for: ' + this.users);
    User.find({'_id': {
        $in: this.users
    }}).exec(cb);
};

experimentSchema.pre('save', function (next) {
    console.log('creating project');
    if (!this.createdAt) {
        this.createdAt = new Date;
    } else {
        this.updatedAt = new Date;
    }
    next();
});

var Experiment = mongoose.model('Experiment', experimentSchema);

module.exports = Experiment;