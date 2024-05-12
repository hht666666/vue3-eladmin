<template>
  <div class="root-node">
    <div class="left">
      <el-input
        v-model="name"
        style="width: 180px"
        placeholder="输入部门名称搜索"
        :prefix-icon="Search"
        @input="handleSearchDept"
      />
      <!-- 树结构 -->
      <el-tree
        style="max-width: 600px; margin-top: 20px"
        :props="props"
        :load="loadNode"
        :expand-on-click-node="false"
        lazy
        @node-click="handleUserList"
        :data="treeData.list"
      />
    </div>

    <div class="right">
      <UserManagerComponent @getTableData="getUserListData"></UserManagerComponent>

      <el-table
        ref="multipleTableRef"
        :data="tableData.list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        size="small"
        v-loading="loading"
      >
        <el-table-column type="selection" />
        <el-table-column property="username" label="用户名" />
        <el-table-column property="nickName" label="昵称" />
        <el-table-column property="gender" label="性别" />
        <el-table-column property="phone" label="电话" />
        <el-table-column property="email" label="邮箱" />
        <el-table-column property="dept.name" label="部门" />
        <el-table-column label="状态">
          <template #default="scope">
            <div>
              <el-switch v-model="scope.row.enabled" />
            </div>
          </template>
        </el-table-column>
        <el-table-column property="updateTime" label="创建日期" />
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <div>
              <el-button type="primary" :icon="Edit"></el-button>
              <el-popconfirm
                width="220"
                confirm-button-text="确定"
                cancel-button-text="取消"
                icon-color="#626AEF"
                title="确认删除本条数据吗"
                @confirm="del(scope.row)"
              >
                <template #reference>
                  <el-button type="danger" :icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        v-model:current-page="page.page"
        v-model:page-size="page.size"
        :page-sizes="[2, 5, 10, 15]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="getUserListData"
        @current-change="getUserListData"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
//引入图标
import { Search, Delete, Edit } from '@element-plus/icons-vue'
//引入接口
import { getUserTree, getUserList, searchDept, deleteUser } from '@/api/api'
//引入组件
import UserManagerComponent from '@/components/UserManagerComponent.vue'
//通知框
import { ElNotification } from 'element-plus'
//树结构
const props = {
  label: 'label',
  children: 'children',
  isLeaf: 'leaf'
}
//懒加载
const loadNode = (node: any, resolve: (data: any) => void) => {
  if (node.level === 0) {
    //获取最外层结构
    getUserTree().then((res: any) => {
      // console.log(res.content)
      return resolve(res.content)
    })
  } else {
    //传入当前点击行id获取子数据
    // console.log(node);
    getUserTree(node.data.id).then((res: any) => {
      // console.log(res)
      resolve(res.content)
    })
  }
}
//搜索部门列表
const name = ref('')
let treeData = reactive({
  list: []
})
const handleSearchDept = () => {
  if (name.value == '') {
    getUserTree().then((res: any) => {
      treeData.list = res.content
    })
  } else {
    searchDept(name.value).then((res: any) => {
      // console.log(res.content)
      treeData.list = res.content
    })
  }
}
//点击树结构获取id请求对应数据
const handleUserList = (data: any) => {
  // console.log(data)
  page.deptId = data.id
  getUserListData()
}

//获取用户列表
const page = reactive({
  page: 1,
  size: 10,
  sort: 'id,desc',
  deptId: null
})
//login加载
const loading = ref(false)
//调用接口
const getUserListData = () => {
  //开启加载
  loading.value = true
  getUserList({ ...page, page: page.page - 1 }).then((res: any) => {
    tableData.list = res.content
    total.value = res.totalElements
    //关闭加载
    loading.value = false
  })
}
getUserListData()

//表格
interface User {
  date: string
  name: string
  address: string
}
const multipleSelection = ref<User[]>([])
let tableData = reactive({
  list: []
})
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}

//分页总数
let total = ref(0)

//删除用户
const del = (row: any) => {
  console.log(row)
  deleteUser(row.id).then((res: any) => {
    // console.log(res)
    ElNotification({
      title: 'Success',
      message: '删除成功',
      type: 'success'
    })
    getUserListData()
  })
}
</script>

<style lang="scss" scoped>
.root-node {
  display: flex;
  .left {
    width: 200px;
  }
  .right {
    flex: 1;
  }
}
</style>
