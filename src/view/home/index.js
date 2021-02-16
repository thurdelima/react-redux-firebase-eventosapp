/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import './home.css';
import {Link} from 'react-router-dom';
import firebase from '../../config/firebase';
import Navbar from '../../components/navbar';
import {useSelector} from 'react-redux';
import EventoCard from '../../components/evento-card/';


function Home({match}) {

    const [eventos, setEventos] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    let listaEventos = [];
    const user = useSelector(state => state.usuarioEmail);

    useEffect(() => {

        if(match.params.parametro) {
            firebase.firestore().collection('eventos').where('usuario', '==',user).get().then( async (resultado) => {
                await resultado.docs.forEach(doc => {
                    if(doc.data().titulo  && doc.data().titulo.indexOf(pesquisa) >= 0){
                        listaEventos.push({
                            id: doc.id,
                        ...doc.data()
                        })
                    }
                    
                    
                })
    
                setEventos(listaEventos);
            })
        } else {
            firebase.firestore().collection('eventos').get().then( async (resultado) => {
                await resultado.docs.forEach(doc => {
                    if(doc.data().titulo  && doc.data().titulo.indexOf(pesquisa) >= 0){
                        listaEventos.push({
                            id: doc.id,
                        ...doc.data()
                        })
                    }
                    
                    
                })
    
                setEventos(listaEventos);
            })
        }


        
    })

    return (
        <>
            <Navbar />
           
           

            <div className="container">
                <div className="row p-3">
                    <h3 className="mx-auto p-5">Eventos Publicados</h3>
                    <input onChange={(e) => setPesquisa(e.target.value)} type="text" className="from-control text-center" placeholder="Pesquisar Evento pelo Título" />
                </div>
                <div className="row p-3">

                    
                    {eventos.map(item => <EventoCard id={item.id} titulo={item.titulo} img={item.foto} detalhes={item.detalhes} visualizacoes={item.visualizacoes} /> )}
                    
                    
                </div>
            </div>
        </>
    )
}

export default Home;