import { AxiosPromise, AxiosRequestConfig, AxiosStatic, AxiosRequestHeaders } from 'axios';



export type AxiosConfig = {
    AxiosRequestHeaders: AxiosRequestHeaders,
    pathParams?: { [key: string]: string };
    formData?: boolean;
} & AxiosRequestConfig;

export interface AxiosInstance extends AxiosStatic {
    (config: AxiosConfig): AxiosPromise;
    (url: string, config?: AxiosConfig): AxiosPromise;
}
