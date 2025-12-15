import { RelojProps } from '../interfaces/reloj.interfaces';

// 1. CONFIGURACIÓN
// Asegúrate de usar tu URL actual (Localhost o Ngrok)
const API_URL = 'http://localhost:8080/api/products'; 

// 2. HEADERS PÚBLICOS (Para ver el catálogo)
// Solo dicen "Te envío JSON"
const publicHeaders = {
  "Content-Type": "application/json"
};

// 3. HEADERS PRIVADOS (Para Admin)
// Dicen "Te envío JSON" Y ADEMÁS "Aquí está mi Token"
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    // Si existe el token, agrega la línea 'Authorization: Bearer ...'
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Función auxiliar para mapear los datos que vienen del servidor
const mapearReloj = (producto: any): RelojProps => {
  return {
    id: producto.id,
    nombre: producto.nombre,
    marca: "Timelux", 
    descripcionCorta: producto.descripcion,
    descripcionLarga: producto.descripcion,
    precio: producto.precio,
    imagen: producto.imagenUrl, 
    // Usamos un operador ternario para evitar errores si viene null
    categoria: producto.categoria ? producto.categoria.nombre : 'General' 
  };
};

// ==========================================
// ACCIONES (Peticiones al Servidor)
// ==========================================

// 1. GET (Público - Usa publicHeaders)
export const getRelojes = async (): Promise<RelojProps[]> => {
  try {
    const response = await fetch(API_URL, { headers: publicHeaders });
    if (!response.ok) throw new Error('Error al cargar relojes');
    const data = await response.json();
    return data.map(mapearReloj); 
  } catch (error) {
    console.error("Error fetching relojes:", error);
    return [];
  }
};

// 2. GET BY ID (Público - Usa publicHeaders)
export const getRelojById = async (id: number): Promise<RelojProps | undefined> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { headers: publicHeaders });
    if (!response.ok) return undefined;
    const data = await response.json();
    return mapearReloj(data);
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

// 3. DELETE (Privado - Usa getAuthHeaders con TOKEN)
export const deleteReloj = async (id: number): Promise<boolean> => {
  try {
    await fetch(`${API_URL}/${id}`, { 
        method: 'DELETE',
        headers: getAuthHeaders() // <--- AQUÍ VA LA MAGIA
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// 4. POST (Privado - Usa getAuthHeaders con TOKEN)
export const saveReloj = async (reloj: any): Promise<RelojProps | undefined> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: getAuthHeaders(), // <--- AQUÍ TAMBIÉN
      body: JSON.stringify(reloj),
    });

    if (!response.ok) throw new Error('Error al guardar');
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error(error);
    return undefined;
  }
};