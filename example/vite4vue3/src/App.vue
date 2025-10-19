<script setup lang="ts">
import Pdfh5 from "pdfh5"
import { ref, onMounted, onUnmounted } from 'vue'

const container = ref<HTMLElement>()
let pdfViewer: any = null

onMounted(async () => {
  try {
    
    console.log('Pdfh5构造函数:', Pdfh5);

    // 创建PDF查看器
    pdfViewer = new Pdfh5(container.value!, {
      pdfurl: "/git.pdf",
      textLayer: true,
      workerSrc:"./pdf.worker.min.js",
      cMapUrl: './cmaps/',
      standardFontDataUrl: './standard_fonts/',
      iccUrl: './iccs/',
      wasmUrl: './wasm/'
    });
    console.log('PDF查看器创建成功:', pdfViewer);

  } catch (error) {
    console.error('PDF初始化失败:', error);
  }
})

onUnmounted(() => {
  if (pdfViewer && typeof pdfViewer.destroy === 'function') {
    pdfViewer.destroy()
  }
})
</script>

<template>
  <div class="pdf-container" ref="container"></div>
</template>

<style scoped>
.pdf-container {
  width: 100%;
  height: 100vh;
}
</style>
