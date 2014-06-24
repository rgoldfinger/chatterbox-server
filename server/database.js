var fs = require('fs');


exports.database = [];

for (var i  = 0; i < 10; i ++) {
  exports.database.push({
    username: i + "Jack" + i,
    text: "Helloooooo" + i,
    roomname: "PiratesOnly"
  });

}





// exports.newDB = {
//   readAll: function () {

//   },


// //database
// //db is object with access methods:
//   //readAll
//     //get DB file
//     //read and parse all objects.
//     //wrap them in an array
//     //return is an array of objects (if any)
//   //writeOne
//    //takes message object
//    //opens file
//    //appends single message as a stringified object
// };


