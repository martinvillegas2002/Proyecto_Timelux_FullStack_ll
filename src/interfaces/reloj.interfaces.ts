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

