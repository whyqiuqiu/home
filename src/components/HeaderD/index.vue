<script setup>
import { h, ref, reactive, onMounted } from "vue";
import { mainStore } from "../../store/index.js";
import { ElNotification } from "element-plus";
import { useDark, useToggle } from "@vueuse/core";
// 引入icon
import { ArrowLeft } from "@element-plus/icons-vue";

import { ElMessageBox } from 'element-plus'
// const innerDrawer = ref(false);

const store = mainStore();

// 黑暗模式
const isDark = useDark();
const toggleDark = () => useToggle(isDark);

const goBack = () => {
  if (store.musicOpenState === false) {
    ElNotification({
      title: "提醒",
      message: h("i", { style: "color: teal" }, "已经是主页了回退不喵~!"),
    });
  } else {
    ElNotification({
      title: "提醒",
      message: h("i", { style: "color: teal" }, "现在回到主页了喵~!"),
    });
    store.musicOpenState = false;
  }
};
const openabout = () => {
  store.aboutOpenState = !store.aboutOpenState;
  console.log(store.aboutOpenState);
  if (store.aboutOpenState === true) {
    ElNotification({
      title: "提醒",
      message: h("i", { style: "color: teal" }, "查看关于帕特里克拉~!"),
    });
  } else {
    ElNotification({
      title: "提醒",
      message: h("i", { style: "color: teal" }, "现在回到主页了喵~!"),
    });
  }
};

const MusicOn = () => {
  if (store.musicOpenState === true) {
    ElNotification({
      title: "提醒",
      message: h(
        "i",
        { style: "color: teal" },
        "已经打开播放器拉~无需重复打开~!"
      ),
    });
  } else {
    ElNotification({
      title: "提醒",
      message: h("i", { style: "color: teal" }, "叮咚~播放器已就绪喵~!"),
    });
  }
  // 打开播放器
  store.musicOpenState = true;
};

// 离开的时候
// const handleClose = (done) => {
//   ElMessageBox.confirm('确定离开喵~?')
//     .then(() => {
//       done()
//     })
//     .catch(() => {
//       // catch error
//     })
// }
const drawer = ref(false);
//  const direction = ref<DrawerProps['direction']>('rtl')
</script>

<template>
  <div class="header">
    <el-page-header class="EL_back" @back="goBack" :icon="ArrowLeft">
      <template #content>
        <div class="flex items-center">
          <el-avatar
            :size="45"
            class="mr-3"
            src="https://p1.music.126.net/Toi3LAmfhGz5hWY9LhCWpA==/109951167395628273.jpg?param=240y240"
          />
          <span class="text-large font-600 mr-3"> 帕特里克个人站 </span>
          <span @click="goBack" class="text-sm mr-2" style="color: ">
            Home
          </span>
          <span class="text-sm mr-2" style="color: " @click="drawer = true">
            About
          </span>
          <el-tag @click="MusicOn()">Music</el-tag>

          <el-switch
            v-model="isDark"
            inline-prompt
            :active-icon="IconEpMoon"
            :inactive-icon="IconEpSunny"
            active-color="var(--el-fill-color-dark)"
            inactive-color="var(--jjext-color-hover-thirdly)"
            @change="toggleDark"
          />
        </div>

        <el-drawer
          class="about dark"
          v-model="drawer"
          title="About Patrick"
          :direction="direction"
          :before-close="handleClose"
          size="40%"
        >
          <div class="share">
            <a
              href="https://space.bilibili.com/385678013?spm_id_from=333.1007.0.0"
              target="_blank"
            >
              <img src="../../assets/bilibili.svg" alt="" />
              <span>bilbili</span>
            </a>
            <a
              href="https://music.163.com/#/artist?id=35187809"
              target="_blank"
            >
              <img src="../../assets/网易云音乐.svg" alt="" />
              <span>music163</span>
            </a>
          </div>
          <div class="logo" >
            <img
              src="https://p1.music.126.net/Toi3LAmfhGz5hWY9LhCWpA==/109951167395628273.jpg?param=1080y1080"
              alt="logo头像"
            />
      
          </div>
   
          <div class="dsc">
            <span>猎人虔诚的坐在每棵树下 那我往哪跑呢</span>
          </div>
        </el-drawer>
      </template>
    </el-page-header>
  </div>
</template>

<style scoped lang="scss">
.logo {
  margin: 2vw 8.2vw;
  height: 21vw;
  border-radius: 2vw;
  img {
    width: 20vw;
    height: 20vw;
    border-radius: 2vw;
    margin-top: 0.5vw;
  }
}
.logo:hover {
  background: lightgray;
  transition: 0.3s;
  background: darkgray;
  // border: 1px solid lightgrey;
  border-radius: 10px;
}
.dsc {
  margin: 2em;
  span {
    font-size: 1.1em;
  }
}
.share {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 10em;
  a {
    display: grid;
    justify-items: center;
  }
  img {
    width: 8em;
  }
  a:hover {
    background: lightgray;
    transition: 0.3s;
    background: darkgray;
    // border: 1px solid lightgrey;
    border-radius: 5px;
  }
}
::v-deep .dark.el-drawer.rtl.open{
  background-color: #141414 !important;
}

::v-deep .el-overlay{
 opacity: 0.96;
}
::v-deep .el-drawer {
  background-color: #141414 !important;
}
::v-deep .el-drawer__title {
  font-size: 1.5em;
}
.about {
  background-color: #141414;
}
.EL_back:hover {
  transition: 0.3s;
  background: darkgray;
  border: 1px solid lightgrey;
  border-radius: 5px;
  // padding: 0 10px;
}
.EL_back {
  height: 45px;
}
.header {
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
  .el-page-header__left {
    width: 50%;

    .flex.items-center span {
      margin-right: 1.5em;
    }
    span.text-sm.mr-2:hover {
      transition: 0.3s;
      color: darkgray;
    }
  }
  .el-tag {
    background-color: transparent;
  }
}
</style>
