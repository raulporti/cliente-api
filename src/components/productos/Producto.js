import React, {Fragment} from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
function Producto({producto, consultarAPI}) {
    //console.log(producto)
    //Extraer datos de la repuesta 
    const {_id, nombre, precio, imagen} = producto;

    //Funcion para Eliminar Producto
    const eliminarProducto = (id, imagen) =>{
        Swal.fire({
            title: 'Estas Seguro De Eliminar Este Producto?',
            text: "Un Producto Eliminado no se puede recuperar!",
            imageUrl: `http://localhost:5000/${imagen}`,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                clienteAxios.delete(`/productos/${id}`)
                    .then(res =>{
                        Swal.fire(
                            'Eliminado!',
                            res.data.mensaje,
                            'success'
                        );
                        consultarAPI();
                    })  
        }
    })
    }
    return(
        <Fragment>
        <li className="producto">
                    <div className="info-producto">
                        <p className="nombre">{nombre}</p>
                        <p className="precio">${precio}</p>
                        {imagen ? (
                            <img src={`http://localhost:5000/${imagen}`} alt={nombre}/>
                        ) : null}
                    </div>
                    <div className="acciones">
                        <a href="#" className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Producto
                        </a>

                        <button type="button" 
                                className="btn btn-rojo btn-eliminar"
                                onClick={() => eliminarProducto(_id, imagen)}
                        >
                            <i className="fas fa-times"></i>
                            Eliminar Producto
                        </button>
                    </div>
                </li>
        </Fragment>
    );
}
export default Producto;