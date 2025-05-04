import { db } from "../database/firebaseConfig.js"; 

// Obtener todos los usuarios
export const getUsuariosFS = async (req, res) => {
  try {
    const usuariosRef = db.collection("Usuarios");
    const snapshot = await usuariosRef.get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "No hay usuarios." });
    }

    const usuarios = await Promise.all(snapshot.docs.map(async (doc) => {
      const usuarioData = doc.data();

      const mascotaRef = await db.collection("Mascotas").where("IdUsuario", "==", doc.id).get();
      const mascotas = mascotaRef.empty ? [] : mascotaRef.docs.map(mascota => mascota.data());

      return {
        id: doc.id,
        Nombre: usuarioData.Nombre,
        Email: usuarioData.Email,
        Celular: usuarioData.Celular,
        MascotaId: usuarioData.IdMascota,
        Mascotas: mascotas
      };
    }));

    return res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res.status(500).json({ message: "Error al obtener usuarios.", error });
  }
};

// Crear un nuevo usuario
export const createUsuarioFS = async (req, res) => {
  try {
    const { Nombre, Email, Celular, IdMascota } = req.body;

    if (!Nombre || !Email || !Celular || !IdMascota) {
      return res.status(400).json({ message: "Faltan datos en la solicitud." });
    }

    const usuarioData = {
      Nombre,
      Email,
      Celular,
      IdMascota: db.doc(IdMascota) // Referencia al documento de la mascota
    };

    const usuariosRef = db.collection("Usuarios");
    const newUsuario = await usuariosRef.add(usuarioData);

    res.status(201).json({ message: "Usuario creado", id: newUsuario.id, usuario: usuarioData });
  } catch (error) {
    console.error("Error creando el usuario:", error);
    res.status(500).json({ message: "Error creando el usuario", error });
  }
};

// Actualizar un usuario
export const updateUsuarioFS = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioData = req.body;

    const usuarioRef = db.collection("Usuarios").doc(id);
    const usuarioDoc = await usuarioRef.get();
    
    if (!usuarioDoc.exists) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await usuarioRef.update(usuarioData);

    res.status(200).json({ message: "Usuario actualizado", usuario: usuarioData });
  } catch (error) {
    console.error("Error actualizando el usuario:", error);
    res.status(500).json({ message: "Error actualizando el usuario", error });
  }
};

// Eliminar un usuario
export const deleteUsuarioFS = async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioRef = db.collection("Usuarios").doc(id);
    const usuarioDoc = await usuarioRef.get();

    if (!usuarioDoc.exists) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Eliminar la mascota asociada al usuario
    const mascotaRef = await db.collection("Mascotas").where("IdUsuario", "==", id).get();
    const batch = db.batch();

    mascotaRef.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    // Eliminar el usuario
    await usuarioRef.delete();

    res.status(200).json({ message: "Usuario y su mascota eliminados" });
  } catch (error) {
    console.error("Error eliminando el usuario:", error);
    res.status(500).json({ message: "Error eliminando el usuario", error });
  }
};
console.log("Obteniendo todos los usuarios...");
console.log("Creando un nuevo usuario...");
console.log("Actualizando un usuario...");
console.log("Eliminando un usuario...");