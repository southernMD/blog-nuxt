import { defineStore } from "pinia";
export const useApp = defineStore("app", {
  state: () => {
    return {
      windowWidth: 1200,
      theme: 'light',
      optionDirectionFlag: false,
      hideFlag: true,
      orderChange: false,
      toTopFlag: false,
      toTopFlagim: false,
      scrollbarVal: 0,
      activeBlock: '',
      directory: -1,
      SearchDrawerFlag: false,
      ArticlesList: null,
      ArticlesListYear: null,
      articleId: -1,
      author: '',
      totalPages:0,
      nowPage:1,
      repaly: {
        user: '',
        text: '',
        id: 0
      },
      imgObj:{},
      result:{},
      yiyan:{},
      navMessage:[]
    };
  },
  actions: {

  },
  persist: [{
    paths: ['theme', 'optionDirectionFlag', 'hideFlag', 'orderChange',
     'ArticlesList', 'ArticlesListYear','imgObj','result','yiyan','navMessage'],
  }]
});

export const useOneArticle = defineStore("oneArticle", {
  state: () => {
    return {
      ss: {
        id: 0,
        article: '',
        msg: {},
        Text: '',
        tags: [],
        list: [],
      },
      tags_list:[],
      tags_list_years:[]
    }
  },
  actions:{
    init() {
      this.$state.ss ={
        id: 0,
        article: '',
        msg: {},
        Text: '',
        tags: [],
        list: []
      }
    }
  },
  persist: [{
    paths: ['ss','tags_list','tags_list_years'],
  }]
})
