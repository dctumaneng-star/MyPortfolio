export let isFirstLoad = true;
export function clearFirstLoad() { setTimeout(() => { isFirstLoad = false; }, 2500); }
export function resetFirstLoad() { isFirstLoad = true; }
