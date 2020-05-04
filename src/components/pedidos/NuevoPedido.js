import React, {useState, useEffect, Fragment} from 'react';
import clienteAxios from '../../config/axios';
import BuscarProducto from './FormBuscarProducto';
import CantidadProducto from './FormCantidadProducto';
import Swal from 'sweetalert2';
function NuevoPedido(props){

    //Extraer ID de cliente
    const {id} = props.match.params;
    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState('');
    const [productos, guardarProductos] = useState([]);
    useEffect(() =>{
        const consultarAPI = async () =>{
            const resultado = await clienteAxios.get(`/clientes/${id}`);
            guardarCliente(resultado.data);
        }

        consultarAPI();
    }, [])

    const buscarProducto = async e =>{
        e.preventDefault();

        const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);

        //Alerta si no hay resultados
        if(resultadoBusqueda.data[0]){
            
            let productoResultado = resultadoBusqueda.data[0];
            productoResultado.producto = resultadoBusqueda.data[0]._id;
            productoResultado.cantidad = 0;
            //Colocarlo en el State
            guardarProductos([
                ...productos,
                productoResultado
            ])
        }else{
            Swal.fire({
                title: 'No hay resultados',
                text: 'No hay resultados',
                icon: 'error'
            }

            )
        }    
    }
    const leerDatosProducto = e =>{
        guardarBusqueda(e.target.value);
    }

    //Actualizar la cantidad de productos
    const restarProductos = i =>{
        const todosProductos = [...productos];
        if(todosProductos[i].cantidad === 0) return;

        todosProductos[i].cantidad--;

        guardarProductos(todosProductos);
    }

    const sumarProductos = i =>{
        const todosProductos = [...productos];

        todosProductos[i].cantidad++;

        guardarProductos(todosProductos);
    }

    return(
        <Fragment>
        <h2>Nuevo Pedido</h2>
            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>{cliente.nombre} {cliente.apellido}</p>
            </div>
            <BuscarProducto
                buscarProducto={buscarProducto}
                leerDatosProducto={leerDatosProducto}
            />
                <ul className="resumen">
                    {productos.map((producto, index)=>(
                        <CantidadProducto
                            key={producto.producto}
                            producto={producto}
                            restarProductos={restarProductos}
                            sumarProductos={sumarProductos}
                            index={index}
                        />
                        ))}
                </ul>
                <div className="campo">
                    <label>Total:</label>
                    <input type="number" name="precio" placeholder="Precio" readOnly="readonly"/>
                </div>
                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Pedido"/>
                </div>
        </Fragment>
    )
}
export default NuevoPedido;