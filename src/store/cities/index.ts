import {defineStore} from "pinia";
import {useApi} from "@/composable/useApi";

// {
//     "id": "44e95195-a112-42f7-b2db-61e2c4421a8f",
//     "name": "Taraz",
//     "createdAt": "2024-07-21T10:01:54.111Z",
//     "updatedAt": "2024-07-21T10:01:54.111Z",
//     "deletedAt": null
// }

interface City {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}

export const useCitiesStore = defineStore('cities', {
    state: () => ({
        cities: [] as City[]
    }),

    getters: {
        getCities: (state) => state.cities
    },

    actions: {
        async fetchCities() {
            try {
                this.cities = await useApi(`/v1/cities`, {
                    method: 'GET'
                })
            } catch (e) {
                console.error(e)
            }
        }
    }
})