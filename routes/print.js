
var config = require("../config/config.json");
var escpos = require('escpos')
var appRouter = function (app) {
    app.get("/api/print", function (req, res, next) {
        ;
        var device  = new escpos.Network(config.printer.ip);
        var printer = new escpos.Printer(device);
        if (!req.user) {
            return res.render("secure", {expressFlash: req.flash('Nessun utente collegato!')});
        }
        var obj ={
            data : new Date(),
            az: 'Asten',
            user: req.user.username,
            prod: 'Miscellaneus',
            quant: '1.000',
            costo: '18.00 ¯',
            subtotale: '18.00 ¯',
            totla: '18.00 ¯',
            cash: '20.00 ¯',
            change: '2.00 ¯'
        };
        device.open(function(){
                printer
                    .encode('857')
                    .font('a')
                    .align('ct')
                    .size(1, 1)
                    .text(obj.data).println()
                    .align('lt')
                    .text(obj.az).text(obj.user).println()
                    .text(obj.prod+'\t\t'+obj.quant+'      '+obj.costo).println()
                    .text('Subtotal\t\t\t'+obj.subtotale).size(1, 2).text('Total:\t\t\t'+obj.totla).println().size(1,1)
                    .text('Cash (EUR)\t\t\t'+obj.cash).println()
                    .text('Change:\t\t\t'+obj.change).close()
            });
            res.json(req.user)

    });
};
module.exports = appRouter;
