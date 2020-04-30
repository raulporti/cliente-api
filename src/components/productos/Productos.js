import React, { useEffect, Fragment, useState } from 'react';
import {Link} from 'react-router-dom';
import Producto from './Producto';
//Importar Cliente Axios
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';
function Productos(){ 
    const [productos, guardarProducto] = useState([]);
    const consultarAPI = async () =>{
        const productosConsulta = await clienteAxios.get('/productos');
        //console.log(productosConsulta);
        guardarProducto(productosConsulta.data);
    }
    useEffect(() => {
        consultarAPI();
    }, [])
    if(!productos.length) return <Spinner/>
        return ( 
            <Fragment>
            <h2>Productos</h2>
            <Link to="/productos/nuevo" className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>
            <ul className="listado-productos">
            {productos.map(producto => (
                <Producto
                    key={producto._id}
                    producto={producto}
                    consultarAPI={consultarAPI}
                />
            )
            )}
            </ul>
            </Fragment>
        );
}

export default Productos;