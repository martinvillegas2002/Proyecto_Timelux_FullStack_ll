import { createContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

//  Definimos la forma del usuario y del contexto
interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}

//  Creamos el Contexto con un valor por defecto seguro
export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

interface Props {
  children: ReactNode;
}

//  Creamos el componente Proveedor
export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  //  Lógica de Login (simulada)
  const login = (email: string) => {
    // En una app real, aquí harías una llamada a la API
    // y verificarías la contraseña.
    const newUser = { email };
    setUser(newUser);
    navigate('/'); // Redirigir al inicio después del login
  };

  //  Lógica de Logout
  const logout = () => {
    setUser(null);
    navigate('/login'); // Redirigir al login después del logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};