 /* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect} from 'react';
import './evento-detalhes.css';
import {Link, Redirect} from 'react-router-dom';
import Navbar from '../../components/navbar';
import {useSelector} from 'react-redux';

import firebase from '../../config/firebase';

function EventoDetalhes(props) { 

    const [evento, setEvento] = useState({});
    const [urlImg, setUrlImg] = useState({});
    const usuarioLogado = useSelector(state => state.usuarioEmail);
    const [carregando, setCarrengando] = useState(1);
    const [excluido, setExcluido] = useState(0);

    function remover() {
        firebase.firestore().collection('eventos').doc(props.match.params.id).delete().then(() => {
            setExcluido(1);
        })
    }

    useEffect(() => {
        if(carregando) {
            firebase.firestore().collection('eventos').doc(props.match.params.id).get().then(resultado => {
                
                setEvento(resultado.data());
                firebase.firestore().collection('eventos').doc(props.match.params.id).update('visualizacoes', resultado.data().visualizacoes + 1);
                

                firebase.storage().ref(`imagens/${resultado.data().foto}`).getDownloadURL().then(url => {
                    setUrlImg(url);
                    setCarrengando(0);
                });
            });
        } else {

            firebase.storage().ref(`imagens/${evento.foto}`).getDownloadURL().then(url => {
                setUrlImg(url);
              
            });
        }
        
    }, []);

    return (
        <>
            <Navbar />
            {
                excluido ? <Redirect to='/' /> : null
            }

            <div className="container-fluid">
                
                {
                   carregando ? <div className="row mt-5"> <div className="spinner-border text-danger mx-auto" role="status"><span class="sr-only"></span></div> </div>
                   :                    
                   <div>
                        <div className="row">
                            <img src={urlImg} className="img-banner" alt="banner" />

                            <div className="col-12 text-right mt-1 visualizacoes">
                                <i class="fas fa-eye"></i>
                                <span> {evento.visualizacoes + 1}</span>
                            </div>

                            <h5 className="mx-auto mt-5 titulo"><strong>{evento.titulo}</strong></h5>
                        </div>

                        <div className="container">
                            <div className="row mt-5 d-flex justify-content-around">
                                <div className="col-md-3 col-sm-12 box-info p-3">
                                    <i className="fas fa-ticket-alt fa-2x"></i>
                                    <h5><strong>Tipo</strong></h5>
                                    <span className="mt-3">{evento.tipo}</span>
                                </div>

                                <div className="col-md-3 col-sm-12 box-info p-3">
                                    <i className="fas fa-calendar-alt fa-2x"></i>
                                    <h5><strong>Data</strong></h5>
                                    <span className="mt-3">{evento.data}</span>
                                </div>

                                <div className="col-md-3 col-sm-12 box-info p-3">
                                    <i className="fas fa-clock fa-2x"></i>
                                    <h5><strong>Hora</strong></h5>
                                    <span className="mt-3">{evento.hora}</span>
                                </div>
                            </div>

                            <div className="row box-detalhes mt-5">
                                <div className="col-12 text-center">
                                    <h5 className="mx-auto"><strong>Detalhes do Evento</strong></h5>
                                </div>
                                
                                <div className="col-12 text-center">
                                    <p class="text-justify p-3">{evento.detalhes}</p>
                                </div>
                            </div>

                            {
                                usuarioLogado === evento.usuario ?
                                <Link to={`/editarevento/${props.match.params.id}`} className="btn-editar"><i className="fas fa-pen-square fa-3x"></i></Link>
                                : ''
                            }

                            
                            {
                               usuarioLogado === evento.usuario ?  
                                <button onClick={remover}  type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro"> Remover Evento </button>
                               : '' 
                            } 
                                    
                                   

                        </div>
                    </div>
                }
            </div>
        
        </>
    )
}


export default EventoDetalhes;