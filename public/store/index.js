// import { createStore } from 'vuex';
// import postUser from './postUser';
// import school from './school';
// import createPersistedStateWithExpiration from './vuex-persistedstate-with-expiration';const store = createStore({
//     state() {
//         return {
//             isModalOpen: false,
//         };
//     },
//     getters:{
//         isModalOpen: (state) => state.isModalOpen,
//     },
//     mutations: {
//         toggleModal(state) {
//         state.isModalOpen = !state.isModalOpen;
//         },
//     },
//     actions: {
//         openModal({ commit }) {
//         commit('toggleModal', true);
//         },
//         closeModal({ commit }) {
//         commit('toggleModal', false);
//         },
//     },
//     modules:{
//         postUser,
//         school
//     },
//     plugins: [
//         createPersistedStateWithExpiration({
//             key: 'vuex',
//             storage: window.localStorage,
//             expiration: 3600000 // 1 hour in milliseconds
//         })
//     ]
// });
//
// export default store;
