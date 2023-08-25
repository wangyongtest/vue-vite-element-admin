<template>
  <div class="login-container">
    <div class="login-box">
      <SwitchDark class="login-dark" />
      <div class="login-left">
        <img src="../../assets/login/sideLogo.png">
      </div>
      <div class="login-form">
        <div class="info-qrcode">
          {{ accountLogin?'扫码登录':'账号登录' }}
        </div>
        <img
          src="../../assets/login/qrcodeIcon.png"
          class="qrcode"
          @click="handleClick"
        >

        <LoginForm v-if="accountLogin" />
        <LoginQrcode v-else />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import LoginForm from './loginForm.vue'
import LoginQrcode from './loginQrCode.vue'
import SwitchDark from '~comp/common/switchDark/index.vue'

// 这里控制扫码登陆还是账号登录
const accountLogin = ref<boolean>(true)

const handleClick = () => {
  accountLogin.value = !accountLogin.value
}
</script>
<style lang="scss">
$dark_gray: #889aa4;

.login-qrcode {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  .title{
    margin: 0;
    font-size: 30px;
    color: #000;
    white-space: nowrap;
  }
}

.login-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 8px;

  .login-left{
    width: 50%;

    img{
      width: 100%;
      max-width: 900px;
    }
  }

  .login-form{
    position: relative;
    box-sizing: border-box;
    width: 50%;
    max-width: 480px;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

    .info-qrcode{
      position: absolute;
      top: -60px;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 150px;
      height: 40px;
      font-size: 16px;
      color: #1492ff;
      border-radius: 8px;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

      &::after{
        position: absolute;
        top: 40px;
        right: 16px;
        box-sizing: border-box;
        width: 10px;
        height: 26px;
        content: "";
        border-top: 13px solid #fff;
        border-right: 5px solid transparent;
        border-bottom: 13px solid transparent;
        border-left: 5px solid transparent;
      }
    }
  }

   .login-title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 54px;
    margin-bottom: 30px;
    background-image: url('~assets/login/logo.png');
    background-size: 100% 100%;
    border: 1px solid transparent;

    .title{
      margin: 0;
      font-size: 30px;
      white-space: nowrap;
    }

    .icon{
      width: 100px;
    }
  }

  ::v-deep(.el-input__inner){
    height: 40px;
  }
}

.login-btn{
  width: 100%; height: 47px;
  margin-top: 20px
}

.show-pwd {
  position: absolute;
  top: 7px;
  right: 10px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;

  ::v-deep(.svg-icon){
    vertical-align: 0;
  }
}

.login-container {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #f0f2f5;
}

.login-dark{
  position: absolute;
  top: 20px;
  right: 20px;
}

.qrcode{
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  cursor: pointer;
}

@media (width <= 850px){
  .login-container{
    padding: 10px;
  }

  .login-box{
    .login-form{
      width: 88%;

      .title{
        font-size: 20px;
      }
    }
  }

  .login-left{
    display: none;
  }
}
</style>
