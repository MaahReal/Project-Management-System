const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb://172.16.8.33:27017/"; //AKO ipaddress sa usc
//const url = "mongodb://172.16.32.33:27017/"; 
//const url = "mongodb://172.16.32.23:27017/"; //roselle's pc ipadress 
var _db;
module.exports = {
  connectToServer: function( callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
      _db  = client.db('DBLast');
      return callback( err );
    } );
  },
  getDb: function() {
    return _db;
  }
};