import {defineStore} from 'pinia';
import {School} from './interfaces/interfaces';
import {useApi} from "@/composable/useApi";
import {Group} from "@/store/groups/fetchGroups";

interface SchoolState {
    schools: School[];
    authToken: string;
    isLoading: boolean;
    currentSchool: School | undefined;
    currentSchoolId: string | undefined;
    schoolGroups: Group[];
}

export const useSchoolStore = defineStore('schoolStore', {
    state: (): SchoolState => ({
        schools: [],
        authToken: '',
        isLoading: false,
        currentSchool: undefined,
        currentSchoolId: undefined,
        schoolGroups: []
    }),

    getters: {
        getCurrentSchool: (state) => state.currentSchool,
        getCurrentSchoolId: (state) => state.currentSchoolId,
        getSchools: (state) => state.schools,
        getSchoolGroups: (state) => state.schoolGroups
    },
    actions:{
        async fetchSchoolById(id: string) {
            this.isLoading = true;
            try {
                this.currentSchool = await useApi(`/v1/schools/${id}`, {
                    method: 'GET'
                });
                this.currentSchoolId = id;
            } catch (error) {
                console.error('Error fetching school:', error);
            } finally {
                this.isLoading = false;
            }
        },

        async fetchSchools() {
            this.isLoading = true;
            try {
                this.schools = await useApi(`/v1/schools`, {
                    method: 'GET'
                });
            } catch (error) {
                console.error('Error fetching schools:', error);
            }finally {
                this.isLoading = false;
            }
        },
        async fetchGroupsBySchoolId(id: string) {
            this.isLoading = true;
            try {
                this.schoolGroups = await useApi(`/v1/groups`, {
                    method: 'GET'
                });
            } catch (error) {
                console.error('Error fetching groups for school:', error);
            } finally {
                this.isLoading = false;
            }
        },

        async addCoordinatesSchool(schoolId: string, latitude: number, longitude: number) {
            try {
                const response = await useApi(`/v1/locations`, {
                    method: 'POST',
                    data: {
                        schoolId,
                        latitude,
                        longitude
                    }
                })
                if (response?.id) {
                    await this.fetchSchoolById(response?.school?.id)
                }
                return response;
            } catch (e) {
                console.error(e)
            }
        }
    }
});
