export const API_DOMAIN = import.meta.env.VITE_API_DOMAIN || window.location.href;
export const API_PREFIX = import.meta.env.VITE_API_PREFIX;
export const REFRESH_INTERVAL = 1000;
export const IS_LOADBALANCER_ENABLED = import.meta.env.VITE_LOADBALANCER === 'true';
export const IS_DISPLAY_PRICES_ENABLED = import.meta.env.VITE_DISPLAY_PRICES === 'true';
