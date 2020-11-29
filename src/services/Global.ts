import { writable } from 'svelte/store';

export const Global = {
    loadingPage: writable(false),
    isLoggedIn: false
};