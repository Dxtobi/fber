import { writable, derived } from 'svelte/store';

/**
 * @typedef {Object} FormElement
 * @property {number} id
 * @property {Object} position
 * @property {number} position.x
 * @property {number} position.y
 * @property {Object} styles
 */

/** @type {import('svelte/store').Writable<{ elements: FormElement[], selectedElementId: number | null, nextId: number }>} */
export const formStore = writable({
  elements: /** @type {FormElement[]} */ ([]),
  selectedElementId: null,
  nextId: 1
});

export const selectedElement = derived(
  formStore,
  $formStore => $formStore.elements.find(el => el.id === $formStore.selectedElementId)
);

/**
 * @param {any} element
 */
export function addElement(element) {
  // @ts-ignore
  formStore.update(store => {
    const newElement = {
      ...element,
      id: store.nextId,
      position: { x: 100, y: 100 },
      styles: {}
    };
    return {
      ...store,
      elements: [...store.elements, newElement],
      nextId: store.nextId + 1,
      selectedElementId: newElement.id
    };
  });
}

/**
 * @param {any} id
 * @param {any} updates
 */
export function updateElement(id, updates) {
  formStore.update(store => ({
    ...store,
    elements: store.elements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    )
  }));
}

/**
 * @param {null} id
 */
export function deleteElement(id) {
  formStore.update(store => ({
    ...store,
    elements: store.elements.filter(el => el.id !== id),
    selectedElementId: store.selectedElementId === id ? null : store.selectedElementId
  }));
}

/**
 * @param {any} id
 */
export function selectElement(id) {
  formStore.update(store => ({
    ...store,
    selectedElementId: id
  }));
}