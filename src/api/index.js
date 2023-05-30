import {
    get
} from './request.js'

export const INDEXKEY = import.meta.env.VITE_SITE_BASEKEY;

export const gettiangou = (key) => {
    return get(`/tiangou/index?key=${key}`);
}
// ?key=${Key}