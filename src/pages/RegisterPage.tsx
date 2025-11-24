import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { NavBar } from '../components/NavBar';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (nombre.trim() === '' || email.trim() === '' || password.trim() === '') {
        setError('Todos los campos son obligatorios');
        return;
    }

    try {
      await register(nombre, email, password);
    } catch (err) {
      setError('Error al registrar. El correo podría estar en uso.');
    }
  };

  return (
    <div style={{ backgroundColor: '#212529', minHeight: '100vh' }}>
      <NavBar onSearch={() => {}} />
      <Container className="d-flex justify-content-center align-items-center" style={{ paddingTop: '50px' }}>
        <Card bg="dark" text="white" style={{ width: '24rem', border: '1px solid rgba(255,255,255,0.1)' }}>
          <Card.Body>
            <Card.Title className="text-center fs-3 mb-4">Crear Cuenta</Card.Title>
            
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre Completo</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Tu nombre" 
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="bg-secondary text-white border-0"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="nombre@ejemplo.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-secondary text-white border-0"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Crea una contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-secondary text-white border-0"
                />
              </Form.Group>

              <Button variant="success" type="submit" className="w-100 fw-bold">
                Registrarse
              </Button>
            </Form>
            
            <div className="text-center mt-3">
                <small>¿Ya tienes cuenta? <Link to="/login" className="text-info">Inicia sesión aquí</Link></small>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};