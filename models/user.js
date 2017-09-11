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
    username: "string",
    email: "string",
    password: "string"
}, {
    index: {
        findByUsername: {
            by: "username",
            type: "refdoc"
        }
    },
    id:{
       id: username
    }
});

module.exports = UserMdl;
