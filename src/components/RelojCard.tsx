import { Card, Button } from 'react-bootstrap'; // Usamos componentes de React-Bootstrap
import { RelojProps } from '../interfaces/reloj.interfaces';

import { useNavigate } from 'react-router-dom'; //Para navegar

// Definimos las Props que este componente espera recibir
interface Props {
  reloj: RelojProps;
}

// para formatear el precio 
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(value);
}

export const RelojCard = ({ reloj }: Props) => {

    //Funcion de navegacion 
    const navigate = useNavigate(); 

    //Funcion que maneja el click 
    const handleVerDetalle = () => {
        navigate(`/reloj/${reloj.id}`) //Navegar a la ruta dinamica (con  parametro)
    }


  return (
    // Columna responsiva de Bootstrap
    // Ocupará 12 columnas en móviles (sm), 6 en tablets (md) y 3 en desktop (lg)
    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
      <Card className="h-100 text-white" style={{ 
        backgroundColor: 'rgba(33, 37, 41, 0.7)', 
        backdropFilter: 'blur(10px)', 
        border: '1px solid rgba(255, 255, 255, 0.2)' 
      }}>
        <Card.Img 
          variant="top" 
          src={reloj.imagen} 
          style={{ height: '300px', objectFit: 'cover' }} // Estilo para que la imagen se vea bien
        />
        <Card.Body className="d-flex flex-column text-center">
          <Card.Title className="fw-bold">{reloj.nombre}</Card.Title>
          <Card.Text className="text-warning">{reloj.marca}</Card.Text>
          <Card.Text style={{ minHeight: '50px' }}>
            {reloj.descripcionCorta}
          </Card.Text>

          {/* Contenedor para alinear el precio y el botón al final */}
          <div className="mt-auto">
            <h4 className="text-white fw-bold">{formatCurrency(reloj.precio)}</h4>

        {/*Asignamos la funcion onClick que YA TIENE EL BOTON e integramos nuestra funcion*/}
            <Button variant="outline-light" onClick={handleVerDetalle}>
              Ver Detalles
            </Button>
            
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

