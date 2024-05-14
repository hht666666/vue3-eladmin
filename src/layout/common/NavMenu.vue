<template>
  <div class="menus">
    <div class="top">
      <img src="../../assets/logo.png" alt="" /> <span v-if="!isCollapse">ELADMIN-后台管理</span>
    </div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      active-text-color="#409eff"
      background-color="#304156"
      text-color="#bfcbd9"
      router
    >
      <el-menu-item index="/dashboard">
        <el-icon><Odometer /></el-icon>
        <template #title>首页</template>
      </el-menu-item>

      <el-sub-menu :index="item.path" v-for="item in list.menus" :key="item.path">
        <template #title>
          <el-icon><Setting /></el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <el-menu-item :index="ele.path" v-for="ele in item.children" :key="ele.path">
          <el-icon><UserFilled /></el-icon>
          <template #title>{{ ele.meta.title }}</template>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
//引入接口
//控制菜单的展开与收起
const isCollapse = inject('isCollapse')

//获取菜单数据
const list = reactive<any>({
  menus: JSON.parse(sessionStorage.getItem('addRouters') as string) || []
})
</script>

<style lang="scss" scoped>
.menus {
  height: 100vh;
  overflow-y: auto;
  transition: all 0.3s;
  .el-menu-vertical-demo {
    border: 0;
    transition: all 0.3s;
  }
  .top {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    img {
      width: 30px;
      height: 30px;
    }
    span {
      font-size: 14px;
      color: #fff;
      font-weight: 900;
    }
  }
}
</style>
