import async from 'async'
import MongoDB from 'mongodb'

let connection

function connect(callback) {
  MongoDB.MongoClient.connect('mongodb://localhost/test', callback)
}

function findEveryone(db, callback) {
  connection = db
  const people = db.collection('people')
  people.find().toArray(callback)
}

function extractPersonName(everyone, callback){
  callback(null, everyone.map( x => x.name ))
}

async.waterfall([
  connect,
  findEveryone,
  extractPersonName
], (err, everyone) => {
  if (err) {
    console.log('Something went wrong', err)
  } else {
    console.log(everyone)
  }
  connection && connection.close()
})
