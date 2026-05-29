// roppi.backend.modulos/roppi.backend.mod.productos/personalizacion.model.js
class Personalizacion {
  constructor({ id, nombre, descripcion, activa }) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.activa = activa;
  }
}

module.exports = Personalizacion;