import { defineStore } from 'pinia';

export const useUserProfileStore = defineStore('userProfile', {
    state: () => ({
        schoolId: '',
        userDetails: {}
    }),
    actions: {
        setUserDetails(user) {
            this.userDetails = user;
            this.schoolId = user.school.id;
        }
    }
});