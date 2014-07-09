var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var Fasta = {

    // if line starts with ';' ignore
    // if line starts with > then it is a desc and following line is the seq

    read: function read(path) {
        var instream = fs.createReadStream(path);
        var outstream = new stream;
        var rl = readline.createInterface(instream, outstream);

        rl.on('line', function (line) {
            console.log(line);
            console.log('end of line');
        });

        rl.on('close', function () {
            console.log('closed file');
        });
    },

    //TODO
    write: function (path) {

    }

};

module.exports = Fasta;