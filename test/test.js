var assert = require("assert");

describe('fasta', function(){
    describe('#read()', function(){
        it('should so something then stuff', function(){
            var fasta = require('../lib/fasta');
//            assert.equal(-1, [1,2,3].indexOf(5));
//            assert.equal(-1, [1,2,3].indexOf(0));
            fasta.read('test.fasta');

        })
    })
});
