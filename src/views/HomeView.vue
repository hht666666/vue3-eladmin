<template>
  <div class="home">
    <div class="left" :style="isCollapse ? 'width:64px' : 'width:200px'">
      <NavMenu />
    </div>

    <div
      class="right"
      :style="isCollapse ? 'width:calc(100vw - 64px)' : 'width:calc(100vw - 200px)'"
    >
      <HeadBar />
      <!-- 路由匹配到的组件将渲染在这里 -->
      <div class="router">
        <router-view />
      </div>
      <!-- 页面底下固定的信息 -->
      <div
        :style="isCollapse ? 'width:calc(100vw - 64px)' : 'width:calc(100vw - 200px)'"
        class="aaa"
      >
        &emsp; © 2018-2022 Zheng Jie Apache License 2.0
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeadBar from '../layout/common/HeadBar.vue'
import NavMenu from '../layout/common/NavMenu.vue'
import { provide } from 'vue'
//控制左侧菜单展开收起
const isCollapse = ref(false)
provide('isCollapse', isCollapse)
</script>

<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  display: flex;
  .left {
    height: 100%;
    background-color: #304156;
    transition: all 0.3s;
  }
  .right {
    height: 100%;
    background-color: #fff;
    transition: all 0.3s;
    .router {
      width: 100%;
      height: calc(100vh - 100px);
    }
    //页面底下固定的信息
    .aaa {
      position: fixed;
      right: 0;
      bottom: 0;
      height: 50px;
      line-height: 50px;
      color: #7a8b9a;
      background-color: #ffffff;
      font-size: 12px;
      border-top: 1px solid #e7eaec;
      transition: all 0.3s;
    }
  }
}
</style>
