var Genome = require('../models/Genome');
var Fasta = require('fasta');
module.exports.controller = function (app) {

    app.get('/genomes', function (req, res) {
        Genome.findAll(function (err, genomes) {
            if (err) return res.send(err);
            res.render('genomes/index', {
                genomes: genomes
            });
        });
    });

    app.get('/genomes/new', function (req, res) {
        res.render('genomes/new')
    });

    app.post('/genomes/add', function(req, res){

        Fasta.read();

    });

    app.get('/genomes/show', function (req, res) {
        res.render('genomes/show')
    });

};