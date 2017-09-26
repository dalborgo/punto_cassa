var bcrypt = require("bcryptjs");
var UserModel = require("../models/user");

var appRouter = function (app) {
    app.get("/api/user/get/:userId", function (req, res) {
        if (!req.params.userId) {
            return res.status(400).send({"status": "error", "message": "A user id is required"});
        }
        UserModel.getById(req.params.userId, function (error, user) {
            if (error) {
                return res.status(400).send(error);
            }
            res.json(user);
        });
    });

    app.get("/api/user/getAll", function (req, res) {
        UserModel.find({}, function (error, result) {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(result);
        });
    });

    app.post("/api/user/create", function (req, res) {
        var user = new UserModel({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10)
        });
        user.save(function (error, result) {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(user);

        });
    });

};

module.exports = appRouter;
