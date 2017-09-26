var product = require("../models/product");
var variant = require("../models/variant");
var category = require("../models/category");

var appRouter = function (app) {
    app.post("/api/product/create", function (req, res) {
        var m = new product({
            name: req.body.name,
            display: req.body.display,
            color: req.body.color,
            image: req.body.image,
            categories: [category.refByKey('Category|'+req.body.category)]
        });
        m.save(function (error, result) {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(m);
        });
    });
    app.post("/api/variant/create", function (req, res) {
        var m = new variant({
            name: req.body.name,
            display: req.body.display,
            color: req.body.color,
            image: req.body.image,
            categories: [category.refByKey('Category|'+req.body.category)]
        });
        m.save(function (error, result) {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(m);
        });
    });

};

module.exports = appRouter;
