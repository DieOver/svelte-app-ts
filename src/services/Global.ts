import { writable } from 'svelte/store';

export const Global = {
    name: writable('ANONYMOUS')
};