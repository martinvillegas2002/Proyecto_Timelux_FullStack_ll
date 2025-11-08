// Importamos los componentes específicos de React-Bootstrap
import { Navbar, Nav, NavDropdown, Container, Form, Button } from 'react-bootstrap';

//  Importar useState
import { useState } from 'react'; 
import { useContext } from 'react';

//Los context 
import { CartContext } from '../context/CartProvider';
import { AuthContext } from '../context/AuthProvider';

import { NavLink } from 'react-router-dom';

//Definir las props que esperamos (la función del padre)
interface Props {
  onSearch: (query: string) => void;
}

export const NavBar = ({onSearch}: Props) => {

  //Estado interno para guardar el texto del input
  const [query, setQuery] = useState('');

  //Funcion que se ejecuta al presionar el boton
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previene que la página se recargue
    onSearch(query); // Llama a la función del padre con el texto actual
  }

  //  Obtener cartItems y el user del contexto
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

 //  Calcular el total de items
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="border-bottom border-secondary">
      <Container fluid>
        <Navbar.Brand href="/" className="text-white fw-bold">
          ⌚ Timelux
        </Navbar.Brand>
        {/* Navbar.Toggle es el botón "hamburguesa" que aparece en móvil */}
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">

          {/* Navegación principal */}
          <Nav className="me-auto">
            <Nav.Link href="/" active className="text-white">
              Inicio
            </Nav.Link>

            <Nav.Link href="/nosotros" active className="text-white">
              Nosotros
            </Nav.Link>
           
            <NavDropdown 
              title={<span className="text-white">Categorías</span>} 
              id="basic-nav-dropdown"
              menuVariant="dark" 
            >
              <NavDropdown.Item 
                onClick={() => onSearch('Análogo')} //Le mandamos MANUALMENTE el nombre de la categoria 
                className="text-white" 
              >
                Relojes Análogos</NavDropdown.Item>

              <NavDropdown.Item 
                onClick={() => onSearch('Digital') }
                className="text-white"
              >
                Relojes Digitales</NavDropdown.Item>

              <NavDropdown.Item 
                onClick={() => onSearch('Smartwatch')}
                className="text-white"
              >
                Smartwatches</NavDropdown.Item>

                {/* Agregamos un divisor y un botón para resetear */}
              <NavDropdown.Divider />
              <NavDropdown.Item 
                onClick={() => onSearch('')} // Llama con string vacío para mostrar todo
                className="text-white" // Un color diferente
              >
                Mostrar Todos
              </NavDropdown.Item>

            </NavDropdown>
           

          </Nav>

          {/* Formulario de búsqueda */}
          <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Buscar reloj..."
              className="me-2 bg-dark text-white border-secondary"
              aria-label="Search"
              value={query} // Controlado por el estado
              onChange={(e) => setQuery(e.target.value)} // Actualiza el estado
            />
            <Button 
              variant="outline-light"
              className="border-secondary text-white"
              type="submit" // El botón ahora envía el formulari
            >
              Buscar
            </Button>
          </Form>

          {/* Añadir el ícono del Carrito  */}
          <Nav>
            <Nav.Link as={NavLink} to="/carrito" className="text-white">
              🛒
              {/* Mostrar el contador solo si hay items */}
              {totalItems > 0 && (
                <span className="badge bg-primary ms-1">{totalItems}</span>
              )}
            </Nav.Link>
          </Nav>

              {/* Login */}
          <Nav className="ms-2">
            {user ? (
              // Si hay un usuario, mostrar su email y botón de logout
              <NavDropdown 
                title={<span className="text-warning">{user.email}</span>}
                id="user-nav-dropdown"
                menuVariant="dark"
              >
                <NavDropdown.Item onClick={logout}>
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              // Si no hay usuario, mostrar botón de login
              <Nav.Link as={NavLink} to="/login" className="text-white">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}