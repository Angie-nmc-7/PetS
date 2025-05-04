
// Función para obtener todos los usuarios
export const getUsuarios = async () => {
    try {
      const response = await fetch('/api/usuarios'); // Ruta de tu API en el backend
      const data = await response.json(); // Datos recibidos desde el backend
  
      if (response.ok) {
        return data; // Devuelves los usuarios obtenidos
      } else {
        console.error('Error al obtener usuarios:', data.message);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

// Función para crear un nuevo usuario
export const createUsuario = async (nombre, email, celular) => {
    try {
      const response = await fetch('/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Asegúrate de enviar JSON
        },
        body: JSON.stringify({ Nombre: nombre, Email: email, Celular: celular }),
      });
      
      const data = await response.json(); // Respuesta del backend
      
      if (response.ok) {
        console.log('Usuario creado:', data);
        return data; // Devuelves el usuario creado
      } else {
        console.error('Error al crear usuario:', data.message);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

// Función para actualizar un usuario
export const updateUsuario = async (id, nombre, email, celular) => {
    try {
      const response = await fetch(`/api/usuarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // Asegúrate de enviar JSON
        },
        body: JSON.stringify({ Nombre: nombre, Email: email, Celular: celular }),
      });
      
      const data = await response.json(); // Respuesta del backend
      
      if (response.ok) {
        console.log('Usuario actualizado:', data);
        return data; // Devuelves el usuario actualizado
      } else {
        console.error('Error al actualizar usuario:', data.message);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };
  // servicios.js

// Función para eliminar un usuario
export const deleteUsuario = async (id) => {
    try {
      const response = await fetch(`/api/usuarios/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json(); // Respuesta del backend
      
      if (response.ok) {
        console.log('Usuario eliminado:', data);
        return data; // Devuelves el mensaje de eliminación
      } else {
        console.error('Error al eliminar usuario:', data.message);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };
  
      