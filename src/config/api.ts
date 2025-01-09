import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { FilePreSaveDto, FileSaveDto, HealthResponse } from '@/types/api';

class ApiClient {
    public readonly baseURL: string;
    private readonly client: AxiosInstance;

    constructor(baseURL?: string) {
        if (!baseURL) {
            throw new Error('Base URL is required');
        }

        this.baseURL = baseURL;
        this.client = axios.create({ baseURL, headers: { 'Content-Type': 'application/json' } });

        this.client.interceptors.response.use(
            (response) => response,
            (error) => {
                // Handle error
                console.debug('API error', error.response?.data);
                return Promise.reject(error);
            },
        );
    }

    public async get<T>(url: string, config?: AxiosRequestConfig) {
        return (await this.client.get<T>(url, config)).data;
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        return (await this.client.post<T>(url, data, config)).data;
    }

    public async health() {
        const response = await this.client.get('/health');
        return response.data as HealthResponse;
    }

    public async filePreSave({ chainId, userAddress, tournamentId, randomBytes, formData }: FilePreSaveDto) {
        const url = `/static/tokens/create/${chainId}/${userAddress}/${randomBytes}/${tournamentId}`;
        const response = await this.client.post(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return response.data;
    }

    public async fileSave({ randomBytes }: FileSaveDto) {
        const url = `/static/tokens/save/${randomBytes}`;
        const response = await this.client.put(url);

        return response.data;
    }
}

export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URI);
