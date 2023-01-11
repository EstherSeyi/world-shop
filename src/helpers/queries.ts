import axios from "axios";
import request from "./request";

export const fetch = async (axiosOptions = {}) => {
  const source = axios.CancelToken.source();

  const { data } = await request({
    method: "GET",
    cancelToken: source.token,
    ...axiosOptions,
  });

  data.cancel = () => {
    source.cancel("Request was cancelled");
  };

  return data;
};
