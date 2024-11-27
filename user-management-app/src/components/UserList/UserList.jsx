import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
const UserList = () => {
const [users, setUsers] = useState([]);

useEffect(() => {
// Llamar a la función para obtener la lista de usuarios
fetchUsers();
}, []);

const fetchUsers = async () => {
try {
const response = await fetch('https://66467b7651e227f23aaf0bf2.mockapi.io/user');
const data = await response.json();
setUsers(data);
} catch (error) {
console.error('Error en la solicitud:', error);
}
};

return (
    

    // Dentro de tu componente UserList o App
    <div>
      <h1>Lista de Usuarios</h1>
      <Link to="/create">Agregar Nuevo Usuario</Link> {/* Enlace para navegar a la creación */}
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
    
);
};

export default UserList;