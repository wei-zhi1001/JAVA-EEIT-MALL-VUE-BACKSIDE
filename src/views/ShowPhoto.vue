<template>
  <div class="w-20 h-20" >
    <!-- 图像元素，使用绑定的imageUrl来显示产品照片 -->
    <img :src="showPhoto()"  />
  </div>
</template>

<script>
// 导入axios库
import axios from 'axios';

export default {
  data() {
    return {
      // imageUrl用于存储产品照片的URL
      imageUrl: null,
      // 设置要请求的产品照片的photoId，默认为1，您可以根据需要更改
      photoId:"1",     
    };
  },
  created() {
    // 在组件创建时调用showPhoto方法，获取产品照片
    this.showPhoto();
  },
  methods: {
    showPhoto() {
    return `${this.API_URL}/photos/image/${this.photoId}`;
    }
  }
};
</script>
