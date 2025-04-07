import React, { useState, useEffect } from "react";
import axios from "axios";
const bootstrap = require('bootstrap')

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "" });
  const [editingProduct, setEditingProduct] = useState(null);
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

  

  const apiUrl = "http://localhost:8080/products/"; // Cambia esta URL por tu API.

  // Leer productos (GET)
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

  // Crear producto (POST)
  const createProduct = async () => {
    try {
      await axios.post(apiUrl, newProduct);
      fetchProducts();
      setNewProduct({ name: "", description: "", price: "" });
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  // Actualizar producto (PUT)
  const updateProduct = async (id) => {
    try {
      await axios.put(`${apiUrl}/${id}`, editingProduct);
      fetchProducts();
      setEditingProduct(null);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  // Eliminar producto (DELETE)
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div>
      <h1>CRUD de Productos</h1>

      {/* Formulario para crear un nuevo producto */}
      <h2>Crear Producto</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={newProduct.description}
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Precio"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
      />
      <button onClick={createProduct}>Crear</button>

      {/* Listado de productos */}
      <h2>Productos</h2>7
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
      <p style={{ color: '#888', marginBottom: '1em' }}>Existencia: {product.existencia}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={() => setEditingProduct(product)}
          style={{
            padding: '0.5em 1em',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Editar
        </button>
        <button
          onClick={() => deleteProduct(product.id)}
          style={{
            padding: '0.5em 1em',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  ))}
</div>


      {/* Formulario para editar un producto */}
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
        value={editingProduct.name}
        onChange={(e) =>
          setEditingProduct({ ...editingProduct, name: e.target.value })
        }
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={editingProduct.description}
        onChange={(e) =>
          setEditingProduct({ ...editingProduct, description: e.target.value })
        }
        style={inputStyle}
      />
      <input
        type="number"
        placeholder="Precio"
        value={editingProduct.price}
        onChange={(e) =>
          setEditingProduct({ ...editingProduct, price: e.target.value })
        }
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