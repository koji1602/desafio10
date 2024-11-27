import React from 'react';
import { useParams, Link } from 'react-router-dom'; // Asegúrate de importar useParams y Link

const UserDetails = ({ users }) => {
  const { id } = useParams(); // Obtén la ID de la URL
  const user = users.find((user) => user.id === id); // Busca el usuario por su ID

  if (!user) {
    return <p>Usuario no encontrado.</p>; // Si no se encuentra el usuario, muestra un mensaje
  }

  return (
    <div>
      <h1>Detalles del Usuario</h1>
      <ul>
        <li><strong>Nombre:</strong> {user.name}</li>
        <li><strong>Email:</strong> {user.email}</li>
        <li><strong>Teléfono:</strong> {user.phone}</li> {/* Agrega otros detalles que quieras mostrar */}
      </ul>

      <Link to="/">Volver a la lista</Link>
      <Link to={`/edit/${user.id}`}>Editar</Link>
      <Link to={`/delete/${user.id}`}>Eliminar</Link>
    </div>
  );
};

export default UserDetails;