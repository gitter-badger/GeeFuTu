var Experiment = require('../models/Experiment');
var Genome = require('../models/Genome');
var GFF = require('../lib/gff3');
var Feature = require('../models/Feature');

module.exports.controller = function (app) {

    app.get('/experiments', function (req, res) {
        Experiment.findAll(function (err, experiments) {
            if (err) return res.send(err);
            res.render('experiments/index', {
                experiments: experiments
            });
        });
    });

    app.get('/experiments/new', function (req, res) {
        Genome.findAll(function (err, gens) {
            if (err) return res.send(err);
            return res.render('experiments/new', {
                genomes: gens
            });
        });
    });

    app.post('/experiments/add', function (req, res) {

        var name = req.body.name;
        var description = req.body.description;
        var genome = req.body.genome;
        var meta = req.body.meta;
        var file = req.files.file;
        var findParents = req.body.findParents;

        var experiment = new Experiment({
            name: name,
            description: description,
            file: file.path,
            genome: genome,
            meta: meta,
            findParents: findParents
        });

        experiment.save(function (err, r) {
            if (err) {
                console.log(err);
                res.send();
            } else {
                console.log('saved experiment');
            }
        });

        GFF.read(file.path, function (feature) {
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

            feat.save(function (err, r) {
                if (err) {
                    console.log(err);
                    return res.send();
                }
            });

        }, function () {
            //console.log('finished');
        });
        return res.redirect('/experiments');
    });

    app.get('/experiments/:id', function (req, res) {
        var id = req.param("id");
        console.log(id);

        var experiment = Experiment.find({_id: id}, function(err, exp){
            return res.render('experiments/show', {experiment: experiment});
        });

        return res.render('experiments/show', {experiment: experiment});
    });

};