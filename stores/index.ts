import { defineStore } from "pinia";

export const useApp = defineStore("app", {
  state: () => {
    return {
      windowWidth: 1200,
      theme: 'light'
    };
  },
  actions: {

  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "APP",
        storage: process.client ? localStorage : undefined,
        paths:['theme']
      },
    ],
  },
});

