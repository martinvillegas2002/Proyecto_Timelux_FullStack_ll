import { NavBar } from '../components/NavBar'; // Reutilizamos el Navbar
import { Container, Row, Col, Image } from 'react-bootstrap';

export const NosotrosPage = () => {
  return (
    // Fondo oscuro para mantener la consistencia
    <div style={{ backgroundColor: '#212529', minHeight: '100vh' }}>

      {/* Pasamos una prop "dummy" (falsa) al NavBar.
        Como esta página no tiene lógica de búsqueda, le pasamos 
        una función de flecha vacía para que TypeScript no reclame.
      */}
      <NavBar onSearch={() => {}} />

      <Container className="text-secondary py-5">
        <Row className="align-items-center">
          <Col md={6}>
            <h1 className="display-4 fw-bold text-light mb-4">Sobre Timelux</h1>
            <p className="fs-5">
              En Timelux, nuestra pasión es el tiempo. Fundada en 2024, nuestra misión es 
              ofrecer una selección curada de los mejores relojes del mundo, combinando 
              artesanía tradicional con tecnología de vanguardia.
            </p>
            <p className="fs-5">
              Creemos que un reloj es más que un simple accesorio; es una declaración de 
              estilo, una pieza de ingeniería y un compañero para toda la vida. 
              Nuestro equipo de expertos selecciona cada pieza por su calidad, diseño y 
              fiabilidad.
            </p>
          </Col>
          <Col md={6}>
            <Image 
              src="taller.jpg" 
              alt="Taller de relojería" 
              fluid 
              rounded 
              className="shadow-lg"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}



