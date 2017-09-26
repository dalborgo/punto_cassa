var ottoman = require("ottoman");
var category = require("./category.js");
ottoman.store = require("../app").store;
var macroCategory = ottoman.model("MacroCategory", {
        name: "string",
        display: "string",
        color: "string",
        image: "string",
        categories: [{ref:'Category'}]
    }
);

module.exports = macroCategory;