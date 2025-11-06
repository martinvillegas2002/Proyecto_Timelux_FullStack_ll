import { RelojProps } from '../interfaces/reloj.interfaces';

// Exportamos un array de objetos RelojProps
export const relojes: RelojProps[] = [
  {
    id: 1,
    nombre: 'Classic Steel',
    marca: 'Timex',
    descripcionCorta: 'Reloj análogo clásico con correa de acero inoxidable.',
    descripcionLarga: 'Un diseño atemporal que combina elegancia y durabilidad. Perfecto para cualquier ocasión, desde la oficina hasta un evento formal. Resistente al agua 30m.',
    precio: 149990,
    imagen: '/classic-steel.jpg',
    categoria: 'Análogo'
  },
  {
    id: 2,
    nombre: 'Future Fit',
    marca: 'TechWear',
    descripcionCorta: 'Smartwatch con monitor de ritmo cardíaco y GPS.',
    descripcionLarga: 'Tu compañero ideal para el deporte y el día a día. Mide tus pasos, calorías, sueño y recibe notificaciones de tu celular. Batería de larga duración.',
    precio: 299990,
    imagen: '/future-fit.jpg',
    categoria: 'Smartwatch'
  },
  {
    id: 3,
    nombre: 'Retro Digital',
    marca: 'Casio',
    descripcionCorta: 'El icónico reloj digital de los 80 con cronómetro.',
    descripcionLarga: 'Vuelve a lo básico con este reloj digital confiable. Incluye luz de fondo, alarma diaria, cronómetro y calendario automático. Un clásico que nunca falla.',
    precio: 89990,
    imagen: '/retro-digital.jpg',
    categoria: 'Digital'
  },
  {
    id: 4,
    nombre: 'Executive Gold',
    marca: 'Rolex',
    descripcionCorta: 'Lujo y precisión en un reloj análogo dorado.',
    descripcionLarga: 'Fabricado con los más altos estándares suizos. Movimiento automático, cristal de zafiro y un acabado en oro de 18k que denota pura elegancia.',
    precio: 1499990,
    imagen: '/executive-gold.jpg',
    categoria: 'Análogo'
  }
];

/*"Profe, como aún no tenemos una API real,
creé un archivo de 'mock data' (datos de muestra) en la carpeta src/data. Este archivo es simplemente un array de JavaScript que exporta una lista de relojes.
Lo importante es que le digo a TypeScript que este array es de tipo RelojProps[] (un array de relojes), así se asegura de que todos mis datos de prueba cumplan con la interfaz que definí."*/