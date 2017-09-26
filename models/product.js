var ottoman = require("ottoman");
var category = require("./category.js");
var variant = require("./variant.js");
ottoman.store = require("../app").store;
var prod = ottoman.model("Product", {
        name: "string",
        display: "string",
        color: "string",
        image: "string",
        categories: [{ref:'Category'}],
        variants: [{ref:'Variant'}],
        fiscal_department : "string",
        prices:[{
            catalog: {ref:'Catalog'},
            price: 'integer'
        }]
    }
);

module.exports = prod;