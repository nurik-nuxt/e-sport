import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useApi } from '@/composable/useApi';

interface Event {
    id: string;
    name: string;
    description: string;
    application_deadline: string;
    thumbnail: string;
    sport_id: string;
    startDate: string;
    endDate: string;
    organizer: string;
    school_id: string;
    event_type_id: string;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
    photo?: string;
    prizePool?: string;
    event_status: string;
    types: EventType[];
    discipline: Discipline[];
    participants: Participant[];
    winners: Winner[];
    city: string;
}

interface Participant {
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

interface Winner {
    id: string;
    medal: string;
    user: Participant;
}
interface EventType {
    id: string;
    name: string;
    color: string | null;
}

interface Discipline {
    id: string;
    title: string;
    iconLink: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export const useEventStore = defineStore('eventStore', () => {
    const events = ref<Event[]>([]);
    const selectedEvent = ref<Event | null>(null);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const fetchEvents = async () => {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await useApi<Event[]>('v1/events');
            if (response) {
                console.log('API response:', response);
                events.value = response.map(event => ({
                    ...event,
                    thumbnail: event.thumbnail || 'https://i.postimg.cc/vTcV4sgF/1472020650855kv-1000x768.jpg'
                }));
                console.log('Processed events:', events.value);
            }
            events.value = response;
        } catch (err) {
            error.value = 'Error fetching events';
            console.error('Error fetching events:', error);
        }finally {
            isLoading.value = false;
        }
    };

    const setSelectedEvent = (event: Event) => {
        selectedEvent.value = event;
    };

    const fetchEventById = (id: string) => {
        const event = events.value.find(event => event.id === id);
        if (event) {
            setSelectedEvent(event);
        }else {
            error.value = `Event with ID ${id} not found`;
        }
    };

    const hasEvents = computed(() => events.value.length > 0);
    return {
        events,
        selectedEvent,
        isLoading,
        error,
        fetchEvents,
        setSelectedEvent,
        fetchEventById,
        hasEvents,
    };
});