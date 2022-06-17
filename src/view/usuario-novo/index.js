import React, { useState } from 'react';
import './usuario-novo.css';
import Navbar from '../../components/navbar';

import firebase from '../../config/firebase';
import 'firebase/auth';

function NovoUsuario() {
     // eslint-disable-next-line react-hooks/rules-of-hooks
     const [email, setEmail] = useState();
     // eslint-disable-next-line react-hooks/rules-of-hooks
     const [senha, setSenha] = useState(); 
     // eslint-disable-next-line react-hooks/rules-of-hooks
     const [msgTipo, setMsgTipo] = useState();
     // eslint-disable-next-line react-hooks/rules-of-hooks
     const [msg, setMsg] = useState();
     // eslint-disable-next-line react-hooks/rules-of-hooks
     const [carregando, setCarregando] = useState();

      function cadastrar() {
          setCarregando(1);
          setMsgTipo(null);

          if(!email || !senha) {
              setMsgTipo('erro');
              setMsg('Você precisa informar o e-mail e senha para fazer o cadastro!');
              return;
          }

          firebase.auth().createUserWithEmailAndPassword(email,senha).then(resultado => {
            setCarregando(0);
            setMsgTipo('sucesso');

            setEmail('');
            setSenha('');

          }).catch(erro => {
            setMsgTipo('erro');
              switch(erro.message){
                  case 'Password should be at last 6 characters!':
                      setMsg('A senha deve ter pelo menos 6 caracteres!');
                      break;
                  case 'The email address is already in use by another account':
                      setMsg('Este e-mail já está sendo usado por outro!');
                    break;
                  case 'The email eddress is badly formatted.':
                      setMsg('O formato do seu e-mail é inválido!');
                      break;
                   default:
                       setMsg('Não foi possível cadastrar. Tente novamente mais tarde');
                       setCarregando(0);
                       break;      
              }

          })


      }
    
    
    return (
        <>
        <Navbar />
        <div className="container">
        <div className="form-cadastro">
            <form className="text-center form-login mx-auto mt-5">
                <h1 className="h3 mb-3 text-black font-weight-bold">Cadastro</h1>

               <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="form-control my-2" placeholder="Email" />
               <input onChange={(e) => setSenha(e.target.value)} value={senha} type="password" className="form-control my-2" placeholder="Senha" />
            
            
                {
                    carregando ? <div className="spinner-border text-danger" role="status"><span class="sr-only">Loading...</span></div>
                    : <button onClick={cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">Cadastrar</button>
                }

               
                

                <div className="msg-login text-black text-center my-5">
                
                    {msgTipo === 'sucesso' && <span><strong>Usuário cadastrado com sucesso! &#128526;</strong></span>}
                    {msgTipo === 'erro' && <span><strong>Ops !</strong> {msg} &#128546; </span>}
                
            </div>
            
            </form>
        </div>
        </div>
        </>
    )

}

export default NovoUsuario;