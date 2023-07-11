import { hash } from 'ohash'
import {nanoid} from 'nanoid'
const fetch = (url: string, options?: any,lazy = false): Promise<any> => {
  // const { $config } = useNuxtApp()
  // const { VITE_API_HOST } = $config.public
  const { public: { VITE_API_HOST } } = useRuntimeConfig() // 3.0正式版环境变量要从useRuntimeConfig里的public拿
  const baseUrl = VITE_API_HOST
  const reqUrl = url.includes('http')?url: baseUrl + url// 你的接口地址
  // 不设置key，始终拿到的都是第一个请求的值，参数一样则不会进行第二次请求
  const key = hash(JSON.stringify(options) + url)
  // 如果需要统一加参数可以options.params.token = 'xxx'
  return new Promise((resolve, reject) => {
    useFetch(reqUrl, { ...options,key,lazy}).then(({ data, error }) => {
      // console.log(data,'dahsdaid8912u81u31294r-23uthwejdcasio0');
      if (error.value) {
        reject(error.value)
        return
      }
      const value: ResOptions<any> = data.value as  ResOptions<any>
      if (String(value.status).startsWith('2') || url.includes('http')) {
        // 这里处理错你自定义的错误，例如code !== 1
        resolve(value)
      } else {
        reject(value)
      }
    }).catch((err: any) => {
      // console.log('err)(*YY(&^&',reqUrl);
      // console.log(err)
      reject(err)
    })
  })
}

export default class Http {

  get(url: string, params?: any,lazy?:boolean){
    return fetch(url, { method: 'get', params },lazy)
  }

  post(url: string, body?: any,lazy?:boolean){
    return fetch(url, { method: 'post', body },lazy)
  }

  put(url: string, body?: any,lazy?:boolean){
    return fetch(url, { method: 'put', body },lazy)
  }

  delete(url: string, body?: any,lazy?:boolean){
    return fetch(url, { method: 'delete', body },lazy)
  }
  getHeader(url: string, params?: any,headers?:any){
    return fetch(url, { method: 'get', params,headers })
  }
}

export const createHttp = ()=>{
  return new Http()
}