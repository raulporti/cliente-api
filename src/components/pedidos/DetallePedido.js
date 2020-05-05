import React, {Fragment} from 'react';

function DetallesPedido ({pedidos}) {
    
    const {cliente, pedido, total} = pedidos;
    const [producto] = pedido;
    console.log(pedidos);
    return(
        <Fragment>
            <li className="pedido">
        <div className="info-pedido">
    <p className="id">ID: {cliente._id}</p>
    <p className="nombre">Cliente: {cliente.nombre} {cliente.apellido}</p>

            <div className="articulos-pedido">
                <p className="productos">Artículos Pedido: </p>
                <ul>
                    {pedido.map(producto =>(
                        //console.log(producto)
                    <li>
                        <p>{producto.producto.nombre}</p>
                    <p>Precio: ${producto.producto.precio}</p>
                    <p>Cantidad: {producto.cantidad}</p>
                    </li>
                    ))}
                    
                </ul>
            </div>
            <p className="total">Total: ${total} </p>
        </div>
        <div className="acciones">
            <a href="#" className="btn btn-azul">
                <i className="fas fa-pen-alt"></i>
                Editar Pedido
            </a>

            <button type="button" className="btn btn-rojo btn-eliminar">
                <i className="fas fa-times"></i>
                Eliminar Pedido
            </button>
        </div>
    </li>
        </Fragment>
    )
} 
export default DetallesPedido;