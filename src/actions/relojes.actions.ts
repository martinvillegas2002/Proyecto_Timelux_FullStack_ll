import { relojes } from '../data/mock-relojes';
import { RelojProps } from '../interfaces/reloj.interfaces';

// URL directa al microservicio de catálogo (o al Gateway 8080 si te funcionó)
const API_URL = 'http://localhost:8082/api/products';


// Función para "traducir" de Backend (MySQL) a Frontend (React)
const mapearReloj = (producto: any): RelojProps => {
  return {
    id: producto.id,
    nombre: producto.nombre,
    // Como no tenemos marca en la BD, inventamos una o la ponemos en el nombre
    marca: "TimeLux Generic", 
    // Usamos la misma descripción para ambas
    descripcionCorta: producto.descripcion,
    descripcionLarga: producto.descripcion,
    precio: producto.precio,
    // Aquí está el arreglo clave: imagenUrl -> imagen
    imagen: producto.imagenUrl, 
    // Extraemos solo el nombre de la categoría
    // Forzamos el tipo para que TypeScript no se queje, o usa un string genérico
    categoria: producto.categoria.nombre as any 
  };
};

export const getRelojes = async (): Promise<RelojProps[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al cargar');
    const data = await response.json();
    
    // ¡Aquí aplicamos la traducción a toda la lista!
    return data.map(mapearReloj); 
    
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Llamada API para obtener un solo reloj por su ID.

 */
export const getRelojById = async (id: number): Promise<RelojProps | undefined> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) return undefined;
    const data = await response.json();
    
    // ¡Traducimos el reloj individual!
    return mapearReloj(data);

  } catch (error) {
    console.error(error);
    return undefined;
  }
};


/*NO DEPENDER DE FUNCIONM QUE AJUSTA BACKEND CON FRONTEND CAMBIar eso*/