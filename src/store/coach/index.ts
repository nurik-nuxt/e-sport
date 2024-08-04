import { defineStore } from 'pinia';
import { useApi } from '@/composable/useApi';

interface Coach {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    biography: string;
    phoneNumber: string;
    profileImage: string;
}

export const useCoachStore = defineStore('coach', {
    state: () => ({
        coach: null as Coach | null
    }),
    actions: {
        async fetchCoach(disciplineId: string, userId: string) {
            try {
                const response = await useApi('v1/groups/coach', {
                    params: { disciplineId, userId }
                });
                this.coach = response;
            } catch (error) {
                console.error('Failed to fetch coach:', error);
                this.coach = null;
            }
        }
    }
});
