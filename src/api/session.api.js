import { request } from './request';
//user infomation
export const createsession = (data) => request('post', `/session/`, data);
export const getsessions = () => request('get', `/session/`);
export const getcompletedtutorials = () => request('get', `/session/completedtutorials`);
export const getuncompletedtutorials = () => request('get', `/session/uncompletedtutorials`);


