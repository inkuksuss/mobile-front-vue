import axios, { AxiosInstance } from "axios";
import { Store } from "vuex";
import AppConfig from "../constants";
import { StoreMutType, StoreState } from "../store";
import { loadLocalData } from "@/utils/common";

let apiClient: AxiosInstance | undefined;
export function setApiToken(token: string): void {
  if (apiClient) apiClient.defaults.headers.common["Authorization"] = token;
}

export function setApiBaseUrl(url: string): void {
  if (apiClient) apiClient.defaults.baseURL = url;
  if (apiClient)
    apiClient.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
}

export function getApiClient(
  baseUrl = AppConfig.API_SERVER,
  store: Store<StoreState>
): AxiosInstance {
  if (!apiClient) {
    apiClient = axios.create({
      baseURL: "",
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Content-type": "application/json",
      },
    });
    apiClient.interceptors.request.use(
      (conf) => {
        store.commit(StoreMutType.isLoading, true);
        return conf;
      },
      (error) => {
        store.commit(StoreMutType.isLoading, false);
        return Promise.reject(error);
      }
    );
    apiClient.interceptors.response.use(
      (response) => {
        store.commit(StoreMutType.isLoading, false);
        return response;
      },
      (error) => {
        store.commit(StoreMutType.isLoading, false);
        return Promise.reject(error);
      }
    );
  }

  setApiBaseUrl(baseUrl);
  if (store.state.authToken) setApiToken(store.state.authToken);
  else {
    const token = loadLocalData(AppConfig.KEY_LIST.CONST.LOGIN_TOKEN);
    if (token) setApiToken(token);
  }

  return apiClient;
}
