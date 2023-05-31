<script setup>
import { ref, reactive,onMounted } from 'vue' 
import { searchmusic } from "../api/index"
import debounce from "../utils/debounce.js"
import { mainStore } from "../store/index";
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

const musiclistshow =ref(false);
const music_list_date = ref([])

// 搜素
const getmusicData = () => {
    console.log(keywords.value)
    musiclistshow.value=true
    searchmusic(keywords.value).then((res) => {
        
        if (res.code = 200) {
            console.log(res)
            music_list_date.value=res.result.songs
        }
        else {
        
        }
    })
};

// 更新搜素数据
// const updategetmusicData = () => {
    
//     // 防抖
//     debounce(() => {
//         getmusicData();

//     }, 500);

// };


onMounted(() => {
    // getmusicData(input);
});



</script>


<template>

<div class="music" v-show="store.musicOpenState">
    <div class="searchfuc">
        <el-input  v-model="keywords" placeholder="请输入关键词" clearable @keyup.enter.native="getmusicData"/>
    <el-button :icon="Search" @click="getmusicData" circle />
    </div>

    <div class="music_list cards">
        <el-skeleton :rows="1" animated v-show="musiclistshow" :loading="loading"/>

        <div class="music_list_item cards" v-for="(item,index) in music_list_date">
            <el-text class="mx-1" size="large">{{item.name}}</el-text>
        </div>
    </div>
    
</div>

</template>


<style scoped lang='scss'>
.music{
    .searchfuc {
    display: flex;
    justify-content: center;
}
.music_list{
    .el-skeleton.is-animated {
    background-color: #ffffff;
    border-radius: 10px;
    }
}
 .el-buton{
    color: var(--el-button-hover-text-color)
 }
}


</style>