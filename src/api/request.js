import axios from 'axios'
// let Base64 = require('js-base64').Base64;
let music_base = import.meta.env.VITE_SITE_MUSIC;
let base = import.meta.env.VITE_SITE_BASE;
let requestHead = {
    headers: {
        // 'Authorization': 'Basic ' + Base64.encode('6143668863428a8ec3eceebf9d251183'),
        'Access-Control-Allow-Origin': '*',
        'key':import.meta.env.VITE_SITE_BASEKEY,
        'base':base,
        'xhrFields': { withCredentials: true },
        'axios':{withCredentials: true},
        
    }
};



export function get(url) {
    return axios.get(base + url, requestHead)
        .then(res => {
            if (res.status !== 200) return null;
            return res.data;
        }).catch(err => {
            console.error(err);
            // window.vue.$message.error(err.message);
            // window.vue.$store.commit('changeLonding', false);
            return err;
        });
};
// 网易云get
export function getmusic(url) {
    return axios.get(music_base + url, requestHead)
        .then(res => {
            if (res.status !== 200) return null;
            return res.data;
        }).catch(err => {
            console.error(err);
            // window.vue.$message.error(err.message);
            // window.vue.$store.commit('changeLonding', false);
            return err;
        });
};
// 网易云post
export function postmusic(url) {
    return axios.post(music_base + url, requestHead)
        .then(res => {
            if (res.status !== 200) return null;
            return res.data;
        }).catch(err => {
            console.error(err);
            // window.vue.$message.error(err.message);
            // window.vue.$store.commit('changeLonding', false);
            return err;
        });
};

export function post(url, data) {
    return axios.post(base + url, data, requestHead)
        .then(res => {
            if (res.status !== 200) return null;
            return res;

        }).catch(err => {
            console.error(err); //输出日志
            // window.vue.$message.error(err.message);
            // window.vue.$store.commit('changeLonding', false);
            return null;
        })
};

export function del(url) {
    return axios.delete(base + url, requestHead)
        .then(res => {
            if (res.status !== 200) return null;
            return res.data.data;
        }).catch(err => {
            console.error(err);
            // window.vue.$message.error(err.message);
            // window.vue.$store.commit('changeLonding', false);
            return null;
        });
}

export function put(url, data) {
    return axios.put(base + url, data, requestHead)
        .then(res => {
            if (res.status !== 200) return null;
            return res.data;
        }).catch(err => {
            console.error(err);
            // window.vue.$message.error(err.message);
            // window.vue.$store.commit('changeLonding', false);
            return null;
        })
}

// /**
//  * 
//  * @param {*} searchKey 
//  * @param {*} index 
//  * @param {*} size 
//  * @returns 
//  */
// export const getUserApi = (searchKey, index, size) => {
//     return get(`/api/user?searchKey=${searchKey}&index=${index}&size=${size}`);
// }