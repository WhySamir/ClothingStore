import axios from "axios";

const APP_BASE_URL: string = process.env.NEXT_PUBLIC_APP_BASE_URL || "";

const serverRequest = async (configuration: any) => {
  const { authorization, config, ...restConfiguration } = configuration;

  const defaultHeader: any = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Api-Key": process.env.NEXT_PUBLIC_API_KEY,
  };

  return await axios({
    ...restConfiguration,
    url: `${APP_BASE_URL}/${restConfiguration?.url.toString()}`,
    headers: defaultHeader,
  })
    .then(async (resp) => {
      if (!!resp?.data?.errors) {
        throw new Error(resp?.data?.errors[0]?.message);
      }
      return resp?.data?.data;
    })
    .catch(async (err) => {
      const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        err?.message;
      throw new Error(message);
    });
};

export default serverRequest;
