import { useEffect, useState } from 'react';
import axios from 'axios';
import apiConfig from '../apiConfig'; // Import the API configuration

const useDocData = () => {
    const [docData, setDocData] = useState([]);

    useEffect(() => {
        async function fetchDoctors() {
            try {
                const response = await axios.get(`${apiConfig.baseURL}/doctors`, {
                    headers: apiConfig.headers
                });
                const data = response.data;
                if (response.status === 200) {
                    setDocData(data);
                }
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        }
        fetchDoctors();
    }, []);

    return [docData];
}


export default useDocData;