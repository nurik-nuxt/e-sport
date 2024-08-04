import {defineStore} from "pinia";
import {useApi} from "@/composable/useApi";

export const useDisciplineStore = defineStore('discipline', {
    state: () => ({
        disciplines: [] as any
    }),

    getters: {
        getAllDisciplines: (state) => state.disciplines
    },

    actions: {
        async loadAllDisciplines() {
            try {
                this.disciplines = await useApi(`/v1/disciplines`, {
                    method: 'GET'
                })
            } catch (e) {
                console.error(e)
            }
        }
    }
})