<template>
  <div class="login-qrcode">
    <h2 class="title">
      Vue3-TS-vite
    </h2>
    <QRCodeVue3
      :width="200"
      :height="200"
      :qr-options="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
      :image-options="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
      :dots-options="{
        type: 'dots',
        color: '#26249a',
        gradient: {
          type: 'linear',
          rotation: 0,
          colorStops: [
            { offset: 0, color: '#26249a' },
            { offset: 1, color: '#26249a' },
          ],
        },
      }"
      :background-options="{ color: '#ffffff' }"
      :corners-square-options="{ type: 'dot', color: '#000000' }"
      :corners-dot-options="{ type: undefined, color: '#000000' }"
      file-ext="png"
      :download="false"
      myclass="my-qur"
      imgclass="img-qr"
      download-button="my-button"
      :download-options="{ name: 'vqr', extension: 'png' }"
      value="https://github.com/wangyongtest/vue-vite-element-admin"
    />
  </div>
</template>

<script lang="ts" setup>
import QRCodeVue3 from 'qrcode-vue3'
</script>
