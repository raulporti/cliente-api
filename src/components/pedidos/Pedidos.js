import React, { useEffect, useState, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import DetallesPedido from './DetallePedido';
function Pedidos(){
    const [pedidos, guardarPedidos] = useState([]);

    useEffect(()=>{
        const consultarApi = async () =>{
            const resultado = await clienteAxios.get('/pedidos');
            guardarPedidos(resultado.data);
        }
        consultarApi();
    }, []);
    return(
        <Fragment>
            <h2>Pedidos</h2>

            <ul class="listado-pedidos">
                {pedidos.map(pedido=>(
                    
                        <DetallesPedido
                        key={pedido._id}
                        pedidos={pedido}
                        />
                ))}
                
            </ul>
        </Fragment>
    )
}
export default Pedidos;