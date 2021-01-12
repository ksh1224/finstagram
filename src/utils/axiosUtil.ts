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
    const testUser = await localStorage.getItem("testUser");

    // console.log("accessToken", !!accessToken);
    // console.log("token", !!token);

    if (token && !accessToken) headers["X-FNF-MSAUTH-TOKEN"] = token;
    else headers["X-FNF-ACCESS-TOKEN"] = accessToken;

    if (testUser) headers["X-FNF-DEV"] = testUser;

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
      const data: ObjectType = await response.data;
      return data;
    }
    if (response?.data?.message) alert(response?.data?.message);
    const statusError = new Error();
    statusError.message = `statusError:${response.status}`;
    throw statusError;
  } catch (error) {
    // console.log("error", error.toJSON());
    if (error && error.response) {
      const axiosError = error as AxiosError<ServerError>;
      // console.log("axiosError", axiosError);
      console.log("axiosErrorresponse", axiosError.response);
      throw axiosError;
      // return axiosError.response?.data;
    }
    throw error;
  }
}

export default axiosUtil;
