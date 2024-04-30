<template>
  <div class="top">
    <div class="top-left">
      <el-icon v-if="isCollapse" @click="isCollapse = !isCollapse"><Expand /></el-icon>
      <el-icon v-else @click="isCollapse = !isCollapse"><fold /></el-icon>
      <span>首页</span>
    </div>
    <div class="top-right">
      <p>
        <span> <svg-icon name="search"></svg-icon></span>
        <span @click="dochub">
          <svg-icon name="dochub"></svg-icon>
        </span>
        <span @click="aaa" v-if="!flag"> <svg-icon name="fangda"></svg-icon></span>
        <span @click="aaa" v-else> <svg-icon name="suoxiao"></svg-icon></span>
        <span> <svg-icon name="font-size"></svg-icon></span>
      </p>

      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="../../assets/longmao.png" alt="" style="width: 40px; height: 40px" />
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>布局设置</el-dropdown-item>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <!-- 面包屑 -->
  <div class="Breadcrumb">
    <el-tag :closable="true" type="primary" effect="dark" class="tag"> <b>·</b> 首页 </el-tag>
  </div>
</template>

<script setup lang="ts">
//控制左侧菜单展开收起
import { inject } from 'vue'
const isCollapse = inject('isCollapse') as any
//全屏
import screenfull from 'screenfull'
let flag = ref(false)
const aaa = () => {
  screenfull.toggle()
  if (screenfull.isEnabled) {
    screenfull.on('change', () => {
      if (screenfull.isEnabled) {
        flag.value = screenfull.isFullscreen
      }
    })
  }
}
//跳转文档
const dochub = () => {
  window.open('https://eladmin.vip/pages/010101/')
}
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  height: 60px;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .top-left {
    display: flex;
    align-items: center;
    span {
      color: #97a8be;
      margin-left: 20px;
    }
  }
  .top-right {
    display: flex;
    align-items: center;
    p {
      span {
        margin-right: 20px;
        font-size: 22px;
        cursor: pointer;
      }
    }
  }
}
.Breadcrumb {
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  box-shadow: 1px 1px 10px #ccc;
  line-height: 40px;
  .tag {
    margin-left: 20px;
  }
}
</style>
