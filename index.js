const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('No se pudo conectar a MongoDB', err));

const productosRoutes = require('./routes/productos');
app.use('/API/productos', productosRoutes);

const PORT = process.env.PORT || 3000;
const LOCAL_IP = '0.0.0.0';
app.listen(PORT, LOCAL_IP, () => console.log(`Servidor corriendo en http://${LOCAL_IP}:${PORT}`));