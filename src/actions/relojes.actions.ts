import { RelojProps } from '../interfaces/reloj.interfaces';

// ⚠️ IMPORTANTE: Cada vez que reinicies Ngrok, esta URL cambia.
// Copia la nueva URL de tu terminal negra (la que dice "Forwarding") y pégala aquí.
// Debe terminar en /api/products
const API_URL = 'http://localhost:8080/api/products'; 

// Ya no necesitamos el header de Ngrok, pero dejar el Content-Type está bien
const headers = {
  "Content-Type": "application/json"
};

const ngrokHeaders = {
  "ngrok-skip-browser-warning": "true",
  "Content-Type": "application/json" // <--- ¡AQUÍ ESTÁ!
};

// --- EL TRADUCTOR (ADAPTADOR) ---
// Convierte los datos que vienen de Java (MySQL) al formato que espera React
const mapearReloj = (producto: any): RelojProps => {
  return {
    id: producto.id,
    nombre: producto.nombre,
    marca: "Timelux", // Valor por defecto
    descripcionCorta: producto.descripcion,
    descripcionLarga: producto.descripcion,
    precio: producto.precio,
    // Mapeo clave: imagenUrl (Backend) -> imagen (Frontend)
    imagen: producto.imagenUrl, 
    // Mapeo clave: Objeto categoria -> String nombre
    categoria: producto.categoria ? producto.categoria.nombre : 'General' 
  };
};

// --- FUNCIÓN PARA OBTENER TODOS LOS RELOJES ---
export const getRelojes = async (): Promise<RelojProps[]> => {
  try {
    const response = await fetch(API_URL, { 
      headers: ngrokHeaders // Enviamos el pase VIP
    });
    
    if (!response.ok) throw new Error('Error al cargar relojes');
    
    const data = await response.json();
    
    // Traducimos la lista completa
    return data.map(mapearReloj); 
    
  } catch (error) {
    console.error("Error fetching relojes:", error);
    return [];
  }
};

// --- FUNCIÓN PARA OBTENER UN RELOJ POR ID ---
export const getRelojById = async (id: number): Promise<RelojProps | undefined> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { 
      headers: ngrokHeaders // Enviamos el pase VIP
    });
    
    if (!response.ok) return undefined;
    
    const data = await response.json();
    
    // Traducimos el reloj individual
    return mapearReloj(data);

  } catch (error) {
    console.error(error);
    return undefined;
  }
 
};


// 1. ELIMINAR
export const deleteReloj = async (id: number): Promise<boolean> => {
  try {
    await fetch(`${API_URL}/${id}`, { 
        method: 'DELETE',
        headers: ngrokHeaders 
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// 2. CREAR O EDITAR (Guardar)
// Nota: Para simplificar, asumimos que el backend espera la categoría como objeto con ID
export const saveReloj = async (reloj: any): Promise<RelojProps | undefined> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST', // Usamos POST para crear y editar (si tu backend usa save())
      headers: ngrokHeaders,
      body: JSON.stringify(reloj),
    });

    if (!response.ok) throw new Error('Error al guardar');
    const data = await response.json();
    return mapearReloj(data); // Usamos tu adaptador para devolverlo bonito
  } catch (error) {
    console.error(error);
    return undefined;
  }
};