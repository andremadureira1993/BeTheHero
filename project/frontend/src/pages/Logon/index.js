import React, { useState } from 'react';
import './styles.css';
import heroesImg from '../assets/heroes.png';
import logoImg from '../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function Logon() {
    const [id, setID] = useState('');
    const history = useHistory();

    function handleLogin(e) {
        e.preventDefault();
        api.post('sessions', { id })
            .then((response) => {
                console.log("Response logon: ", response.data.name);
                localStorage.setItem('ongID', id);
                localStorage.setItem('ongName', response.data.name);
                history.push('/profile')
            })
            .catch((error) => {
                console.log("Error logon");
                alert(`Invalid ID`);
            })
        console.log("ID ", id) 
    }
    return (
        <div className='logon-container'>
            <section className='form'>
                <img src={logoImg} alt='Be the Heroe' />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input placeholder='Sua ID'
                        value={id} 
                        onChange={e => setID(e.target.value)}/>
                    <button className='button' type='submit'>Entrar</button>
                    <Link className='back-link' to='/register'>
                        <FiLogIn size={16} color='#E02041'/>
                        Não tenho cadastro
                    </Link>
                </form>

            </section>
            <img src={heroesImg} alt='Heroes' />
        </div>
    )
};