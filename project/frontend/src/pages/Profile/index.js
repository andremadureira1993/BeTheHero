import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    const ongID = localStorage.getItem('ongID');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('profile', { 
            headers: {
                Authorization: ongID,
            }
        }).then((response) => {
            setIncidents(response.data);
        })
    }, [ongID]);

    function handleDeleteIncident(id) {
        api.delete(`incidents/${id}`, {
            headers: {
                Authorization: ongID
            }
        })
        .then(() => {
            alert(`Incident deleted`);
            setIncidents(incidents.filter(incident => incident.id !== id));
        })
        .catch(error => {
            alert(`Error deleting incident`);
        })
    };

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }
    return(
        <div className='profile-container'>
            <header>
                <img src={logoImg} alt='Be the Hero' />
                <span>Bem vinda, {ongName}</span>
                <Link className='button' to='/incidents/new'>Cadastrar novo caso</Link>
                <button type='button' onClick={handleLogout}>
                    <FiPower size={18} color='#e02041' />
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                    <strong>Caso:</strong>
                    <p>{incident.title}</p>
                    
                    <strong>Descrição</strong>
                    <p>{incident.description}</p>

                    <strong>Valor</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button onClick={() => handleDeleteIncident(incident.id)} type='button'>
                        <FiTrash2 size={20} color='#a8a8b3' />
                    </button>
                </li>
                ))}
            </ul>
        </div>
    )
}