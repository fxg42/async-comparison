@GrabConfig(systemClassLoader=true)
@Grab('postgresql:postgresql:9.1-901-1.jdbc4')
import groovy.sql.Sql

def findEveryone(sql) {
  def everyone = sql.rows("select * from people")
  everyone.collect{ it.name }
}

def sql
try {
  sql = Sql.newInstance("jdbc:postgresql:test", "postgres", "postgres", "org.postgresql.Driver")
  def everyone = findEveryone(sql)
  println everyone
} catch (e) {
  println "Something went wrong ${e}"
} finally {
  sql?.close()
}
