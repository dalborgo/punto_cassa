var config = require("../config/config.json");
var escpos = require('escpos');
var device  = new escpos.Network(config.printer.ip);
var printer = new escpos.Printer(device);
var appRouter = function (app) {
    app.get("/api/print", function (req, res, next) {
        if (!req.user) {
            res.render("secure", {expressFlash: req.flash('Nessun utente collegato!')});
        } else {
            device.open(function(){
                printer
                    .encode('850')
                    .font('a')
                    .align('ct')
                    .style('bu')
                    .size(1, 1)
                    .text(req.user.username).println()
                    .text(req.user.createdON).feed(3)
                printer.control("LF")
                    .cut()
                    .close();
            });
            res.json(req.user)
        }
    });
};
module.exports = appRouter;
