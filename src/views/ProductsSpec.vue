<template>
  <main class="container">
    <div>
      <h3>產品編號:{{ x }}<br>產品名稱:{{ y }}<br>售價:{{ z }}
        <router-link :to="{ path: '/products/uploadPhotos' }"> 上傳照片</router-link>
        <router-link :to="{ path: '/products/ShowPhoto' }"> 顯示照片</router-link>

      
    </h3>
  </div>
  <table class="table table-striped table-hover">
    <thead>
      <tr class="text-center">
        <th scope="col">款式編號</th>
        <th scope="col">顏色</th>
        <th scope="col" >庫存</th>
        <th scope="col" ></th>
        <th scope="col" ></th>
        
      </tr>
    </thead>
    <tbody v-if="loading">
      <tr>
        <td colspan="3" class="text-center">加载中...</td>
      </tr>
    </tbody>
    <tbody v-else-if="error">
      <tr>
        <td colspan="3" class="text-center">获取数据时出错</td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr v-for="(spec, index) in productSpecs" :key="index" class="text-center">
        <td>{{ spec.specId }}</td>
        <td>{{ spec.color }}</td>
        <td>{{ spec.stockQuantity }}</td>
        <td><i class="fas fa-trash">下架</i></td>
      </tr>
    </tbody>
  </table></main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      x: this.$route.query.x,
      y: this.$route.query.y,
      z: this.$route.query.z,
      productSpecs: [],
      loading: false,
      error: false
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      console.log(this.x)
      axios.get(`${this.API_URL}/products/findProductSpecByProductId?productId=${this.x}`)
        .then(response => {
          this.productSpecs = response.data;
        })
        .catch(error => {
          console.error('获取产品规格时出错:', error);
          this.error = true;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style></style>
