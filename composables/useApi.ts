/**
 * 获取标签
 */

import {createHttp} from './useBaseApi'

const Http = createHttp()

export const useGetImage = async() => {
    let result = await Http.get('/show/img')
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

export const useGetArticlesList = async(nowPage:number,pageSize:number,password:string,flag:number):Promise<ResOptions<any> | undefined>=>{
    let result:any
    try {
        const t = new Date().getTime()
        result = await Http.getHeader(`/show/article`,{nowPage,pageSize,password,flag,t},{
            'Authorization':'Bearer '+localStorage.getItem('token')
        })
        return new Promise<ResOptions<any>>((resolve, reject) => {
            resolve(result)
        })
    } catch (error:any) {
        // console.log(error);
        // console.log(error.status);
        if(error.status === 401){
            let result = (await useGetToken()).token
            localStorage.setItem('token',result)
            return useGetArticlesList(nowPage,pageSize,password,flag)
        }
    }
}

export const useGetArticle = async(id:number | string,AppPinia:any):Promise<ResOptions<any> | undefined>=>{
    try {
        console.log(AppPinia);
        let result = await Http.getHeader(`/show/article/${id}`,{},{
            'Authorization':'Bearer '+ AppPinia.author
        })
        return new Promise<ResOptions<any>>((resolve, reject) => {
            resolve(result)
        })
    } catch (error:any) {
        if(error.status === 401){
            let result = (await useGetToken()).token
            AppPinia.author = result
            return useGetArticle(id,AppPinia)
        }
    }
}

export const usePostComment = async(obj:any)=>{
    const {country,province,area} = JSON.parse(await Http.get('https://ip.useragentinfo.com/json'))
    const location = `${country} ${province} ${area}`
    if(location.trim() == ''){
        obj['location'] = '未知'
    }else{
        obj['location'] = location.trim()
    }
    let result = await Http.post(`/show/comment`,obj)
    return new Promise<ResOptions<any>>((resolve, reject) => {
        resolve(result)
    })
}

export const useGetArticleComment = async(id:number | string)=>{
    let result = await Http.get(`/show/comment/${id}`)
    return new Promise<ResOptions<any>>((resolve, reject) => {
        resolve(result)
    })
}

export const usePostAdmit = async(password:string)=>{
    let result = await Http.post(`/show/admit`,{admit:password})
    return new Promise<{status:number,token:string}>((resolve, reject) => {
        resolve(result)
    })
}


//游客jwt
export const useGetToken = async()=>{
    let result = await Http.get(`/show/tourist`)
        return new Promise<{status:number,token:string}>((resolve, reject) => {
        resolve(result)
    })
}

//基本信息
export const useGetBaseMessage = async()=>{
    let result = await Http.get(`/show/base`)
        return new Promise<ResOptions<any>>((resolve, reject) => {
        resolve(result)
    })
}
