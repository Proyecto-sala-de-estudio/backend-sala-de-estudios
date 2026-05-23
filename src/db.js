import Database from 'better-sqlite3'

const db = new Database('datos.db')
db.pragma('foreign_keys = ON')

db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre   TEXT NOT NULL,
    correo   TEXT NOT NULL,
    facultad TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS administradores (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario    TEXT NOT NULL,
    contrasena TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS salas (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre          TEXT NOT NULL,
    ubicacion       TEXT NOT NULL,
    capacidad       INTEGER NOT NULL,
    estado          TEXT NOT NULL,
    administradorId INTEGER,
    FOREIGN KEY (administradorId) REFERENCES administradores(id) ON DELETE SET NULL
  );

  CREATE TABLE IF NOT EXISTS equipamientos (
    id     INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    salaId INTEGER NOT NULL,
    FOREIGN KEY (salaId) REFERENCES salas(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS reservas (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha            TEXT NOT NULL,
    horaInicio       TEXT NOT NULL,
    horaFin          TEXT NOT NULL,
    estado           TEXT NOT NULL,
    cantidadPersonas INTEGER NOT NULL,
    usuarioId        INTEGER NOT NULL,
    salaId           INTEGER NOT NULL,
    FOREIGN KEY (usuarioId) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (salaId) REFERENCES salas(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS reglas_sistema (
    id                    INTEGER PRIMARY KEY AUTOINCREMENT,
    maxReservasPorUsuario INTEGER NOT NULL,
    tiempoMaximoReserva   INTEGER NOT NULL,
    horaInicioPermitida   TEXT NOT NULL,
    horaFinPermitida      TEXT NOT NULL,
    administradorId       INTEGER,
    FOREIGN KEY (administradorId) REFERENCES administradores(id) ON DELETE SET NULL
  );

  CREATE TABLE IF NOT EXISTS estadisticas_uso (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    porcentajeUso     REAL NOT NULL,
    cantidadReservas  INTEGER NOT NULL,
    salaId            INTEGER NOT NULL UNIQUE,
    FOREIGN KEY (salaId) REFERENCES salas(id) ON DELETE CASCADE
  );
`)

export default db
