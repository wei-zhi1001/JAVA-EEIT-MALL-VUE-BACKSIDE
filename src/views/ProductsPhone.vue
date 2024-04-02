<template>
  <main class="container">
    <h1>手機產品</h1>
    <button type="button" class="btn btn-primary btn-add" @click="openModal">新增</button> <!-- 移到表格外部 -->
    <MyModal />
    <table class="table table-striped table-hover">
      <thead>
        <tr class="text-center">
          <th scope="col">產品編號</th>
          <th scope="col">產品名稱 </th>
          <th scope="col">價格(元)</th>
          <th scope="col">容量</th>
          <th scope="col">螢幕尺寸</th>
          <th scope="col">上架時間</th>
          <!-- <th scope="col">修改日期</th> -->
          <th scope="col"> </th>
          <th scope="col"> </th>
          <th scope="col"> </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index" class="text-center" valign="middle">
          <td>{{ product.productId }}</td>
          <td>{{ product.productName }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.capacity }}</td>
          <td>{{ product.size }}</td>
          <td>{{ formatDate(product.setupDate) }}</td>
          <!-- <td>{{ formatDate(product.modifyDate) }}</td> -->
          <td>

            <router-link :to="{
      path: 'Spec',
      query: {
        x: product.productId,
        y: product.productName,
        z: product.price
      }
    }" class="button-link custom-link">
              <!-- 在這裡放置你的連結內容 -->
              <b-icon class="fas fa-book"></b-icon>
              <font-awesome-icon v-if="stepVisible" icon="chevron-up"></font-awesome-icon>
              <slot>修改</slot>
            </router-link>

          </td>
          <td><i class="fas fa-trash"></i></td>
        </tr>
      </tbody>
    </table>



  </main>
  <!-- Modal -->
  <div class="modal" tabindex="-1" role="dialog" ref="myModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">新增手機</h5>
          <button type="button" class="close" aria-label="Close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="productId">產品編號:</label>
              <input type="text" class="form-control" id="productId" v-model="NewProduct.productId">
            </div>
            <div class="form-group">
              <label for="productName">產品名稱:</label>
              <input type="text" class="form-control" id="productName" v-model="NewProduct.productName">
            </div>
            <div class="form-group">
              <label for="productName">產品特性:</label>
              <input type="text" class="form-control" id="productName" v-model="NewProduct.productDescription">
            </div>
            <div class="form-group">
              <label for="price">價格(元):</label>
              <input type="text" class="form-control" id="price" v-model="NewProduct.price">
            </div>
            <div class="form-group">
              <label for="capacity">容量:</label>
              <input type="text" class="form-control" id="capacity" v-model="NewProduct.capacity">
            </div>
            <div class="form-group">
              <label for="size">銀幕尺寸:</label>
              <input type="text" class="form-control" id="size" v-model="NewProduct.size">
            </div>
            <div class="d-flex justify-content-end"> <!-- 新添加的 div -->
              <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
              <button type="submit" class="btn btn-primary ml-2" @click="saveProduct">Save</button>
            </div>
          </form>
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal" tabindex="-1" role="dialog" ref="myModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">新增手機</h5>
          <button type="button" class="close" aria-label="Close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="productId">產品編號:</label>
              <input type="text" class="form-control" id="productId" v-model="NewProduct.productId">
            </div>
            <div class="form-group">
              <label for="productName">產品名稱:</label>
              <input type="text" class="form-control" id="productName" v-model="NewProduct.productName">
            </div>
            <div class="form-group">
              <label for="productName">產品特性:</label>
              <input type="text" class="form-control" id="productName" v-model="NewProduct.productDescription">
            </div>
            <div class="form-group">
              <label for="price">價格(元):</label>
              <input type="text" class="form-control" id="price" v-model="NewProduct.price">
            </div>
            <div class="form-group">
              <label for="capacity">容量:</label>
              <input type="text" class="form-control" id="capacity" v-model="NewProduct.capacity">
            </div>
            <div class="form-group">
              <label for="size">銀幕尺寸:</label>
              <input type="text" class="form-control" id="size" v-model="NewProduct.size">
            </div>
            <div class="d-flex justify-content-end"> <!-- 新添加的 div -->
              <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
              <button type="submit" class="btn btn-primary ml-2" @click="saveProduct">Save</button>
            </div>
          </form>
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>





</template>

<script>
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();
console.log(route)
import axios from 'axios';
import MyModal from './Test.vue'


export default {
  data() {
    return {
      products: [], // 将数据保存在数组中
      MyModal,
      NewProduct: {
        productId: '',
        productName: '',
        productDescription: '',
        price: '',
        capacity: '',
        size: '',
        setupDate: '',
        modifyDate: '',
      },

    };
  },

  methods: {
    saveProduct() {
      // 保存产品前先显示二次确认提示
      if (confirm("您確定要新增這筆產品嗎？")) {
        console.log('New Product:', this.NewProduct);

        axios.post(`${this.API_URL}/products/insertPhone`, this.NewProduct)
          .then(response => {
            this.resetFormData(); // 清空表单数据
            console.log(response.data);
            this.fetchData();
            this.closeModal();
          })
          .catch(error => {
            console.error('Error:', error);
          });
      } else {
        // 如果用户取消保存操作，则不执行保存逻辑
        console.log('取消保存');
      }
    },


    resetFormData() {
      this.NewProduct = {
        productId: '',
        productName: '',
        productDescription: '',
        price: '',
        capacity: '',
        size: '',
        setupDate: '',
        modifyDate: '',
      };
    },
    openModal() {
      this.$refs.myModal.classList.add('show');
      this.$refs.myModal.style.display = 'block';
      document.body.classList.add('modal-open');
    },
    closeModal() {
      this.$refs.myModal.classList.remove('show');
      this.$refs.myModal.style.display = 'none';
      document.body.classList.remove('modal-open');
    },
    formatDate(dateTimeString) {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        weekday: 'long',
      };
      const dateTime = new Date(dateTimeString);
      return dateTime.toLocaleString('zh-TW', options);
    }
  },
  created() {
    axios.get(`${this.API_URL}/products/getProductByCategoryId?categoryId=A`)
      .then(response => {
        this.products = response.data;
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  },
}
</script>

<style>
.custom-link {
  background-color: transparent;
  /* 背景透明 */
  color: black;
  /* 文字颜色 */
  padding: 7px;
  /* 设置内边距 */
  display: inline-block;
  /* 让链接变成行内块元素，以便控制宽度和高度 */
  position: relative;
  /* 使得子元素的绝对定位相对于父元素 */
  text-decoration: none;
  /* 移除下划线 */
  transition: color 0.3s;
  /* 添加文字颜色的过渡效果 */
  top: 10px;
}

.custom-link:hover {
  color: gray;
  /* 鼠标移上去时文字颜色变为灰色 */
}

.custom-link b-icon {
  display: block;
  /* 将图标变为块级元素 */
  position: absolute;
  /* 绝对定位，以便于控制位置 */
  top: -10px;
  /* 将图标上移 */
  left: 50%;
  /* 水平居中 */
  transform: translateX(-50%);
  /* 水平居中 */
}

.btn-add {
  position: absolute;
  top: 90px;
  right: 95PX;
  margin: 10px;
  /* 调整按钮与表格的间距 */
}

.modal-header {
  position: relative;
  /* 使得 .modal-header 成为定位上下文 */
}

.close {
  position: absolute;
  /* 相对于 .modal-header 定位 */
  top: 10px;
  /* 调整关闭按钮与顶部的距离 */
  right: 10px;
  /* 调整关闭按钮与右侧的距离 */
}
</style>
