import React, {Fragment, useState, useEffect} from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
function EditarProducto (props) {
    //console.log(props);
    const {id} = props.match.params;
    const [producto, datosProductos] = useState({
        nombre: '',
        precio: '',
        imagen: ''
    });
    const [archivo, guardarArchivo] = useState('');

    const consultarApi = async() =>{
        const consultaDatos = await clienteAxios.get(`/productos/${id}`);
        //console.log(consultaDatos.data);
        datosProductos(consultaDatos.data);
    }

    useEffect(()=>{
        consultarApi()
    }, [])
    const leerProducto = e =>{
        datosProductos({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    //Coloca la imagen en el state
    const leerArchivo =  e =>{
        guardarArchivo(e.target.files[0]);
    }

    const editarProducto = async e =>{
        e.preventDefault();
        //Crear un formdata
        const formdata = new FormData();
        formdata.append('nombre', producto.nombre);
        formdata.append('precio', producto.precio);
        formdata.append('imagen', archivo);

        //Almacenar en la bd
        try {
            const res = await clienteAxios.put(`/productos/${id}`, formdata, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            });
                Swal.fire(
                    'Producto Editado',
                    'Producto Editado Correctamente',
                    'info'
                )
                console.log(res);
                props.history.push('/productos');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: error
            })
        }
    }
    const {nombre, precio, imagen} = producto;

    return (
        <Fragment>
        <h2>Editar Producto</h2>
        <form
            onSubmit={editarProducto}
        >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input  type="text" 
                            placeholder="Nombre Producto" 
                            name="nombre"
                            defaultValue={nombre}
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
                            defaultValue={precio}
                            onChange={leerProducto}
                    />
                </div>
                <div className="campo">
                    <label>Imagen:</label>
                    {imagen ? (
                        <img src={`http://localhost:5000/${imagen}`} alt={nombre} width="250" height="250"/>
                    ) : null}
                    </div>
                    <input  type="file"  
                            name="imagen"
                            onChange={leerArchivo}
                    />
                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Guardar Cambios"/>
                </div>
            </form>
        </Fragment>
        
    )
}
export default EditarProducto;