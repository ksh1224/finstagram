import axios, { AxiosError } from "axios";

import { MethodsType } from "../constant/HTTPMethods";

type ServerError = { code: string; description: string };

async function axiosUtil(
  url: string,
  method: MethodsType,
  body?: any,
  code?: any
): Promise<any> {
  try {
    const fullUrl = `${process.env.REACT_APP_HOST}/${url.replace(/^\//, "")}`;
    const headers: ObjectType = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    if (code) headers["X-FNF-AUTH-CODE"] = code;

    const config: ObjectType = {
      method,
      url: fullUrl,
      headers,
      validateStatus(status: number) {
        return status < 500;
      },
    };

    if (body) config.data = body;
    console.log("config", config);
    const response = await axios(config);
    if (response.status === 200) {
      const { data }: { data: ObjectType } = await response.data;
      return data;
    }
    const { data }: { data: ObjectType } = await response;
    const responseFail: ObjectType = {
      ...data,
      fail: true,
    };
    return responseFail;
    // const { message } = data;
    // const responseFail = new Error(message);
    // throw responseFail;
  } catch (error) {
    if (error && error.response) {
      const axiosError = error as AxiosError<ServerError>;
      return axiosError.response?.data;
    }
    throw error;
  }
}

export default axiosUtil;
