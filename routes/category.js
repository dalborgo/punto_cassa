var mc = require("../models/macroCategory");
var category = require("../models/category");

var appRouter = function (app) {


    app.post("/api/macrocategory/create", function (req, res) {
        mc.create({
            name: req.body.name,
            display: req.body.display,
            color: req.body.color,
            image: req.body.image,
            categories: [category.refByKey('Category|'+req.body.category)]
        },function (err, result) {
            res.send(result)
           // console.log(result.toJSON())
        });
       /* m.save(function (error, result) {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(m);
        });*/
    });
    app.post("/api/category/create", function (req, res) {
      /*  mc.getById('8a7b247c-1472-4530-a79b-00b0908dc53f',function (res,err) {

        })*/
        var m = new category({
            name: req.body.name,
            display: req.body.display,
            color: req.body.color,
            image: req.body.image,
            macrocategories: [mc.refByKey('MacroCategory|'+req.body.macrocategory)]
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
