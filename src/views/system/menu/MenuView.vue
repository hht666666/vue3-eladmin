<template>
  <div class="root-node">
    <UserManagerComponent @getTableData="getTableData"></UserManagerComponent>

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
      <el-table-column prop="label" label="菜单标题" />
      <el-table-column prop="icon" label="图标" />
      <el-table-column prop="menuSort" label="排序" />
      <el-table-column prop="permission" label="权限标识" />
      <el-table-column prop="component" label="组件路径" />
      <el-table-column label="外链" width="50">
        <template #default="scope">
          <div>
            <span v-if="scope.row.iFrame">是</span>
            <span v-else>否</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="缓存" width="50">
        <template #default="scope">
          <div>
            <span v-if="scope.row.cache">是</span>
            <span v-else>否</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="可见" width="50">
        <template #default="scope">
          <div>
            <span v-if="scope.row.hasChildren">是</span>
            <span v-else>否</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期" />
      <el-table-column label="操作" width="150">
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
//引入接口
import { getMenuList1, getMenuList2 } from '@/api/api'
//引入图标
import { Delete, Edit } from '@element-plus/icons-vue'
//表格
const tableData = reactive<any>({
  list: []
})
const page = reactive<any>({
  page: 0,
  size: 10,
  sort: 'id,desc'
})
//懒加载
const load = (row: any, treeNode: unknown, resolve: (date: any[]) => void) => {
  //   console.log(row)
  //根据当前点击获取的id请求树形子结构
  getMenuList2(row.id).then((res: any) => {
    console.log(res)
    resolve(res.content)
  })
}

//点击刷新
const loading = ref(false)
const getTableData = () => {
  //开启加载
  loading.value = true
  //请求
  getMenuList1(page).then((res: any) => {
    // console.log(res)
    tableData.list = res.content
    //关闭加载
    loading.value = false
  })
}
getTableData()
</script>

<style lang="scss" scoped></style>
