module.exports.controller = function (app) {

    app.get('/experiments', function (req, res) {
        res.render('experiments/index')
    });

    app.get('/experiments/new', function (req, res) {
        res.render('experiments/new')
    });

    app.get('/experiments/show', function (req, res) {
        res.render('experiments/show')
    });

};