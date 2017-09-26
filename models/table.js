var ottoman = require("ottoman");
var room = require("./room.js");
ottoman.store = require("../app").store;
var table = ottoman.model("Table", {
        name: "string",
        display: "string",
        color: "string",
        image: "string",
        rooms: [{ref:'Room'}]
    }
);

module.exports = table;