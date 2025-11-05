import { useContext } from 'react';
import { CartContext } from '../context/CartProvider';
import { NavBar } from '../components/NavBar';
import { Container, Row, Col, Image, Button, Table, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Helper para formatear el precio
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(value);
}

export const CarritoPage = () => {

  // 1. Consumimos TODO el contexto del carrito
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  // 2. Calculamos el total
  const totalGeneral = cartItems.reduce((total, item) => 
    total + (item.precio * item.quantity), 0
  );

  return (
    <div style={{ backgroundColor: '#212529', minHeight: '100vh' }}>

      {/* Le pasamos una prop "dummy" al NavBar */}
      <NavBar onSearch={() => {}} />

      <Container className="text-white py-5">
        <Row>
          <Col>
            <h1 className="display-4 fw-bold text-light mb-4">Tu Carrito</h1>

            {/* 3. Renderizado Condicional */}
            {cartItems.length === 0 ? (

              <Alert variant="info">
                Tu carrito está vacío. 
                <Link to="/" className="alert-link ms-2">Volver al catálogo</Link>
              </Alert>

            ) : (

              // 4. Si hay items, mostramos la tabla
              <>
                <Table striped bordered hover variant="dark" responsive>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Imagen</th>
                      <th>Precio Unit.</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map(item => (
                      <tr key={item.id}>
                        <td>{item.nombre}</td>
                        <td><Image src={item.imagen} alt={item.nombre} style={{ width: '50px' }} rounded /></td>
                        <td>{formatCurrency(item.precio)}</td>
                        <td>{item.quantity}</td>
                        <td>{formatCurrency(item.precio * item.quantity)}</td>
                        <td>
                          <Button 
                            variant="outline-warning" 
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                {/* 5. Totales y Acciones */}
                <Row className="mt-4 justify-content-end">
                  <Col md={4} className="text-end">
                    <h3 className="text-light">Total: {formatCurrency(totalGeneral)}</h3>
                    <Button variant="danger" onClick={clearCart} className="me-2">
                      Vaciar Carrito
                    </Button>
                    <Button variant="success">
                      Proceder al Pago
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}