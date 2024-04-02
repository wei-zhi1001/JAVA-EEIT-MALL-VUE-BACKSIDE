<template>
  <main class="container">
    <table class="table table-striped table-hover">
      <thead>
        <tr class="text-center">
          <th scope="col">產品編號</th>
          <th scope="col">產品名稱 </th>
          <th scope="col">價格</th>
          <th scope="col">容量</th>
          <th scope="col">螢幕尺寸</th>
          <th scope="col">上架時間</th>
          <th scope="col">修改日期</th>
          <th scope="col">        </th>
          <th scope="col">        </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index" class="text-center">
          <td>{{product.productID}}</td>
          <td>{{product.productName}}</td>
          <td>{{product.price}}</td>
          <td>{{product.capacity}}</td>
          <td>{{product.size}}</td>
          <td>{{ formatDate(product.setupDate) }}</td>
          <td>{{ formatDate(product.modifyDate) }}</td>
          <td><i class="fas fa-book"></i></td> 
          <td><i class="fas fa-trash"></i></td> 
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [] // 将数据保存在数组中
    };
  },
  methods: {
    formatDate(dateTimeString) {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        weekday: 'long' // 显示星期
      };
      const dateTime = new Date(dateTimeString);
      return dateTime.toLocaleString('zh-TW', options);
    }
  },
  created() {
    axios.get(`${this.API_URL}/products/getProductByCategoryID?categoryID=C`).then((response) => {
      this.products = response.data; // 将获取的数据存储在数组中
    }).catch((error) => {
      console.error('Error fetching products:', error);
    });
  }
}
</script>

<style></style>
