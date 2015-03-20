import async from 'async'
import MongoDB from 'mongodb'

function connect(callback) {
  MongoDB.MongoClient.connect('mongodb://localhost/test', callback)
}

function findEveryone(callback, {db}) {
  const people = db.collection('people')
  const everyone = people.find().toArray((err, everyone) => {
    if (err) {
      callback(err)
    } else {
      callback(null, everyone.map( x => x.name ))
    }
  })
}

const tasks = {
  db: connect,
  everyone: ['db', findEveryone]
}
async.auto(tasks, (err, {db, everyone}) => {
  if (err) {
    console.log('Something went wrong', err)
  } else {
    console.log(everyone)
  }
  db && db.close()
})
