import axios, {
    AxiosError,
    AxiosHeaders,
    AxiosRequestConfig,
    AxiosResponse,
    RawAxiosRequestHeaders,
  } from 'axios';
  import { getErrorMessage} from './utils';

  const DEFAULT_CONFIG: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_API_BASE_URL,
  };

  const getMergedConfig = (options?: AxiosRequestConfig) => {
    const accessToken = localStorage.getItem('token');
  
    const headers: RawAxiosRequestHeaders | AxiosHeaders = {  
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    };
  
    const config = {
      ...DEFAULT_CONFIG,
      ...options,
      headers,
    };
  
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  
    return config;
  };

  const onSuccess = <T>(response: AxiosResponse<T>): T => {
    if (response?.headers?.['x-token']) {
      localStorage.set("token", response.headers['x-token']);
    }

    console.log('API Success Response:', response);
  
    return response?.data;
  };

  export type ApiErrorData = {
    data: Record<string, unknown> | null;
    message: string;
    statusCode: number;
    success: false;
  };

  export type ApiError = AxiosError<ApiErrorData>;

  const onError = (error: ApiError) => {
    const errorMessage = getErrorMessage(error);
    console.log('API Error:', errorMessage);
  
    const isUnauthorized = error.response?.status === 401;
    const isInactive =
      error.response?.status === 403 &&
      error.response?.data.message.toLowerCase().includes('access denied');
  
    if (isUnauthorized || isInactive) {
      localStorage.clearAll();
    }
  
    return Promise.reject(error);
  };

  export const getRequest = async (
    url: string,
    options?: AxiosRequestConfig
  ) => {
    const config  = getMergedConfig(options);

    return axios.get(url, config)
    .then(onSuccess)
    .catch(error => onError(error));
  }