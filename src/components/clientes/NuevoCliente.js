import React, {Fragment, useState} from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';
function NuevoCliente({history}){

    const [cliente, guardarCliente] = useState({
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
    //Leer los datos del formulario
    const actualizarState = e =>{
        //Almacenar la informacion en el state
        guardarCliente({
            ...cliente,
            [e.target.name] : e.target.value
        })
    }
    //Añade en la rest api un client nuevo
    const agregarCliente = e =>{
        e.preventDefault();
        //Enviar Peticion
        clienteAxios.post('/clientes',cliente)
            .then(res => {
                //Validar si hay errores de mongo
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
                        'Se Agrego El Cliente',
                        res.data.mensaje,
                        'success'
                    )
                    history.push('/');
                }
                
            });
    }
    //Validar Formulario
    const validarCliente = () =>{
        const {cli_nombre1, cli_nombre2, cli_apellido1, cli_apellido2, cli_apellido_casada,
            cli_direccion, cli_telefono1, cli_telefono2, cli_identificacion, cli_fecha} = cliente;

        let valido = !cli_nombre1.length || !cli_apellido1.length || !cli_direccion.length || !cli_identificacion.length || !cli_fecha.length;
        return valido;
    }
    return(
        <Fragment>
        <h2>Nuevo Cliente</h2>
        <form
            onSubmit={agregarCliente}
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
                            value="Agregar Cliente"
                            disabled={validarCliente()}
            />
            </div>
        </form>
        </Fragment>
    );
}
//High Order Component, es una funcion que toma un componente y retorna un nuevo componente
export default withRouter(NuevoCliente);