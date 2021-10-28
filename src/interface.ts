/**
 * Created by zane on 2021/10/28 11:53
 * @description .
 */
export interface BackDataKey {
  code: string;
  msg: string;
  data: string;
}

export interface BackData {
  code: string;
  msg: string;
  data: object | Array<any> | null;
}

export enum Method {
  get = 'get',
  post = 'post',
  put = 'put',
  del = 'delete'
}

export interface Data {
  cancel?: Function;

  [propName: string]: any;
}

export interface SendOptions {
  timeout?: number;
  params?: Data;
  data?: Data;
  method: Method;

  [propName: string]: any;
}
