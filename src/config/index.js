// 跨域代理前缀
const API_PROXY_PREFIX = '/api'
export const AJAX_BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_AJAX_BASE_URL : API_PROXY_PREFIX
export const AJAX_TIME = process.env.VUE_APP_AJAX_TIME
