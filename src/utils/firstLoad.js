export let isFirstLoad = true; export function clearFirstLoad() { setTimeout(() => { isFirstLoad = false; }, 2500); }
