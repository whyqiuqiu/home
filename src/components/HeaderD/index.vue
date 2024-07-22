<script setup>
import { h, ref, reactive, onMounted } from "vue";
import { mainStore } from "../../store/index.js";
import { ElNotification } from 'element-plus'
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


</script>

<template>
  <div class="header">
    <el-page-header @back="goBack">
      <template #content>
        <span class="text-large font-600 mr-3"> 帕特里克的个人站 </span>
      </template>
    </el-page-header>
  </div>
</template>

<style scoped lang="scss">
.header{
  margin-bottom: 20px;
}
</style>
