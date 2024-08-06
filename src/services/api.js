import axios from 'axios';

// Configura la URL base de la API
const API_URL = 'http://localhost:3000'; // Cambia a la URL de tu backend si es diferente

// Crea una instancia de Axios con la configuración base
export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Función para registrar un huésped
export const registerGuest = async (guestData) => {
    try {
        const response = await api.post('/register', guestData);
        return response.data;
    } catch (error) {
        console.error('Error registering guest:', error);
        throw error;
    }
};

// Función para realizar el checkout de un huésped
export const checkoutGuest = async (guestId, checkOutTime) => {
    try {
        const response = await api.post('/checkout', {
            Id: guestId,
            CheckOut: checkOutTime,
        });
        return response.data;
    } catch (error) {
        console.error('Error checking out guest:', error);
        throw error;
    }
};

// Función para obtener la auditoría
export const getAuditLogs = async () => {
    try {
        const response = await api.get('/audit');
        return response.data;
    } catch (error) {
        console.error('Error fetching audit logs:', error);
        throw error;
    }
};
