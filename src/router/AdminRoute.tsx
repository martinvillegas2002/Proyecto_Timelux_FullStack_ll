import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

interface Props {
  children: JSX.Element;
}

export const AdminRoute = ({ children }: Props) => {
  const { user } = useContext(AuthContext);

  // 1. Verificación: ¿Existe el usuario? (¿Está logueado?)
  if (!user) {
    // Si no hay nadie logueado, mándalo al Login
    return <Navigate to="/login" />;
  }

  // 2. Verificación: ¿Es el Administrador?
  // Usamos la misma lógica que en tu NavBar
  if (user.email !== 'admin@timelux.cl') {
    // Si está logueado pero es un cliente normal, mándalo al Home
    return <Navigate to="/" />;
  }

  // 3. Éxito: Si cumple todo, déjalo ver la página (renderiza el hijo)
  return children;
};