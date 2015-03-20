import Promise from 'bluebird'
import MongoDB from 'mongodb'
Promise.promisifyAll(MongoDB)

async function findEveryone(db) {
  const people = db.collection('people')
  const everyone = await people.find().toArrayAsync()
  return everyone.map( x => x.name )
}

(async function run() {
  let db
  try {
    db = await MongoDB.MongoClient.connectAsync('mongodb://localhost/test')
    const everyone = await findEveryone(db)
    console.log(everyone)
  } catch (e) {
    console.log('Something went wrong', e)
  } finally {
    db && db.close()
  }
})()
