import React, {Fragment, useState, useEffect} from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';
function EditarCliente (props) {
    //Identificar el Id del parametro
    const {id} = props.match.params;

    const [cliente, datosCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    //Consulta a la api para obtener un cliente por su id
    const consultarApi = async () =>{
        const clientesConsulta = await clienteAxios.get(`/clientes/${id}`);
        //console.log(clientesConsulta.data);
        datosCliente(clientesConsulta.data);
    }
    useEffect( () => {
        consultarApi();
    },[])
    //Leer los datos del formulario
    const actualizarState = e =>{
        //Almacenar la informacion en el state
        datosCliente({
            ...cliente,
            [e.target.name] : e.target.value
        })
    }

    //Validar el Formulario
    const validarCliente = () =>{
        const {nombre, apellido, empresa, email, telefono} = cliente;
        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;
        return valido;
    }
    //Enviar la peticion por axios para actualizar
    const actualizarCliente = e =>{
        e.preventDefault();

        clienteAxios.put(`/clientes/${cliente._id}`, cliente)
            .then(res =>{
                if(res.data.code === 11000){
                    console.log('Error de Duplicación');
                    Swal.fire({
                        icon: 'error',
                        tittle: 'Hubo Un Error',
                        text: 'Ese Cliente Ya Esta Registrado'
                        }        
                    )
                }else{
                    //console.log(res.data);
                    Swal.fire(
                        'Correcto',
                        'Se Actualizo Correctamente el Cliente',
                        'success'
                    )
                    //Redireccionar
                    props.history.push('/');
                }
            })
    }
    return(
        <Fragment>
        <h2>Editar Cliente</h2>
        <form
            onSubmit={actualizarCliente}
        >
            <legend>Llena todos los campos</legend>

            <div className="campo">
                <label>Nombre:</label>
                <input  type="text" 
                        placeholder="Nombre Cliente" 
                        name="nombre"
                        onChange={actualizarState}
                        value={cliente.nombre}
                />
            </div>

            <div className="campo">
                <label>Apellido:</label>
                <input  type="text" 
                        placeholder="Apellido Cliente" 
                        name="apellido"                       
                        onChange={actualizarState}
                        value={cliente.apellido}
            />
            </div>
        
            <div className="campo">
                <label>Empresa:</label>
                <input  type="text" 
                        placeholder="Empresa Cliente" 
                        name="empresa"                        
                        onChange={actualizarState}
                        value={cliente.empresa}
            />
            </div>

            <div className="campo">
                <label>Email:</label>
                <input  type="email" 
                        placeholder="Email Cliente" 
                        name="email"                        
                        onChange={actualizarState}
                        value={cliente.email}
            />
            </div>

            <div className="campo">
                <label>Teléfono:</label>
                <input  type="text" 
                        placeholder="Teléfono Cliente" 
                        name="telefono"                       
                        onChange={actualizarState}
                        value={cliente.telefono}
            />
            </div>

            <div className="enviar">
                    <input  type="submit" 
                            className="btn btn-azul" 
                            value="Guardar Cambios"
                            disabled={validarCliente()}
            />
            </div>
        </form>
        </Fragment>
    )
}
export default withRouter(EditarCliente);