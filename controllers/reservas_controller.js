import { db } from "../database/firebaseConfig.js";

export const getReservasFS = async (req, res) => {
  try {
    const reservasRef = db.collection("Citas");
    const snapshot = await reservasRef.get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "No hay reservas." });
    }

    const reservas = await Promise.all(snapshot.docs.map(async (doc) => {
      const reservaData = doc.data();

      const usuarioDoc = await db.doc(reservaData.IdUsuario.path).get();
      const usuarioData = usuarioDoc.exists ? usuarioDoc.data() : null;

      const mascotaDoc = await db.doc(reservaData.IdMascota.path).get();
      const mascotaData = mascotaDoc.exists ? mascotaDoc.data() : null;

      const servicioDoc = await db.doc(reservaData.IdServicios.path).get();
      const servicioData = servicioDoc.exists ? servicioDoc.data() : null;

      return {
        id: doc.id,
        Fecha: reservaData.Fecha.toDate().toISOString(),
        Usuario: usuarioData,
        Mascota: mascotaData,
        Servicio: servicioData
      };
    }));

    return res.status(200).json(reservas);
  } catch (error) {
    console.error("Error al obtener reservas:", error);
    return res.status(500).json({ message: "Error al obtener reservas.", error });
  }
};

// Crear una nueva reserva en Firestore
export const createReservaFS = async (req, res) => {
  try {
    const { Fecha, IdUsuario, IdMascota, IdServicios } = req.body;

    if (!Fecha || !IdUsuario || !IdMascota || !IdServicios) {
      return res.status(400).json({ message: "Faltan datos en la solicitud." });
    }

    // Asegúrate de guardar las referencias correctamente
    const reservaData = {
      Fecha: new Date(Fecha),
      IdUsuario: db.doc(IdUsuario), // Referencia al documento de 'Usuario'
      IdMascota: db.doc(IdMascota), // Referencia al documento de 'Mascota'
      IdServicios: db.doc(IdServicios) // Referencia al documento de 'Servicio'
    };

    const reservasRef = db.collection("Citas");
    const newReserva = await reservasRef.add(reservaData);

    res.status(201).json({ message: "Reserva creada", id: newReserva.id, reserva: reservaData });
  } catch (error) {
    console.error("Error creando la reserva:", error);
    res.status(500).json({ message: "Error creando la reserva", error });
  }
};

// Actualizar una reserva en Firestore
export const updateReservaFS = async (req, res) => {
  try {
    const { id } = req.params;
    const reservaData = req.body;

    const reservaRef = db.collection("Citas").doc(id);
    const reservaDoc = await reservaRef.get();
    
    if (!reservaDoc.exists) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    await reservaRef.update(reservaData);

    res.status(200).json({ message: "Reserva actualizada", reserva: reservaData });
  } catch (error) {
    console.error("Error actualizando la reserva:", error);
    res.status(500).json({ message: "Error actualizando la reserva", error });
  }
};

// Eliminar una reserva en Firestore
export const deleteReservaFS = async (req, res) => {
  try {
    const { id } = req.params;

    const reservaRef = db.collection("Citas").doc(id);
    const reservaDoc = await reservaRef.get();

    if (!reservaDoc.exists) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    await reservaRef.delete();

    res.status(200).json({ message: "Reserva eliminada" });
  } catch (error) {
    console.error("Error eliminando la reserva:", error);
    res.status(500).json({ message: "Error eliminando la reserva", error });
  }
};
