// backend/routes/productos.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos');
    // vinculacion de los nombres de las columnas a los nombres de las propiedades del objeto
    const productos = result.rows.map(producto => ({
      id: producto.id,
      img: producto.imagen, 
      title: producto.titulo, 
      description: producto.descripcion,     
      price: producto.precio,           
      stock: producto.stock
                 
    }));
    res.json(productos);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los productos');
  }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).send('Producto no encontrado');
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send('Error al obtener el producto');
  }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const { descripcion, imagen, precio, stock, titulo } = req.body;
    const result = await pool.query(
      `INSERT INTO productos (descripcion, imagen, precio, stock, titulo) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [descripcion, imagen, precio, stock, titulo]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send('Error al crear el producto');
  }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion, imagen, precio, stock, titulo } = req.body;
    const result = await pool.query(
      `UPDATE productos 
       SET descripcion = $1, imagen = $2, precio = $3, stock = $4, titulo = $5 
       WHERE id = $6 RETURNING *`,
      [descripcion, imagen, precio, stock, titulo, id]
    );
    if (result.rows.length === 0) return res.status(404).send('Producto no encontrado');
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send('Error al actualizar el producto');
  }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).send('Producto no encontrado');
    res.send('Producto eliminado');
  } catch (err) {
    res.status(500).send('Error al eliminar el producto');
  }
});

module.exports = router;
