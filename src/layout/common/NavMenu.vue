<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    active-text-color="#409eff"
    background-color="#304156"
    text-color="#bfcbd9"
    router
  >
    <el-menu-item index="/echarts">
      <el-icon><Odometer /></el-icon>
      <template #title>首页</template>
    </el-menu-item>
    <el-sub-menu index="1">
      <template #title>
        <el-icon><Setting /></el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item index="1-1">
        <el-icon><UserFilled /></el-icon>
        <template #title>用户管理</template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
<script setup lang="ts">
import { inject } from 'vue'
const isCollapse = inject('isCollapse') as any
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo {
  border: 0;
  transition: all 0.3s;
}
</style>
