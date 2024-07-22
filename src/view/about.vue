<script setup>
import { ref } from "vue";

// import Header from "./components/HeaderD/index.vue";
import Header from "../components/HeaderD/index.vue"

import { mainStore } from "../store/index";

const store = mainStore()
</script>

<template>
  <div class="about" v-show="store.aboutOpenState">
    <div class="mid-a">
      关于帕特里克
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>