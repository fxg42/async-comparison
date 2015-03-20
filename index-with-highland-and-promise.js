import _ from 'highland'
import MongoDB from 'mongodb'
import Promise from 'bluebird'
Promise.promisifyAll(MongoDB)

function getConnection() {
  return MongoDB.MongoClient.connectAsync('mongodb://localhost/test').disposer((db) => {
    db.close()
  })
}
_.(getConnection())
.map((db) => { db.collection('people')
.flatMap((peopleColl) => { 
  return _(peopleColl.find().stream())})
.map((person) => { 
  return person.name
})
.collect()
.doto((everyone) => { 
  console.log(everyone)
})
.stopOnError((err) => {
  console.log('Something went wrong', err)
})

