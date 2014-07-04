module.exports.controller = function (app) {

    app.get('/genomes', function (req, res) {
        res.render('genomes/index')
    });

    app.get('/genomes/new', function (req, res) {
        res.render('genomes/new')
    });

    app.get('/genomes/show', function (req, res) {
        res.render('genomes/show')
    });

};