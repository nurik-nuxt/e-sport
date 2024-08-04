// store/postUser.js
const state = () => ({
    auth: '',
    iin: '',
    authToken: '' // Add authToken to the state
});

const getters = {
    auth: (state) => state.auth,
    iin: (state) => state.iin,
    authToken: (state) => state.authToken // Getter for authToken
};

const mutations = {
    setMessage(state, auth) {
        console.log("setMessage mutation called here", auth)
        state.auth = auth;
    },
    setIin(state, iin) {
        console.log('setIin mutation called with:', iin); // Debug log
        state.iin = iin;
    },
    setAuthToken(state, token) {
        state.authToken = token; // Mutation to set authToken
        console.log('setAuthToken mutation called with:', token);
    },
    clearUserData(state) {
        state.auth = '';
        state.iin = '';
        state.authToken = '';
    },
};

const actions = {
    updateMessage({ commit }, auth) {
        console.log('updateMessage action called with:', auth);
        commit('setMessage', auth);
    },
    updateIin({ commit }, iin) {
        console.log('updateIin action called with:', iin); // Debug log
        commit('setIin', iin);
    },
    updateAuthToken({ commit }, token) {
        commit('setAuthToken', token); // Action to update authToken
    },
    logout({ commit }) {
        return new Promise((resolve) => {
            commit('clearUserData');
            resolve();
        });
    },
};
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
