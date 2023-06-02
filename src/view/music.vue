<script setup>
import { h, ref, reactive, onMounted, watch } from 'vue'
import { searchmusic, urlmusic } from "../api/index"
import debounce from "../utils/debounce.js"
import { mainStore } from "../store/index";
import { ElNotification, ElMessage } from 'element-plus'
import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
} from '@element-plus/icons-vue'

const store = mainStore();

const keywords = ref("")

const musiclistshow = ref(false);
const music_list_date = ref([])
// 歌曲播放默认链接
const musicurl = ref('')
// leval可以调节音乐品质 默认无损 standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res, jyeffect => 鲸云臻音, jymaster => 鲸云母带
const leval = ref('standard')
// audio 播放器
const audioRef = ref('')
// 自动播放
const autoplay = ref("true")
// index
const selectIndex = ref('-1')
// 当前播放的专辑图片url
const playimgurl = ref('')
const palytitle = ref('')
// 播放状态
const playingstate = ref(false)

// 改变index
const decChange = (index) => {
    selectIndex.value = index;
    //  console.log("selectIndex："+selectIndex.value)
}


// audio :{
//  /**
//              * audio自身事件
//              * */
// play: false,
// }


// 搜素
const getmusicData = () => {
    console.log(keywords.value)
    musiclistshow.value = true
    searchmusic(keywords.value).then((res) => {

        if (res.code = 200) {
            musiclistshow.value = false
            console.log(res)
            music_list_date.value = res.result.songs
            // author.value= res.data[0]
        }
        else {
            throw console.log(error);
        }
    })
};

// 暂停播放

// const onpause =  watch(audioRef,(value,playing) =>{
//     console.log('监听的数据',value,playing)
//     // audioRef.value.pause
// })

// 还未实现封面暂停
// watch(
//     () => audioRef._value.paused,
//     (value, oldValue) => {
//       console.log(value, oldValue)
//     }, {}
//   )




// 播放音乐
const playmusic = (id) => {
    // leval可以调节音乐品质 默认无损
    urlmusic(id, leval.value).then((res) => {
        if (res.code = 200) {
            console.log("播放音乐res：", res)
            // 获取播放链接
            musicurl.value = res.data[0].url
            playingstate.value=true;
            // audio paly
         
            // console.log("url:" + musicurl.value)
        }
        else {
            throw console.log(error);
        }
    })
}

// 更新搜素数据
const updatemusicData = () => {

    ElNotification({
        title: '提醒',
        message: h('i', { style: 'color: teal' }, '正在努力检索喵~'),
    })

    // 防抖
    debounce(() => {
        getmusicData();
    }, 500);

};

// 播放防抖
const updateplaymusic = (id, index, name) => {
    // 处理index
    decChange(index)
    // 获取当前播放图片的url
    playimgurl.value=music_list_date._rawValue[index].al.picUrl;
    palytitle.value
    ElNotification({
        title: '提醒',
        message: h('i', { style: 'color: teal' }, '等待加载一会儿喵'),
    })
    // 防抖
    debounce(() => {
        playmusic(id);
       console.log(music_list_date._rawValue[index].al.picUrl) 
        // 提醒
        ElMessage({
            message: '喵喵：' + name + "惹~",
            type: 'success',
        })
    }, 100);
 


};


onMounted(() => {
    // getmusicData(input);
    // onpause()
});




</script>


<template>
    <div class="music" v-show="store.musicOpenState">
        <div class="music-top">
            <div class="searchfuc cards">
                <el-input v-model="keywords" placeholder="请输入关键词" clearable @keyup.enter.native="updatemusicData" />

                <div class="search_icon " @click="updatemusicData">
                    <img src="../assets/search.svg" alt="">
                </div>
            </div>
            <!-- 音乐播放容器 -->
            <div class="player-contiain" v-show="playingstate">
                <audio controls ref="audioRef" :autoplay="autoplay" :src="musicurl">
                </audio>
            </div>
        </div>

        <div class="music_list ">

            <el-skeleton style="width: 100%" direction="vertical" alignment="flex-start" :loading="musiclistshow" animated
                class="content-skeleton">
                <template #template>
                    <div class="avatar" style="display: flex; align-items: center;">
                        <el-skeleton-item variant="circle"
                            style="margin-bottom: 12px; width: 48px; height: 48px; background-color: #aaa;" />
                        <div style="
                                    display: flex; 
                                    flex-direction: column; 
                                    position: relative; 
                                    bottom: 6npmpx;
                                    margin-left: 8px;">
                            <el-skeleton-item variant="text" style="width: 80px; margin-bottom: 8px;" />
                            <el-skeleton-item variant="text" style="width: 50px;" />
                        </div>
                    </div>
                    <el-skeleton-item variant="rect" style="width: 100%; height: 240px; background-color: #aaa;" />
                    <div style="padding: 12px 14px 0 0">
                        <el-skeleton-item variant="h1" style="width: 50%;" />
                        <el-skeleton-item variant="text" style="margin-top: 8px; margin-right: 16px" />
                    </div>
                </template>
            </el-skeleton>

            <div class="music_list--left">
                <div class="music_list_item cards" ref="" :class="[index == selectIndex ? 'acitve' : '']"
                    v-for="(item, index) in music_list_date" @click="updateplaymusic(item.id, index, item.name)">
                    <span class="cur"></span>
                    <span class="music_list_number">{{ index + 1 }}</span>
                    <el-text class="mx-1" size="large">{{ item.name }}</el-text>
                    <span class="author">{{ item.ar[0].name }}</span>

                </div>

            </div>



        </div>

        <!-- 详细信息 -->
        <div class="music_list_maininfo" v-show="playingstate">
            <div class="music_list_maininfo--top">
                <span></span>
                <img class="animation2"  :src="playimgurl" alt="">
            </div>
           

        </div>


    </div>
