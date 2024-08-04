export default function createPersistedStateWithExpiration(options) {
    const { key = 'vuex', storage = window.localStorage, expiration = 3600000 } = options;
    return store => {
        const savedState = storage.getItem(key);
        if (savedState) {
            const { state, timestamp } = JSON.parse(savedState);
            if (new Date().getTime() - timestamp < expiration) {
                store.replaceState(Object.assign({}, store.state, state));
            } else {
                storage.removeItem(key);
            }
        }
        store.subscribe((mutation, state) => {
            const data = {
                state,
                timestamp: new Date().getTime()
            };
            storage.setItem(key, JSON.stringify(data));
        });
    };
}
