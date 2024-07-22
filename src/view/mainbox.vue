<script setup>
import { ref } from "vue";
// import tiangou from "./view/tiangou.vue";
import tiangou from "./tiangou.vue";
// import Header from "./components/HeaderD/index.vue";
import Header from "../components/HeaderD/index.vue"
import music from "./music.vue";
import hotpoint from "./hotpoint.vue";
import { mainStore } from "../store/index";

const store = mainStore()
</script>

<template>
  <div class="mainbox" v-show="store.islogin">
    <Header></Header>
    <div class="mid-a">
      <tiangou></tiangou>
      <hotpoint></hotpoint>
      <music></music>
    </div>
  </div>
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