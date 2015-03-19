import Promise from 'bluebird'
import MongoDB from 'mongodb'
Promise.promisifyAll(MongoDB)

function getConnection() {
  return MongoDB.MongoClient.connectAsync('mongodb://localhost/test').disposer((db) => {
    db.close()
  })
}

Promise.using(getConnection(), (db) => {
  const people = db.collection('people')
  return people.find().toArrayAsync()
})
.then((everyone) => {
  return everyone.map( x => x.name )
})
.then((everyone) => {
  console.log(everyone)
})
.catch((e) => {
  console.log('Something went wrong', e)
})
