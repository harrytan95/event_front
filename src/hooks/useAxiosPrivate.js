import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import userRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const useAxiosPrivate = () => {
    const refresh = userRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${getCookie("access_token_cookie")}`;
                }
                if (!config.headers['X-CSRF-TOKEN']) {
                    config.headers['X-CSRF-TOKEN'] = getCookie("csrf_access_token");
                }
                return config;
            }, (error) => Promise.reject(error)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    prevRequest.headers['X-CSRF-TOKEN'] = getCookie("csrf_access_token");
                    return axiosPrivate(prevRequest);                    
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;