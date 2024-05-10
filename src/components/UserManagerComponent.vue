<template>
  <div class="search" v-if="flag">
    <el-input style="width: 180px" placeholder="输入名称或邮箱搜索" />
    &emsp;
    <!-- 选择日期 -->
    <el-date-picker
      type="datetimerange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      format="YYYY-MM-DD HH:mm:ss"
      date-format="YYYY/MM/DD ddd"
      time-format="A hh:mm:ss"
    />
    &emsp;
    <el-button type="success" :icon="Search">搜索</el-button>
    <el-button type="warning" :icon="RefreshLeft">重置</el-button>
  </div>

  <div class="div">
    <div>
      <el-button type="primary" :icon="Plus">新增</el-button>
      <el-button type="success" :icon="Edit">修改</el-button>
      <el-button type="danger" :icon="Delete">删除</el-button>
      <el-button type="warning" :icon="Download">导出</el-button>
      <el-button type="primary" :icon="RefreshLeft">重置密码</el-button>
    </div>
    <div>
      <!-- 控制搜索功能显示隐藏 -->
      <el-button :icon="Search" @click="flag = !flag" />
      <!-- 刷新表格 -->
      <el-button :icon="Refresh" @click="getTableData" />
      <el-button :icon="Grid" />
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  Search,
  RefreshLeft,
  Delete,
  Edit,
  Plus,
  Download,
  Refresh,
  Grid
} from '@element-plus/icons-vue'

//接收父组件方法
const emit = defineEmits(['getTableData'])

//调用父组件方法
//刷新表格
const getTableData = () => {
  emit('getTableData')
}
//控制搜索功能显示隐藏
const flag = ref(true)
</script>

<style lang="scss" scoped>
.search {
  margin-bottom: 20px;
}
.div {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
