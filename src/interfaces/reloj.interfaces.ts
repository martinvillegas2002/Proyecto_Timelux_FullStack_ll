export interface RelojProps {
  id: number;
  nombre: string;
  marca: string;
  descripcionCorta: string; // Para la tarjeta
  descripcionLarga: string; // Para la página de detalle
  precio: number;
  imagen: string; // URL de la imagen
  categoria: 'Análogo' | 'Digital' | 'Smartwatch'; // Solo permitimos estos valores
}

/*Esto es como un 'contrato' que le dice a mi aplicación 
qué campos y qué tipo de dato debe tener un objeto Reloj (como id numérico, nombre de tipo string, etc.). 
Esto es clave en TypeScript para autocompletar código y, lo más importante,
para prevenir errores al pasar datos entre componentes."*/