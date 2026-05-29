// roppi.backend.modulos/roppi.backend.mod.productos/personalizado.model.js
class Personalizado {
  constructor({ id, idGenerico, idTamano, idColor, idMaterial, idPersonalizacion, sku, precio,
                generico, tamano, color, material, personalizacion }) {
    this.id = id;
    this.idGenerico = idGenerico;
    this.idTamano = idTamano;
    this.idColor = idColor;
    this.idMaterial = idMaterial;
    this.idPersonalizacion = idPersonalizacion;
    this.sku = sku;
    this.precio = precio;
    // Campos enriquecidos por los JOINs del gateway
    this.generico = generico || null;
    this.tamano = tamano || null;
    this.color = color || null;
    this.material = material || null;
    this.personalizacion = personalizacion || null;
  }
}

module.exports = Personalizado;