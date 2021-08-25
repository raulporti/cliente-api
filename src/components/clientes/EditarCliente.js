import React, {Fragment, useState, useEffect} from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';
function EditarCliente (props) {
    //Identificar el Id del parametro
    const {id} = props.match.params;

    const [cliente, datosCliente] = useState({
        cli_codigo_cliente: '',
        cli_nombre1: '',
        cli_nombre2: '',
        cli_apellido1: '',
        cli_apellido2: '',
        cli_apellido_casada: '',
        cli_direccion: '',
        cli_telefono1: '',
        cli_telefono2: '',
        cli_identificacion: '',
        cli_fecha: ''
    });

    //Consulta a la api para obtener un cliente por su id
    const consultarApi = async () =>{
        const clientesConsulta = await clienteAxios.get(`/clientes/${id}`);
        //console.log(clientesConsulta.data);
        datosCliente(clientesConsulta.data.data);
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
    /*const validarCliente = () =>{
        const {cli_nombre1, cli_nombre2, cli_apellido1, cli_apellido2, cli_apellido_casada,
            cli_direccion, cli_telefono1, cli_telefono2, cli_identificacion, cli_fecha} = cliente;

        let valido = !cli_nombre1.length || !cli_apellido1.length || !cli_direccion.length || !cli_identificacion.length || !cli_fecha.length;
        return valido;
    }*/
    //Enviar la peticion por axios para actualizar
    const actualizarCliente = e =>{
        e.preventDefault();

        clienteAxios.put(`/clientes/${cliente.cli_codigo_cliente}`, cliente)
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
                        placeholder="Primer Nombre" 
                        name="cli_nombre1"
                        onChange={actualizarState}
                        
                />
                <label>Nombre:</label>
                <input  type="text" 
                        placeholder="Segundo nombre" 
                        name="cli_nombre2"
                        onChange={actualizarState}
                />
            </div>

            <div className="campo">
                <label>Apellido:</label>
                <input  type="text" 
                        placeholder="Primer Apellido" 
                        name="cli_apellido1"
                        onChange={actualizarState}
            />
            <input  type="text" 
                        placeholder="Segundo Apellido" 
                        name="cli_apellido2"
                        onChange={actualizarState}
            />
            <input  type="text" 
                        placeholder="Apellido Casada" 
                        name="cli_apellido_casada"
                        onChange={actualizarState}
            />
            </div>
        
            <div className="campo">
                <label>Direccion:</label>
                <input  type="text" 
                        placeholder="Direccion" 
                        name="cli_direccion"
                        onChange={actualizarState}
            />
            </div>

            <div className="campo">
                <label>Telefono 1:</label>
                <input  type="text" 
                        placeholder="Telefono 1" 
                        name="cli_telefono1"
                        onChange={actualizarState}
            />
            <label>Telefono 2:</label>
                <input  type="text" 
                        placeholder="Telefono 2" 
                        name="cli_telefono2"
                        onChange={actualizarState}
            />
            </div>

            <div className="campo">
                <label>Identificacion:</label>
                <input  type="text" 
                        placeholder="Identificacion" 
                        name="cli_identificacion"
                        onChange={actualizarState}
            />
            </div>
            <div className="campo">
                <label>Fecha:</label>
                <input  type="date" 
                        placeholder="Fecha" 
                        name="cli_fecha"
                        onChange={actualizarState}
            />
            </div>


            <div className="enviar">
                    <input  type="submit" 
                            className="btn btn-azul" 
                            value="Guardar Cambios"
                            //disabled={validarCliente()}
            />
            </div>
        </form>
        </Fragment>
    )
}
export default withRouter(EditarCliente);