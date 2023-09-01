<script setup>
import Background from "./components/Background/index.vue"
import tiangou from "./view/tiangou.vue";
import music from "./view/music.vue";
import { onMounted, onBeforeUnmount, watch } from "vue";
import cursorInit from "./utils/cursor.js"
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

      <div class="main">
        <tiangou></tiangou>
        <music></music>
      </div>


  </div>
</template>

<style lang="scss" scoped>

</style>
