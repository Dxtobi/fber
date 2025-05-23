
import { writable } from 'svelte/store';

export const publishedFormStore = writable([]);

export const publishedFormStoreLoading = writable(false);

if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    // Load initial data from localStorage
    const storedData = localStorage.getItem('publishedFormStore');
    if (storedData) {
        publishedFormStore.set(JSON.parse(storedData));
    }

    
    publishedFormStore.subscribe((value) => {
        // console.log('changed:', value)
        localStorage.setItem('publishedFormStore', JSON.stringify(value));
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
    publishedFormStore.update((elements) => {
      const updatedElements = elements.map((el) =>
        // @ts-ignore
        el.id === id ? { ...el, properties: { ...el.properties, [property]: value } } : el
      );
      console.log("UPDATED:", updatedElements)
      return updatedElements;
    });
}