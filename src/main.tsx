import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; 

import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter'; //  enrutador

//  Importar el Provider
import { CartProvider } from './context/CartProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Envolver todo con el CartProvider */}
    <CartProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </CartProvider>
  </StrictMode>,
)