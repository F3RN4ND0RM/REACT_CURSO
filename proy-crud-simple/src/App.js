import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Container, FormGroup, Modal } from "react-bootstrap";

class AppApi extends Component {
  data = [
    { id: 1, nombre: "Firulais", dueño: "Juan", raza: "Labrador", edad: 3, color: "Marrón", altura: "60 cm", croquetasFavoritas: "Pedigree" },
    { id: 2, nombre: "Max", dueño: "Maria", raza: "Poodle", edad: 5, color: "Blanco", altura: "40 cm", croquetasFavoritas: "Royal Canin" },
    { id: 3, nombre: "Luna", dueño: "Carlos", raza: "Husky", edad: 2, color: "Gris", altura: "55 cm", croquetasFavoritas: "Dog Chow" }
  ];

  state = {
    data: this.data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      nombre: "",
      dueño: "",
      raza: "",
      edad: "",
      color: "",
      altura: "",
      croquetasFavoritas: "",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({ form: dato, modalActualizar: true });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({ modalInsertar: true, form: { id: this.state.data.length + 1, nombre: "", dueño: "", raza: "", edad: "", color: "", altura: "", croquetasFavoritas: "" } });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = () => {
    const { form, data } = this.state;
    const updatedData = data.map((item) => (item.id === form.id ? form : item));
    this.setState({ data: updatedData, modalActualizar: false });
  };

  eliminar = (dato) => {
    if (window.confirm(`¿Estás seguro que deseas eliminar a ${dato.nombre}?`)) {
      this.setState({ data: this.state.data.filter((item) => item.id !== dato.id) });
    }
  };

  insertar = () => {
    this.setState({ data: [...this.state.data, this.state.form], modalInsertar: false });
  };

  handleChange = (e) => {
    this.setState({ form: { ...this.state.form, [e.target.name]: e.target.value } });
  };

  render() {
    return (
      <Container>
        <br />
        <Button variant="success" onClick={this.mostrarModalInsertar}>Agregar Perro</Button>
        <br /><br />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Dueño</th>
              <th>Raza</th>
              <th>Edad</th>
              <th>Color</th>
              <th>Altura</th>
              <th>Croquetas Favoritas</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((dato) => (
              <tr key={dato.id}>
                <td>{dato.id}</td>
                <td>{dato.nombre}</td>
                <td>{dato.dueño}</td>
                <td>{dato.raza}</td>
                <td>{dato.edad}</td>
                <td>{dato.color}</td>
                <td>{dato.altura}</td>
                <td>{dato.croquetasFavoritas}</td>
                <td>
                  <Button variant="primary" onClick={() => this.mostrarModalActualizar(dato)}>Editar</Button>{" "}
                  <Button variant="danger" onClick={() => this.eliminar(dato)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Insert Modal */}
        <Modal show={this.state.modalInsertar} onHide={this.cerrarModalInsertar}>
          <Modal.Header closeButton><Modal.Title>Agregar Perro</Modal.Title></Modal.Header>
          <Modal.Body>
            {Object.keys(this.state.form).map((key) => (
              key !== "id" && (
                <FormGroup key={key}>
                  <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                  <input className="form-control" name={key} type="text" onChange={this.handleChange} />
                </FormGroup>
              )
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.insertar}>Agregar</Button>
            <Button variant="danger" onClick={this.cerrarModalInsertar}>Cancelar</Button>
          </Modal.Footer>
        </Modal>

        {/* Update Modal */}
        <Modal show={this.state.modalActualizar} onHide={this.cerrarModalActualizar}>
          <Modal.Header closeButton><Modal.Title>Editar Perro</Modal.Title></Modal.Header>
          <Modal.Body>
            {Object.keys(this.state.form).map((key) => (
              key !== "id" && (
                <FormGroup key={key}>
                  <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                  <input className="form-control" name={key} type="text" value={this.state.form[key]} onChange={this.handleChange} />
                </FormGroup>
              )
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.editar}>Guardar</Button>
            <Button variant="danger" onClick={this.cerrarModalActualizar}>Cancelar</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

export default AppApi;
