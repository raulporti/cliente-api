import React, {useEffect, useState, Fragment, useContext} from 'react';
import {Link , withRouter} from 'react-router-dom';
import Cliente from './Cliente';
import {CRMContext} from '../../context/CRMContext';
//Importar Cliente Axios
import clienteAxios from '../../config/axios';
function Clientes(props) {

    //Trabajar con el state
    const [clientes, guardarClientes] = useState([]);
    const[auth, guardarAuth] = useContext(CRMContext);
    useEffect( () => {
                const consultarApi = async () =>{
                    try{
                    const respuesta = await clienteAxios.get('/clientes', {
                        headers : {'Access-Control-Allow-Origin': '*'}
                             
                    });
                    //console.log(clientesConsulta.data);
                    guardarClientes(respuesta.data.data);
                } catch (error) {
                    if(error.status = 500){
                        props.history.push('/');
                    }
                }
            }
            consultarApi();        
    }, [clientes] );
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
                        key={cliente.cli_codigo_cliente}
                        cliente={cliente}
                        consultarApi={useEffect.consultarApi}
                    />
                ))}
                </ul>
            </Fragment>
        );
}

export default withRouter(Clientes);