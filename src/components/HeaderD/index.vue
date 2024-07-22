<script setup>
import { h, ref, reactive, onMounted } from "vue";
import { mainStore } from "../../store/index.js";
import { ElNotification } from 'element-plus'
// 引入icon
import { ArrowLeft } from '@element-plus/icons-vue';

const store = mainStore();
const goBack = () => {
 
  if(store.musicOpenState === false){
    ElNotification({
    title: "提醒",
    message: h("i", { style: "color: teal" }, "已经是主页了回退不喵~!"),
  });
  }
  else{
    ElNotification({
    title: "提醒",
    message: h("i", { style: "color: teal" }, "现在回到主页了喵~!"),
  });
    store.musicOpenState = false
  }
 
};
 const openabout =()=>{
  store.aboutOpenState = !store.aboutOpenState
  console.log(store.aboutOpenState)
  if(store.aboutOpenState === true){
    ElNotification({
    title: "提醒",
    message: h("i", { style: "color: teal" }, "查看关于帕特里克拉~!"),
  });
  }
  else{
    ElNotification({
    title: "提醒",
    message: h("i", { style: "color: teal" }, "现在回到主页了喵~!"),
  });
    
  }
 }



 const MusicOn =()=>{
  
  if(store.musicOpenState === true){
    ElNotification({
    title: "提醒",
    message: h("i", { style: "color: teal" }, "已经打开播放器拉~无需重复打开~!"),
  });
  }
  else{
    ElNotification({
    title: "提醒",
    message: h("i", { style: "color: teal" }, "叮咚~播放器已就绪喵~!"),
  });
 
  }
  // 打开播放器
  store.musicOpenState = true
 }

 const drawer = ref(false)
//  const direction = ref<DrawerProps['direction']>('rtl')
</script>

<template>
  <div class="header">
    <el-page-header @back="goBack" :icon="ArrowLeft">
      <template #content>
        <div class="flex items-center">
        <el-avatar
          :size="45"
          class="mr-3"
          src="https://p1.music.126.net/Toi3LAmfhGz5hWY9LhCWpA==/109951167395628273.jpg?param=240y240"
        />
        <span class="text-large font-600 mr-3"> 帕特里克的个人站 </span>
        <span @click="goBack" class="text-sm mr-2" style="color: ">
         home
        </span>
        <span class="text-sm mr-2" style="color: " @click="drawer = true">
         about
        </span>
        <el-tag @click="MusicOn()">Music</el-tag>
      </div>

      <el-drawer
    v-model="drawer"
    title="I am the title"
    :direction="direction"
    :before-close="handleClose"
  >
    <span>Hi, there!</span>
  </el-drawer>
       
      </template>
    </el-page-header>
  </div>
</template>

<style scoped lang="scss">
.header{
  margin-bottom: 20px;
  .flex.items-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
span.el-avatar.el-avatar--circle.mr-3 {
    margin: 0 4px !important;
}
span.el-tag.el-tag--light:hover {
    transition: 0.3s;
    background: lightgray;
}
.el-page-header__left{
  width: 50%;
  .flex.items-center span{
    margin-right: 1.5em;
  }
}
.el-tag{
  background-color:transparent;
}
}
</style>
