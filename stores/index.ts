import { defineStore } from "pinia";

export const useApp = defineStore("app", {
  state: () => {
    return {
      windowWidth: 1200,
      theme: 'light',
      optionDirectionFlag:false,
      hideFlag:true,
      orderChange:false,
      toTopFlag:false,
      scrollbarVal:0,
      activeBlock:'首页',
    };
  },
  actions: {

  },
  persist: {
    paths:['theme','optionDirectionFlag','hideFlag','orderChange']
  },
});

