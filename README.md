# pdfh5.js
[![npm version](https://img.shields.io/npm/v/pdfh5.svg)](https://www.npmjs.com/package/pdfh5) [![npm downloads](https://img.shields.io/npm/dt/pdfh5.svg)](https://www.npmjs.com/package/pdfh5) [![npm downloads](https://img.shields.io/npm/dw/pdfh5.svg)](https://www.npmjs.com/package/pdfh5)  [![MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/gjTool/pdfh5/blob/master/LICENSE) [![GitHub issues](https://img.shields.io/github/issues/gjTool/pdfh5.svg)](https://github.com/gjTool/pdfh5/issues) [![GitHub stars](https://img.shields.io/github/stars/gjTool/pdfh5.svg?style=social)](https://github.com/gjTool/pdfh5/stargazers) [![GitHub forks](https://img.shields.io/github/forks/gjTool/pdfh5.svg?style=social)](https://github.com/gjTool/pdfh5/network/members)  

**有问题可以加Q群咨询，技术交流群，也可以探讨技术，另有开发技术讨论微信群可以问群主拉入微信群**


- [QQ群521681398](https://qm.qq.com/cgi-bin/qm/qr?k=3_qouxqe5w3gRCcHjpqkwtx-4yS6QSPD&jump_from=webapi&authKey=FlHU4wH2xOQUthUpgF5W3b1VXowCVmSRfJLU4GRcDVyBayJd1ank4HkOWSZei2f3)
- [pdfh5博客主页](https://pdfh5.gjtool.cn/)  

- [pdfh5项目GitHub地址](https://github.com/gjTool/pdfh5)  

- [pdfh5项目gitee地址](https://gitee.com/gjTool/pdfh5)



![pdfh5.js示例](https://pdfh5.gjtool.cn/img/123.gif)

## 更新信息
- 2025.10.19 更新： v3.0.0大版本更新，支持官方pdf.js v5.4.296，移除svg渲染模式，恢复懒加载模式，新增分段加载模式，新增沙箱集成（防止JavaScript注入等），新增密码pdf文件预览，优化手势缩放（后续会继续优化，目前还是有问题）。

- 根据需求选择加载模式：小文件直接全部加载，中等文件用懒加载，大文件用分段加载。如果同时配置多个模式，按优先级：分段加载 > 懒加载 > 传统加载。



### pdfh5在线预览 

-  [https://pdfh5.gjtool.cn/pdfh5/pdf.html](https://pdfh5.gjtool.cn/pdfh5/pdf.html)  

https://pdfh5.gjtool.cn/pdfh5/password.pdf  密码 123456zxcv..

## 快速开始（有两种方式）

#### 一、script标签引入方式

- 1.创建div容器
```html
<div id="demo"></div>
```

- 2.引入pdfh5.js（插件会自动检测并加载PDF.js资源）
```html
<script src="js/pdfh5.js"></script>
```

- 3.实例化
```javascript
var pdfh5 = new Pdfh5(document.querySelector("#demo"), {
    pdfurl: "./default.pdf"
});
```

####  二、npm安装方式（适应于vue）, react使用方法类似vue（example/react-test是react使用示例）

- 1.安装

```javascript
npm install pdfh5
```
- 2.静态资源引用

    将pdfh5文件夹下的cmaps、iccs、standard_fonts、wasm、js/pdf.worker.min.js都放置到public静态资源目录下


- 3.使用

```javascript
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
```


# API接口方法


## 实例化
- **pdfh5实例化的时候传两个参数，selector选择器，options配置项参数，会返回一个pdfh5实例对象，可以用来操作pdf，监听相关事件** 
```javascript
var pdfh5 = new Pdfh5(selector, options);
```
|参数名称	|类型		|取值	|是否必须	|作用				|
|:---:|:---:|:---:|:---:|:---:|
|selector	|  HTMLElement	| -		| √		|pdfh5的容器,html DOM元素对象	|
|options	|  Object	| -		| ×			|pdfh5的配置项参数	|

## options配置项参数列表

- **示例：** 配置项参数 pdfurl

```javascript
var pdfh5 = new Pdfh5(document.querySelector("#demo"), {
	pdfurl: "./default.pdf"
});
```

### 基础配置

|参数名称		|类型					|取值																																								|默认值	|作用																																							|
|:---:|:---:|:---:|:---:|:---:|
|pdfurl			|  String				| PDF文件地址																																					| -		|pdf地址																																						|
|data			|  Array(arraybuffer)	| PDF文件流数据																																					| -		|pdf文件流 ，与pdfurl二选一(二进制PDF数据。使用类型化数组（Uint8Array）可以提高内存使用率。如果PDF数据是BASE64编码的，请先使用atob（）将其转换为二进制字符串。)	|
|password		|  String				| PDF密码																																						| null	|PDF密码（如果有密码保护）																																	|
|goto			|  Number				| 页码数字																																						| 0		|加载pdf跳转到第几页（0表示不跳转）																															|

### 渲染配置

|参数名称		|类型					|取值																																								|默认值	|作用																																							|
|:---:|:---:|:---:|:---:|:---:|
|scale			|  Number				|渲染比例																																						|1		|pdf渲染的比例																																					|
|textLayer		|  Boolean				|true、false																																					|false	|是否开启textLayer，可以复制文本																																|
|enableHWA		|  Boolean				|true、false																																					|true	|是否启用硬件加速，对图片渲染很重要																															|
|cMapUrl		| String				|字体映射文件路径																																				|智能检测|解析pdf时，特殊情况下显示完整字体的cmaps文件夹路径																													|
|standardFontDataUrl| String			|标准字体路径																																					|智能检测|标准字体文件路径																																			|
|iccUrl			| String				|颜色配置文件路径																																				|智能检测|颜色管理配置文件路径																																		|
|wasmUrl			| String				|WebAssembly文件路径																																			|智能检测|高性能PDF渲染的WebAssembly文件路径																														|
|workerSrc		| String				|PDF.js Worker路径																																				|智能检测|PDF.js Worker文件路径																																	|

### 交互配置

|参数名称		|类型					|取值																																								|默认值	|作用																																							|
|:---:|:---:|:---:|:---:|:---:|
|scrollEnable	| Boolean				|true、false																																					|true	|是否允许pdf滚动																																				|
|zoomEnable		| Boolean				|true、false																																					|true	|是否允许pdf手势缩放																																			|
|resize			| Boolean				|true、false																																					|true	|是否允许窗口大小变化时重新渲染																																|

### 懒加载配置

|参数名称		|类型					|取值																																								|默认值	|作用																																							|
|:---:|:---:|:---:|:---:|:---:|
|lazyLoad		| Boolean				|true、false																																					|false	|启用懒加载模式，只渲染可见页面																																|

### 分段加载配置

|参数名称		|类型					|取值																																								|默认值	|作用																																							|
|:---:|:---:|:---:|:---:|:---:|
|progressiveLoading	| Boolean				|true、false																																					|false	|启用分段加载模式，PDF.js官方流式加载+智能内存管理																										|
|chunkSize		| Number				|数字，单位字节																																					|65536	|分块大小，默认64KB																																		|
|maxMemoryPages	| Number				|数字																																							|5		|最大内存页面数，超过会自动清理远距离页面																												|
|maxImageSize	| Number				|数字，单位字节																																					|8388608|最大图片大小，8388608，兼容iOS Safari																																	|
|canvasMaxAreaInBytes| Number			|数字，单位字节																																					|8388608|最大canvas面积，iOS Safari浏览器canvas限制约为16777216 																													|

### UI组件配置

|参数名称		|类型					|取值																																								|默认值	|作用																																							|
|:---:|:---:|:---:|:---:|:---:|
|loadingBar		| Boolean				|true、false																																					|true	|是否显示加载进度条																																			|
|pageNum		| Boolean				|true、false																																					|true	|是否显示左上角页码																																			|
|backTop		| Boolean				|true、false																																					|true	|是否显示右下角回到顶部按钮																																	|

### 其他配置

|参数名称		|类型					|取值																																								|默认值	|作用																																							|
|:---:|:---:|:---:|:---:|:---:|
|goto			| Number				|页码数字																																						|0		|加载pdf跳转到第几页																																			|
|enableHWA		| Boolean				|true、false																																					|true	|是否启用硬件加速，对图片渲染很重要																															|

### 手势缩放配置

|参数名称		|类型					|取值																																								|默认值	|作用																																							|
|:---:|:---:|:---:|:---:|:---:|
|tapZoomFactor	| Number				|数字																																							|2		|双击缩放倍数																																				|
|zoomOutFactor	| Number				|数字																																							|1.2	|缩放回弹因子																																				|
|animationDuration| Number				|数字，单位毫秒																																					|300	|缩放动画持续时间																																			|
|maxZoom		| Number				|数字																																							|4		|最大缩放倍数																																				|
|minZoom		| Number				|数字																																							|0.5	|最小缩放倍数																																				|
|dampingFactor	| Number				|数字																																							|0.85	|阻尼因子																																					|

### 注释编辑器配置

|参数名称		|类型					|取值																																								|默认值	|作用																																							|
|:---:|:---:|:---:|:---:|:---:|
|annotationEditorMode| String			|"NONE"、"FREETEXT"、"HIGHLIGHT"、"INK"、"STAMP"、"SIGNATURE"									|"NONE"	|注释编辑器模式																																				|
|editorParams	| Object				|编辑器参数对象																																					|{}		|注释编辑器参数配置																																			|

### 沙箱安全配置

|参数名称		|类型					|取值																																								|默认值	|作用																																							|
|:---:|:---:|:---:|:---:|:---:|
|sandboxEnabled	| Boolean				|true、false																																					|true	|是否启用沙箱模式，防止JavaScript注入和XSS攻击																													|

#### 沙箱配置选项（sandboxOptions）

|参数名称		|类型					|取值																																								|默认值	|作用																																							|
|:---:|:---:|:---:|:---:|:---:|
|allowScripts	| Boolean				|true、false																																					|false	|是否允许JavaScript执行																																	|
|allowForms		| Boolean				|true、false																																					|true	|是否允许表单交互																																			|
|allowPopups	| Boolean				|true、false																																					|false	|是否允许弹窗																																				|
|allowSameOrigin| Boolean				|true、false																																					|true	|是否允许同源访问																																			|
|sandbox		| String				|HTML sandbox属性值																																			|"allow-same-origin allow-scripts"|HTML sandbox属性，控制沙箱行为																														|
|referrerPolicy| String				|referrer策略值																																					|"strict-origin-when-cross-origin"|引用策略，控制referrer信息																																|

#### 沙箱配置示例

```javascript
var pdfh5 = new Pdfh5(document.querySelector("#demo"), {
    pdfurl: "./document.pdf",
    sandboxEnabled: true,
    sandboxOptions: {
        allowScripts: false,        // 禁止JavaScript执行
        allowForms: true,           // 允许表单交互
        allowPopups: false,         // 禁止弹窗
        allowSameOrigin: true,       // 允许同源访问
        sandbox: "allow-same-origin allow-scripts",
        referrerPolicy: "strict-origin-when-cross-origin"
    }
});
```

## 资源路径配置说明

```javascript
var pdfh5 = new Pdfh5(document.querySelector("#demo"), {
    pdfurl: "./document.pdf",
    workerSrc: "./pdf.worker.min.js",
    cMapUrl: "../cmaps/",
    standardFontDataUrl: "../standard_fonts/",
    iccUrl: "../iccs/",
    wasmUrl: "../wasm/"
});
```

### 资源文件说明
插件需要以下PDF.js资源文件：
- `cmaps/` - 字体映射文件（用于正确显示中文字体）
- `standard_fonts/` - 标准字体文件（用于PDF标准字体渲染）
- `iccs/` - 颜色配置文件（用于颜色管理和色彩空间转换）
- `wasm/` - WebAssembly文件（用于高性能PDF渲染和图像解码）
- `pdf.worker.min.js` - PDF.js Worker文件（用于后台PDF处理）

## 	pdf请求示例
1、文件地址
```javascript
new Pdfh5(document.querySelector("#demo"), {
	pdfurl: "git.pdf"
});
```


2、pdf文件流或者arraybuffer已经得到，如何渲染
```javascript
 new Pdfh5(document.querySelector("#demo"), {
 	data: blob,  //blob arraybuffer
 });
```
## methods 方法列表

### 基础控制方法

|方法名			|传参				|传参取值															|作用											|
|:---:|:---:|:---:|:---:|
|show			| Function		|带一个回调函数														|pdfh5显示										|
|hide			| Function		|带一个回调函数														|pdfh5隐藏										|
|destroy		| Function		|带一个回调函数														|pdfh5销毁										|

### 交互控制方法

|方法名			|传参				|传参取值															|作用											|
|:---:|:---:|:---:|:---:|
|setScrollEnabled| Boolean			|true、false														|启用/禁用PDF滚动								|
|setZoomEnabled	| Boolean			|true、false														|启用/禁用PDF手势缩放							|
|isScrollEnabled| -					|无参数																|获取滚动状态									|
|isZoomEnabled	| -					|无参数																|获取缩放状态									|
|setProgressiveLoading	| Boolean, Object	|Boolean:是否启用, Object:配置选项{chunkSize, maxMemoryPages}		|设置分段加载配置								|
|getProgressiveLoadingStatus	| -				|无参数																|获取分段加载状态								|
|getMemoryUsage		| -				|无参数																|获取内存使用情况								|

### 页面导航方法

|方法名			|传参				|传参取值															|作用											|
|:---:|:---:|:---:|:---:|
|goToPage		| Number			|Number:要跳转的pdf页数												|pdf跳转到第几页（pdf加载完成后使用）			|
|nextPage		| -				|无参数																|跳转到下一页									|
|prevPage		| -				|无参数																|跳转到上一页									|
|scrollToTop	| -				|无参数																|滚动到顶部										|

### 缩放控制方法

|方法名			|传参				|传参取值															|作用											|
|:---:|:---:|:---:|:---:|
|zoomIn			| -				|无参数																|放大PDF										|
|zoomOut		| -				|无参数																|缩小PDF										|
|setScale		| Number			|Number:缩放比例													|设置缩放比例									|
|setZoomEnabled	| Boolean			|true、false														|启用/禁用缩放手势								|
|isZoomEnabled	| Boolean			|无参数																|获取缩放状态									|
|setZoomConstraints| Object		|{minScale, maxScale, step}										|设置缩放约束									|
|getZoomConstraints| -				|无参数																|获取缩放约束									|
|isZooming		| -					|无参数																|检查是否正在缩放								|

### 搜索功能方法

|方法名			|传参				|传参取值															|作用											|
|:---:|:---:|:---:|:---:|
|searchText		| String			|String:搜索关键词													|搜索文本										|
|findNext		| -				|无参数																|查找下一个匹配项								|
|findPrevious	| -				|无参数																|查找上一个匹配项								|
|clearSearch	| -				|无参数																|清除搜索高亮									|

### 下载和打印方法

|方法名			|传参				|传参取值															|作用											|
|:---:|:---:|:---:|:---:|
|downloadPDF	| String			|String:下载文件名，默认"document.pdf"								|下载PDF										|
|printPDF		| -				|无参数																|打印PDF（渲染所有页面到打印容器）			|

### 分段加载方法

|方法名			|传参				|传参取值															|作用											|
|:---:|:---:|:---:|:---:|
|setProgressiveLoading	| Boolean, Object	|Boolean:是否启用, Object:配置选项{chunkSize, maxMemoryPages}		|设置分段加载配置								|
|getProgressiveLoadingStatus	| -				|无参数																|获取分段加载状态								|
|getMemoryUsage		| -				|无参数																|获取内存使用情况								|

### 注释编辑器方法

|方法名			|传参				|传参取值															|作用											|
|:---:|:---:|:---:|:---:|
|setAnnotationEditorMode| String			|String:编辑器模式（"NONE"、"FREETEXT"、"HIGHLIGHT"、"INK"、"STAMP"、"SIGNATURE"）|设置注释编辑器模式							|
|getAnnotationEditorMode| -				|无参数																|获取当前注释编辑器模式							|
|addAnnotation		| Object			|Object:注释数据对象													|添加注释										|
|removeAnnotation	| String			|String:注释ID														|删除注释										|
|updateAnnotation	| String, Object	|String:注释ID, Object:更新数据										|更新注释										|
|getAnnotations		| -				|无参数																|获取所有注释									|
|clearAnnotations	| -				|无参数																|清除所有注释									|



### 分段加载需要的服务端配置说明

#### 1. **Nginx配置（推荐）**

分段加载需要服务端支持HTTP范围请求（Range Requests），Nginx默认支持静态文件的范围请求，但需要正确配置：

```nginx
# 基础配置 - 支持PDF文件的范围请求
location ~* \.(pdf)$ {
    # 启用范围请求支持
    add_header Accept-Ranges bytes;
    
    # 设置正确的MIME类型
    add_header Content-Type application/pdf;
    
    # 缓存控制（可选）
    expires 1h;
    add_header Cache-Control "public, immutable";
    
    # CORS支持（如果需要跨域）
    add_header Access-Control-Allow-Origin "*";
    add_header Access-Control-Allow-Methods "GET, HEAD, OPTIONS";
    add_header Access-Control-Allow-Headers "Range, Content-Range";
    
    # 处理OPTIONS请求
    if ($request_method = 'OPTIONS') {
        add_header Access-Control-Allow-Origin "*";
        add_header Access-Control-Allow-Methods "GET, HEAD, OPTIONS";
        add_header Access-Control-Allow-Headers "Range, Content-Range";
        add_header Access-Control-Max-Age 86400;
        return 204;
    }
}
```

#### 2. **反向代理配置**

如果使用Nginx作为反向代理，需要额外配置：

```nginx
location /api/pdf/ {
    proxy_pass http://backend_server;
    
    # 禁用缓冲，支持流式传输
    proxy_buffering off;
    proxy_request_buffering off;
    
    # 设置超时时间
    proxy_read_timeout 300s;
    proxy_connect_timeout 60s;
    
    # 使用HTTP/1.1
    proxy_http_version 1.1;
    proxy_set_header Connection "";
    
    # 传递原始请求头
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    
    # 支持范围请求
    proxy_set_header Range $http_range;
    proxy_set_header If-Range $http_if_range;
}
```

#### 3. **Apache配置**

如果使用Apache服务器：

```apache
# 启用mod_rewrite和mod_headers
LoadModule rewrite_module modules/mod_rewrite.so
LoadModule headers_module modules/mod_headers.so

# 配置PDF文件处理
<LocationMatch "\.pdf$">
    # 启用范围请求
    Header set Accept-Ranges bytes
    
    # 设置MIME类型
    Header set Content-Type "application/pdf"
    
    # CORS支持
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, HEAD, OPTIONS"
    Header set Access-Control-Allow-Headers "Range, Content-Range"
    
    # 缓存控制
    Header set Cache-Control "public, max-age=3600"
</LocationMatch>
```

#### 4. **Node.js Express配置**

如果使用Node.js作为后端：

```javascript
const express = require('express');
const app = express();

// 支持范围请求的中间件
app.use('/pdf', (req, res, next) => {
    // 设置CORS头
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Range, Content-Range');
    
    // 处理OPTIONS请求
    if (req.method === 'OPTIONS') {
        res.status(204).end();
        return;
    }
    
    next();
});

// 静态文件服务，支持范围请求
app.use('/pdf', express.static('pdf-files', {
    setHeaders: (res, path) => {
        if (path.endsWith('.pdf')) {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Accept-Ranges', 'bytes');
        }
    }
}));
```

#### 5. **PHP配置**

如果使用PHP作为后端：

```php
<?php
// 设置CORS头
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, HEAD, OPTIONS');
header('Access-Control-Allow-Headers: Range, Content-Range');

// 处理OPTIONS请求
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// 支持范围请求的PDF文件服务
$file = $_GET['file'];
$filePath = 'pdf-files/' . $file;

if (file_exists($filePath)) {
    $fileSize = filesize($filePath);
    $range = $_SERVER['HTTP_RANGE'] ?? '';
    
    if ($range) {
        // 处理范围请求
        $ranges = explode('=', $range);
        $offset = explode('-', $ranges[1]);
        $start = intval($offset[0]);
        $end = isset($offset[1]) ? intval($offset[1]) : $fileSize - 1;
        
        header('HTTP/1.1 206 Partial Content');
        header('Content-Range: bytes ' . $start . '-' . $end . '/' . $fileSize);
        header('Content-Length: ' . ($end - $start + 1));
        header('Content-Type: application/pdf');
        header('Accept-Ranges: bytes');
        
        $fp = fopen($filePath, 'rb');
        fseek($fp, $start);
        echo fread($fp, $end - $start + 1);
        fclose($fp);
    } else {
        // 完整文件请求
        header('Content-Type: application/pdf');
        header('Content-Length: ' . $fileSize);
        header('Accept-Ranges: bytes');
        readfile($filePath);
    }
}
?>
```

#### 6. **配置验证**

验证服务端是否正确支持范围请求：

```bash
# 测试范围请求
curl -H "Range: bytes=0-1023" -I http://your-server.com/path/to/file.pdf

# 应该返回：
# HTTP/1.1 206 Partial Content
# Accept-Ranges: bytes
# Content-Range: bytes 0-1023/1048576
# Content-Length: 1024
```

### 事件监听方法

|方法名			|传参				|传参取值															|作用											|
|:---:|:---:|:---:|:---:|
|on				| (String, Function)|String：监听的事件名，Function：监听的事件回调						|监听事件										|
|off				| String			|String：要移除的事件名												|移除事件监听									|
|trigger		| (String, Object)	|String：事件名，Object：事件数据									|触发事件										|

### 状态获取方法

|方法名			|传参				|传参取值															|作用											|
|:---:|:---:|:---:|:---:|
|getStatus		| -				|无参数																|获取当前状态信息								|
## on方法监听所有事件-事件名列表

- **示例：** 监听pdf准备开始渲染，此时可以拿到pdf总页数

```javascript
pdfh5.on("ready", function () {
	console.log("总页数：" + this.totalNum)
})
```
### 生命周期事件

|事件名			|回调参数											|作用																				|
|:---:|:---:|:---:|
|init			| Function									|监听pdfh5开始初始化																|
|ready			| Function									|监听pdf准备开始渲染，此时可以拿到pdf总页数											|
|error			| Function(msg,time)						|监听加载失败，msg信息，time耗时													|
|success		| Function(msg,time)							| 监听pdf渲染成功，msg信息，time耗时												|
|complete		| Function(status, msg, time)				| 监听pdf加载完成事件，加载失败、渲染成功都会触发。status有两种状态success和error	|
|render			| Function(currentNum, pageTime, totalTime, currentPageDom)	| 监听pdf渲染过程，currentNum当前页码，pageTime单页耗时，totalTime总耗时，currentPageDom当前页面DOM	|

### 交互事件

|事件名			|回调参数											|作用																				|
|:---:|:---:|:---:|
|zoom			| Function(scale)								| 监听pdf缩放，scale缩放比例														|
|zoomStart		| Function(data)								| 监听缩放开始，data包含scale和startTime											|
|zoomEnd		| Function(data)								| 监听缩放结束，data包含scale、startScale、scaleChange、duration等					|
|pageLoaded		| Function(data)								| 监听页面加载完成（分段加载），data包含pageNum和memoryUsage						|
|pageCleaned	| Function(data)								| 监听页面清理完成（分段加载），data包含pageNum									|
|scroll			| Function(data)								| 监听pdf滚动，data包含scrollTop滚动条高度和currentNum当前页码					|
|backTop		| Function									| 监听回到顶部按钮的点击事件回调													|

### 控制事件

|事件名			|回调参数											|作用																				|
|:---:|:---:|:---:|
|zoomEnabled	| Function(flag)								| 监听缩放启用状态变化，flag：true，false										|
|scrollEnabled	| Function(flag)								| 监听滚动启用状态变化，flag：true，false										|
|show			| Function									| 监听pdfh5显示																		|
|hide			| Function									| 监听pdfh5隐藏																		|
|destroy		| Function									| 监听pdfh5销毁																		|

### 注释编辑器事件

|事件名			|回调参数											|作用																				|
|:---:|:---:|:---:|
|annotationAdded	| Function(data)							| 监听注释添加，data包含注释信息												|
|annotationRemoved	| Function(data)							| 监听注释删除，data包含注释信息												|
|annotationUpdated	| Function(data)							| 监听注释更新，data包含注释信息												|
|annotationModeChanged| Function(mode)						| 监听注释模式变化，mode为新的模式												|
|annotationSelected	| Function(data)							| 监听注释选择，data包含选中的注释信息											|

### 事件监听示例

```javascript
// 监听PDF加载完成事件
pdfh5.on("complete", function (status, msg, time) {
    console.log("状态：" + status + "，总耗时：" + time + "毫秒，总页数：" + this.totalNum, msg);
});

// 监听滚动事件
pdfh5.on("scroll", function (data) {
    console.log("scrollTop:" + data.scrollTop, "currentNum:" + data.currentNum);
});

// 监听注释编辑器事件
pdfh5.on("annotationAdded", function (data) {
    console.log("注释已添加：", data);
});

pdfh5.on("annotationModeChanged", function (mode) {
    console.log("注释模式已切换为：", mode);
});
```

## 完整使用示例

### 基础使用
```javascript
var pdfh5 = new Pdfh5(document.querySelector("#demo"), {
    pdfurl: "./document.pdf",
    scale: 1.5,
    textLayer: true,
    zoomEnable: true,
    scrollEnable: true
});
```

### 高级配置示例
```javascript
var pdfh5 = new Pdfh5(document.querySelector("#demo"), {
    // 基础配置
    pdfurl: "./large-document.pdf",
    password: "123456", // 如果有密码保护
    
    // 渲染配置
    scale: 1.0,
    textLayer: true,
    enableHWA: true,
    
    // 交互配置
    zoomEnable: true,
    scrollEnable: true,
    backTop: true,
    pageNum: true,
    loadingBar: true,
    
    // 手势缩放配置
    tapZoomFactor: 2,
    maxZoom: 4,
    minZoom: 0.5,
    
    // 分段加载配置（大文件推荐）
    progressiveLoading: true,
    chunkSize: 65536,
    maxMemoryPages: 5,
    
    // 注释编辑器配置
    annotationEditorMode: "FREETEXT",
    editorParams: {
        freeTextColor: "#000000",
        freeTextSize: 12,
        inkColor: "#000000",
        inkThickness: 1
    },
    
    // 沙箱安全配置
    sandboxEnabled: true,
    sandboxOptions: {
        allowScripts: false,
        allowForms: true,
        allowPopups: false,
        allowSameOrigin: true
    },
    
    // 资源路径配置
    workerSrc: "./pdf.worker.min.js",
    cMapUrl: "../cmaps/",
    standardFontDataUrl: "../standard_fonts/",
    iccUrl: "../iccs/",
    wasmUrl: "../wasm/"
});

// 事件监听
pdfh5.on("ready", function() {
    console.log("PDF加载完成，总页数：", this.totalNum);
});

pdfh5.on("annotationAdded", function(data) {
    console.log("新注释已添加：", data);
});

// 方法调用
pdfh5.setAnnotationEditorMode("HIGHLIGHT");
pdfh5.setProgressiveLoading(true, {chunkSize: 32768});
```

## 打赏榜单
- [JayLin](https://github.com/110117ab) ￥6.66
- [靓仔城](https://github.com/ljc7877376) ￥6.67
- 南蓝 ￥8.80
- 我是太阳 ￥29.99
- *小波 ￥1.00
- *鑫 ¥9.99
- *手 ¥9.99
- *勇 ￥19.99 
- *爷 ¥5.00
- *超 ¥20.00
- 3*Y ¥5.00
- *阳 ¥5.00
- **雄 ¥5.00
- A*r ¥1.23
- *客 ¥5.00
- *运 ¥66.66
- *辰 ¥30.00
- *黎 ¥6.66+¥5.00
- **福 ¥6.66
- *🏀 ¥6.66+¥1.00
- *阳 ¥10.00
- 自闭中 ¥16.66+¥16.00
- *焕 ¥6.66
- *人 ¥5.00
- *。 ¥5.20
- 半*) ¥5.00
- *1 ¥15.00
- *蕾 ¥16.66+¥8.80
- *军 ¥10.00
- **强 ¥58.88
- E*y ¥6.60
- J*u ¥13.00
- A*a ¥50.00
- *东 ¥8.80
- j*y ¥9.99
- *宇 ¥6.66
- *涛 ￥1.00
- *. ￥10.00
- *☺ ￥6.66
- *霸 ￥6.66
- a*r ￥20.00
- 木槿(**耀) ￥50.00
