var ottoman = require("ottoman");
var category = require("./category.js");
var product = require("./product");
ottoman.store = require("../app").store;
var variant = ottoman.model("Variant", {
        name: "string",
        display: "string",
        color: "string",
        image: "string",
        categories: [{ref:'Category'}],
        variants: [{ref:'Variant'}],
        prices:[{
            catalog: {ref:'Catalog'},
            price: 'integer'
        }]
    }
);

module.exports = variant;