<script setup>
import { ref, reactive, onMounted } from 'vue'
import { gettiangou, INDEXKEY } from "../api/index"


// 获取舔狗文案
const maintext = ref('primary')
const textresult = ref(null)
function tiangou() {
    gettiangou(INDEXKEY).then((res) => {
        if (res.code = 200) {
            console.log(res)
            textresult.value = res.result.content
            maintext.value = "再来一条"
        }
        else {
            this.textresult.value = "哎呀可能是网络出现了问题"
        }
    })

}

// onMounted=(()=>{

// })

</script>


<template>
    <div class="dog">

        <div class="context">
            <div class="maintext">

                <el-text type="primary" class="mx-1" size="large" v-model="textresult">{{ textresult }}</el-text>
            </div>
            <div class="button-cells">
                <el-button @click="tiangou" type="primary"> {{ maintext }}</el-button>


                <el-button v-if="textresult" type="info" @click="copy">复制</el-button>
            </div>
        </div>
    </div>
</template>


<style scoped lang='scss'>
.dog {

    .context {
        // opacity: 0.3;
        background-color: rgb(255, 255, 255, 0.45);
    }

    .el-text.el-text--primary {
        --el-text-color: var(--el-color-white)
    }

}
</style>