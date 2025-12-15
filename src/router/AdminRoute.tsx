import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

interface Props {
  children: JSX.Element;
}

export const AdminRoute = ({ children }: Props) => {
  const { user } = useContext(AuthContext);

  // 1. Si no hay usuario logueado, patada al Login
  if (!user) {
    return <Navigate to="/auth/login" />; // Ojo con la ruta, ajusta si es solo /login
  }

  // 2. Si el usuario existe pero NO es admin (Ajusta el correo si usas otro)
  if (user.email !== 'admin@timelux.cl' && user.email !== 'admin2@timelux.cl') {
    return <Navigate to="/" />;
  }

  // 3. Si pasó todo, muestra la página
  return children;
};