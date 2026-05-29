// roppi.backend.modulos/roppi.backend.mod.productos/tamano.model.js
class Tamano {
  constructor({ id, nombre, descripcion, activo }) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.activo = activo;
  }
}

module.exports = Tamano;