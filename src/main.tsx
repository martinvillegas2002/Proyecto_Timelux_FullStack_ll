import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; 

import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter'; //  enrutador

//  Importar el Provider y el Auth
import { CartProvider } from './context/CartProvider';
import { AuthProvider } from './context/AuthProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Envolver todo con el CartProvider y AuthProvider*/}
    <CartProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </BrowserRouter>
    </CartProvider>
  </StrictMode>,
)
