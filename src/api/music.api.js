import { request } from './request'
export const getallmusics = () => request('get', `/music/all`);