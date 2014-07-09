module.exports.controller = function (app) {

    app.get('/features', function (req, res) {
       return  res.render('features/index')
    });

    app.get('/features/new', function (req, res) {
       return  res.render('features/new')
    });

    app.get('/features/show', function (req, res) {
        return res.render('features/show')
    });

};