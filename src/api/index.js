import {
    get,
    getmusic,
    postmusic
} from './request.js'

export const INDEXKEY = import.meta.env.VITE_SITE_BASEKEY;

export const gettiangou = (key) => {
    return get(`/tiangou/index?key=${key}`);
}
// ?key=${Key}
// 获取热搜

export const gethotpoint = (key)=>{
    return get(`/networkhot/index?key=${key}`);
}

// 网易云热评
export const getcloudhotpoint = (key)=>{
    return get(`/hotreview/index?key=${key}`);
}

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


// 获取验证码
// 验证码登录
export const  captcha= (phone)=>{
    // return getmusic (`/lyric/new?id=${id}`)
    return getmusic (`/captcha/sent?phone=${phone}`)
}

export const  captchalogin = (phone,password,captcha,realIP)=>{
    // return getmusic (`/lyric/new?id=${id}`)
    return getmusic (`/login/cellphone?phone=${phone}&password=${password}&captcha=${captcha}?realIP${realIP}`)
}
// 验证验证码是否正确
export const captchaconfine = (phone,captcha)=>{
    return getmusic(`/captcha/verify?phone=${phone}&captcha=${captcha}`) 
}