</template>


<style scoped lang='scss'>
.music {
    width: 720px;
    margin-top: 200px;
    position: relative;

    .player-contiain {
        height: 40px;

        audio {
            height: 40px;
        }
    }

    .music_list_number {
        margin-right: 12px;
    }

    .music-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .searchfuc {
        display: flex;
        justify-content: center;
        width: 400px;
        margin: 10px 0;
        height: 40px;
    }

    .music_list_maininfo {
        width: 320px;
        height: 200px;
        position: absolute;
        right: 0;
        top: 60px;

        img {
            width: 200px;
            height: 200px;
        }
        .animation1 {
        width: 200px;
        height: 200px;
        border: 1px solid white;
        border-radius: 100px;
        overflow: hidden;
        float: left;
        animation: frame 6s linear paused;
    }

    .animation2 {
        width: 200px;
        height: 200px;
        border: 1px solid white;
        border-radius: 100px;
        overflow: hidden;
        float: left;
        animation: rotate 20s linear infinite;
    }
    }

    .music_list {
        height: auto;
        max-height: 420px;
        overflow: hidden;
        box-sizing: content-box;
        overflow-y: auto;
        box-shadow: 0 2px 2px 0 rgb(0 0 0 / 7%), 0 1px 5px 0 rgb(0 0 0 / 10%);
        line-height: initial;
        position: relative;
        background: transparent;
        background: rgba(255, 255, 255, 0.1);
        width: 400px;
        border-radius: 5px;

        // 活跃样式
        .acitve {
            background: rgba(255, 255, 255, 0.54) !important;
            border-radius: 6px !important;
        }

        .el-skeleton.is-animated {
            background-color: #ffffff;
            border-radius: 10px;
        }
    }

    .search_icon {
        z-index: 555;
        margin-left: -40px;
        width: 40px;
        background-color: #fff;
        height: 38.2px;
        border-radius: 20%;

        img {
            width: 30px;
            padding: 5px 5px 0px;
            height: 35px;
        }
    }

    .search_icon:hover {
        background-color: rgb(0, 0, 0, 0.09);
        transform: scale(1.05);
        border-radius: 20%;
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
        transform: scale(1.009);
        transition: all 0.3s;
    }

    .music_list_item {
        span.author {
            position: absolute;
            right: 1em;
            text-align: left;
            font-size: 11pt;
            width: 24%;
            overflow: hidden;
            white-space: nowrap;
            word-break: keep-all;
            text-overflow: ellipsis;
        }

        background: rgba(255, 255, 255, 0.2509803922);
        border-radius: 6px;
        border-color: transparent;
        position: relative;
        height: 32px;
        line-height: 32px;
        padding: 0 15px;
        font-size: 12px;
        cursor: pointer;
        -webkit-transition: all 0.2s ease;
        transition: all 0.2s ease;
        overflow: hidden;
        margin: 0px 5px 0px 5px;
        text-align: start;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;

        .el-text {
            --el-text-color: #ffffff;
            display: inline-block;
            width: 67%;
            overflow: hidden;
            white-space: nowrap;
            word-break: keep-all;
            text-overflow: ellipsis;
        }



    }

    .music_list_item:hover {
        background: rgba(255, 255, 255, 0.54) !important;
        border-radius: 6px !important;
    }


}

.music_list_item.cards.acitve {
    .cur {
        width: 3px;
        height: 22px;
        position: absolute;
        left: 1px;
        top: 5px;
        -webkit-transition: background-color .3s;
        transition: background-color .3s;
        background-color: #fffeee;


    }

}
</style>