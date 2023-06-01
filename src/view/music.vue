<script setup>
import { h, ref, reactive, onMounted } from 'vue'
import { searchmusic, urlmusic } from "../api/index"
import debounce from "../utils/debounce.js"
import { mainStore } from "../store/index";
import { ElNotification } from 'element-plus'
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
const musicurl = ref("https://service-l6zvr0v9-1318496409.sh.apigw.tencentcs.com//song/url/v1?id=2046562196&level=lossless")
// leval可以调节音乐品质 默认无损 standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res, jyeffect => 鲸云臻音, jymaster => 鲸云母带
const leval = ref('lossless')
// audio 播放器
const audioRef = ref()
// 自动播放
const autoplay =ref("true")

// 搜素
const getmusicData = () => {
    console.log(keywords.value)
    musiclistshow.value = true
    searchmusic(keywords.value).then((res) => {

        if (res.code = 200) {
            musiclistshow.value = false
            console.log(res)
            music_list_date.value = res.result.songs
        }
        else {
            throw console.error();
        }
    })
};



// 播放音乐
const playmusic = (id) => {
    // leval可以调节音乐品质 默认无损
    urlmusic(id, leval.value).then((res) => {
        if (res.code = 200) {
            // console.log(res)
            // 获取播放链接
            // console.log("url:"+res.data[0].url)
            musicurl.value = res.data[0].url
            console.log("url:" + musicurl.value)
            
            // 通知
        }
        else {
            throw console.error();
        }
    })
}

// 更新搜素数据
const updatemusicData = () => {

    ElNotification({
        title: '提醒',
        message: h('i', { style: 'color: teal' }, '找到了喵'),
    })
    // 防抖
    debounce(() => {
        getmusicData();
    }, 500);

};

// 播放防抖
const updateplaymusic = (id) => {
    ElNotification({
        title: '提醒',
        message: h('i', { style: 'color: teal' }, '现在开始播放喵'),
    })
    // 防抖
    debounce(() => {
        playmusic(id);
    }, 1000);
    // 播放 暂停也同理
    audioRef.value?.play()
};


onMounted(() => {
    // getmusicData(input);
});




</script>


<template>
    <div class="music" v-show="store.musicOpenState">

        <div class="searchfuc cards">
            <el-input v-model="keywords" placeholder="请输入关键词" clearable @keyup.enter.native="updatemusicData" />

            <div class="search_icon " @click="updatemusicData">
                <img src="../assets/search.svg" alt="">
            </div>
        </div>
        <!-- 音乐播放容器 -->
        <div class="player-contiain">
            <audio controls ref="audioRef" :autoplay="autoplay" :src="musicurl">

                <!-- <source  type="audio/mpeg" /> -->
            </audio>
        </div>

        <div class="music_list ">
            <!-- <el-skeleton :rows="1" animated v-show="musiclistshow" :loading="loading"/> -->
            <!-- 内容骨架屏 -->
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



            <div class="music_list_item cards" v-for="(item, index) in music_list_date" @click="updateplaymusic(item.id)">
                <el-text class="mx-1" size="large">{{ item.name }}</el-text>

            </div>
        </div>

    </div>
</template>


<style scoped lang='scss'>
.music {
    .searchfuc {
        display: flex;
        justify-content: center;
        width: 400px;
        margin: 10px 0;
        height: 40px;
    }

    .music_list {
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
        height: 39.2px;
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
        height: 100px;
        line-height: 100px;
        text-align: center;
        // background-color: #fff;
        margin-bottom: 10px;

        .el-text {
            --el-text-color: #ffffff;
        }
    }
}
</style>