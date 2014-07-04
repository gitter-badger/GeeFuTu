var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var genomeSchema = mongoose.Schema({
    name: { type: String, required: true},
    description: String,
    users: [],
    createdAt: Date,
    updatedAt: Date
});

genomeSchema.statics.findAll = function search(cb) {
    Organism.find({}).exec(cb);
};

genomeSchema.virtual('processedUsers').get(function(){

}).set(function(progessedUsers){
    this.set('processedUsers', processedUsers)
});

genomeSchema.methods.getUsers = function (cb) {
    var User = require('./user');
//    console.log('looking for: ' + this.users);
    User.find({'_id': {
        $in: this.users
    }}).exec(cb);
};

genomeSchema.pre('save', function (next) {
    console.log('creating project');
    if (!this.createdAt) {
        this.createdAt = new Date;
    } else {
        this.updatedAt = new Date;
    }
    next();
});

var Genome = mongoose.model('Genome', genomeSchema);

module.exports = Genome;