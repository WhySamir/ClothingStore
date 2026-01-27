import axios from "axios";
import { store, Actions } from "@/redux/store/index";
import { toast } from "react-toastify";
import helper from "./helper";

const isBrowser = typeof window !== "undefined"; //  Safe check

const APP_BASE_URL: string = process.env.NEXT_PUBLIC_BASE_URL || "";

const storeProcess = async (config: any, data: any) => {
  if (!isBrowser) return; // Ensure this runs only in the browser, for seo
  const actionType: "set" | "append" | "update" | "remove" | "reset" =
    config.action;
  if (actionType !== "reset") {
    store.dispatch(Actions[actionType](config.key, data));
  } else {
    store.dispatch(Actions["reset"](config.key));
  }
};

const loadingProcess = async (config: any, loading = false) => {
  if (!isBrowser) return; // Skip in server
  if (!!config?.store) {
    const actionType: "set" | "update" | "remove" | "reset" =
      config?.store?.action;
    if (actionType === "set" || actionType === "update") {
      const loadingData: any = {
        loading: loading,
        loadingState: true,
      };
      store.dispatch(Actions[actionType](config?.store?.key, loadingData));
    }
  }
};

const request = async (configuration: any) => {
  const {  config, ...restConfiguration } = configuration;
  const headers: any = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  await loadingProcess(configuration, true);
  return await axios({
    ...restConfiguration,
    url: `${APP_BASE_URL}/${restConfiguration?.url.toString()}`,
    headers,withCredentials: true, 
  })
    .then(async (resp) => {
      if (!!resp?.data?.errors) {
        throw new Error(resp?.data?.errors[0]?.message);
      }
      const data = resp?.data?.data;
      if (!!config.store) {
        await storeProcess(config.store, data);
      }
      if (!!config.successMsg && isBrowser) {
        toast.success(configuration?.config?.successMsg);
      }
      return data;
    })
    .catch(async (err) => {
      const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        err?.message;

      if (!!config?.showErr && isBrowser) {
        toast.error(message);
      }

      if (
        err?.response?.status === 401 ||
        message === "Unauthorized" ||
        message === "jwt expired"
      ) {
        if (isBrowser) {
          if (message === "jwt expired" || message === "Unauthorized") {
           
            setTimeout(() => {
              window.location.reload();
            }, 700);
          }
        }
      } else {
        await loadingProcess(config, false);
      }

      throw new Error(message);
    });
};

export default request;
