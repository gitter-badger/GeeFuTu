var Experiment = require('../models/Experiment');
var Genome = require('../models/Genome');

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

    app.get('/experiments/show', function (req, res) {
       return  res.render('experiments/show')
    });

};