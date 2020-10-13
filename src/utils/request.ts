import Axios from 'axios';
import { obj2str } from './obj2str';

let service = Axios.create({
  timeout: 30000,
  paramsSerializer: params => obj2str(params),
  responseType: 'text',
  maxContentLength: Math.pow(1024, 2)
})

export const request = (config: any) => {

  let headers = config.headers || {};

  config.headers = headers;

  return service.request(config)
    .then(response => {

      if (response.data.code === 0) {
        return response.data.response
      }
      else if (response.data.code === 401) {
        return;
      }

    }, err => {
      return Promise.reject(err);
    })
}