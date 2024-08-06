import React, { useState, useEffect } from 'react';
import { api } from './services/api';
import './App.css';

function App() {
    // Estado para los datos de los huéspedes y los campos del formulario
    const [guests, setGuests] = useState([]);
    const [name, setName] = useState('');
    const [identification, setIdentification] = useState('');
    const [roomAssigned, setRoomAssigned] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkoutId, setCheckoutId] = useState('');
    const [checkoutDate, setCheckoutDate] = useState('');
    const [error, setError] = useState(''); // Estado para mensajes de error
    const [success, setSuccess] = useState(''); // Estado para mensajes de éxito

    // Obtener los datos de los huéspedes al montar el componente
    useEffect(() => {
        fetchGuests();
    }, []);

    // Función para obtener la lista de huéspedes
    const fetchGuests = async () => {
        try {
            const response = await api.get('/guests');
            setGuests(response.data);
        } catch (error) {
            console.error('Error al obtener huéspedes:', error);
            setError('Error al obtener huéspedes.');
        }
    };

    // Función para registrar un nuevo huésped
    const registerGuest = async () => {
        // Validación de campos vacíos
        if (!name || !identification || !roomAssigned || !checkIn) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        try {
            await api.post('/register', {
                Name: name,
                Identification: identification,
                RoomAssigned: roomAssigned,
                CheckIn: checkIn,
            });
            setSuccess('Huésped registrado con éxito.');
            setError('');
            // Limpiar campos después del registro
            setName('');
            setIdentification('');
            setRoomAssigned('');
            setCheckIn('');
            fetchGuests();
        } catch (error) {
            console.error('Error al registrar huésped:', error);
            setError('Error al registrar huésped.');
        }
    };

    // Función para registrar la salida de un huésped
    const checkoutGuest = async () => {
        // Validación de campos vacíos
        if (!checkoutId || !checkoutDate) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        try {
            await api.post('/checkout', {
                Id: checkoutId,
                CheckOut: checkoutDate,
            });
            setSuccess('Huésped dado de baja con éxito.');
            setError('');
            // Limpiar campos después del checkout
            setCheckoutId('');
            setCheckoutDate('');
            fetchGuests();
        } catch (error) {
            console.error('Error al dar de baja al huésped:', error);
            setError('Error al dar de baja al huésped.');
        }
    };

    return (
        <div className="App">
            <h1>Gestión de Hotel</h1>

            {/* Mostrar mensajes de error y éxito */}
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            {/* Sección para registrar un huésped */}
            <h2>Registrar Huésped</h2>
            <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Identificación"
                value={identification}
                onChange={(e) => setIdentification(e.target.value)}
            />
            <input
                type="number"
                placeholder="Número de Habitación"
                value={roomAssigned}
                onChange={(e) => setRoomAssigned(e.target.value)}
            />
            <input
                type="datetime-local"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
            />
            <button onClick={registerGuest}>Registrar</button>

            {/* Sección para registrar el checkout de un huésped */}
            <h2>Checkout de Huésped</h2>
            <input
                type="number"
                placeholder="ID del Huésped"
                value={checkoutId}
                onChange={(e) => setCheckoutId(e.target.value)}
            />
            <input
                type="datetime-local"
                value={checkoutDate}
                onChange={(e) => setCheckoutDate(e.target.value)}
            />
            <button onClick={checkoutGuest}>Registrar Salida</button>

            {/* Lista de huéspedes registrados */}
            <h2>Lista de Huéspedes</h2>
            <ul>
                {guests.map((guest) => (
                    <li key={guest.Id}>
                        {guest.Name} - {guest.Identification} - Habitación: {guest.RoomAssigned} - Check-in: {new Date(guest.CheckIn).toLocaleString()} - Check-out: {guest.CheckOut ? new Date(guest.CheckOut).toLocaleString() : 'N/A'}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
