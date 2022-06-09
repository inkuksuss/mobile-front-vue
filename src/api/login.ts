import { AxiosInstance } from "axios";
import { AddMemberForm, LoginForm, ResultResponse } from "@/types/types";
import AppConfig from "@/constants";

export function loginRequest(
  client: AxiosInstance,
  form: LoginForm
): Promise<ResultResponse> {
  const promiseFn = (
    fnResolve: (value: PromiseLike<ResultResponse> | ResultResponse) => void,
    fnReject: (reason?: any) => void
  ) => {
    client
      .post(`${AppConfig.API_SERVER}/login`, form)
      .then((res) => {
        if (res.data.resultCode !== 0) {
          console.error(res);
          fnReject(res.data.resultMessage);
        } else {
          fnResolve(res.data.data);
        }
      })
      .catch((error) => {
        console.error(error);
        fnReject("error");
      });
  };
  return new Promise(promiseFn);
}

export function joinRequest(
  client: AxiosInstance,
  form: AddMemberForm
): Promise<ResultResponse> {
  const promiseFn = (
    fnResolve: (value: PromiseLike<ResultResponse> | ResultResponse) => void,
    fnReject: (reason?: any) => void
  ) => {
    client
      .post("/join", form)
      .then((res) => {
        if (res.data.resultCode !== 0) {
          console.error(res);
          fnReject(res.data.resultMessage);
        } else {
          fnResolve(res.data.data);
        }
      })
      .catch((error) => {
        console.error(error);
        fnReject("error");
      });
  };
  return new Promise(promiseFn);
}
