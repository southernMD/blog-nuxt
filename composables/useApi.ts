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
        if(error.statusCode === 401){
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
        if(error.statusCode === 401){
            let result = (await useGetToken()).token
            AppPinia.author = result
            return useGetArticle(id,AppPinia)
        }
    }
}

// 声明一个处理响应的函数

export const usePostComment = async(obj:any)=>{
    // return new Promise<void>((resolve, reject) => {
    //     window.IPCallBack = async function(message) {
    //         console.log(message);
    //         let {proCode,addr,pro,city} = message
    //         if(proCode == 999999){
    //             if(addr.length == 0){
    //                 obj['location'] = '未知'
    //             }else{
    //                 obj['location'] = addr
    //             }
    //         }else{
    //             obj['location'] = `${pro} ${city}`
    //         }
    //         let result = await Http.post(`/show/comment`,obj)
    //         resolve(result)
    //         delete window['IPCallBack'];
    //     };
    //     const script = document.createElement('script');
    //     script.src = 'https://whois.pconline com.cn/ipJson.jsp?callback=IPCallBack';
    //     document.body.appendChild(script);
    //     throw('err')
    // })

    const {ipdata} = await Http.get('https://api.vore.top/api/IPdata')
    let locationStr = `${ipdata.info1} ${ipdata.info2} ${ipdata.info3}`.trim() 
    if(locationStr.length >10){
        locationStr = ipdata.info1
    }
    obj['location'] = locationStr
    let result = await Http.post(`/show/comment`,obj)
    return new Promise<ResOptions<any>>((resolve, reject) => {
        resolve(result)
    })
    // const {address} = JSON.parse(await Http.get('https://www.ip.cn/api/index?ip&type=0'))
    // const location = `${address}`
    // const locationArr = location.trim().split(' ')
    // if(location.trim() == ''){
    //     obj['location'] = '未知'
    // }else{
    //     if(location.trim().startsWith('中国')){
    //         locationArr.shift()
    //         const result = locationArr.slice(0, -1)
    //         obj['location']  = result.join(' ')
    //     }else{
    //         obj['location'] = location.trim()
    //     }
    // }
    // let result = await Http.post(`/show/comment`,obj)
    // return new Promise<ResOptions<any>>((resolve, reject) => {
    //     resolve(result)
    // })
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

export const useAboutHtml = async()=>{
    const result = await Http.get(`/show/about`)
    return new Promise<ResOptions<any>>((resolve, reject) => {
        resolve(result)
    }) 
}

export const useSongList = async()=>{
    try {
        const result = await Http.get(`/show/music`)
        if(result.status == 200){
            return new Promise<any>((resolve, reject) => {
                resolve(result.result)
            }) 
        }else{
            return new Promise<any>((resolve, reject) => {
                resolve([])
            }) 
        }

    } catch (error) {
        return new Promise<any>((resolve, reject) => {
            resolve([])
        }) 
    }
}