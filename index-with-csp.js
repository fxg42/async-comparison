import csp from "js-csp"

import MongoDB from 'mongodb'

let connection


function connect() {
  var ch = csp.chan();
  
  MongoDB.MongoClient.connect('mongodb://localhost/test',function(err, db){
    if(err){
      csp.putAsync(ch, new Error(err))
    }else{
      csp.putAsync(ch, db);
    }
  });
  return ch;
}
function findEveryone(db) {
  var ch = csp.chan();
  db.collection('people').find().toArray(function (err, ps){
    csp.putAsync(ch, ps);  
  })
  return ch;
}

function extractPersonName(everyone){
  var ch = csp.chan();
  csp.putAsync(ch, everyone.map( x => x.name ));
  return ch;
}
csp.go(function*(){
  let conn
  try{
    conn = yield connect();
    const everyone = yield findEveryone(conn)
    const everyoneName = yield extractPersonName(everyone);
    console.log(everyoneName);
  }catch(e){
    console.error(e);
  }finally{
    conn.close()
  }
});
