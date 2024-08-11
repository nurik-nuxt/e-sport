import {defineStore} from "pinia";
import {useApi} from "@/composable/useApi";

export const useStatisticsStore = defineStore('statistics', {
    state: () => ({
       statistics: {} as any
    }),

    getters: {
        getStatistics: (state) => state.statistics
    },
    actions: {
        async loadStatisticsBySchool(id: string) {
            try {
                this.statistics = await useApi(`/v1/reviews/averages/${id}`, {
                    method: 'GET'
                });
            } catch (e) {
                console.error(e)
            }
        }
    }
})