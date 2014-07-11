var assert = require("assert");
var Feature = require("../models/Feature");
var gff3 = require('../lib/gff3');
var fasta = require('../lib/fasta');

describe('fasta', function () {
    describe('#read()', function () {
        it('should so something then stuff', function () {
            var refCount = 0;
            fasta.read('test/test.fasta', function (ref) {
                refCount++;
            }, function () {
                console.log(refCount, 'references');
            });
        });
    });
});


describe('gff3', function () {
    describe('#read()', function () {
        it('should so something then stuff', function () {
            var experiment = '100';
            var featCount = 0;
            gff3.read('test/test.gff3', function (feature) {
                var feat = new Feature({
                    seqid: feature.seqid,
                    source: feature.source,
                    type: feature.type,
                    start: feature.start,
                    end: feature.end,
                    score: feature.score,
                    strand: feature.strand,
                    phase: feature.phase,
                    attributes: feature.attributes,
                    experiment: experiment
                });
                featCount++;
            }, function () {
                console.log(featCount, 'features');
            });
        });
    });
});