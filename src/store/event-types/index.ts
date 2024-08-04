import { defineStore } from 'pinia';
import { useApi } from '@/composable/useApi';

interface EventType {
    id: string;
    name: string;
    color: string | null;
}

export const useEventTypesStore = defineStore('eventTypes', {
    state: () => ({
        eventTypes: [] as EventType[], // Массив для хранения типов мероприятий
    }),

    getters: {
        getEventTypes: (state) => state.eventTypes, // Геттер для получения типов мероприятий
    },

    actions: {
        async fetchEventTypes() {
            try {
                const response = await useApi<EventType[]>('v1/event-types', {
                    method: 'GET',
                });
                this.eventTypes = response;
            } catch (error) {
                console.error('Error fetching event types:', error);
            }
        },
    },
});