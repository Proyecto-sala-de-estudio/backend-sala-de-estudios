import Database from 'better-sqlite3'

const db = new Database('datos.db')
db.pragma('foreign_keys = ON')

db.exec(`
`)

export default db
