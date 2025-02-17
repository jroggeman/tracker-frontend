import { defineStore } from 'pinia'

// TODO Maybe should be a setup store - a bit cleaner looking
// than the magic syntax
// TODO how to make durable across refreshes
// how to make secure as well
const useTokenStore = defineStore('tokens', {
    state: () => ({ tokenValue: '', loggedIn: false}),
    getters: {
        isLoggedIn: (s) => s.loggedIn,
        token: (s) => s.tokenValue,
    },
    actions: {
        logInWithToken(t) {
            this.tokenValue = t;
            this.loggedIn = true;
        },
        logOut() {
            this.tokenValue = '';
            this.loggedIn = false;
        }
    }
});

export { useTokenStore };
