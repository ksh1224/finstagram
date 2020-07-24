import axios, { AxiosError } from "axios";

import { MethodsType } from "../constant/HTTPMethods";

type ServerError = { code: string; description: string };

async function axiosUtil(
  url: string,
  method: MethodsType,
  body?: any
): Promise<any> {
  try {
    const fullUrl = `${process.env.REACT_APP_HOST}/${url.replace(/^\//, "")}`;
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const config: ObjectType = {
      method,
      url: fullUrl,
      headers,
      validateStatus(status: number) {
        return status < 500;
      },
    };

    if (body) config.data = body;

    const response = await axios(config);
    if (response.status === 200) {
      const { data }: { data: ObjectType } = await response;
      return data;
    }
    const { data } = await response;
    const responseFail = { ...data, fail: true };
    return responseFail;
  } catch (error) {
    if (error && error.response) {
      const axiosError = error as AxiosError<ServerError>;
      return axiosError.response?.data;
    }
    throw error;
  }
}

export default axiosUtil;
