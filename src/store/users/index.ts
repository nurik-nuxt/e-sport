import {defineStore} from "pinia";
import type {Coach} from "@/utils/models";
import {useApi} from "@/composable/useApi";

interface User {
    id: string;
    role: number;
    iin: string;
    biography: string;
    awards: string | null;
    firstName: string;
    birth_date: string;
    middleName: string;
    phoneNumber: string;
    lastName: string;
    profileImage: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export const useUserStore = defineStore('users', {
    state: () => ({
        coaches: [] as Coach[],
        currentSchoolCoaches: [] as Coach[],
        users: [] as User[],
        sportsmens: [] as Coach[]
    }),

    getters: {
        getCoaches: (state) => state.coaches,
        getCurrentSchoolCoaches: (state) => state.currentSchoolCoaches,
        getCurrentSchoolSportsmens: (state) => state.sportsmens
    },

    actions: {
        async fetchUsersByRole(roleId: number) {
            try {
                const response = await useApi(`/v1/users/role/${roleId}`);
                this.users = response.map((user: any) => ({
                    id: user.id,
                    role: user.role,
                    iin: user.iin,
                    biography: user.biography,
                    awards: user.awards,
                    firstName: user.firstName,
                    birth_date: user.birth_date,
                    middleName: user.middleName,
                    phoneNumber: user.phoneNumber,
                    lastName: user.lastName,
                    profileImage: user.profileImage,
                    password: user.password,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                    deletedAt: user.deletedAt
                }));
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        },
        async loadCoachesBySchool(schoolId: string){
            try {
                this.currentSchoolCoaches = await useApi(`/v1/schools/${schoolId}/coaches`)
            } catch (e) {
                console.error(e)
            }
        },
        async loadCoaches(){
            try {
                const response = await useApi(`/v1/users/role/3`, {
                    method: 'GET'
                })
                console.log(response);
            } catch (e) {
                console.error(e)
            }
        },
        async loadSportsmensBySchool(schoolId: string){
            try {
                this.sportsmens = await useApi(`/v1/schools/${schoolId}/sportsmen`, {
                    method: 'GET'
                });
            } catch (e) {
                console.error(e)
            }
        }
    }
})