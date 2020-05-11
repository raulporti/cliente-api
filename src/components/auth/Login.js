import React, {useState, useEffect, useContext} from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import {withRouter} from 'react-router-dom';
import {CRMContext} from '../../context/CRMContext';
function Login(props){

    const [auth, guardarAuth] = useContext(CRMContext);
    const [credenciales, guardarCredenciales] = useState({});
    const leerDatos = e =>{
        guardarCredenciales({
            ...credenciales,
            [e.target.name] : e.target.value
        })
    }
    const iniciarSesion =async e =>{
        e.preventDefault();
        //Autenticar usuario
        try {
            const respuesta = await clienteAxios.post('/iniciar-sesion', credenciales);
            //Extraer el token y colocarlo en localstorage
            const {token} = respuesta.data;
            localStorage.setItem('token', token);

            //Colocarlo en el state
            guardarAuth({
                token,
                auth: true
            })
            Swal.fire({
                title: 'Login Correcto',
                text: 'Felicidades',
                icon: "success"
            })
            props.history.push('/');
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Hubo un error',
                text: error.response.data.mensaje,
                icon: "error"
            })
        }
    }
    return(
        <div className="login">
            <h2>Iniciar Sesion</h2>
            <div className="contenedor-formulario">
                <form
                onSubmit={iniciarSesion}
                >
                    <div className="campo">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email para iniciar Sesión"
                            required
                            onChange={leerDatos}
                        />
                        </div>
                        <div className="campo">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password para iniciar Sesión"
                            required
                            onChange={leerDatos}
                        />
                    </div>
                    <input type="submit" value="Iniciar Sesion" className="btn btn-verde btn-block"/> 
                </form>
            </div>
        </div>
    );
}
export default withRouter( Login);