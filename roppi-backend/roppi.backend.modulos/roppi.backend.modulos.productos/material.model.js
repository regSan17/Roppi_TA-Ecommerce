// roppi.backend.modulos/roppi.backend.mod.productos/material.model.js
class Material {
  constructor({ id, nombre, descripcion, activo }) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.activo = activo;
  }
}

module.exports = Material;