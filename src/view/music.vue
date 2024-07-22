<script setup>
import { h, ref, toRaw, nextTick, reactive, onMounted, watch } from "vue";
import { searchmusic, urlmusic, urllyrics,getcloudhotpoint,INDEXKEY } from "../api/index";
import debounce from "../utils/debounce.js";
import { mainStore } from "../store/index";
import { ElNotification, ElMessage } from "element-plus";
import {
  ArrowLeft,
  ArrowRight,
  VideoPlay,
  VideoPause,
  Delete,
  Edit,
  Share,
} from '@element-plus/icons-vue'
import { Change } from "@icon-park/vue-next";
import hotcomment from "./hotcomment.vue";
const store = mainStore();

const keywords = ref("");

const musiclistshow = ref(false);
const music_list_date = ref([]);
// 歌曲播放默认链接
const musicurl = ref("");
// leval可以调节音乐品质 默认无损 standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res, jyeffect => 鲸云臻音, jymaster => 鲸云母带
const leval = ref("standard");
// audio 播放器
const audioRef = ref("");
// 自动播放
const autoplay = ref("true");
// index
const selectIndex = ref("-1");
// 当前播放的专辑图片url
const playimgurl = ref("");
const palytitle = ref("");
// 播放状态
const playingstate = ref(false);
// 存储歌词信息
const playlyrics = ref("");
const lineArr = ref([]);

// 实际展示的歌词
const realsongsword = ref("");
// 最终取值的数组
const lyricsObjArr = ref([]);
const selectword = ref();
// 改变index
const decChange = (index) => {
  selectIndex.value = index;
  //  console.log("selectIndex："+selectIndex.value)
};

// audio currentTime
const time = ref([]);



// 搜素
const getmusicData = () => {
  console.log(keywords.value);
  musiclistshow.value = true;
  searchmusic(keywords.value).then((res) => {
    if ((res.code = 200)) {
      musiclistshow.value = false;
      // 搜索结果
      console.log(res);
      music_list_date.value = res.result.songs;
      // author.value= res.data[0]
    } else {
      throw console.log(error);
    }
  });
};

const ChangemusicOpenState =()=>{
  store.musicOpenState = true
}
const showsMusicState =()=>{
  if(store.musicOpenState===false){
         // 通知
         ElNotification({
      title: '提醒',
      message: h('i', { style: 'color: teal' }, '网抑云~启动!~~'),
    })
    setTimeout(ChangemusicOpenState(),500)

  }
  else{
    // 通知
   ElNotification({
    title: '提醒',
    message: h('i', { style: 'color: teal' }, '当前状态正在音乐器界面哦'),
  })
  }

  console.log( "musicOpenState:",store.musicOpenState)
}
// 控制audio播放暂停
// 暂停播放
const onPause = () => {
  // 状钛
  playingstate.value = false;
  console.log('audioRef:', audioRef)
  // audioRef.value

  // audioRef.value.vei.onPause()
  // audioMedia.pause();
    // audioMedia.value.ispaly = false
};

const onPlay = () => {
  // 状钛
  playingstate.value = true;
  // console.log(audioRef)
  // audioMedia.play();
  // 现在进行的时间
  // console.log('audioRef.currentTime:', audioRef.value.currentTime)
};
const duration = ref();
// 总时长
const getDuration = () => {
  // console.log('总时长', audioRef.value.duration);
  //此时可以获取到duration
  duration.value = audioRef.value.duration;
};

// 播放音乐
const playmusic = (id) => {
  // leval可以调节音乐品质 默认无损
  urlmusic(id, leval.value).then((res) => {
    if ((res.code = 200)) {
      console.log("url:",res)
      console.log("leval.value:",leval.value)
      // 音乐url
      console.log("播放音乐res：", res)
      // 获取播放链接
      musicurl.value = res.data[0].url;
      playingstate.value = true;

      // audio paly

      // console.log("url:" + musicurl.value)
    } else {
      throw console.log(error);
    }
  });
  // 获取歌词
  urllyrics(id).then((res) => {
    if ((res.code = 200)) {
      // 歌词
      // console.log("歌词", res)
      playlyrics.value = res.lrc.lyric;
      // main 函数
      getmusiclyrics();
      // formatLyricTime()
    } else {
      throw console.log(error);
    }
  });
};

// 更新搜素数据
const updatemusicData = () => {
  ElNotification({
    title: "提醒",
    message: h("i", { style: "color: teal" }, "正在努力检索喵~"),
  });

  // 防抖
  debounce(() => {
    getmusicData();
  }, 500);
};

