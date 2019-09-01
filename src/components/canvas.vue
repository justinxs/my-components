<template>
  <div style="padding-left:100px;width: 1800px;height: 1800px;">
    <div id="img-container">
      <img data-cors="cross" crossorigin="anonymous" src="https://desk-fd.zol-img.com.cn/t_s1920x1200c5/g2/M00/0C/05/ChMlWl0kAE-IJ51WAAa6H4jey70AALq2AI-YTEABro3684.jpg"  alt />
      <img  data-cors="cross" crossorigin="anonymous" src="https://desk-fd.zol-img.com.cn/t_s1920x1200c5/g2/M00/0A/03/ChMlWl0d7cuIGoPbAAa0xaaN6AUAALicwKV2YgABrTd939.jpg"  alt />
      <img   src="../image/1561023224631.jpg"  alt />
      <img  data-cors="cross" crossorigin="anonymous"  src="https://desk-fd.zol-img.com.cn/t_s1680x1050c5/g2/M00/0E/0F/ChMlWV0sHsSIeYVQAAQ0HiokIWgAAL1PwCYCa8ABDQ2985.jpg"  alt />
      <img  data-cors="cross" crossorigin="anonymous" src="https://desk-fd.zol-img.com.cn/t_s1920x1200c5/g2/M00/0E/0F/ChMlWl0sHv2IVE1HAAbRx1s_tWgAAL1QgFJbWAABtHf756.jpg"  alt />
      <img  data-cors="cross" crossorigin="anonymous" src="https://desk-fd.zol-img.com.cn/t_s2560x1440c5/g2/M00/0E/0F/ChMlWl0sHs2IRNBaAA49qzBdhogAAL1PwH5dAQADj3D337.jpg"  alt />
      <img  data-cors="cross" crossorigin="anonymous" src="https://desk-fd.zol-img.com.cn/t_s2560x1440c5/g2/M00/0E/0F/ChMlWl0sHs2IRNBaAA49qzBdhogAAL1PwH5dAQADj3D337.jpg"  alt />
      <img  data-cors="cross" crossorigin="anonymous" src="https://desk-fd.zol-img.com.cn/t_s2560x1440c5/g2/M00/0E/0F/ChMlWl0sHs2IRNBaAA49qzBdhogAAL1PwH5dAQADj3D337.jpg"  alt />
      <img  data-cors="cross" crossorigin="anonymous" src="https://desk-fd.zol-img.com.cn/t_s2560x1440c5/g2/M00/0E/0F/ChMlWl0sHs2IRNBaAA49qzBdhogAAL1PwH5dAQADj3D337.jpg"  alt />
      <img  data-cors="cross" crossorigin="anonymous" src="https://desk-fd.zol-img.com.cn/t_s2560x1440c5/g2/M00/0E/0F/ChMlWl0sHs2IRNBaAA49qzBdhogAAL1PwH5dAQADj3D337.jpg"  alt />
      <div id="erweima"></div>
    </div>
    
    <div class="result-img" style="display: inline-block;">
      <img class="copy-image" :src="base64Data" alt />
    </div>

    <div class="paste-area" contenteditable="true"></div>
    <div class="control-panle">
      <span class="control-btn" id="copy-btn" data-clipboard-action="copy">复制</span>
      <span class="control-btn" @click="saveFile">下载</span>
      <span class="control-btn" @click="getCanvas">生成canvas</span>

      <span class="control-btn" @click="changeImage">输入框图片替换</span>
    </div>
  </div>
</template>
<script>
import 'cf-blob.js';
import 'canvas-toBlob';

