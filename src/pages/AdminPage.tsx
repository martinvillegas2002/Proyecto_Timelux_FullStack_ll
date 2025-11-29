import { useEffect, useState } from 'react';
import { NavBar } from '../components/NavBar';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { getRelojes, deleteReloj, saveReloj } from '../actions/relojes.actions';
import { RelojProps } from '../interfaces/reloj.interfaces';

export const AdminPage = () => {
  const [relojes, setRelojes] = useState<RelojProps[]>([]);
  const [showModal, setShowModal] = useState(false);
  
  // Estado del formulario (Incluye stock)
  const [formData, setFormData] = useState<any>({
    id: null, nombre: '', descripcion: '', precio: 0, stock: 0, imagenUrl: '', categoria: { id: 1 }
  });

  const cargar = async () => {
    const data = await getRelojes();
    setRelojes(data);
  };

  useEffect(() => { cargar(); }, []);

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar este reloj?')) {
      await deleteReloj(id);
      cargar();
    }
  };

  const handleOpen = (reloj?: RelojProps) => {
    if (reloj) {
      setFormData({ ...reloj });
    } else {
      setFormData({ id: null, nombre: '', descripcion: '', precio: 0, stock: 10, imagenUrl: '/classic-steel.jpg', categoria: { id: 1 } });
    }
    setShowModal(true);
  };

  const handleSave = async () => {
    await saveReloj(formData);
    setShowModal(false);
    cargar();
  };

  return (
    <div style={{ backgroundColor: '#212529', minHeight: '100vh' }}>
      <NavBar onSearch={() => {}} />
      <Container className="py-5 text-white">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Panel de Administración</h1>
          <Button variant="success" onClick={() => handleOpen()}>+ Nuevo Producto</Button>
        </div>

        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th> {/* Ya mostrábamos el stock aquí */}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {relojes.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.nombre}</td>
                <td>${r.precio}</td>
                <td>{r.stock}</td>
                <td>
                  <Button variant="info" size="sm" className="me-2" onClick={() => handleOpen(r)}>Editar</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(r.id)}>Borrar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{formData.id ? 'Editar Reloj' : 'Nuevo Reloj'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control as="textarea" value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})} />
              </Form.Group>

              <div className="row">
                <div className="col-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control type="number" value={formData.precio} onChange={e => setFormData({...formData, precio: parseInt(e.target.value)})} />
                  </Form.Group>
                </div>
                <div className="col-6">
                  {/* --- AQUÍ ESTÁ EL NUEVO CAMPO DE STOCK --- */}
                  <Form.Group className="mb-3">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})} />
                  </Form.Group>
                  {/* --------------------------------------- */}
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Imagen URL (ej: /foto.jpg)</Form.Label>
                <Form.Control type="text" value={formData.imagenUrl} onChange={e => setFormData({...formData, imagenUrl: e.target.value})} />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Select 
                    value={formData.categoria.id} 
                    onChange={e => setFormData({...formData, categoria: { id: parseInt(e.target.value) }})}
                >
                  <option value="1">Análogo</option>
                  <option value="2">Digital</option>
                  <option value="3">Smartwatch</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button variant="primary" onClick={handleSave}>Guardar Cambios</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};