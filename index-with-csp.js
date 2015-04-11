import csp from "js-csp"

import MongoDB from 'mongodb'

function cspFromCb(fn){
    var args = 2 <= arguments.length ? Array.prototype.slice.call(arguments, 1) : [];
    var chan = csp.chan();

    args.push(function(err, value) {
        csp.putAsync(chan, err ? err : value, (()=> chan.close()));
    });

    fn.apply(this, args);

    return chan;
}
function cspValue(v){
  var chan = csp.chan();
  csp.putAsync(chan, v, (()=> chan.close()));
  return chan;
}

function connect() {
  return cspFromCb(MongoDB.MongoClient.connect, 'mongodb://localhost/test' )
}
function findEveryone(db) {
  var ctx = db.collection('people').find()
  return cspFromCb.bind(ctx)(ctx.toArray)
}

function extractPersonName(everyone){
  return cspValue(everyone.map( (x => x.name )))
}
csp.go(function*(){
  let conn
  try{
    conn = yield connect();
    const everyone = yield findEveryone(conn)
    const everyoneName = yield extractPersonName(everyone);
    console.log(everyoneName);
  }catch(e){
    console.error("ERROR", e);
  }finally{
    conn.close()
  }
});
