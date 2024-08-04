import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { getEnv } from "@/utils/env";
import { useMainLoaderStore } from "@/store/loader";

export const useApi = async (uri: string, options: AxiosRequestConfig = {}): Promise<any> => {
    const apiBaseUrl = getEnv('VITE_APP_URL_GATEWAY_BASE_URL');
    const token = localStorage.getItem('authToken') || getEnv('AUTH_TOKEN') || null;
    const loaderStore = useMainLoaderStore();

    const headers: Record<string, string> = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...(options.headers as Record<string, string>),
    };

    const instance = axios.create({
        baseURL: apiBaseUrl,
        headers,
    });

    loaderStore.loading = true;

    return instance({
        url: uri,
        ...options,
    })
        .then(response => {
            loaderStore.loading = false;
            return response.data;
        })
        .catch(error => {
            loaderStore.loading = false;
            console.error('API request error:', error);
            throw error;
        });
};
