import {defineStore} from "pinia";

export const useMainLoaderStore = defineStore('loader', {
    state: () => ({
        loading: false as boolean
    })
})