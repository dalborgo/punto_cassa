var table = require("../models/table");
var room = require("../models/room");

var appRouter = function (app) {


    app.post("/api/table/create", function (req, res) {
        var m = new table({
            name: req.body.name,
            display: req.body.display,
            color: req.body.color,
            image: req.body.image,
            rooms: [room.refByKey('Room|'+req.body.room)]
        });
        m.save(function (error, result) {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(m);
        });
    });
    app.post("/api/room/create", function (req, res) {
        var m = new room({
            name: req.body.name,
            display: req.body.display,
            color: req.body.color,
            image: req.body.image,
            tables: [table.refByKey('Table|'+req.body.table)]
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
