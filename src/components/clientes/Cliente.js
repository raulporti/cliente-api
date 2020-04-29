import React from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
function Cliente({cliente, consultarApi}) {
    const {_id, nombre, apellido, empresa, telefono, email} = cliente;

    const eliminarCliente = id =>{
        Swal.fire({
            title: 'Estas Seguro?',
            text: "Un Cliente Eliminado no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                clienteAxios.delete(`/clientes/${id}`)
                    .then(res =>{
                        Swal.fire(
                            'Eliminado!',
                            res.data.mensaje,
                            'success'
                        );
                        consultarApi();
                    })  
        }
    })
}
    return(
        <li className="cliente">
                    <div className="info-cliente">
                        <p className="nombre">{nombre+" "+ apellido}</p>
                        <p className="empresa">{empresa}</p>
                        <p>Correo: {email}</p>
                        <p>Tel: {telefono}</p>
                    </div>
                    <div className="acciones">
                        <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Cliente
                        </Link>
                        <button type="button" 
                                className="btn btn-rojo btn-eliminar" 
                                onClick={()=>eliminarCliente(_id)}
                        >
                            <i className="fas fa-times"></i>
                            Eliminar Cliente
                        </button>
                    </div>
                </li>
    );
}
export default Cliente;