/**
 * Created by zane on 2021/10/27 23:04
 * @description .
 */
import * as _ from 'lodash';
import axios from 'axios';
import {BackDataKey, BackData, Method, Data, SendOptions} from './interface';

const CancelToken = axios.CancelToken;

export class Fetch {
  baseURL: string;
  backDataKey: BackDataKey = {code: 'code', data: 'data', msg: ''};
  successCode: any = 0;
  tokenKey: string = 'Authorization';
  tokenPreFix: string = 'Bearer ';

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  send(options: SendOptions, customHeader: Record<string, string> = {}): Promise<BackData> {
    return new Promise((resolve: Function, reject: Function) => {
      let isCancel: Boolean = false;
      let headers: Record<string, string> = {};
      let sendData = _.cloneDeep(options);
      if (_.isArray(sendData.url)) sendData.url = sendData.url.join('/').replace(/\/\//g, '/');
      let token = this.getToken();
      if (token) {
        headers[this.tokenKey] = this.tokenPreFix + token;
      }
      const instance = axios.create({
        baseURL: this.baseURL,
        timeout: options.timeout || 20000,
        headers: _.merge(headers, customHeader),
        cancelToken: new CancelToken((c: Function) => {
          const cancel = () => {
            isCancel = true;
            return c();
          }
          // An executor function receives a cancel function as a parameter
          if (options.method === Method.get && _.isObject(options.params) && options.params) options.params.cancel = cancel;
          if (options.method === Method.post && _.isObject(options.data) && options.data) options.data.cancel = cancel;
        })
      })
      instance(sendData)
        .then((data: any) => {
          let back: BackData = {
            code: _.get(data, this.backDataKey.code, '') + '',
            msg: _.get(data, this.backDataKey.msg, '') + '',
            data: _.get(data, this.backDataKey.data, {}) || {}
          }
          if (back.code === this.successCode) {
            resolve(back);
          } else {
            this.error(back);
          }
        })
        .catch((error: any) => {
          if (isCancel) {
            reject({isCancel});
          } else if (error.response) {
            reject(error.response);
          } else {
            reject({msg: '超时'});
          }
        })
    })
  }

  error(data: BackData): void {
  };

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}

export {
  Method
};
