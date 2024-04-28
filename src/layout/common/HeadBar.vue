<template>
  <div class="top">
    <div class="top-left">
      <el-icon v-if="isCollapse" @click="isCollapse = !isCollapse"><Expand /></el-icon>
      <el-icon v-else @click="isCollapse = !isCollapse"><fold /></el-icon>
      <span>首页</span>
    </div>
    <div class="top-right">
      &emsp;
      <el-dropdown>
        <span class="el-dropdown-link">
          6
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
