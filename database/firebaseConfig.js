// firebaseConfig.js
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import path from 'path';

dotenv.config();  // Si estás usando dotenv

// Usar la ruta a la clave como una cadena de texto desde el archivo .env
const serviceAccountPath = process.env.SECRET_FIREBASE_PATH;

// Lee el archivo JSON de la clave de Firebase
const serviceAccount = JSON.parse(readFileSync(path.resolve(serviceAccountPath), 'utf8'));

// Inicializa Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Exporta db usando la sintaxis de módulos ES
export { db };
