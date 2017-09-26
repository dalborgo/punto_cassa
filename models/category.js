var ottoman = require("ottoman");
var mc = require("./macroCategory");
ottoman.store = require("../app").store;
var category = ottoman.model("Category", {
        name: "string",
        display: "string",
        color: "string",
        image: "string",
        macrocategories: [{ref:'MacroCategory'}]
    }
);

module.exports = category;