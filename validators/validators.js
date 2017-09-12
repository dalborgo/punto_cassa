var Hashids = require("hashids");
var config = require("../config/config.json");

module.exports.permalinker=function(){
  var milliseconds = (new Date).getTime();
  var hashids = new Hashids(config.salt);
  var id = hashids.encode(milliseconds);
  return id;
}
