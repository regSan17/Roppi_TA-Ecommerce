const express = require('express');

// Importamos los gateways existentes para consumirlos
const categoriasGateway = require('../../roppi.backend.modulos/roppi.backend.modulos.productos/categorias.gateway.js');
const coloresGateway = require('../../roppi.backend.modulos/roppi.backend.modulos.productos/colores.gateway.js');
const materialesGateway = require('../../roppi.backend.modulos/roppi.backend.modulos.productos/materiales.gateway.js');
const tamanosGateway = require('../../roppi.backend.modulos/roppi.backend.modulos.productos/tamanos.gateway.js');
const productosGateway = require('../../roppi.backend.modulos/roppi.backend.modulos.productos/productos.gateway.js');

class ProductosAPI {
  constructor() {
    this.router = express.Router();
    this.port = null;
    this.ipAddress = null;

    this._configurarRutas();
  }

  // Método interno para mapear rutas hacia el procesarConsulta
  _configurarRutas() {
    this.router.get('/genericos', async (req, res) => this.procesarConsulta(req, res, 'listarGenericos'));
    this.router.get('/colores', async (req, res) => this.procesarConsulta(req, res, 'listarColores'));
    this.router.get('/materiales', async (req, res) => this.procesarConsulta(req, res, 'listarMateriales'));
    this.router.get('/tamanos', async (req, res) => this.procesarConsulta(req, res, 'listarTamanos'));
    this.router.get('/', async (req, res) => this.procesarConsulta(req, res, 'listarProductosEspecificos'));
  }

  async procesarConsulta(request, response, accion) {
    try {
      let resultado = null;

      switch (accion) {
        case 'listarGenericos':
          // Mapeamos el "Producto Genérico" a la tabla Categorías por ahora
          resultado = await categoriasGateway.listarTodos();
          break;
        case 'listarColores':
          resultado = await coloresGateway.listarTodos();
          break;
        case 'listarMateriales':
          resultado = await materialesGateway.listarTodos();
          break;
        case 'listarTamanos':
          resultado = await tamanosGateway.listarTodos();
          break;
        case 'listarProductosEspecificos':
          resultado = await productosGateway.listarTodos();
          break;
        default:
          return this.devolverError(response, 400, 'Acción no válida');
      }

      this.retornarRespuesta(response, 200, resultado);

    } catch (error) {
      console.error(`[ProductosAPI Error] ${accion}:`, error);
      this.devolverError(response, 500, 'Error interno del servidor procesando la consulta.');
    }
  }

  devolverError(response, status, mensaje) {
    return response.status(status).json({
      exito: false,
      error: mensaje
    });
  }

  retornarRespuesta(response, status, data) {
    return response.status(status).json({
      exito: true,
      datos: data
    });
  }
}

module.exports = ProductosAPI;
