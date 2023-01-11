import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
});

instance.interceptors.request.use((config) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  if (apiKey) {
    return {
      ...config,
      headers: {
        "X-API-KEY": apiKey,
      },
    };
  }

  return config;
});

export default instance;
