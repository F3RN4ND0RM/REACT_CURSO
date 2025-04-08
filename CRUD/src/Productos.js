import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ nombre: "", descripcion: "", precio: "", existencia: "" });
  const [editingProduct, setEditingProduct] =  useState({ nombre: "", descripcion: "", precio: "", existencia: "" });

  const inputStyle = {
    width: '100%',
    padding: '0.75em',
    marginBottom: '1em',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1em',
  };

  const buttonStyle = (bgColor) => ({
    padding: '0.6em 1.2em',
    backgroundColor: bgColor,
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  });

  const apiUrl = "http://localhost:8080/products";

  const fetchProducts = async () => {
    try {
      const response = await axios.get(apiUrl);
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const createProduct = async () => {
    console.log(newProduct)
    if (!newProduct.nombre || !newProduct.precio || !newProduct.descripcion || !newProduct.existencia) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      await axios.post(apiUrl, {product:  newProduct});
      fetchProducts();
      setNewProduct({ nombre: "", description: "", precio: "", existencia: "" });
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  const updateProduct = async (id) => {
    try {
      await axios.put(`${apiUrl}/${id}`, {product : {editingProduct}});
      fetchProducts();
      setEditingProduct(null);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div style={{ padding: '2em' }}>
      <h2>Agregar nuevo producto</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={newProduct.nombre}
        onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })}
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={newProduct.descripcion}
        onChange={(e) => setNewProduct({ ...newProduct, descripcion: e.target.value })}
        style={inputStyle}
      />
      <input
        type="number"
        placeholder="Precio"
        value={newProduct.precio}
        onChange={(e) => setNewProduct({ ...newProduct, precio: e.target.value })}
        style={inputStyle}
      />
      <input
        type="number"
        placeholder="Stock"
        value={newProduct.existencia}
        onChange={(e) => setNewProduct({ ...newProduct, existencia: e.target.value })}
        style={inputStyle}
      />
      <button onClick={createProduct} style={buttonStyle('#2ecc71')}>
        Crear producto
      </button>

      <h2 style={{ marginTop: '2em' }}>Productos</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2em', justifyContent: 'center' }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '12px',
              padding: '1.5em',
              width: '250px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              backgroundColor: '#fff',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <p style={{ fontWeight: 'bold', fontSize: '1.2em', marginBottom: '0.5em' }}>{product.nombre}</p>
            <p style={{ color: '#555', marginBottom: '0.5em' }}>{product.descripcion}</p>
            <p style={{ fontWeight: 'bold', color: '#2c3e50', marginBottom: '0.5em' }}>${product.precio}</p>
            <p style={{ color: '#888', marginBottom: '1em' }}>Stock: {product.existencia}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={() => setEditingProduct(product)}
                style={buttonStyle('#3498db')}
              >
                Editar
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                style={buttonStyle('#e74c3c')}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingProduct && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '2em',
              borderRadius: '12px',
              width: '90%',
              maxWidth: '400px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              position: 'relative',
            }}
          >
            <h2 style={{ marginBottom: '1em' }}>Editar Producto</h2>
            <input
              type="text"
              placeholder="Nombre"
              value={editingProduct.nombre}
              onChange={(e) => setEditingProduct({ ...editingProduct, nombre: e.target.value })}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Descripción"
              value={editingProduct.descripcion}
              onChange={(e) => setEditingProduct({ ...editingProduct, descripcion: e.target.value })}
              style={inputStyle}
            />
            <input
              type="number"
              placeholder="Precio"
              value={editingProduct.precio}
              onChange={(e) => setEditingProduct({ ...editingProduct, precio: e.target.value })}
              style={inputStyle}
            />
            <input
              type="number"
              placeholder="Stock"
              value={editingProduct.existencia}
              onChange={(e) => setEditingProduct({ ...editingProduct, existencia: e.target.value })}
              style={inputStyle}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1em' }}>
              <button
                onClick={() => updateProduct(editingProduct.id)}
                style={buttonStyle('#27ae60')}
              >
                Actualizar
              </button>
              <button
                onClick={() => setEditingProduct(null)}
                style={buttonStyle('#e74c3c')}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productos;
