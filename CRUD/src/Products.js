import React, {useEffect, useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Table,Button,Container,FormGroup,Modal,ModalHeader,ModalBody,ModalFooter,} from "reactstrap";

const url='http://localhost:8088/api-products/';
const [products, setProducts] = useState([]);
const [id, setId] = useState('');
const [name, setName] = useState('');
const [description, setDescription] = useState('');
const [price, setPrice] = useState('');

class Products extends React.Component {
     state = {
      data: data,
      modalActualizar: false,
      modalInsertar: false,
      form: {
       id: "",
       name: "",
       description: "",
       price:"",
      },
     };

     
     mostrarModalActualizar = (dato) => {
      this.setState({
       form: dato,
       modalActualizar: true,
      });
     };

     cerrarModalActualizar = () => {
      this.setState({ modalActualizar: false });
     };

     mostrarModalInsertar = () => {
      this.setState({
       modalInsertar: true,
      });
     };

     cerrarModalInsertar = () => {
      this.setState({ modalInsertar: false });
     };
    


    editar = (dato) => {
          var contador = 0;
          var arreglo = this.state.data;
          arreglo.map((registro) => {
           if (dato.id === registro.id) {
            arreglo[contador].name = dato.name;
            arreglo[contador].description = dato.description;
            arreglo[contador].price = dato.price;
           }
           contador++;
          });
          this.setState({ data: arreglo, modalActualizar: false });
    };

    eliminar = (dato) => {
          var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
          if (opcion === true) {
           var contador = 0;
           var arreglo = this.state.data;
           arreglo.map((registro) => {
            if (dato.id === registro.id) {
             arreglo.splice(contador, 1);
            }
            contador++;
           });
           this.setState({ data: arreglo, modalActualizar: false });
          }
    };

    insertar= ()=>{
          var valorNuevo= {...this.state.form};
          valorNuevo.id=this.state.data.length+1;
          var lista= this.state.data;
          lista.push(valorNuevo);
          this.setState({ modalInsertar: false, data: lista });
         }
         handleChange = (e) => {
          this.setState({
           form: {...this.state.form,
            [e.target.name]: e.target.value,
           },
          });
    };
    
  render() {
        
  return (
    <>
    <Container>
    <br />
     <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button>
     <br />
     <br />
     <Table>
      <thead>
       <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Descripcion</th>
        <th>Precio</th>
        <th>Acción</th>
       </tr>
      </thead>
      <tbody>
       {this.state.data.map((dato) => (
        <tr key={dato.id}>
         <td>{dato.id}</td>
         <td>{dato.name}</td>
         <td>{dato.description}</td>
         <td>{dato.price}</td>
         <td>
          <Button color="primary" onClick={() => this.mostrarModalActualizar(dato)} >Editar </Button>{" "}
          <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
         </td>
        </tr>
       ))}
      </tbody>
     </Table>
    </Container>

    <Modal isOpen={this.state.modalInsertar}>
     <ModalHeader>
     <div><h3>Insertar nombre</h3></div>
     </ModalHeader>
     <ModalBody>
      <FormGroup>
       <label>Id: </label>       
       <input className="form-control" readOnly type="text" value={this.state.data.length+1} />
      </FormGroup>      
      <FormGroup>
       <label>Nombre: </label>
       <input className="form-control" name="nombre" type="text" onChange={this.handleChange} />
      </FormGroup>

       <FormGroup>
       <label>Description: </label>
       <input className="form-control" name="puesto" type="text" onChange={this.handleChange} />
      </FormGroup>  

      <FormGroup>
       <label>Precio: </label>
       <input className="form-control" name="expertise" type="text" onChange={this.handleChange} />
      </FormGroup>
     </ModalBody>

     <ModalFooter>
      <Button color="primary" onClick={() => this.insertar()} >Insertar </Button>
      <Button className="btn btn-danger" onClick={() => this.cerrarModalInsertar()} >Cancelar</Button>
     </ModalFooter>
    </Modal>

    <Modal isOpen={this.state.modalActualizar}>
     <ModalHeader>
     <div><h3>Editar Registro</h3></div>
     </ModalHeader>
     <ModalBody>
      <FormGroup>
       <label> Id:</label>      
       <input className="form-control" readOnly type="text" value={this.state.form.id} />
      </FormGroup>      
      <FormGroup>
       <label>Nombre:</label>
       <input className="form-control" name="nombre" type="text" onChange={this.handleChange} value={this.state.form.name} />
      </FormGroup>
      <FormGroup>
       <label>Descripcion:</label>
       <input className="form-control" name="puesto" type="text" onChange={this.handleChange} value={this.state.form.description} />
      </FormGroup>  
      <FormGroup>
       <label>Precio:</label>
       <input className="form-control" name="expertise" type="text" onChange={this.handleChange} value={this.state.form.price} />
      </FormGroup> 
     </ModalBody>
     <ModalFooter>
      <Button color="primary" onClick={() => this.editar(this.state.form)} > Editar</Button>
      <Button color="danger" onClick={() => this.cerrarModalActualizar()} > Cancelar</Button>
     </ModalFooter>
    </Modal>

    </>
  )
}
}

export default Products
