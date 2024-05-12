<template>
  <div class="root-node">
    <UserManagerComponent @getTableData="getTableData"></UserManagerComponent>
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
</template>

<script setup lang="ts">
//引入组件
import UserManagerComponent from '@/components/UserManagerComponent.vue'
//引入图标
import { Delete, Edit } from '@element-plus/icons-vue'
//引入接口
import { getJobList } from '@/api/api'

//获取表格数据
const tableData = reactive({
  list: []
})
const page = reactive({
  page: 1,
  size: 10
})
const total = ref(0)

//点击刷新
const loading = ref(false)
const getTableData = () => {
  //开启加载
  loading.value = true
  //请求
  getJobList({ ...page, page: page.page - 1 }).then((res: any) => {
    console.log(res)
    tableData.list = res.content
    total.value = res.totalElements
    //关闭加载
    loading.value = false
  })
}
getTableData()
</script>

<style lang="scss" scoped></style>
