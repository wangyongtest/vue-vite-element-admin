<template>
  <div class="login-title" />
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
  >
    <el-form-item
      label=""
      prop="username"
    >
      <el-input
        placeholder="请输入用户名"
        auto-complete="on"
        style="position: relative"
        v-model="ruleForm.username"
        @keyup.enter="submitForm(ruleFormRef)"
      >
        <template #prefix>
          <el-icon class="el-input__icon">
            <UserFilled />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item
      label=""
      prop="password"
    >
      <el-input
        placeholder="请输入密码"
        auto-complete="on"
        @keyup.enter="submitForm(ruleFormRef)"
        v-model="ruleForm.password"
        :type="passwordType"
      >
        <template #prefix>
          <el-icon class="el-input__icon">
            <GoodsFilled />
          </el-icon>
        </template>
        <template #suffix>
          <div
            class="show-pwd"
            @click="showPwd"
          >
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </div>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item style="width: 100%">
      <el-button
        :loading="loading"
        class="login-btn"
        type="primary"
        @click="submitForm(ruleFormRef)"
      >
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElNotification } from 'element-plus'
import { UserFilled, GoodsFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { getTimeStateStr } from '~utils/index'
import { useUserStore } from '~store/user'

const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const UserStore = useUserStore()
const passwordType = ref('password')
const loading = ref(false)

const rules = reactive({
  password: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  username: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

// 表单数据
const ruleForm = reactive({
  username: 'admin',
  password: '123456'
})

// 显示密码图标
const showPwd = () => {
  passwordType.value = passwordType.value === 'password' ? '' : 'password'
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      loading.value = true
      // 登录
      setTimeout(async () => {
        await UserStore.login(ruleForm)
        await router.push({
          path: '/index'
        })

        ElNotification({
          title: getTimeStateStr(),
          message: '欢迎登录 Vue Element Admin',
          type: 'success',
          duration: 3000
        })
        loading.value = true
      }, 1000)
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>

  <style lang="scss" scoped>
  </style>
