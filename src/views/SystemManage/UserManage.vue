<template>
  <div class="user">
    <div class="top">
      <el-input
        v-model="from.a1"
        style="width: 180px"
        placeholder="输入部门名称搜索"
        :prefix-icon="Search"
      />
      &emsp;
      <el-input v-model="from.a2" style="width: 180px" placeholder="输入名称或邮箱搜索" />
      &emsp;
      <!-- 选择日期 -->
      <el-date-picker
        v-model="from.time"
        type="datetimerange"
        start-placeholder="Start date"
        end-placeholder="End date"
        format="YYYY-MM-DD HH:mm:ss"
        date-format="YYYY/MM/DD ddd"
        time-format="A hh:mm:ss"
      />
      &emsp;
      <el-button type="success" :icon="Search">搜索</el-button>
      <el-button type="warning" :icon="RefreshLeft">重置</el-button>
    </div>

    <div class="bottom">
      <div class="bottom-left">
        <!-- 树形结构 -->
        <el-tree
          style="max-width: 600px"
          :props="props"
          :data="data.list"
        /><!-- lazy :load="loadNode" -->
      </div>

      <div class="bottom-right">
        <div class="bottom-right-top">
          <el-button type="primary" :icon="Plus">新增</el-button>
          <el-button type="success" :icon="Edit">修改</el-button>
          <el-button type="danger" :icon="Delete">删除</el-button>
          <el-button type="warning" :icon="Download">导出</el-button>
          <el-button type="primary" :icon="RefreshLeft">重置密码</el-button>
        </div>
        <!-- 表格 -->
        <el-table
          ref="multipleTableRef"
          :data="tableData.list"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column property="name" label="Name" />
          <el-table-column property="address" label="用户名" />
          <el-table-column property="address" label="昵称" />
          <el-table-column property="address" label="性别" />
          <el-table-column property="address" label="电话" />
          <el-table-column property="address" label="邮箱" />
          <el-table-column property="address" label="部门" />
          <el-table-column property="address" label="状态" />
          <el-table-column property="address" label="创建日期" />
          <el-table-column label="操作">
            <template #default>
              <div>
                <el-button type="primary" :icon="Edit"></el-button>
                <el-button type="danger" :icon="Delete"></el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          v-model:current-page="page.currentPage4"
          v-model:page-size="page.pageSize4"
          :page-sizes="[5, 10, 15, 20]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        />
        <!-- @size-change="handleSizeChange"
          @current-change="handleCurrentChange" -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, RefreshLeft, Delete, Edit, Plus, Download } from '@element-plus/icons-vue'

let from = reactive({
  a1: '',
  a2: '',
  time: ''
})

//树结构
// import type Node from 'element-plus/es/components/tree/src/model/node'
// interface Tree {
//   name: string
//   leaf?: boolean
// }

const props = {
  label: 'name',
  children: 'children',
  isLeaf: 'leaf'
}

let data = reactive({
  list: [
    {
      name: '华南分部',
      children: [{ name: '研发部', children: [{ name: '研发一组' }] }, { name: '运维部' }]
    },
    {
      name: '华北分部',
      children: [{ name: '测试部' }, { name: 'UI部门' }]
    }
  ]
})
//懒加载
// const loadNode = (node: Node, resolve: (data: Tree[]) => void) => {
//   if (node.level === 0) {
//     return resolve([{ name: '华南分部' }])
//   }
//   if (node.level > 1) return resolve([])

//   setTimeout(() => {
//     const data: Tree[] = [
//       {
//         name: '研发部',
//         leaf: true
//       },
//       {
//         name: '运维部'
//       }
//     ]

//     resolve(data)
//   }, 500)
// }

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
//分页
let page = reactive({
  currentPage4: 1,
  pageSize4: 100
})
//总数
let total = ref(0)
</script>

<style lang="scss" scoped>
.user {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  .top {
    margin-bottom: 20px;
  }
  .bottom {
    display: flex;
    .bottom-left {
      width: 200px;
    }
    .bottom-right {
      flex: 1;
      .bottom-right-top {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
