import React, {useState, useEffect, Fragment} from 'react';
import clienteAxios from '../../config/axios';
import BuscarProducto from './FormBuscarProducto';
import CantidadProducto from './FormCantidadProducto';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';
function NuevoPedido(props){

    //Extraer ID de cliente
    const {id} = props.match.params;
    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState('');
    const [productos, guardarProductos] = useState([]);
    const [total, guardarTotal]= useState(0); 
    useEffect(() =>{
        const consultarAPI = async () =>{
            const resultado = await clienteAxios.get(`/clientes/${id}`);
            guardarCliente(resultado.data);
        }

        consultarAPI();

        actualizarTotal();
    }, [productos])

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
    //Eliminar el producto del state
    const eliminarProductoPedido = id =>{
            const todosProductos = productos.filter(producto => producto.producto !== id);
            guardarProductos(todosProductos);

    } 
    const actualizarTotal = () =>{
       if(productos.length === 0){
            guardarTotal(0);
            return; 
        }
        //Calcular el nuevo total
        let nuevoTotal = 0;
        //Recorrer todos los productos, cantidades y precios
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));

        guardarTotal(nuevoTotal);
    }
    const realizarPedido = async e =>{
        e.preventDefault();
        //extraer id 
        const {id} = props.match.params;
       //Construit objeto
       const pedido = {
        "cliente": id,
        "pedido": productos,
        "total": total
       } 
       //Almacenarlo en la base de datos
       const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido);
       if(resultado.status === 200){
        Swal.fire({
            title:resultado.data.mensaje,
            icon: 'success'
        }

        )
       }else{
        Swal.fire({
            title: 'Hubo un error',
            text: 'Intenta de nuevo',
            icon: 'error'
        }

        )   
       }
       props.history.push('/pedidos');
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
                            eliminarProducto={eliminarProductoPedido}
                        />
                        ))}
                </ul>
                    <p className="total"> Total a Pagar: <span>$ {total}</span></p>
                {total > 0 ? (
                    <form
                        onSubmit={realizarPedido}
                    >
                        <input type="submit"
                                className="btn btn-verde btn-block"
                                value="Realizar Pedido"
                        />
                    </form>
                ): null}
        </Fragment>
    )
}
export default withRouter(NuevoPedido);