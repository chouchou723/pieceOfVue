var that = this
      if (e.target.files[0]) {
        var file = e.target.files[0]
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function() {
          img.src = this.result
        }
        var img = new Image,
          width = 1024, //image resize   压缩后的宽
          quality = 0.8, //image quality  压缩质量
          canvas = document.createElement("canvas"),
          drawer = canvas.getContext("2d");
        img.onload = function() {
          canvas.width = width;
          canvas.height = width * (img.height / img.width);
          drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
          //上传到七牛云
          var base64 = canvas.toDataURL("image/jpeg", quality); // 这里就拿到了压缩后的base64图片
          var pic = base64.split(',')[1];
          var url = "http://upload-z2.qiniu.com/putb64/-1";
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
              that.imgs.push(JSON.parse(xhr.responseText).data.key);
            }
          }
          xhr.open("POST", url, true);
          xhr.setRequestHeader("Content-Type", "application/octet-stream");
          xhr.setRequestHeader("Authorization", "UpToken " + ‘七牛云token’);
          xhr.send(pic);
          // 清空文件上传控件的值  不清理会出现选择同样的图片会无法触发input事件了
          e.target.value = null;
        }
