import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList/UserList'; // Lista de usuarios
import UserDetails from './components/UserDetails'; // Detalles de usuario
import UserForm from './components/UserForm/UserForm'; // Formulario de creación
import UserEdit from './components/UserEdit'; // Edición de usuario
import UserDelete from './components/UserDelete'; // Eliminación de usuario

const App = () => {
  const [users, setUsers] = useState([]);

  // Función para obtener usuarios desde la API
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://66467b7651e227f23aaf0bf2.mockapi.io/user');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  // Llamar a fetchUsers cuando el componente se monta
  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para agregar un nuevo usuario
  const addUser = async (newUser) => {
    try {
      const response = await fetch('https://66467b7651e227f23aaf0bf2.mockapi.io/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const data = await response.json();
        setUsers([...users, data]);
      } else {
        console.error('Error al agregar usuario');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  // Función para editar un usuario
  const editUser = async (id, updatedUser) => {
    try {
      const response = await fetch(`https://66467b7651e227f23aaf0bf2.mockapi.io/user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(users.map(user => (user.id === id ? data : user)));
      } else {
        console.error('Error al editar usuario');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  // Función para eliminar un usuario
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`https://66467b7651e227f23aaf0bf2.mockapi.io/user/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers(users.filter(user => user.id !== id));
      } else {
        console.error('Error al eliminar usuario');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <Router>
      <Routes>
        {/* Ruta para listar usuarios */}
        <Route path="/" element={<UserList users={users} />} />

        {/* Ruta para ver los detalles de un usuario */}
        <Route path="/users/:id" element={<UserDetails users={users} />} />

        {/* Ruta para crear un nuevo usuario */}
        <Route path="/create" element={<UserForm addUser={addUser} />} />

        {/* Ruta para editar un usuario */}
        <Route path="/edit/:id" element={<UserEdit users={users} editUser={editUser} />} />

        {/* Ruta para eliminar un usuario */}
        <Route path="/delete/:id" element={<UserDelete deleteUser={deleteUser} />} />
      </Routes>
    </Router>
  );
};





export default App;