<script setup>
import { h, ref, reactive, onMounted, } from "vue";
import { mainStore } from "../store/index";

import { ElNotification } from "element-plus";
import { gethotpoint, INDEXKEY } from "../api/index";
import { useRouter } from 'vue-router'
const router = useRouter()
const store = mainStore();
const maintext = ref("点击查看热搜");
const mainpointtext = ref([]);
const searchpoint = ref([])


// 点击访问外链
const runurlwebsite =(key)=>{
  console.log(key)
 const url = 'https://www.douyin.com/search/'+key
window.open(url, "_blank", "");

}


const gethotpointData = () => {
  gethotpoint(INDEXKEY).then((res) => {
    if ((res.code = 200)) {
      console.log(res);
      mainpointtext.value = res.result.list;
      console.log(mainpointtext.value);
    }
  });
};
const openhotpoint = () => {
  gethotpointData();
  maintext.value='点击刷新'
};



</script>

<template>

  <div class="hotpoint cards" v-show="!store.musicOpenState">
    <div class="titletopic">
        <el-text type="primary" class="mx-1 title" size="large"
        >全网热搜排行榜</el-text
      >
    </div>
    <div class="hotpointmaintext" @click="">
    
      <div class="hottextarea" v-for="(item, index) in mainpointtext" @click="runurlwebsite(item.title)">
        <div class="music_list_item ">
            <span class="cur"></span>
          <span class="music_list_number">{{ index + 1 }}</span>
          <el-text class="mx-1" size="large">{{ item.title }}</el-text>
          <span class="author">热度:{{ item.hotnum }}</span>
           
        </div>
      </div>
    </div>
    <div class="button-cells">
      <el-button class="" @click="openhotpoint" type="primary">
        {{ maintext }}</el-button
      >

      <!-- 
                <el-button v-if="textresult" type="info" @click="copy">复制</el-button> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.hottextarea{
  margin: 3px 0;
  background: transparent;
}
 .music_list_number {
    margin-right: 12px;
  }
.hotpoint.cards {
  
    .hotpointmaintext{
        height: auto;
  width: 480px;
  margin: 0 auto;
    max-height: 620px;
    overflow: hidden;
    box-sizing: content-box;
    overflow-y: auto;
    // box-shadow: 0 2px 2px 0 rgb(0 0 0 / 7%), 0 1px 5px 0 rgb(0 0 0 / 10%);
    line-height: initial;
    position: relative;
    background: transparent;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    }
  .title {
    color: #fff;
    font-size: 20px;
    line-height: 44px;
  }
  
}
.music_list_item:hover{
    transform: scale(1.02);
    transition: transform 0.2s ease-in-out;
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
      // margin: 2px;
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
// .titletopic{
//     height: 60px;
//     position: relative;
    
//     .title{
//         position: absolute;
//         top: 10px;
//     }
// }


</style>
