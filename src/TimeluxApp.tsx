
import { NavBar } from './components/NavBar';

//  hooks de React
import { useState, useEffect, useCallback } from 'react';

// Importamos nuestra "action" y nuestra "interface"
import { getRelojes } from './actions/relojes.actions';
import { RelojProps } from './interfaces/reloj.interfaces';


import { RelojList } from './components/RelojList';



export const TimeluxApp = () => {
  //    Hook useState: Creamos el "estado" para guardar los relojes

  //    Empezará como un array vacío.
  const [relojes, setRelojes] = useState<RelojProps[]>([]);

  //Estado de busqueda para la barra
  const [allRelojes, setAllRelojes] = useState<RelojProps[]>([]);

  //Estado de carga 
  const [isLoading, setIsLoading] = useState(true); 



  //    Hook useEffect: Se ejecuta cuando el componente se "monta"
  useEffect(() => {

    //  Definimos una función asíncrona interna para cargar los datos
    const cargarRelojes = async () => {
      try {
        const data = await getRelojes(); // Llama a nuestra API simulada
        setRelojes(data); // lista para mostrar
        setAllRelojes(data); //Lista maestra(backup)

      } catch (error) {
        console.error("Error al cargar los relojes:", error);
      } finally {
        setIsLoading(false) // Terminamos de cargar
      }
    };

    cargarRelojes(); // Ejecutamos la función de carga

  }, []); // El array vacío [] asegura que esto se ejecute SOLO UNA VEZ
  
//Funcion de busqueda --> la que le pasaremos al NavBar
  const handleSearch = useCallback((query: string) => {

    if (query.length === 0){
      setRelojes(allRelojes); //Si NO HAY BUSQUEDA mostrar todo
      return;
    }
    const queryLower = query.toLowerCase();
    const relojesFiltrados = allRelojes.filter(reloj => 
      reloj.nombre.toLowerCase().includes(queryLower) ||
      reloj.marca.toLowerCase().includes(queryLower) ||
      reloj.categoria.toLowerCase().includes(queryLower)
    );
    setRelojes(relojesFiltrados); //Mostrar solo los FILTRADOS
  }, [allRelojes]) //Depende de allRelojes



  return (
    //  contenedor principal con el fondo
    <div 
      className="container-fluid min-vh-100" 
      style={{
        // Imagen
        backgroundImage: 'url("/background.jpg")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // Para que el fondo no se mueva al scrollear
        backgroundRepeat: 'no-repeat'
      }}
    >      
      <div className="row">
        {/* Pasamos la función de busqueda como prop al NavBar */}
        <NavBar onSearch={handleSearch}/>

        {/* Titulo */}
        <div className='text-center mt-5'>
            <h1 className='text-white display-4' 
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
                    padding: '10px',
                    borderRadius: '10px'
                }}>
                Nuestros Relojes
            </h1>
        </div>

        <div className="row">
          {
            isLoading
              ? (
                <div className="text-center text-white">
                  <h2>Cargando relojes...</h2>
                  {/* Un "spinner" de carga de Bootstrap */}
                  <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )
              
              : <RelojList relojes={relojes} />
          }
        </div>
      </div>
    </div>
  )
}