import MongoDB from 'mongodb'

function findEveryone(db, callback) {
  const people = db.collection('people')
  const everyone = people.find().toArray((err, everyone) => {
    if (err) {
      callback(err)
    } else {
      callback(null, everyone.map( x => x.name ))
    }
  })
}

MongoDB.MongoClient.connect('mongodb://localhost/test', (err, db) => {
  if (err) {
    console.log('Something went wrong', err)
  } else {
    findEveryone(db, (err, everyone) => {
      if (err) {
        console.log('Something went wrong', err)
      } else {
        console.log(everyone)
      }
      db && db.close()
    })
  }
})
