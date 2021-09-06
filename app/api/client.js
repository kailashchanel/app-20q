import { create } from "apisauce";
import cache from "../utility/cache";
import authStorage from "../auth/storage";

const apiClient = create({
  baseURL: "https://app-20q.herokuapp.com/api",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers["x-auth-token"] = authToken;
});

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);

  if (response.ok) {
    cache.store(url, response.data);
    // console.log("Request Returned Data: ", response.data);
    return response;
  }

  const data = await cache.get(url);
  // console.log("Returned Cached Data: ", data);
  return data ? { ok: true, data } : response;
};

export default apiClient;
