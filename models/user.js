var ottoman = require("ottoman");
var validator = require("../validators/validators.js");
var CompanyMdl = require("./company.js");

ottoman.store = require("../app").store;

var UserMdl = ottoman.model("User", {
    createdON: {
        type: "Date", default: function () {
            return new Date()
        }
    },
    username: {type: 'string', readonly: true },
    password: "string"
}, {
       id: 'username'
});

module.exports = UserMdl;
