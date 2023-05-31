<script setup>
import { ref, reactive,onMounted } from 'vue' 
import { searchmusic } from "../api/index"
import debounce from "../utils/debounce.js"
import { mainStore } from "../store/index";
const store = mainStore();

const keywords = ref("")


// 搜素
const getmusicData = () => {
    console.log(keywords.value)
    searchmusic(keywords.value).then((res) => {
        if (res.code = 200) {
            console.log(res)
            
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
    <el-input  v-model="keywords" placeholder="请输入关键词" clearable @keyup.enter.native="getmusicData"/>
</div>

</template>


<style scoped lang='scss'>

</style>