<template>
  <div class="root-node">
    <UserManagerComponent @getTableData="getTableData"></UserManagerComponent>

    <!-- 懒加载表格 -->
    <el-table
      :data="tableData.list"
      style="width: 100%"
      row-key="id"
      border
      lazy
      el-table-column
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      size="small"
      v-loading="loading"
    >
      <el-table-column type="selection" />
      <el-table-column prop="label" label="名称" />
      <el-table-column prop="deptSort" label="排序" />
      <el-table-column label="状态">
        <template #default="scope">
          <div>
            <el-switch v-model="scope.row.enabled" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期" />
      <el-table-column label="操作">
        <template #default>
          <div>
            <el-button type="primary" :icon="Edit"></el-button>
            <el-button type="danger" :icon="Delete"></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
//引入组件
import UserManagerComponent from '@/components/UserManagerComponent.vue'
//引入图标
import { Delete, Edit } from '@element-plus/icons-vue'
//引入接口
import { getUserTree } from '@/api/api'
//表格
const tableData = reactive<any>({
  list: []
})
const load = (row: any, treeNode: unknown, resolve: (date: any[]) => void) => {
  // console.log(row)
  //根据当前点击获取的id请求树形子结构
  getUserTree(row.id).then((res: any) => {
    // console.log(res)
    resolve(res.content)
  })
}

//请求外层树结构数据
const loading = ref(false)
const getTableData = () => {
  //开启加载
  loading.value = true
  //请求
  getUserTree().then((res: any) => {
    // console.log(res)
    tableData.list = res.content
    //关闭加载
    loading.value = false
  })
}
getTableData()
</script>

<style lang="scss" scoped></style>
