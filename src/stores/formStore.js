
import { writable } from 'svelte/store';

export const formStore = writable([]);

// Check if running in a browser environment
if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    // Load initial data from localStorage
    const storedData = localStorage.getItem('formStore');
    if (storedData) {
        formStore.set(JSON.parse(storedData));
    }

    // Subscribe to store changes and save to localStorage
    formStore.subscribe((value) => {
        localStorage.setItem('formStore', JSON.stringify(value));
    });
}