var fs = require('fs');
var _ = require('underscore');


// exports.database = [];

// for (var i  = 0; i < 10; i ++) {
//   exports.database.push({
//     username: i + "Jack" + i,
//     text: "Helloooooo" + i,
//     roomname: "PiratesOnly"
//   });

// }





exports.newDB = {
  readAll: function (callback) {
    fs.readFile('db.txt',function(err,data){
      if (err) {
        throw err;
      } else {
        data =  data.toString().split('#$');
        var result = _.map(data,function(obj){
          return JSON.parse(obj);
        });
        console.log("Returning the callback ",result)
        return callback(result);
      }
    });
  },

  writeOne : function(msg){
    fs.appendFile('db.txt', '#$'+JSON.stringify(msg), function(error) {
      if (error) {
        throw error;
      } else {
        console.log('SAVED!!');
      }
    });
  }
};




//database
//db is object with access methods:
  //readAll
    //get DB file
    //read and parse all objects.
    //wrap them in an array
    //return is an array of objects (if any)
  //writeOne
   //takes message object
   //opens file
   //appends single message as a stringified object


