import {defineStore} from "pinia";
import {useApi} from "@/composable/useApi";

export const useStatisticsStore = defineStore('statistics', {
    state: () => ({
       statistics: {} as any,
       regions: [] as any
    }),

    getters: {
        getStatistics: (state) => state.statistics,
        getRegions: (state) => state.regions
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
        },

        async loadStatisticsByFilter(regionId : null | string = null, cityId : null | string = null, schoolId : null | string = null) {
            try {
                const queryParams = new URLSearchParams();

                if (regionId) {
                    queryParams.append('regionId', regionId);
                }

                if (cityId) {
                    queryParams.append('cityId', cityId);
                }

                if (schoolId) {
                    queryParams.append('schoolId', schoolId);
                }

                const queryString = queryParams.toString();
                const url = `/v1/reviews/averages/${queryString ? `?${queryString}` : ''}`;

                this.statistics = await useApi(url, {
                    method: 'GET'
                });
            } catch (e) {
                console.error(e);
            }
        },


        async loadRegions() {
            try {
                this.regions = await useApi(`/v1/regions`, {
                    method: 'GET'
                });
            } catch (e) {
                console.error(e);
            }
        }
    }
})