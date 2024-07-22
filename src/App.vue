<script setup>
// 引入的组件
import Background from "./components/Background/index.vue"
import tiangou from "./view/tiangou.vue";
import  Header  from "./components/HeaderD/index.vue";
import music from "./view/music.vue";
import hotpoint from "./view/hotpoint.vue";
import mainbox from "./view/mainbox.vue";
import { onMounted, onBeforeUnmount, watch } from "vue";
import cursorInit from "./utils/cursor.js"
import login from "./view/login.vue"

onMounted(()=>{
  // 自定义鼠标
  cursorInit();
  // 欢迎提示
  // helloInit();
  // 默哀模式
  // checkDays();
  // 加载完成事件
  window.addEventListener("load", () => {
    console.log("加载完成");
    // 去除加载标记
    document.getElementsByTagName("body")[0].className = "";
    // 给加载动画添加结束标记
    let loadingBox = document.getElementById("loading-box");
    // loadingBox.classList.add("loaded");
  });

  // 屏蔽右键
  document.oncontextmenu = () => {
    ElMessage({
      message: "为了浏览体验，本站禁用右键",
      grouping: true,
      duration: 2000,
    });
    return false;
  };

  // 鼠标中键事件
  window.addEventListener("mousedown", (event) => {
    if (event.button == 1) {
      store.backgroundShow = !store.backgroundShow;
      if (store.backgroundShow) {
        ElMessage("已开启壁纸展示状态");
      } else {
        ElMessage("已退出壁纸展示状态");
      }
    }
  });

})

</script>

<template>
  <div >
    <Background/>
    <div class="login">
      <login></login>
    </div>
    <mainbox></mainbox>
      <!-- <div class="main" v-show="!store.islogin"> -->
       
        <!-- <Header></Header>
        <div class="mid-a">
          <tiangou></tiangou> 
          <hotpoint></hotpoint> -->
        <!-- </div> -->


        <!-- <music></music> -->
  </div>


  <!-- </div> -->
</template>

<style lang="scss" scoped>
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

.mid-a{
  display: flex;

}
</style>
