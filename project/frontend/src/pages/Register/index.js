import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './style.css';
import logoImg from '../assets/logo.svg';
import api from '../../services/api';

export default function Register () {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');

    const history = useHistory();
    
    async function handleRegister(event) {
        event.preventDefault();
        console.log(name, email, whatsapp, city, uf);
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };

        api.post('ongs', data)
            .then((response) => {
                console.log("Salvo com sucesso");
                alert(`ONG Registrada com sucesso: ${response.data.id}`);
                history.push('/')
            })
            .catch((error) => {
                console.log("Erro no cadastro: " + error);
                alert(`Erro no cadastro`)
            })
            .catch(() => history.push('/'));
    }

    return (
        <div className='register-container'>
            <div className='content'>
                <section>
                    <img src={logoImg} alt='Be the Hero' />
                    <h1>Cadastro </h1>
                    <p>Faça seu cadastro, entre na plataforma  e ajude ONGS e pessoas</p>
                    <Link className='back-link' to='/'>
                        <FiArrowLeft size={16} color='#E02041'/>
                        Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder='Nome da ONG' value={name} onChange={e => setName(e.target.value)}/>
                    <input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
                    <input placeholder='Whatsapp' value={whatsapp} onChange={e => setWhatsapp(e.target.value)}/>
                    <div className='input-group'>
                        <input placeholder='Cidade' value={city} onChange={e => setCity(e.target.value)}/>
                        <input placeholder='Uf' style={{ width: 80}} value={uf} onChange={e => setUF(e.target.value)}/>
                    </div>
                    <button className='button' type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    )
};