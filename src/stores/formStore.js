
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
        // console.log('changed:', value)
        localStorage.setItem('formStore', JSON.stringify(value));
    });
}

/**
 * @param {any} id
 * @param {any} property
 * @param {any} value
 */
// @ts-ignore
export function updateFormStoreValue(id, property, value){
    // @ts-ignore
    formStore.update((elements) => {
      const updatedElements = elements.map((el) =>
        // @ts-ignore
        el.id === id ? { ...el, properties: { ...el.properties, [property]: value } } : el
      );
      console.log("UPDATED:", updatedElements)
      return updatedElements;
    });
}