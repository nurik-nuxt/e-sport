import { defineStore } from 'pinia';

interface School {
    id: string;
    name: string;
    title: string;
    cityId: string;
    description: string;
    rating: number;
    images: string[];
    address: string;
    workingStartTime: string;
    workingEndTime: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

interface Participant {
    id: string;
    role: number;
    iin: string;
    rating: number;
    biography: string;
    firstName: string;
    birth_date: string;
    middleName: string;
    phoneNumber: string;
    lastName: string;
    profileImage: string;
    gallery: null | string;
    password: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    school: School;
}

export const useParticipantStore = defineStore('participantStore', {
    state: () => ({
        participants: [] as Participant[],
        selectedEventId: '' as string,
    }),
    actions: {
        setParticipants(participants: Participant[]) {
            this.participants = participants;
        },
        setSelectedEventId(eventId: string) {
            this.selectedEventId = eventId;
        },
        addParticipant(participant: Participant) {
            this.participants.push(participant);
        },
        removeParticipant(participantId: string) {
            this.participants = this.participants.filter(p => p.id !== participantId);
        },
    },
});
