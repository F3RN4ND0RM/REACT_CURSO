import React, { useState, useEffect } from "react";
import axios from "axios";

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "" });
  const [editingProduct, setEditingProduct] = useState(null);

  const apiUrl = "http://localhost:8088/api-products/"; // Cambia esta URL por tu API.

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
      <h2>Productos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => setEditingProduct(product)}>Editar</button>
            <button onClick={() => deleteProduct(product.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      {/* Formulario para editar un producto */}
      {editingProduct && (
        <div>
          <h2>Editar Producto</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={editingProduct.name}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Descripción"
            value={editingProduct.description}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, description: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Precio"
            value={editingProduct.price}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, price: e.target.value })
            }
          />
          <button onClick={() => updateProduct(editingProduct.id)}>Actualizar</button>
        </div>
      )}
    </div>
  );
};

export default Productos;