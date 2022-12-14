/**
 * 获取标签
 */

import {createHttp} from './useBaseApi'

const Http = createHttp()

export const useGetImage = async() => {
    let result = await Http.get('/show/img',{lazy:true})
    return new Promise<ResOptions<any>>((resolve, reject) => {
        resolve(result)
    })
}

export const useGetYiYan = async()=>{
    let result = await Http.get('https://v1.hitokoto.cn/?c=e&c=a&c=c&c=j&encode=text&max_length=15',{lazy:true})
    console.log(result);
    return new Promise<ResOptions<any>>((resolve, reject) => {
        resolve(result)
    })
}

export const useGetArticlesList = async(nowPage:number,pageSize:number)=>{
    let result = await Http.get('/show/article',{nowPage,pageSize})
    return new Promise<ResOptions<any>>((resolve, reject) => {
        resolve(result)
    })
}

export const useGetArticle = async(id:number | string)=>{
    let result = await Http.get(`/show/article/${id}`)
    return new Promise<ResOptions<any>>((resolve, reject) => {
        resolve(result)
    })
}

export const usePostComment = async(obj:any)=>{
    let result = await Http.post(`/show/comment`,obj)
    return new Promise<ResOptions<any>>((resolve, reject) => {
        resolve(result)
    })
}