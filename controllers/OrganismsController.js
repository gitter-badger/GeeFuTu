module.exports.controller = function (app) {

    app.get('/organisms', function (req, res) {
        res.render('organisms/index')
    });

    app.get('/organisms/new', function (req, res) {
        res.render('organisms/new')
    });

    app.get('/organisms/show', function (req, res) {
        res.render('organisms/show')
    });

};