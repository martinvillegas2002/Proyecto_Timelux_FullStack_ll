import { RelojProps } from "./reloj.interfaces";

// Un item del carrito es un Reloj + una cantidad
export interface CartItem extends RelojProps {
  quantity: number;
}