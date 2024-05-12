<template>
  <div class="root-node">
    <UserManagerComponent @getTableData="getTableData"></UserManagerComponent>

    <div class="div">
      <div class="table">
        <h3>角色列表</h3>
        <el-table
          size="small"
          ref="multipleTableRef"
          v-loading="loading"
          :data="tableData.list"
          style="width: 100%"
        >
          <el-table-column type="selection" />
          <el-table-column property="name" label="名称" />
          <el-table-column property="dataScope" label="数据权限" />
          <el-table-column property="level" label="角色级别" />
          <el-table-column property="description" label="描述" />
          <el-table-column property="createTime" label="创建日期" />
          <el-table-column label="操作" width="150">
            <template #default>
              <div>
                <el-button type="primary" :icon="Edit"></el-button>
                <el-button type="danger" :icon="Delete"></el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <br />
        <el-pagination
          v-model:current-page="page.page"
          v-model:page-size="page.size"
          :page-sizes="[2, 5, 10, 15]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="getTableData"
          @current-change="getTableData"
        />
      </div>

      <div class="menu">
        <div class="title">
          <h3>菜单分配</h3>
          <el-button type="primary" :icon="Check">保存</el-button>
        </div>
        <!-- 树结构 -->
        <el-tree style="max-width: 600px" :props="props" :load="loadNode" lazy show-checkbox />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//引入图标
import { Delete, Edit, Check } from '@element-plus/icons-vue'
//引入组件
import UserManagerComponent from '@/components/UserManagerComponent.vue'
//引入api
import { getRoleList, getMenuList } from '@/api/api'
//表格
const tableData = reactive({
  list: []
})
const page = reactive({
  page: 1,
  size: 10,
  sort: 'level,asc'
})
//分页总条数
const total = ref(0)
//获取表格数据
//login加载
const loading = ref(false)
const getTableData = () => {
  //开启加载
  loading.value = true
  getRoleList({ ...page, page: page.page - 1 }).then((res: any) => {
    //  console.log(res)
    tableData.list = res.content
    total.value = res.totalElements
    //关闭加载
    loading.value = false
  })
}
//初始化
getTableData()

//树形结构
const props = {
  label: 'label',
  children: 'zones',
  isLeaf: 'leaf'
}

// 懒加载
const loadNode = (node: any, resolve: (data: any) => void) => {
  if (node.level === 0) {
    //获取最外层结构
    getMenuList(0).then((res: any) => {
      // console.log(res)
      return resolve(res)
    })
  } else {
    //传入当前点击行id获取子数据
    // console.log(node,'----')

    getMenuList(node.data.id).then((res: any) => {
      // console.log(res)
      return resolve(res)
    })
  }
}
</script>

<style lang="scss" scoped>
.root-node {
  .div {
    display: flex;
    justify-content: space-between;
    .table {
      width: 66%;
      border: 1px solid #eaeef6;
      padding: 0 20px;
      box-sizing: border-box;
      h3 {
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #eaeef6;
      }
    }
    .menu {
      width: 33%;
      border: 1px solid #eaeef6;
      padding: 0 20px;
      box-sizing: border-box;
      .title {
        height: 60px;
        border-bottom: 1px solid #eaeef6;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
