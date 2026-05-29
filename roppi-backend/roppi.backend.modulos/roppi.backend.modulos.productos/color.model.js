// roppi.backend.modulos/roppi.backend.mod.productos/color.model.js
class Color {
  constructor({ id, nombre, pantone, activo }) {
    this.id = id;
    this.nombre = nombre;
    this.pantone = pantone;
    this.activo = activo;
  }
}

module.exports = Color;