var assert = require("assert");

describe('fasta', function () {
    describe('#read()', function () {
        it('should so something then stuff', function () {
            var fasta = require('../lib/fasta');
            fasta.read('test/test.fasta', function (ref) {
//                assert(ref.name);
//                assert(ref.seq);
                console.log('logging', ref.name);
                console.log('logging', ref.seq);
            });
        })
    })
});
