var Organism = require('../models/Organism');
module.exports.controller = function (app) {

    app.get('/organisms', function (req, res) {
        Organism.findAll(function (err, orgs) {
            if (err) return res.send(err);
            res.render('organisms/index', {
                organisms: orgs
            });
        });
    });

    app.get('/organisms/new', function (req, res) {
        res.render('organisms/new');
    });

    app.post('/organisms/add', function (req, res) {
        console.log(req.body);
        var org = new Organism({
            localName: req.body.localname,
            description: req.body.description,
            genus: req.body.genus,
            species: req.body.species,
            strain: req.body.strain,
            pathovar: req.body.pathovar,
            ncbi: req.body.ncbi
        });
        org.save(function (err, org) {
            if (err) return res.send(err);
            res.redirect('/organisms');
        });

    });

    app.get('/organisms/show', function (req, res) {
        res.render('organisms/show');
    });

};