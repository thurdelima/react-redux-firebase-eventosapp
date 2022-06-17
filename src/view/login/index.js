/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import './login.css';
import {Link, Redirect} from 'react-router-dom';

import firebase from '../../config/firebase';
import 'firebase/auth';

import {NotificationContainer, NotificationManager} from 'react-notifications';


import {useSelector, useDispatch} from 'react-redux';


function login() {
    
    const [email, setEmail] = useState();
    
    const [senha, setSenha] = useState(); 
    
    const [msgTipo, setMsgTipo] = useState();
    
    const dispatch = useDispatch();

    
    
    function logar() {
        firebase.auth().signInWithEmailAndPassword(email, senha).then(resultado =>{
            setMsgTipo('sucesso');
            setTimeout(() => {
                dispatch({type: 'LOG_IN', usuarioEmail: email});
            }, 2000);
        }).catch(erro => {

            NotificationManager.error('Verifique seus dados', 'E-mail ou senha incorreta', 2000);

            // setInterval(() => {
            //     setMsgTipo('erro');
            // }, 2000);
            
            setEmail('');
            setSenha('');
            setMsgTipo('');
        });


        
    }

    
    // alert(useSelector(state => state.usuarioEmail));

    return (
        <div className="login-content d-flex align-items-center">
            {
                useSelector(state => state.usuarioLogado) > 0 ? <Redirect to='/' /> : null
            }


            <form className="form-signin mx-auto">
                <div className="text-center mb-4">
                    <i class="far fa-smile-wink text-white fa-5x"></i>
                    <h1 className="h3 mb-3 font-weight-normal text-white font-weight-bold">Login</h1>
                
                </div>
        
         
            <input onChange={(e) => setEmail(e.target.value)} type="email" value={email} id="inputEmail" className="form-control my-2" placeholder="Email " />
            <input onChange={(e) => setSenha(e.target.value)} type="password" value={senha} id="inputPassword" className="form-control my-2" placeholder="Senha" />
            
        
            <button onClick={logar} className="btn btn-lg btn-block btn-login" type="button">Sign in</button>

            
            
            <div className="opcoes-login text-center mt-5">
                <Link to="/usuariorecuperarsenha" className="mx-2" >Recuperar senha</Link>
                <span className="text-white">&#9733;</span>
                <Link to="novousuario" className="mx-2" >Quero cadastrar</Link>
            </div>
        </form>
        <div className="msg-login text-white text-center my-5">
                
                    {msgTipo === 'sucesso' && <span><strong>Você está conectado! &#128526;</strong></span>}
                    {msgTipo === 'erro' && <span><strong>Ops !</strong> Verifique se a senha ou usuário estão corretos! &#128546; </span>}
                
            </div>
      </div>
    )
}

export default login;