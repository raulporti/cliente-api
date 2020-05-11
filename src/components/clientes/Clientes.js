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
        if(auth.token !== ''){
            try {
                const consultarApi = async () =>{
                    const clientesConsulta = await clienteAxios.get('/clientes',{
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    });
                    //console.log(clientesConsulta.data);
                    guardarClientes(clientesConsulta.data);
                }
            } catch (error) {
                if(error.response.status = 500){
                    props.history.push('/iniciar-sesion');
                }
            }
            
            consultarApi();
        }else{
            props.history.push('/iniciar-sesion');
        }
        
        
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

export default withRouter(Clientes);