<template>
  <div class="login" v-show="!store.islogin">
    <h2>登录</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">手机号:</label>
        <input type="text" id="username" v-model="username" required />
        <span @click="inrecodelogin" class="inrecodelogin recode">{{
          logintextt
        }}</span>
      </div>
      <div class="recodelogin" v-show="!recodelogin">
        <label for="captchav">验证码:</label>
        <input type="captchav" id="captchav" v-model="captchav" />
        <span @click="getrecode" class="recode" href="">获取验证码</span>
      </div>
      <div v-show="recodelogin">
        <label for="password">密码:</label>
        <input type="text" id="password" v-model="password" />
      </div>

 
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script setup>
import { h, ref,onMounted } from "vue";
import { captcha, captchalogin, captchaconfine } from "../api/index";
import { ElNotification, ElMessage } from "element-plus";

import { mainStore } from "../store/index";
// 使用ref来定义响应式数据


const store = mainStore();
const username = ref("");
const password = ref("");
const captchav = ref("");
const logintext = ref(false);
const logintextt = ref("切换登录");
const iscaptchacon = ref(false)
const recodelogin = ref(false);

const inrecodelogin = () => {
  recodelogin.value = !recodelogin.value;
  // comlogintext()
  console.log(logintextt.value);
};
//校验验证码是否正确
const captchacon = () => {
  captchaconfine(username.value, captchav.value).then((res) => {
    if (res.code == 200) {
      console.log("验证验证码res:",res);
      console.log("islogin:",store.islogin)
      store.islogin = true;
      iscaptchacon.value=true
      ElNotification({
        title: "提醒",
        message: h("i", { style: "color: teal" }, "验证码校验成功"),
      });
      console.log("islogin:",store.islogin)
    } else {
      iscaptchacon.value=false
      ElNotification({
        title: "提醒",
        message: h("i", { style: "color: teal" }, "验证码填写错误请重新验证"),
      });
      throw console.log("error");
    }
  });
};

const login = () => {
  
  // 在这里编写登录逻辑
  console.log("登录:", username.value, captchav.value);
  // 目前接口原因暂时不支持密码登录
  if(password.value){
    ElNotification({
        title: "提醒",
        message: h("i", { style: "color: teal" }, "暂时不支持密码登录请切换登录方式"),
      });  
      // 清空密码
      password.value='';
      return false;
  }

  captchacon()
  // 验证验证码是否校验成功
  if(iscaptchacon.value=true){
    // 验证码登录
    captchalogin(username.value,password.value, captchav.value,store.realIP).then((res)=>{

      console.log("验证码登录res:",res)
      if(res.code==200){
        console.log("success200:",res)
      }else{
        console.log("200fales:",res)
        throw console.log(error)
      }
    })
  }
};

// 发送验证码
const getrecode = () => {
  console.log(username.value);
  captcha(username.value).then((res) => {
    if (res.code == 200) {
      console.log(res);
      // 获取到验证码
    } else {
      throw console.log(error);
    }
  });
};

const console1 = ()=>{
  console.log("1")
}
// const timerr = () => {
//   setInterval(getrecode(),
  
//   console1()
//   ,5000)
  
//   }

onMounted(()=>{
 
})
</script>

<style scoped>

.login{
  position: absolute;
    left: 38%;
    top: 25%;
    background: rgba(255, 255, 255, 0.54) !important;
}
input a {
  color: #333 !important;
}
.recode {
  padding: 0 5px;
}
.recode:hover {
  color: lightblue;
}
.login {
  max-width: 415px;
  margin: 0 auto;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
}
form div {
  display: flex;
  align-items: center;
}
h2 {
  text-align: center;
  margin-bottom: 20px;
}

form div {
  margin-bottom: 10px;
}

label {
  display: inline-block;
  width: 80px;
}

input {
  width: 200px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #333 !important;
}

button {
  display: block;
  margin: 10px auto;
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
