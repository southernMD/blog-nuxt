// 后端返回的数据类型
declare interface ResOptions<T> {
    status?: number
    message?: string
    result?:T
}
  
type ArticleObj = {
    title: string ;
    title2:string;
    time: string;
    text: string;
    gather: any;
    tags: string;
    state:stateName;
    imgUrl: string;
    ifpublic: string;
    id:number
    delTime?:string
    restOfTime?:15
    comments:number
    click:number
}

interface ArticleListHttp<T> extends ResOptions<T>{
    totalPages:number
}