import React, {useEffect, useState, Fragment} from 'react';
import {Link} from 'react-router-dom';
import Cliente from './Cliente';
//Importar Cliente Axios
import clienteAxios from '../../config/axios';
function Clientes() {

    //Trabajar con el state
    const [clientes, guardarClientes] = useState([]);
    const consultarApi = async () =>{
        const clientesConsulta = await clienteAxios.get('/clientes');
        //console.log(clientesConsulta.data);
        guardarClientes(clientesConsulta.data);
    }
    useEffect( () => {
        consultarApi();
    }, [] );
        return ( 
            <Fragment>
                <h2>Clientes</h2>
                <Link to="/clientes/nuevo" className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
                </Link>
                <ul className="listado-clientes">
                {clientes.map(cliente =>(
                    <Cliente
                        key={cliente._id}
                        cliente={cliente}
                        consultarApi={consultarApi}
                    />
                ))}
                </ul>
            </Fragment>
        );
}

export default Clientes;