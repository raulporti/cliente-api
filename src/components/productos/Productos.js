import React, { useEffect, Fragment, useState } from 'react';
import {Link} from 'react-router-dom';
import Producto from './Producto';
import Swal from 'sweetalert2';
import Spinner from '../layout/Spinner';
import {CRMContext} from '../../context/CRMContext';

//Importar Cliente Axios
import clienteAxios from '../../config/axios';
function Productos(){ 
    const [productos, guardarProducto] = useState([]);
    const[auth, guardarAuth] = useContext(CRMContext);
    
    const consultarAPI = async () =>{
        const productosConsulta = await clienteAxios.get('/productos');
        //console.log(productosConsulta);
        guardarProducto(productosConsulta.data);
    }
    useEffect(() => {
        consultarAPI();
        validarInfo();
    }, [])
        
        const validarInfo = () =>{
            console.log(productos);
            if(productos.length===0) {
                Swal.fire({
                    title: 'No existen Productos',
                    text: 'Crea Nuevos Productos',
                    icon: 'info'
                })
                return;
            }
        }
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