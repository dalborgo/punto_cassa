var ottoman = require("ottoman");
var table = require("./table.js");
ottoman.store = require("../app").store;
var room = ottoman.model("Room", {
        name: "string",
        display: "string",
        color: "string",
        image: "string",
        tables: [{ref:'Table'}]
    }
);

module.exports = room;