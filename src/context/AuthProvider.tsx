import { createContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (nombre: string, email: string, password: string) => Promise<void>; // <--- NUEVO
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('email');
    if (storedToken && storedEmail) {
      setUser({ email: storedEmail, token: storedToken });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Error en la autenticación');

      const data = await response.json();
      const userData = { email, token: data.token };
      setUser(userData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', email);
      navigate('/'); 
    } catch (error) {
      console.error("Login fallido:", error);
      throw error;
    }
  };

  // --- NUEVA FUNCIÓN DE REGISTRO ---
  const register = async (nombre: string, email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password, rol: 'CLIENTE' }), // Enviamos rol por defecto
      });

      if (!response.ok) throw new Error('Error en el registro');

      // Si el registro es exitoso, redirigimos al login para que entre
      alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
      navigate('/login');
      
    } catch (error) {
      console.error("Registro fallido:", error);
      throw error;
    }
  };
  // --------------------------------

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};