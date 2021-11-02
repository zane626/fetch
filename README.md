# fetch
基于axios封装的业务请求包

```js
import {Fetch, Method} from 'zz-fetch'
const fetch = new Fetch('http://api.xxx.com')
export class Interface {
  getData (params) {
    return fetch.send({
      url: '/xxx',
      method: 'get',
      params
    })
  }
  setData (data) {
    return fetch.send({
      url: '/xxx',
      method: Method.post,
      data
    })
  }
}

// 取消请求
const inter = new Interface()
let params = {}
inter.setData(params)
params.cancel()
```
