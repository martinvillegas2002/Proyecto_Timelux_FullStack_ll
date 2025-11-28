import { RelojProps } from '../interfaces/reloj.interfaces';

// ⚠️ IMPORTANTE: Cada vez que reinicies Ngrok, esta URL cambia.
// Copia la nueva URL de tu terminal negra (la que dice "Forwarding") y pégala aquí.
// Debe terminar en /api/products
const API_URL = 'https://phyllocladous-emory-disapprovingly.ngrok-free.dev/api/products'; 

// --- HEADERS PARA EVITAR LA PANTALLA DE ADVERTENCIA DE NGROK ---
const ngrokHeaders = {
  "ngrok-skip-browser-warning": "true",
  "Content-Type": "application/json"
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