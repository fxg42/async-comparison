import _ from 'highland'
import MongoDB from 'mongodb'

let connection

_.wrapCallback(MongoDB.MongoClient.connect)('mongodb://localhost/test')
.map((db) => {
  connection = db
  const people = db.collection('people')
  return _(people.find().stream()).pluck('name')
})
.merge()
.collect()
.doto((everyone) => {
  console.log(everyone)
})
.stopOnError((err, push) => {
  console.log('Something went wrong', err)
})
.apply(() => {
  connection && connection.close()
})
