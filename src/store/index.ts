import { createStore, Store, useStore as baseUseStore } from "vuex";
import { InjectionKey } from "vue";

export enum HEADER_TYPE {
  DEFAULT = "DEFAULT",
}

export enum POPUP_TYPE {
  NONE = "NONE",
  NAVIGATION = "NAVIGATION",
}

export enum CATEGORY_TYPE {
  NONE = 0,
  EXHIBITION = 1,
  COMMON_PLACE = 2,
}

export enum StoreMutType {
  isLoading = "isLoading",
  setResolution = "setResolution",
  setPopup = "setPopup",
  setAuthToken = "setAuthToken",
  setCategoryType = "setCategoryType",
}

export interface PageInterface {
  resolution: "web" | "mobile";
  keywords: string;
  pageNo: number;
  rowCount: number;
}

export interface StoreState {
  isLoading: boolean;
  popup: POPUP_TYPE;
  headerType: HEADER_TYPE;
  page: PageInterface;
  authToken: string | null;
  categoryType: CATEGORY_TYPE;
}

export const storeKey: InjectionKey<Store<StoreState>> = Symbol();

export function useStore(): Store<StoreState> {
  return baseUseStore(storeKey);
}

export default createStore<StoreState>({
  state: {
    isLoading: false,
    popup: POPUP_TYPE.NONE,
    headerType: HEADER_TYPE.DEFAULT,
    page: {
      resolution: "web",
      keywords: "",
      pageNo: 1,
      rowCount: 10,
    },
    authToken: "",
    categoryType: CATEGORY_TYPE.NONE,
  },
  mutations: {
    isLoading(state, v) {
      state.isLoading = v;
    },
    headerType(state, v) {
      state.headerType = v;
    },
    setResolution(state, v) {
      state.page.resolution = v;
    },
    setPopup(state, v) {
      state.popup = v;
    },
    setAuthToken(state, v) {
      state.authToken = v;
    },
    setCategoryType(state, v) {
      state.categoryType = v;
    },
  },
  actions: {},
  modules: {},
});
