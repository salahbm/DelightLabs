import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

export const API_ROOT = `https://drive.google.com`;

// IN TERMS OF AUTHENTICATED USER ACCESS TOKEN CAN BE USED

class Agent {
  private axios: AxiosInstance;

  private async axiosConfig(): Promise<AxiosRequestConfig> {
    const headers: AxiosRequestConfig['headers'] = {};
    const accessToken = await AsyncStorage.getItem('accessToken');

    if (accessToken) {
      headers.Authorization = `Token ${accessToken}`;
    }

    return { headers };
  }

  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL,
    });
  }

  public async plainGet(url: string, params?: AxiosRequestConfig['params']) {
    return await this.axios.get(url, { params });
  }

  public async plainPost(url: string, body?: any) {
    return await this.axios.post(url, body);
  }

  public async get(url: string, params?: AxiosRequestConfig['params'], withConfig = true) {
    const modifiedUrl = url.replace('http:', 'https:');
    const config = withConfig ? await this.axiosConfig() : {};
    const accessToken = await AsyncStorage.getItem('accessToken');

    if (!accessToken) {
      return Promise.reject(new AxiosError('No access token', 'NO_ACCESS_TOKEN'));
    }

    return this.axios.get(modifiedUrl, { params, ...config });
  }

  public async post(url: string, body?: any, withConfig = true) {
    const config = withConfig ? await this.axiosConfig() : {};
    const accessToken = await AsyncStorage.getItem('accessToken');

    if (!accessToken) {
      return Promise.reject(new AxiosError('No access token', 'NO_ACCESS_TOKEN'));
    }

    return this.axios.post(url, body, config);
  }

  public async put(url: string, body?: any, withConfig = true) {
    const config = withConfig ? await this.axiosConfig() : {};
    const accessToken = await AsyncStorage.getItem('accessToken');

    if (!accessToken) {
      return Promise.reject(new AxiosError('No access token', 'NO_ACCESS_TOKEN'));
    }

    return this.axios.put(url, body, config);
  }

  public async delete(url: string, body: any, withConfig = true) {
    const config = withConfig ? await this.axiosConfig() : {};
    const accessToken = await AsyncStorage.getItem('accessToken');

    if (!accessToken) {
      return Promise.reject(new AxiosError('No access token', 'NO_ACCESS_TOKEN'));
    }

    return this.axios.delete(url, { data: body, ...config });
  }
}

const agent = new Agent(API_ROOT);

export default agent;