// 播放防抖
const updateplaymusic = (id, index, name) => {
  // 处理index
  decChange(index);
  // 获取当前播放图片的url
  playimgurl.value = music_list_date._rawValue[index].al.picUrl;
  palytitle.value;
  // 歌词
  // 存储歌词信息
  playlyrics.value = "";
  lineArr.value = [];
  // 最终取值的数组
  lyricsObjArr.value = [];

  ElNotification({
    title: "提醒",
    message: h("i", { style: "color: teal" }, "等待加载一会儿喵"),
  });
  // 防抖
  debounce(() => {
    playmusic(id);
    // 图片地址
    // console.log('picUrl:',music_list_date._rawValue[index].al.picUrl)
    // 提醒
    ElMessage({
      message: "喵喵：" + name + "惹~",
      type: "success",
    });
  }, 300);
  playingstate.value = true;
  // 已分类处理好歌词
  // console.log('lyricsObjArr', lyricsObjArr.value)
};

const timerr = () => {
//   if (playingstate == true ) {
    setInterval(() => {
      // 匹配歌词
      const lyricsObjArrlist = toRaw(lyricsObjArr.value);
      // console.log('lyricsObjArrlist:::', lyricsObjArrlist)
      for (let i = 0; i < lyricsObjArrlist.length; i++) {
        // 实际播放时间 通过比对实际播放时间和歌词分类时间来显示实际歌词
        // console.log(audioRef.value.currentTime)

        if (audioRef.value.currentTime > parseInt(lyricsObjArrlist[i].time)) {
          // console.log('time', parseInt(lyricsObjArrlist[i].time))
          // console.log('歌词:', lyricsObjArrlist[i].lyric)
          realsongsword.value = lyricsObjArrlist[i].lyric;
        }
      }
    }, 510);
  }
// };

onMounted(() => {
  // getmusicData(input);
  // onpause()
  getDuration();
  getmusiclyrics();
  timerr();
});

watch(() => {});

const formatLyricTime = (time) => {
  // 格式化歌词的时间 转换成 sss:ms
  const regMin = /.*:/;
  const regSec = /:.*\./;
  const regMs = /\./;

  const min = parseInt(time.match(regMin)[0].slice(0, 2));
  let sec = parseInt(time.match(regSec)[0].slice(1, 3));
  const ms = time.slice(
    time.match(regMs).index + 1,
    time.match(regMs).index + 3
  );
  if (min !== 0) {
    sec += min * 60;
  }
  return Number(sec + "." + ms);
};

// 歌词主函数
const getmusiclyrics = () => {
  // 切割字符 拿到每一行数据
  const regNewLine = /\n/;
  lineArr.value = playlyrics.value.split(regNewLine);
  console.log(lineArr.value);
  // 分割时间和歌词 拿到每一行数据
  const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/;
  // 对lineArr数组进行遍历分隔
  Array.from(lineArr);
  lineArr.value.forEach((item) => {
    if (item === "") return;
    const obj = {};
    time.value = item.match(regTime);
    Array.from(time.value);
    obj.lyric =
      item.split("]")[1].trim() === "" ? "" : item.split("]")[1].trim();
    obj.time = time
      ? formatLyricTime(time.value[0].slice(1, time.value[0].length - 1))
      : 0;
    obj.uid = Math.random().toString().slice(-6);
    if (obj.lyric === "") {
      console.log("这一行没有歌词");
    } else {
      Array.from(lyricsObjArr);
      lyricsObjArr.value.push(obj);
    }
  });
};
</script>

