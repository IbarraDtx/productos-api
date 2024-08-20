const express = require('express');
const Producto = require('../models/producto');
const router = express.Router();

//Crear producto
router.post('/', async (req, res) => {
    const producto = new Producto(req.body);
    try {
        const savedProducto = await producto.save();
        res.status(201).json(savedProducto);
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
});

//Obtener productos
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
});

//Obtener por clave valor
router.get('/:key/:value', async (req, res) => {
    const key = req.params.key;
    const value = req.params.value;

    try {
        const productos = await Producto.find({
            [key]: new RegExp(`^${value}$`, 'i') 
        });
        if (productos.length === 0) return res.status(404).json({ message: 'No se encontraron productos' });
        res.json(productos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Modificar producto por clave valor
router.put('/:key/:value', async (req, res) => {
    const key = req.params.key;
    const value = req.params.value;

    try {
        const producto = await Producto.findOneAndUpdate(
            { [key]: new RegExp(`^${value}$`, 'i') }, 
            req.body, 
            { new: true }
        );
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(producto);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Eliminar producto en especifico
router.delete('/:key/:value', async (req, res) => {
    const key = req.params.key;
    const value = req.params.value;

    try {
        const result = await Producto.deleteMany({ 
            [key]: new RegExp(`^${value}$`, 'i') 
        });
        if (result.deletedCount === 0) return res.status(404).json({ message: 'No se encontraron productos para eliminar' });
        res.json({ message: `${result.deletedCount} productos eliminados` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

