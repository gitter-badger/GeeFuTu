module.exports.controller = function (app) {

    app.get('/features', function (req, res) {
        res.render('features/index')
    });

    app.get('/features/new', function (req, res) {
        res.render('features/new')
    });

    app.get('/features/show', function (req, res) {
        res.render('features/show')
    });

};