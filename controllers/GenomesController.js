var Genome = require('../models/Genome');
var Organism = require('../models/Organism');
var Reference = require('../models/Reference');
var Fasta = require('../lib/fasta');

/**
 *
 * @param app
 */
module.exports.controller = function (app) {

    app.get('/genomes', function (req, res) {
        Genome.findAll(function (err, genomes) {
            if (err) return res.send(err);
            res.render('genomes/index', {
                genomes: genomes
            });
        });
    });
    /**
     *
     */
    app.get('/genomes/new', function (req, res) {
        Organism.findAll(function (err, orgs) {
            if (err) return res.send(err);
            return res.render('genomes/new', {
                organisms: orgs
            });
        });

    });
    /**
     *
     */
    app.post('/genomes/add', function (req, res) {

        //order: create genome, get its id, add all refs from file, link them to genome by id

        var organism = req.body.organism;
        var description = req.body.description;
        var buildVersion = req.body.buildVersion;
        var meta = req.body.meta;

        var file = req.files.file;

        if (organism && description && buildVersion && meta && file) {

            var genome = new Genome({
                organism: organism,
                description: description,
                buildVersion: buildVersion,
                meta: meta
            });

            genome.save(function (err, gen) {
                if (err) return res.send(err);

                Fasta.read(file.path, function (ref) {
                    var ref = new Reference({
                        name: ref.name, seq: ref.seq, genome: gen._id
                    });
                    console.log(ref);
                }, function () {
                    //TODO delete file
                });
                return res.redirect('/genomes');
            });
        } else {
            return res.send('err');
        }
    });
    /**
     *
     */
    app.get('/genomes/show', function (req, res) {
        return res.render('genomes/show')
    });

};