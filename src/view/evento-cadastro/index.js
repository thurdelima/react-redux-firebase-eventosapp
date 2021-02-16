/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect} from 'react';
import './evento-cadastro.css';
import {Link} from 'react-router-dom';
import Navbar from '../../components/navbar';
import {useSelector} from 'react-redux';

import firebase from '../../config/firebase';


function EventoCadastro(props) {

    
    const [msgTipo, setMsgTipo] = useState();
    const [titulo, setTitulo] = useState();
    const [tipo, setTipo] = useState();
    const [detalhes, setDetalhes] = useState();
    const [data, setData] = useState();
    const [hora, setHora] = useState();

    const [fotoAtual, setFotoAtual] = useState();
    const [fotoNova, setFotoNova] = useState();
    const [loading, setLoading] = useState();
    const user = useSelector(state => state.usuarioEmail);
    
    

    const storage = firebase.storage();
    const db = firebase.firestore();

    useEffect(() => {

        if(props.match.params.id) {
            firebase.firestore().collection('eventos').doc(props.match.params.id).get().then(resultado => {
                setTitulo(resultado.data().titulo)
                setTipo(resultado.data().tipo)
                setDetalhes(resultado.data().detalhes)
                setData(resultado.data().data)
                setHora(resultado.data().hora)
                setFotoAtual(resultado.data().foto)
            });
        }
       
           
       
        
    }, []);

    
    //setUsuarioEmail(useSelector(state => state.usuarioEmail));
    
    //console.log(user);

    function atualizar() {
        setMsgTipo(null);    
        setLoading(1);

       if(fotoNova) storage.ref(`imagens/${fotoNova.name}`).put(fotoNova);

           
        db.collection('eventos').doc(props.match.params.id).update({
            titulo: titulo,
            tipo: tipo,
            detalhes: detalhes,
            data: data,
            hora: hora,
            foto: fotoNova ? fotoNova.name : fotoAtual
        }).then(() => {
            setMsgTipo('sucesso');
            setLoading(0);
        }).catch(erro => {
            setMsgTipo('erro');
            setLoading(0);
        });
  

    }

    function cadastrar() {

        
       setMsgTipo(null);    
       setLoading(1);

       storage.ref(`imagens/${fotoNova.name}`).put(fotoNova).then(() => {
            db.collection('eventos').add({
                titulo: titulo,
                tipo: tipo,
                detalhes: detalhes,
                data: data,
                hora: hora,
                usuario: user,
                visualizacoes: 0,
                foto: fotoNova.name,
                publico: 1,
                criacao: new Date()
            }).then(() => {
                setMsgTipo('sucesso');
                setLoading(0);
            }).catch(erro => {
                setMsgTipo('erro');
                setLoading(0);
            });

        });
    }
    

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="col-12 mt-5">
                    <div className="row">
                        <h3 className="mx-auto font-weight-bold"> {
                                    props.match.params.id ?
                                    'Editar Evento' 
                                    : 'Novo Evento'}</h3>
                    </div>
                </div>

                <form>
                    <div className="form-group">
                        <label>Título</label>
                        <input onChange={(e) => setTitulo(e.target.value)} value={titulo && titulo} type="text" className="form-control" />
                    </div>

                    <div className="form-group">
                        <label>Tipo do evento</label>
                        <select onChange={(e) => setTipo(e.target.value)} value={tipo && tipo} className="form-control">
                            <option disabled selected value>-- Selecione um tipo --</option>
                            <option>Festa</option>
                            <option>Teatro</option>
                            <option>Show</option>
                            <option>Evento</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Detalhes do Evento</label>
                        <textarea value={detalhes && detalhes} onChange={(e) => setDetalhes(e.target.value)} type="text" className="form-control" rows="3" />
                    </div>

                    <div className="form-group row">
                        <div className="col-6">
                            <label>Data:</label>
                            <input value={data && data} onChange={(e) => setData(e.target.value)} type="date" className="form-control"  />
                        </div>

                        <div className="col-6">
                            <label>Hora:</label>
                            <input value={hora && hora} onChange={(e) => setHora(e.target.value)} type="time" className="form-control"  />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Upload da Foto: {props.match.params.id ? '(caso queira manter a mesma foto, nao precisa escolher uma nova imagem)': null} </label>
                        <input onChange={(e) => setFotoNova(e.target.files[0])} type="file" className="form-control" />
                    </div>

                    <div className="row">
                        {
                            loading   ?
                                <div className="spinner-border text-danger mx-auto" role="status"><span class="sr-only">Loading...</span></div>
                            :
                                <button  onClick={props.match.params.id ? atualizar : cadastrar } type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">
                                    {
                                    props.match.params.id ?
                                    'Editar Evento' 
                                    : 'Publicar Evento'}
                                    
                                    </button>
                        }
                    
                    </div>

                    


                </form>

                <div className="msg-login  text-center my-2">
                
                    {msgTipo === 'sucesso' && <span><strong>Evento Publicado! &#128526;</strong></span>}
                    {msgTipo === 'erro' && <span><strong>Ops !</strong> Não foi possível publicar o evento! &#128546; </span>}
            
                </div>
            </div>
        </>
    )
}

export default EventoCadastro;