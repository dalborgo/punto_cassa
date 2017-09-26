var mc = require("../models/macroCategory");
var category = require("../models/category");
var Swagger = require('swagger-client');
var client = new Swagger({
    url: 'http://localhost:3000/spec.json',
    usePromise: true
}).then(function (res) {
    client = res;

});
var uuid = require('uuid');
var appRouter = function (app) {
    app.get("/api/sync/macro/create", function (req, res) {
        client.apis.document.put__db___doc_({db:"risto" ,doc: "jjjj", body: {
            "key": "value5454",
            "type": "foobar35454"
        }}).then(function (userRes) {
            console.log(userRes)
        })
            .catch(function (err) {
                console.log(err)
            });
        //res.send(body)

    });

    app.get("/api/sync/macro/create3", function (req, res) {
        var body = {
            "key": "value",
            "type":"foobar"
        }
        client.apis.document.post({db:"risto", body: body}).then(function (userRes) {
            console.log(userRes)
        })
            .catch(function (err) {
                console.log(err)
            });
        res.send(body)

    });

    app.get("/api/sync/macro/get", function (req, res) {

        client.apis.document.get__db___doc_({db:'risto',doc:'prova'}).then(function (userRes) {
            //console.log(userRes)
            res.send(userRes)
        })
            .catch(function (err) {
                console.log(err)
            });


    });
    app.get("/api/sync/macro/delete", function (req, res) {

        client.apis.document.delete__db___doc_({db:'risto',doc:'prova',rev:"3-1bb0c35f0db24b5252e6be3f72386a5e"}).then(function (userRes) {
            //console.log(userRes)
            res.send(userRes)
        })
            .catch(function (err) {
                console.log(err)
            });


    });
    app.post("/api/sync/macro/create2", function (req, res) {
        mc.create({
            name: req.body.name,
            display: req.body.display,
            color: req.body.color,
            image: req.body.image,
            categories: [category.refByKey('Category|' + req.body.category)]
        }, function (err, result) {
            var body = result.toJSON()
            body.type = "MacroCategory"
            body._id = "SYNCH::" + body.type + "|" + body._id
            var client = new Swagger({
                url: 'http://docs.couchbasemobile.com//sync-gateway-public/spec.json',
                usePromise: true
            }).then(function (res) {
                client = res;
                var obj = {db: "risto", body: body}
                client.apis.document.post(obj)
                result.remove(function (r) {})
            });
            res.send(body)
        });
    });

};

module.exports = appRouter;
