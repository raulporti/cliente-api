import React from 'react';

function CantidadProducto(props) {
    const {producto, restarProductos, sumarProductos, index} = props
    return(
        <li>
            <div className="texto-producto">
                <p className="nombre">{producto.nombre}</p>
                <p className="precio">${producto.precio}</p>
                    </div>
                        <div className="acciones">
                            <div className="contenedor-cantidad">
                                <i  className="fas fa-minus"
                                    onClick={()=> restarProductos(index)}
                                ></i>
                                <p>{producto.cantidad}</p>
                                <i className="fas fa-plus"
                                    onClick={()=>sumarProductos(index)}
                                ></i>
                            </div>
                            <button type="button" className="btn btn-rojo">
                                <i className="fas fa-minus-circle"></i>
                                    Eliminar Producto
                            </button>
                    </div>
        </li>
    );
}
export default CantidadProducto;