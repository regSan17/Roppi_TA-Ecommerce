import { apiClient } from "./apiCliente";
import { Color } from "../types/producto/color.types";
import { Material } from "../types/producto/material.types";
import { Personalizacion } from "../types/producto/personalizacion.types";
import { Tamano } from "../types/producto/tamano.types";
import { CreateProductGenericoDTO, ProductoGenerico } from "../types/producto/productoGen.types";

export const ProductosAPIService = {
    /*Primero hacemos el retrieval de los datos maestros de los 
    atributos generales dado que estos se necesitan para llenar los 
    formularios de creación y edición. */
    getColores: async (): Promise<Color[]> => {
        //Falta cambiar el endpoint a la URL del backend.
        const response = await apiClient.get('/api/colores');
        return response.data;
    },

    getMateriales: async (): Promise<Material[]> => {
        //Falta cambiar el endpoint a la URL del backend.
        const response = await apiClient.get('/api/materiales');
        return response.data;
    },

    getTamano: async (): Promise<Tamano[]> => {
        //Falta cambiar el endpoint a la URL del backend.
        const response = await apiClient.get('/api/tamanos');
        return response.data;
    },

    getPersonalizaciones: async (): Promise<Personalizacion[]> => {
        //Falta cambiar el endpoint a la URL del backend.
        const response = await apiClient.get('/api/personalizaciones');
        return response.data;
    },
    
    /*A continuación hacemos el CRUD respecto a los productos genericos
     considerando que trae en este caso todos los producto activo o 
     inactivo*/
    getProductosGenericos: async (): Promise<ProductoGenerico[]> => {
        //Falta cambiar el endpoint a la URL del backend.
        const response = await apiClient.get('/api/productos');
        return response.data;
    },
    
    createProductoGenerico: async (productoData: CreateProductGenericoDTO): Promise<ProductoGenerico> => {
        //Falta cambiar el endpoint a la URL del backend.
        const response = await apiClient.post('/api/productos', productoData);
        return response.data;
    },

    updateProductoGenerico: async (id: number, productoData: CreateProductGenericoDTO): Promise<ProductoGenerico> => {
        //Falta cambiar el endpoint a la URL del backend.
        const response = await apiClient.put(`/api/productos/${id}`, productoData);
        return response.data;
    },

    deleteProductoGenerico: async (id: number): Promise<void> => {
        //Falta cambiar el endpoint a la URL del backend.
        await apiClient.delete(`/api/productos/${id}`);
    }
};