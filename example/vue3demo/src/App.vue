<template>
  <div id="demo"></div>
</template>

<script setup>
import Pdfh5 from 'pdfh5';
import { onMounted } from 'vue';

onMounted(async () => {
  try {
    console.log(Pdfh5)
    
    // 创建PDF查看器
   let pdfViewer = new Pdfh5(document.querySelector("#demo"), {
      pdfurl: "/git.pdf",
      textLayer: true,
      workerSrc:"./pdf.worker.min.js",
      cMapUrl: './cmaps/',
      standardFontDataUrl: './standard_fonts/',
      iccUrl: './iccs/',
      wasmUrl: './wasm/'
    })
    console.log('PDF查看器创建成功:', pdfViewer)
    
  } catch (error) {
    console.error('PDF初始化失败:', error)
  }
});
</script>


<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#demo {}

* {
  padding: 0;
  margin: 0;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