import html2canvas from "html2canvas";
import ClipboardJS from "clipboard";
import QRCode from "qrcodejs2";
import { saveAs } from 'file-saver';
export default {
    data() {
        return {
            base64Data: null,
            longBase64Regx: /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i,
            base64Regx: /\s*;\s*base64\s*(?:;|$)/i,
            IEregx: /(?:ms|\()(ie)\s([\w\.]+)/i,
            ua: window.navigator.userAgent,
            qrcodeOptions: {
                text: '',
                width: 128,
                height: 128,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            }
        };
    },
    mounted() {
        this.renderQr("#erweima", "http://www.baidu.com");    
        this.copyImageListener("#copy-btn", ".result-img");

        this.loadingImg();
    },
    methods: {
        isElementNode(obj) {
            if (typeof obj === 'object' && obj.nodeType === 1 && obj instanceof window.Node) {
                return true
            } else {
                return false
            }
        },
        async loadingImg() {
            let imgList = [...document.querySelectorAll('#img-container img')];
            const isEdge = /Edge/i.test(this.ua);
            const isIE10 = this.IEregx.exec(this.ua) && this.IEregx.exec(this.ua)[2] <= 10;
            let isBase64Src = (src) => this.longBase64Regx.test(src);

            if (isEdge || isIE10) {
                console.log('ieieieieieieie');
                let base64Image = imgList.filter(img => img.src && !isBase64Src(img.src) && img.getAttribute('data-cors') === "cross");
                console.log(base64Image);
                let dataList = await Promise.all(base64Image.map(img => this.IEgetImageAsBase64(img.src))).then(data => data);
                dataList.forEach((base64URL, i) => base64Image[i].src = base64URL);

                this.getCanvas()
            } else {
                let promiseArr = imgList.map(img => {
                    return new Promise((resolve, reject) => {
                        img.onload = resolve;
                        img.onerror = reject;
                    })
                })
                Promise.all(promiseArr).then(this.getCanvas).catch(console.error)
            }
        },

        //  生成二维码
        renderQr(container, url) {
            if (!container || !url) return;
            
            let boxDom = this.isElementNode(container) ? container : document.querySelector(container);
            new QRCode(boxDom, Object.assign(this.qrcodeOptions, {text: url}));
        },

        // html转canvas
        getCanvas(type = 'image/png', q = 1) {
            const that = this;
            let container = document.querySelector("#img-container"),
            //  元素的大小及其相对于视口的位置
            rect = container.getBoundingClientRect(),
            //  是否固定定位
            isFixed = window.getComputedStyle(container, null).getPropertyValue('position') === 'fixed',
            //  是否支持pageXOffset
            supportPageOffset = window.pageXOffset !== undefined,
            //  渲染模式 标准 CSS1Compat  混杂 BackCompat
            isCSS1Compat = ((document.compatMode || "") === "CSS1Compat"),
            //  窗口滚动的距离
            scrollX = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
            scrollY = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop,
            canvas = document.createElement('canvas'),
            context = canvas.getContext('2d');

            // 关闭抗锯齿
            context.mozImageSmoothingEnabled = false;
            context.webkitImageSmoothingEnabled = false;
            context.msImageSmoothingEnabled = false;
            context.imageSmoothingEnabled = false;

            console.log('加载完成', rect, scrollX, scrollY );
            let opts = {
                canvas,
                useCORS: true,
                x: rect.left,
                y: rect.top,
                width: rect.width,
                height: rect.height,
                scrollY: isFixed ? 0 : -scrollX,
                scrollX: isFixed ? 0 : -scrollY
            };
            html2canvas(container, opts).then(function(canvas) {
                console.log('渲染完毕');
                that.base64Data = canvas.toDataURL(type, q);
            });
        },

        //  复制操作监听
        copyImageListener(btnClass, targetClass) {
            if (!btnClass || !targetClass) return;

            let clipboard = new ClipboardJS(btnClass, {
              target: function(trigger) {
                return document.querySelector(targetClass);
              }
            });
            clipboard.on("success", function(e) {
              console.info("Action:", e.action);
              console.info("Text:", e.text);
              console.info("Trigger:", e.trigger);

              e.clearSelection();
            });
            clipboard.on("error", function(e) {
              console.error("Action:", e.action);
              console.error("Trigger:", e.trigger);
            });
        },

        //  canvas转blob文件流
        canvsaToBlob(canvas, type = 'image/png', q = 1) {
            return new Promise((resolve, reject) => {
                if (!HTMLCanvasElement.prototype.toBlob) {
                    let dataURI = canvas.toDataURL(type, q);
                    return resolve(this.b64toBlob(dataURI, type))
                } else {
                    return canvas.toBlob(resolve, type, q);
                }
            })
        },

        //  base64 转blob文件流
        b64toBlob(dataURI, type = 'image/png') {
            let heard_end = dataURI.indexOf(',');
            let data = dataURI.substring(heard_end + 1);
            let len = data.length / 4 * 3;
            let byteString = window.atob ? window.atob(data) : len,
            ab = new ArrayBuffer(byteString.length),
            ia = new Uint8Array(ab);

            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], { type });
        },

        //  保存下载图片
        saveFile(data, filename) {
            //  ie ie11 edge
            const regex = /(?:ms|\()(ie)\s([\w\.]+)|trident|(edge|edgios|edga|edg)/i
            data = this.base64Data;
            filename = 'share.png';

            if (regex.test(this.ua)) {
                navigator.msSaveBlob && navigator.msSaveBlob(this.b64toBlob(data), filename);
            } else {
                let save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
                save_link.href = data;
                save_link.download = filename,
                event = document.createEvent('MouseEvents');

                event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                save_link.dispatchEvent(event);
            }
            // saveAs(data, filename)
        },

        //  <= ie10 或 edge 不支持drawImage跨域 
        //  html2canvas 设置useCORS: true  等效于  img 属性crossOrigin = 'anonymous'
        //  crossOrigin/CORS	同域	       跨域无 CORS	                       跨域有 CORS
        //  default	            支持	支持渲染，不支持 toDataURL	         支持渲染，不支持 toDataURL
        //  anonymous	        N/A	            同上	                    支持渲染，支持 toDataURL
        //  use-credentials	    N/A	            同上	                    支持渲染，不支持 toDataURL

        //  图片服务器CORS需要配置Access-Control-Allow-Origin *
        //  ajax请求图片回来转 base64 -------TODO 耗内存和性能 ------
        IEgetImageAsBase64(url) {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (this.response) {
                        let dataURI = URL.createObjectURL(this.response);
                        let img = new Image();
                        img.onload = function () {
                            // 此时你就可以使用canvas对img为所欲为了
                            let canvas = document.createElement('canvas'),
                            context = canvas.getContext('2d');
                            canvas.width = img.width;
                            canvas.height = img.height;
                            // 关闭抗锯齿
                            context.mozImageSmoothingEnabled = false;
                            context.webkitImageSmoothingEnabled = false;
                            context.msImageSmoothingEnabled = false;
                            context.imageSmoothingEnabled = false;

                            context.drawImage(img, 0, 0, img.width, img.height);

                            resolve(canvas.toDataURL('image/jpeg', 1))
                            // ... code ...
                            // 图片用完后记得释放内存
                            URL.revokeObjectURL(dataURI);
                            canvas = context = img = null;
                        };
                        img.src = dataURI;
                    } else {
                        console.log('图片请求失败');
                        resolve(url)
                    }
                    
                }
                xhr.onerror = function () {
                    console.log('图片请求失败');
                    resolve(url)
                }
                xhr.open('GET', url);
                xhr.responseType = 'blob';
                xhr.send();
            })
        },

        //  输入框复制图片替换
        changeImage() {
            let container = document.querySelector('.paste-area');
            let imageList = [...container.querySelectorAll('img')];

            let arr = imageList.filter(img => this.longBase64Regx.test(img.src));
            arr.forEach(img => {
                img.src = '/static/img/1561023224631.c240599.jpg'
                img.setAttribute('onclick', 'showImage()')
            })
            console.log(arr);
            
        }
    }
};
</script>



<style lang="scss" scoped>
#img-container {
    position: fixed;
    top: 300px;
    left: 100px;
    display: inline-block;
  width: 500px;
  border: 2px solid #ccc;
  padding: 10px;
  background-color: skyblue;
  > * {
      float: left;
  }
  img {
    width: 100px;
    height: auto;
  }
}

.control-panle {
  .control-btn {
    display: inline-block;
    padding: 8px;
    border: 1px solid #ccc;
    background-color: skyblue;
  }
}

.paste-area {
    
  margin: 40px auto;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;
}
</style>