import { useRoutes } from "react-router-dom";
import { TimeluxApp } from "../TimeluxApp"; // Importamos nuestra página

//Pagina de detalles --> Le damos un id en la misma URL 
import { RelojDetalle } from "../pages/RelojDetalle";

import { NosotrosPage } from "../pages/NosotrosPage";

import { CarritoPage } from "../pages/CarritoPage";

import { LoginPage } from "../pages/LoginPage";

import { RegisterPage } from "../pages/RegisterPage";

import { AdminPage } from "../pages/AdminPage";

export const AppRouter = () => {
    const routes = useRoutes([
        {
            path: '/', // La ruta raíz
            element: <TimeluxApp />
        },

        {
            path:'/reloj/:id', //--> id como parametro 

            element: <RelojDetalle />
        },

        {
            path: '/nosotros', 
            element: <NosotrosPage />

        },
      
        {   path: '/carrito',
            element: <CarritoPage /> },

        {   path: '/login',
            element: <LoginPage /> },

        {
            path: '*', // Ruta para "No encontrado"
            element: <div>Pagina no encontrada - 404</div>
        },

        { 
            path: '/login',
            element: <LoginPage /> },

        { 
            path: '/register',
            element: <RegisterPage /> },

        { path: '/admin', element: <AdminPage /> }


    ]);

    return routes;
}