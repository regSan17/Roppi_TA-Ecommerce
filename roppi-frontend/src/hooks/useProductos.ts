import { useState, useEffect, useCallback } from 'react';
import { ProductosAPIService } from '../api/productos.api';
import { Color } from "../types/producto/color.types";
import { Material } from "../types/producto/material.types";
import { Personalizacion } from "../types/producto/personalizacion.types";
import { Tamano } from "../types/producto/tamano.types";
import { CreateProductGenericoDTO, ProductoGenerico } from "../types/producto/productoGen.types";


export const useProductosGenericos = () => {
    // Estados ara productos, loading, error y catálogos maestros
    const [productos, setProductos] = useState<ProductoGenerico[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Estados para los catálogos maestros
    const [colores, setColores] = useState<Color[]>([]);
    const [materiales, setMateriales] = useState<Material[]>([]);
    const [tamanos, setTamanos] = useState<Tamano[]>([]);
    const [personalizaciones, setPersonalizaciones] = useState<Personalizacion[]>([]);

    //Función para cargar todos los datos necesarios 
    // (productos + catálogos) al inicio
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            // Promise.all hace que las 5 peticiones ocurran al mismo tiempo 
            const [c, m, t, p, prods] = await Promise.all([
                ProductosAPIService.getColores(),
                ProductosAPIService.getMateriales(),
                ProductosAPIService.getTamano(),
                ProductosAPIService.getPersonalizaciones(),
                ProductosAPIService.getProductosGenericos()
            ]);

            setColores(c);
            setMateriales(m);
            setTamanos(t);
            setPersonalizaciones(p);
            setProductos(prods);
        } catch (err) {
            setError('Error al conectar con la base de datos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Se ejecuta una vez al montar el componente para cargar los datos iniciales
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Funciones para agregar, actualizar y eliminar productos sin recargar 
    // toda la lista, actulizando el estado local de productos directamente.
    const addProducto = async (data: CreateProductGenericoDTO) => {
        const nuevo = await ProductosAPIService.createProductoGenerico(data);
        setProductos((prev) => [...prev, nuevo]); // Actualizamos la lista sin recargar
    };

    const updateProducto = async (id: number, data: CreateProductGenericoDTO) => {
        const actualizado = await ProductosAPIService.updateProductoGenerico(id, data);
        setProductos((prev) => prev.map(p => p.id === id ? actualizado : p));
    };

    const deleteProducto = async (id: number) => {
        await ProductosAPIService.deleteProductoGenerico(id);
        setProductos((prev) => prev.filter(p => p.id !== id));
    };

    return {
        productos, loading, error, colores, materiales, tamano: tamanos, 
        personalizaciones, addProducto, updateProducto, deleteProducto, refresh: fetchData
    };
};