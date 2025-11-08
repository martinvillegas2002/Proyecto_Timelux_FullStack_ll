import { relojes } from '../data/mock-relojes';
import { RelojProps } from '../interfaces/reloj.interfaces';

/**
 * Simula una llamada API para obtener todos los relojes.
 * Tarda 500ms en "responder".
 */
export const getRelojes = async (): Promise<RelojProps[]> => {

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(relojes);
    }, 500); // Simulamos un retraso de 500ms
  });
};

/**
 * Simula una llamada API para obtener un solo reloj por su ID.
 * Tarda 500ms en "responder".
 */
export const getRelojById = async (id: number): Promise<RelojProps | undefined> => {

  return new Promise((resolve) => {
    setTimeout(() => {
      const reloj = relojes.find(r => r.id === id);
      resolve(reloj);
    }, 500);
  });
};

/*Explicación (para el profe): "Profe, siguiendo
la estructura del ejemplo, estoy creando mis actions 
en la carpeta src/actions. Estas funciones 
(getRelojes y getRelojById) simulan ser las llamadas a la API.
Ambas son asíncronas (usan async y Promise) para imitar el 
comportamiento del mundo real, donde una petición de red toma 
tiempo en responder. En lugar de un fetch real, simplemente 
importan los datos del mock y los devuelven después de medio 
segundo."*/