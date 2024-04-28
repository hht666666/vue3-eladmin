<template>
  <div class="login">
    <div class="input">
      <h3>ELADMIN 后台管理系统</h3>

      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" :prefix-icon="Avatar" placeholder="账号" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            show-password
            :prefix-icon="Lock"
            placeholder="密码"
          />
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="ruleForm.code" :prefix-icon="CircleCheckFilled" placeholder="验证码" />
        </el-form-item>

        <p><el-checkbox v-model="checked" size="large" /> &ensp; 记住我</p>

        <el-form-item>
          <el-button
            style="width: 100%; height: 40px; margin-top: 10px"
            type="primary"
            @click="submitForm(ruleFormRef)"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
//引入图标
import { Avatar, Lock, CircleCheckFilled } from '@element-plus/icons-vue'
//引入路由
import { useRouter } from 'vue-router'
const router = useRouter()
//表单双向绑定
interface RuleForm {
  username: string
  password: string
  code: string
  unid: string
}
const ruleForm = reactive<RuleForm>({
  username: 'admin',
  password: '123455',
  code: '',
  unid: ''
})
//表单校验
const rules = reactive<FormRules<RuleForm>>({
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
})
//添加
const ruleFormRef = ref<FormInstance>()
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      localStorage.setItem('token', '666')
      //跳转页面，关闭当前页面
      router.replace('/')
    }
  })
}
//复选框
let checked = ref(false)

//获取验证码
// const getcode=(){

// }
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-image: url('https://eladmin.vip/demo/static/img/background.4a692a58.jpeg');
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  .input {
    width: 385px;
    padding: 20px;
    box-sizing: border-box;
    background-color: #fff;
    h3 {
      text-align: center;
      color: #707070;
      margin-bottom: 20px;
    }
    p {
      display: flex;
      align-items: center;
      color: #606266;
    }
  }
}
</style>
