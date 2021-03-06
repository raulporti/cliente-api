import React, {Fragment, useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import {Link} from 'react-router-dom';
function NuevoProducto({history}) {
    const [producto, guardarProducto] = useState({
            nombre: '',
            precio: ''
    });

    const [archivo, guardarArchivo] = useState('');

    //Leer los datos del formulario
    const leerProducto = e =>{
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    //Coloca la imagen en el state
    const leerArchivo = e =>{
        guardarArchivo(e.target.files[0]);
    }

    //ingresa el nuevo producto
    const agregarProducto = async e =>{
        e.preventDefault();

        //Crear un formdata
        const formdata = new FormData();
        formdata.append('nombre', producto.nombre);
        formdata.append('precio', producto.precio);
        formdata.append('imagen', archivo);

        //Almacenar en la bd
        try {
            const res = await clienteAxios.post('/productos', formdata, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            });
                Swal.fire(
                    'Producto Ingresado',
                    res.data.mensaje,
                    'success'
                )
                history.push('/productos');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: error
            })
        }
    }

    const validarDatos = () =>{
        const {nombre, precio} = producto;
        const noValido = !nombre.length || precio == "" || archivo ==""
        return noValido
    }
    return(
        <Fragment>
        <h2> Nuevo Producto</h2>
        <form
            onSubmit={agregarProducto}
        >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input  type="text" 
                            placeholder="Nombre Producto" 
                            name="nombre"
                            onChange={leerProducto}
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input  type="number" 
                            name="precio" 
                            min="0.00" 
                            step="0.01" 
                            placeholder="Precio"
                            onChange={leerProducto}
                    />
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    <input  type="file"  
                            name="imagen"
                            onChange={leerArchivo}
                    />
                </div>

                <div className="enviar">
                        <input  type="submit" 
                                className="btn btn-azul" 
                                value="Agregar Producto"
                                disabled={validarDatos()}
                        />
                </div>
            </form>
        </Fragment>
    );
}

export default NuevoProducto;