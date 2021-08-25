import React from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
function Cliente({cliente, consultarApi}) {
    const {cli_codigo_cliente, cli_nombre1, cli_nombre2, cli_apellido1, cli_apellido2, cli_apellido_casada,
    cli_direccion, cli_telefono1} = cliente;

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
                        <p className="Nombre">{cli_nombre1+" "+ cli_nombre2}</p>
                        <p className="Apellido">{cli_apellido1 + " " + cli_apellido2}</p>
                        <p>Direccion: {cli_direccion}</p>
                        <p>Telefono: {cli_telefono1}</p>
                    </div>
                    <div className="acciones">
                        <Link to={`/clientes/editar/${cli_codigo_cliente}`} className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Cliente
                        </Link>
                        <button type="button" 
                                className="btn btn-rojo btn-eliminar" 
                                onClick={()=>eliminarCliente(cli_codigo_cliente)}
                        >
                            <i className="fas fa-times"></i>
                            Eliminar Cliente
                        </button>
                    </div>
                </li>
    );
}
export default Cliente;