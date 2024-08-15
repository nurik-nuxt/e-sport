import {defineStore} from 'pinia';
import {useApi} from '@/composable/useApi';

export interface Group {
    id: string;
    color: string;  // Ensure the color property is included
    discipline: {
        title: string;
    };
    coach: {
        firstName: string;
        middleName: string;
        lastName: string;
    };
    name: string;
    price: string;
}
export interface Discipline {
    id: string;
    title: string;
    iconLink: string;
    color: string;
}
export interface Coach {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    phoneNumber: string;
    profileImage: string;
}


export const useGroupStore = defineStore('groupStore',{
    state: () => ({
        groups: [] as Group[],
        currentSchoolGroups: [] as Group[],
        disciplines: [] as Discipline[],
        coaches: [] as Coach[],
        isLoading: false,
        currentGroupMembers: [] as any
    }),
    getters: {
        getCurrentSchoolGroups: (state) => state.currentSchoolGroups,
        getDisciplines: (state) => state.disciplines,
        getCoaches: (state) => state.coaches,
        getCurrentGroupMembers: (state) => state.currentGroupMembers
    },

    actions: {
        async loadGroups() {
            try {
                this.groups = await useApi<Group[]>('v1/groups');
            } catch (error) {
                console.error('Failed to load groups:', error);
            }
        },

        async loadGroupsBySchool(schoolId: string) {
            try {
                this.currentSchoolGroups = await useApi<Group[]>(`v1/groups/by-school/${schoolId}`);
            } catch (error) {
                console.error(`Failed to fetch groups for school ${schoolId}:`, error);
            }
        },
        async loadDisciplines() {
            try {
                this.disciplines = await useApi<Discipline[]>('v1/disciplines/');
            } catch (error) {
                console.error('Failed to load disciplines:', error);
            }
        },
        async loadCoaches() {
            try {
                const response = await useApi<Coach[]>('v1/users/role/3');
                this.coaches = response.map((coach: any) => ({
                    id: coach.id,
                    firstName: coach.firstName,
                    middleName: coach.middleName,
                    lastName: coach.lastName,
                    phoneNumber: coach.phoneNumber,
                    profileImage: coach.profileImage
                }));
            } catch (error) {
                console.error('Failed to load coaches:', error);
            }
        },

        async loadGroupMembersByGroupId(id: string) {
            try {
                this.currentGroupMembers = await useApi(`/v1/groups/${id}/members`, {
                    method: 'GET'
                });
            } catch (e) {
                console.error(e)
            }
        },

        async addSportsmenToGroup(id: string, memberIds: string[]) {
            try {
                const response = await useApi(`/v1/groups/${id}/members`, {
                    method: 'PUT',
                    data: {
                        memberIds
                    }
                })
                console.log(response)
                return response;
            } catch (e) {
                console.error(e)
            }
        },

        async deleteSportsmenToGroup(id: string, memberIds: string[]) {
            try {
                return await useApi(`/v1/groups/${id}/members`, {
                    method: 'DELETE',
                    data: {
                        memberIds
                    }
                });
            } catch (e) {
                console.error(e)
            }
        }
    }
});
