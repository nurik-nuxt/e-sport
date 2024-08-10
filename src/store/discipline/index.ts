import { defineStore } from 'pinia';
import { useApi } from '@/composable/useApi';

interface Discipline {
    id: string;
    title: string;
    iconLink: string | null;
    color: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    school: string | null;
}

export const useDisciplinesStore = defineStore('disciplines', {
    state: () => ({
        disciplines: [] as Discipline[]
    }),

    getters: {
        getDisciplines: (state) => state.disciplines
    },

    actions: {
        async fetchDisciplines() {
            try {
                this.disciplines = await useApi<Discipline[]>('v1/disciplines', {
                    method: 'GET'
                });
            } catch (e) {
                console.error('Failed to fetch disciplines:', e);
            }
        }
    }
});