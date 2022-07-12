import ServiceTransport from './ServiceTransport';

import Config from "@/utils/Config";

const api =  new ServiceTransport({ baseURL: Config.data.api.http.baseURL, withCredentials: true });

export default api;