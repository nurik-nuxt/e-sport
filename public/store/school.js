// store/school.js
import axios from 'axios';

export default {
    namespaced: true,
    state() {
        return {
        school: null,
        loading: false,
        };
    },
    getters: {
        school: state => state.school,
        isLoading: state => state.loading,
    },
    mutations: {
        setSchool(state, school) {
        state.school = school;
        },
        setLoading(state, loading) {
        state.loading = loading;
        }
    },
    actions: {
        async fetchSchool({ commit, rootGetters }, schoolId) {
        commit('setLoading', true);
        try {
            const authToken = rootGetters['postUser/authToken'];
            const response = await axios.get(`http://localhost:4004/v1/schools/${schoolId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
            });
            commit('setSchool', response.data);
            commit('setLoading', false);
        } catch (error) {
            console.error('Error fetching school data:', error);
            commit('setLoading', false);
        }
        }
    }
};
