<script setup>
import { h ,ref, reactive, onMounted } from 'vue'
import { getcloudhotpoint,INDEXKEY } from "../api/index";
import debounce from "../utils/debounce.js"
import { mainStore } from "../store/index";
import { ElNotification } from 'element-plus'
// 导入复制模块
import useClipboard from 'vue-clipboard3'
const store = mainStore();

// 获取舔狗文案
const maintext = ref(null)
const textresult = ref('目前访问量过多，请稍后再试')
// 开启音乐状态
const ishothover = ref(false)
// 注册复制函数
const { toClipboard } = useClipboard()

const maintitle = ref(null)
//text

onMounted(() => {
    // gettiangouData();
    updatecloudhot()
});

// 更新舔狗数据
const updatecloudhot = () => {
    textresult.value = "loading......";
    // 防抖
    debounce(() => {
        getcloudhot();

    }, 500);

};

// 获取网易云热门评论
const getcloudhot =() =>{
  getcloudhotpoint(INDEXKEY).then((res)=>{
    if ((res.code = 200)) {
    
      // 搜索结果
      console.log('网易云热词res',res);
      maintext.value = res.result.source
    //   maintitle.value = res.result.source
      textresult.value = res.result.content
      // author.value= res.data[0]
    } else {
    
      textresult.value = "哎呀可能是网络出现了问题"
      throw console.log(error);
    }
  });
}


    

// 复制文本
 const copybtn = () => {
     
    toClipboard(textresult.value) 
    ElNotification({
    title: '提醒',
    message: h('i', { style: 'color: teal' }, '成功复制到剪切板了喵~'),
  })
     
    }

</script>


<template>
    <div class="comment">

        <div class="context cards"   @mouseenter="ishothover = true" @mouseleave="ishothover = false">
            <el-button  v-show="ishothover"  class="copybtn"  @click="copybtn" type="primary"> 复制</el-button>
            <div class="maintext" @click="updatecloudhot">
                <el-text type="primary" class="mx-1" size="large" v-model="textresult">{{ maintitle }}  </el-text>
                <el-text type="primary" class="mx-1" size="large" v-model="textresult">{{ textresult }}  </el-text>
                
                <el-text  type="primary" class="mx-1" size="small" v-model="textresult"> 下一条 </el-text>
                
                <div class="button-cells" >
                <el-button   class="cards" v-show="ishothover" @click="openmusicplay" type="primary"> {{ maintext }}</el-button>
             
                <!-- 
                <el-button v-if="textresult" type="info" @click="copy">复制</el-button> -->
            </div>
            </div>

        </div>
    </div>
</template>



<style scoped lang='scss'>
.comment {
    height: auto;
    width: 350px;
    margin: 0 auto;
    .maintext {
    display: grid;
    align-items: center;
    justify-items: end;
}
    .context {
        // opacity: 0.3;
        background-color: rgb(255, 255, 255, 0.45);
        height: auto;
        width: 350px;
        border-radius: 10px;
        padding: 30px 20px;
        position: relative;
        .copybtn{
            bottom: 0;
            top: auto !important;
        }

    }

    .maintext {
        margin-bottom: 10px;
        text-align: left;
        
    }

    .el-text.el-text--primary {
        --el-text-color: var(--el-color-white) opacity: 1;
    }

    button.el-button.el-button--primary {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.1490196078);
        padding: 4px 0;
        border-radius: 8px 8px 0 0;
        border: none;
        height: 30px;
    }
    button.el-button.el-button--primary:hover{
        --el-text-color: var(--el-color-white)
    }

}
</style>