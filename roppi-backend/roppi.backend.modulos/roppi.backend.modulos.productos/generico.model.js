// roppi.backend.modulos/roppi.backend.mod.productos/generico.model.js
class Generico {
  constructor({ id, nombre, descripcion, precioBase, maximoStock, activo }) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precioBase = precioBase;
    this.maximoStock = maximoStock;
    this.activo = activo;
    // Relaciones opcionales, se llenan en el BusinessObject
    this.tamanos = [];
    this.materiales = [];
    this.colores = [];
    this.personalizaciones = [];
    this.personalizados = [];
  }
}

module.exports = Generico;