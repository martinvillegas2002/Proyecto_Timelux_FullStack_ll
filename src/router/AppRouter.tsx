import { useRoutes } from "react-router-dom";
import { TimeluxApp } from "../TimeluxApp"; // Importamos nuestra página

//Pagina de detalles --> Le damos un id en la misma URL 
import { RelojDetalle } from "../pages/RelojDetalle";

import { NosotrosPage } from "../pages/NosotrosPage";

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


        {
            path: '*', // Ruta para "No encontrado"
            element: <div>Pagina no encontrada - 404</div>
        }
    ]);

    return routes;
}