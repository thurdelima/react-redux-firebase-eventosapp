/* eslint-disable no-undef */
import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Navbar() {
    const dispatch = useDispatch();

    const session = useSelector(state => state.usuarioLogado);

    return (



        <nav class="navbar navbar-expand-lg ">
            <Link className="nav-link ml-2" to="/">
                <i class="far fa-smile-wink text-white fa-2x"></i>
            </Link>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fas fa-bars text-white"></i>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item ">
                        <Link className="nav-link ml-2" to="/">Home </Link>
                    </li>

                    {
                        session > 0 ?

                            <>
                                <li class="nav-item ">
                                    <Link className="nav-link" to="/eventocadastro">Publicar Evento </Link>
                                </li>
                                <li class="nav-item ">
                                    <Link className="nav-link" to="/eventos/meus">Meus Eventos </Link>
                                </li>
                                <li class="nav-item ">
                                    <Link className="nav-link" onClick={() => dispatch({ type: 'LOG_OUT' })}>Sair </Link>
                                </li>
                            </>
                            :
                            <>
                                <li class="nav-item ">
                                    <Link className="nav-link" to="/novousuario">Cadastrar </Link>
                                </li>
                                <li class="nav-item ">
                                    <Link className="nav-link" to="/login">Login </Link>
                                </li>
                            </>



                    }

                </ul>

            </div>
        </nav>
    )
}

export default Navbar;