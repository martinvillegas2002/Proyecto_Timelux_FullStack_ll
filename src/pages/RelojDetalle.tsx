import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RelojProps } from '../interfaces/reloj.interfaces';
import { getRelojById } from '../actions/relojes.actions';
import { Button } from 'react-bootstrap';


import { CartContext } from '../context/CartProvider';

// Helper para formatear el precio
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(value);
}

export const RelojDetalle = () => {
  // Hooks de React Router
  const { id } = useParams(); // 1. Obtiene el 'id' de la URL
  const navigate = useNavigate(); // 2. Para poder navegar (ej: botón "volver")

  // Hooks de React
  const [reloj, setReloj] = useState<RelojProps | null>(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useContext(CartContext);

  //  Hook para cargar el reloj específico
  useEffect(() => {
    if (id) {
      const numericId = parseInt(id, 10); // Convertir el ID de la URL (string) a número

      if (isNaN(numericId)) {
        // Si el ID no es un número, volver al inicio
        navigate('/');
        return;
      }

      const cargarReloj = async () => {
        try {
          const data = await getRelojById(numericId); // Llama a nuestra action
          if (data) {
            setReloj(data);
          } else {
            // Si el reloj no se encuentra, volver al inicio
            navigate('/');
          }
        } catch (error) {
          console.error("Error al cargar el reloj:", error);
          navigate('/');
        } finally {
          setLoading(false); // Termina la carga (con o sin error)
        }
      };

      cargarReloj();
    }
  }, [id, navigate]); // Depende de 'id' y 'navigate'

  //  Crear un handler para el botón
  const handleAddToCart = () => {
    if (reloj) { // Asegurarnos que el reloj está cargado
      addToCart(reloj);
      alert(`${reloj.nombre} ha sido añadido al carrito!`); // Feedback simple
    }
  }

  //  Mostrar "Cargando..." mientras el estado `loading` sea true
  if (loading) {
    return (
      <div className="container-fluid min-vh-100 text-center text-white d-flex justify-content-center align-items-center"
           style={{ backgroundColor: '#212529' }}>
        <div>
          <h2 className="text-primary">Cargando detalle del reloj...</h2>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  // 5. El JSX para mostrar el reloj
  return (
    <div className="container-fluid min-vh-100 py-5" 
         style={{ backgroundColor: '#212529' }}> {/* Fondo oscuro */}
      <div className="container text-white">

        {/* Botón para volver */}
        <Button variant="outline-primary" onClick={() => navigate('/')} className="mb-4">
          ← Volver al Catálogo
        </Button>

        <div className="row g-5">
          {/* Columna de la Imagen */}
          <div className="col-lg-6">
            <img 
              src={reloj?.imagen} 
              alt={reloj?.nombre} 
              className="img-fluid rounded shadow-lg w-100"
              style={{ maxHeight: '700px', objectFit: 'cover' }}
            />
          </div>

          {/* Columna de la Información */}
          <div className="col-lg-6">
            <h5 className="text-warning text-uppercase">{reloj?.marca}</h5>
            <h1 className="display-4 fw-bold">{reloj?.nombre}</h1>
            <p className="fs-5 text-muted">{reloj?.categoria}</p>

            <h2 className="text-primary fw-bold mt-4">{formatCurrency(reloj?.precio ?? 0)}</h2>

            <p className="fs-5 mt-4">
              {reloj?.descripcionLarga}
            </p>

            {/* 6. Asignar la nueva función al onClick */}
            <Button variant="primary" size="lg" className="mt-4 w-100" onClick={handleAddToCart}>
              Agregar al Carrito
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};


/*Explicación (para el profe): "Profe, este es el componente RelojDetalle,
 que funciona como una página completa.

1- Usa el hook useParams de React Router para leer el id que viene en la URL.

2- Usa el hook useNavigate para poder crear la función del botón "Volver".

3- Al igual que en la página principal, usa useState para guardar el reloj (reloj) y el estado de carga (loading).

4- Usa useEffect que depende del id. Cada vez que el id de la URL cambie, este hook se vuelve a ejecutar, llama a la action getRelojById con ese id, y actualiza el estado reloj con la información."*/