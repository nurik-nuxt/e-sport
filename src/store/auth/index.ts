import {defineStore} from "pinia";
import {useApi} from "@/composable/useApi";
import type {User} from "@/utils/models";

const EXPIRATION_TIME = 60 * 60 * 2000;

export const useAuthStore = defineStore('auth', {
    state: () => ({
        message: '' as string,
        iin: undefined as number | undefined,
        authToken: '' as string,
        timestamp: Date.now()
    }),

    getters: {
        getMessage: (state) => state.message,
        getIin: (state) => state.iin,
        getAuthToken: (state) => state.authToken
    },

    actions: {
        updateMessage(message: string) {
            this.message = message;
            this.timestamp = Date.now();
            this.saveState();
        },
        updateIin(iin: number) {
            this.iin = iin;
            this.timestamp = Date.now();
            this.saveState();
        },
        setAuthToken(authToken: string) {
            this.authToken = authToken;
            localStorage.setItem('authToken', authToken);
            this.timestamp = Date.now();
            this.saveState();
        },
        clearUserData() {
            this.message = '';
            this.iin = undefined;
            this.authToken = '';
            localStorage.removeItem('authToken');
            this.timestamp = Date.now();
            this.saveState();
        },
        saveState() {
            const stateToSave = {
                ...this.$state,
                timestamp: Date.now()
            };
            localStorage.setItem('authStore', JSON.stringify(stateToSave));
        },
        loadState() {
            const savedState = localStorage.getItem('authStore');
            if (savedState) {
                const parsedState = JSON.parse(savedState);
                const currentTime = Date.now();
                if (currentTime - parsedState.timestamp < EXPIRATION_TIME) {
                    this.$state = parsedState;
                } else {
                    localStorage.removeItem('authStore');
                }
            }
        },

        async addUser(userData: User) {
            try {
                return await useApi(`/v1/auth/signup`, {
                    method: 'POST',
                    data: userData
                });
            } catch (e) {
                console.log(e)
                return e
            }
        }
    }
})