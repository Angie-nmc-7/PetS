import { Router } from 'express';
import {
  getReservasFS,
  createReservaFS,
  updateReservaFS,
  deleteReservaFS
} from '../controllers/reservas_controller.js';

const reservas_router = Router();

// Ruta para obtener todas las reservas
reservas_router.get('/', getReservasFS);

// Ruta para crear una nueva reserva
reservas_router.post('/create', createReservaFS);

// Ruta para actualizar una reserva existente
reservas_router.put('/update/:id', updateReservaFS);

// Ruta para eliminar una reserva existente
reservas_router.delete('/delete/:id', deleteReservaFS);

export default reservas_router;