<template>
  <div class="music" v-show="store.musicOpenState">
    <div class="music-top">
      <div class="searchfuc cards">
        <el-input
          v-model="keywords"
          placeholder="请输入关键词"
          clearable
          @keyup.enter.native="updatemusicData"
        />

        <div class="search_icon" @click="updatemusicData">
          <img src="../assets/search.svg" alt="" />
        </div>
      </div>
      <!-- 音乐播放容器 -->
      <!-- 全局 -->
      <div class="player-contiain" v-show="musicurl">
        <audio
          @canplay="getDuration"
          @ended="overAudio"
          @pause="onPause"
          @play="onPlay"
          controls
          ref="audioRef"
          :autoplay="autoplay"
          :src="musicurl"
        ></audio>
      </div>
    </div>

    <div class="music_list">
      <el-skeleton
        style="width: 100%"
        direction="vertical"
        alignment="flex-start"
        :loading="musiclistshow"
        animated
        class="content-skeleton"
      >
        <template #template>
          <div class="avatar" style="display: flex; align-items: center">
            <el-skeleton-item
              variant="circle"
              style="
                margin-bottom: 12px;
                width: 48px;
                height: 48px;
                background-color: #aaa;
              "
            />
            <div
              style="
                display: flex;
                flex-direction: column;
                position: relative;
                bottom: 6npmpx;
                margin-left: 8px;
              "
            >
              <el-skeleton-item
                variant="text"
                style="width: 80px; margin-bottom: 8px"
              />
              <el-skeleton-item variant="text" style="width: 50px" />
            </div>
          </div>
          <el-skeleton-item
            variant="rect"
            style="width: 100%; height: 240px; background-color: #aaa"
          />
          <div style="padding: 12px 14px 0 0">
            <el-skeleton-item variant="h1" style="width: 50%" />
            <el-skeleton-item
              variant="text"
              style="margin-top: 8px; margin-right: 16px"
            />
          </div>
        </template>
      </el-skeleton>

      <div class="music_list--left">
        <div
          class="music_list_item "
          ref=""
          :class="[index == selectIndex ? 'acitve' : '']"
          v-for="(item, index) in music_list_date"
          @click="updateplaymusic(item.id, index, item.name)"
        >
          <span class="cur"></span>
          <span class="music_list_number">{{ index + 1 }}</span>
          <el-text class="mx-1" size="large">{{ item.name }}</el-text>
          <span class="author">{{ item.ar[0].name }}</span>
        </div>
      </div>
    </div>

    <!-- 详细信息 -->
    <div class="music_list_maininfo" v-show="musicurl">
      <div class="music_list_maininfo--top">
        <span></span>
        <img
          :class="[playingstate == true ? 'animation2' : 'animation1']"
          :src="playimgurl"
          alt=""
        />
      </div>

      <div class="lyrics" ref="lyricUL">
        <li
          class="lyrics_item"
          v-for="(item, index) in lyricsObjArr"
          :key="item.uid"
          :data-index="i"
          ref="lyric"
        >
          {{ item.lyric }}
        </li>
      </div>
    </div>
<!-- 热门评论 -->
<div class="music_hotcomment">
  <hotcomment></hotcomment>
</div>
  
  </div>
  <div class="songword-area">

      <!-- 全局歌词 -->
  <div class="songword cards" v-show="musicurl" @click="showsMusicState">
    {{ realsongsword }}
  </div>

  </div>

 

</template>

<style scoped lang="scss">
.music_hotcomment{
  position: absolute;
  left: -60%;
  top: 2%;
}
.songword {
  position: absolute;
  bottom: 60px;
  height: 60px;
  line-height: 60px;
  outline: none;
  min-width: 400px;
  padding: 0 30px 0;
  font-size: 22px;
 left: 35%;

}

.music {
  width: 710px;
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
    width: 300px;
    height: auto;
    position: absolute;
    right: 0;
    top: 60px;
    display: grid;

    .music_list_maininfo--top {
      display: flex;
      justify-content: center;
      background: rgba(255, 255, 255, 0.1);
      box-shadow: 0 2px 2px 0 rgb(0 0 0 / 7%), 0 1px 5px 0 rgb(0 0 0 / 10%);
      width: 300px;
      border-radius: 10px;
    }

    .lyrics {
      height: 220px;
      max-height: 220px;
      overflow: hidden;
      box-sizing: content-box;
      overflow-y: auto;
      box-shadow: 0 2px 2px 0 rgb(0 0 0 / 7%), 0 1px 5px 0 rgb(0 0 0 / 10%);
      line-height: initial;
      position: relative;
      background: transparent;
      background: rgba(255, 255, 255, 0.1);
      width: 300px;
      border-radius: 5px;

      .lyrics_item {
        text-align: center;
        display: flex;
        justify-content: center;
        color: #fff;
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
      }

      .lyrics_item:hover {
        background: rgba(255, 255, 255, 0.54) !important;
        border-radius: 6px !important;
      }
    }

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
    // box-shadow: 0 2px 2px 0 rgb(0 0 0 / 7%), 0 1px 5px 0 rgb(0 0 0 / 10%);
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
    // -webkit-transition: all 0.2s ease;
    // transition: all 0.2s ease;
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
    // -webkit-transition: background-color 0.3s;
    // transition: background-color 0.3s;
    background-color: #fffeee;
  }
}
</style>
