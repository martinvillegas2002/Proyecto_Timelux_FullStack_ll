import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { NavBar } from '../components/NavBar';

export const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() !== '') {
      login(email);
    }
  };

  return (
    <div style={{ backgroundColor: '#212529', minHeight: '100vh' }}>
      <NavBar onSearch={() => {}} />
      <Container className="d-flex justify-content-center align-items-center" style={{ paddingTop: '100px' }}>
        <Card bg="dark" text="white" style={{ width: '24rem' }}>
          <Card.Body>
            <Card.Title className="text-center fs-3 mb-4">Iniciar Sesión</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Ingresa tu correo" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Contraseña"  required />
                <Form.Text className="text-muted">
                  (Cualquier contraseña es válida para esta demo).
                </Form.Text>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Ingresar
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};