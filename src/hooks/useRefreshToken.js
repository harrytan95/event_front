import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/api/auth/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response?.data?.token?.access);
            return { ...prev, accessToken: response?.data?.token?.access }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
