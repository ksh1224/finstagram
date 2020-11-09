import axios, { AxiosError } from "axios";
import { MethodsType } from "constant/HTTPMethods";

type ServerError = { code: string; description: string };

async function axiosUtil(
  url: string,
  method: MethodsType,
  body?: any
): Promise<any> {
  try {
    const fullUrl = `${process.env.REACT_APP_HOST}/${url.replace(/^\//, "")}`;
    const headers: ObjectType = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    const accessToken = await localStorage.getItem("accessToken");
    const token = await localStorage.getItem("token");

    // console.log("accessToken", !!accessToken);
    // console.log("token", !!token);

    if (token && !accessToken) headers["X-FNF-MSAUTH-TOKEN"] = token;
    else headers["X-FNF-ACCESS-TOKEN"] = accessToken;

    const config: ObjectType = {
      method,
      url: fullUrl,
      headers,
      validateStatus(status: number) {
        return status < 500;
      },
    };

    if (body) config.data = body;
    await console.log("config", config);
    const response = await axios(config);
    await console.log("response", response);
    if (response.status === 200) {
      const data: ObjectType = await response.data;
      return data;
    }
    const { data }: { data: ObjectType } = await response;
    const responseFail: ObjectType = {
      ...data,
      fail: true,
    };
    return responseFail;
  } catch (error) {
    if (error && error.response) {
      const axiosError = error as AxiosError<ServerError>;
      // console.log("axiosError", axiosError);
      // console.log("axiosErrorresponse", axiosError.response);
      throw axiosError;
      // return axiosError.response?.data;
    }
    throw error;
  }
}

export default axiosUtil;
