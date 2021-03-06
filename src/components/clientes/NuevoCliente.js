import React, {Fragment, useState} from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';
function NuevoCliente({history}){

    const [cliente, guardarCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
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
        const {nombre, apellido, email, empresa, telefono} = cliente;

        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;
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
                        placeholder="Nombre Cliente" 
                        name="nombre"
                        onChange={actualizarState}
                />
            </div>

            <div className="campo">
                <label>Apellido:</label>
                <input  type="text" 
                        placeholder="Apellido Cliente" 
                        name="apellido"
                        onChange={actualizarState}
            />
            </div>
        
            <div className="campo">
                <label>Empresa:</label>
                <input  type="text" 
                        placeholder="Empresa Cliente" 
                        name="empresa"
                        onChange={actualizarState}
            />
            </div>

            <div className="campo">
                <label>Email:</label>
                <input  type="email" 
                        placeholder="Email Cliente" 
                        name="email"
                        onChange={actualizarState}
            />
            </div>

            <div className="campo">
                <label>Teléfono:</label>
                <input  type="text" 
                        placeholder="Teléfono Cliente" 
                        name="telefono"
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