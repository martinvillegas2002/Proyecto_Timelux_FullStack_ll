import { createContext, useState, ReactNode } from 'react';
import { CartItem } from '../interfaces/cart.interfaces';
import { RelojProps } from '../interfaces/reloj.interfaces';

// 1. Definir la forma del Contexto (qué datos y funciones expondrá)
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (reloj: RelojProps) => void;
  removeFromCart: (relojId: number) => void;
  clearCart: () => void;
}

// 2. Crear el Contexto (con un valor por defecto)
// La '!' es para decirle a TypeScript que confíe en nosotros, 
// ya que el valor real vendrá del Provider.
export const CartContext = createContext<CartContextType>(null!);

// 3. Definir las Props del Provider
interface Props {
  children: ReactNode; // 'children' es un tipo especial para componentes que envuelven a otros
}

// 4. Crear el Componente "Proveedor"
export const CartProvider = ({ children }: Props) => {

  // 5. Aquí vive el ESTADO GLOBAL del carrito
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // 6. Lógica para añadir al carrito
  const addToCart = (reloj: RelojProps) => {
    setCartItems(prevItems => {
      // Buscar si el reloj ya está en el carrito
      const existingItem = prevItems.find(item => item.id === reloj.id);

      if (existingItem) {
        // Si existe, actualizamos su cantidad (mapeamos el array)
        return prevItems.map(item =>
          item.id === reloj.id
            ? { ...item, quantity: item.quantity + 1 } // Nuevo objeto
            : item
        );
      } else {
        // Si no existe, lo agregamos al array
        return [...prevItems, { ...reloj, quantity: 1 }]; // Nuevo item
      }
    });
  };

  // 7. Lógica para eliminar del carrito
  const removeFromCart = (relojId: number) => {
    setCartItems(prevItems => {
      return prevItems.filter(item => item.id !== relojId);
    });
  };

  // 8. Lógica para vaciar el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // 9. Exponer el estado y las funciones a los componentes hijos
  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}