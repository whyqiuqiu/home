import {
    get,
    getmusic
} from './request.js'

export const INDEXKEY = import.meta.env.VITE_SITE_BASEKEY;

export const gettiangou = (key) => {
    return get(`/tiangou/index?key=${key}`);
}
// ?key=${Key}


// 网易云data
const music_base = import.meta.env.VITE_SITE_MUSIC;

export const searchmusic= (keyworlds)=>{
    return getmusic(`/cloudsearch?keywords=${keyworlds}`);
    
}

// 获取歌曲url

export const urlmusic =(id,level)=>{
    return getmusic(`/song/url/v1?id=${id}&level=${level}`)
}


// 获取歌词
export const  urllyrics = (id)=>{
    // return getmusic (`/lyric/new?id=${id}`)
    return getmusic (`/lyric?id=${id}`)
}