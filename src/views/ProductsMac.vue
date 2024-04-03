<template>
  <main class="container">
    <h1>Mac產品</h1>
    <button type="button" class="btn btn-primary btn-add" @click="openModal">新增</button> <!-- 移到表格外部 -->
    <MyModal />
    <table class="table table-striped table-hover">
      <thead class="thead-dark">
        <tr class="text-center">
          <th scope="col">產品編號</th>
          <th scope="col">產品名稱</th>
          <th scope="col">價格(元)</th>
          <th scope="col">芯片</th>
          <th scope="col">處理器 (CPU)</th>
          <th scope="col">記憶體</th>
          <th scope="col">硬碟</th>
          <th scope="col">螢幕尺寸</th>
          <th scope="col">上架時間</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index" class="text-center" valign="middle">
          <td>{{ product.productId }}</td>
          <td>{{ product.productName }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.chip }}</td>
          <td>{{ product.cpu }}</td>
          <td>{{ product.memory }}</td>
          <td>{{ product.productDisk }}</td>
          <td>{{ product.size }}</td>
          <td>{{ formatDate(product.setupDate) }}</td>
          <td>
            <router-link :to="{
      path: 'Spec',
      query: {
        x: product.productId,
        y: product.productName,
        z: product.price
      }
    }" class="btn btn-info btn-sm">
              <i class="fas fa-edit"></i> 修改
            </router-link>
            <button class="btn btn-danger btn-sm" @click="deleteProduct(product.productId)">
              <i class="fas fa-trash"></i> 刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>



  </main>
  <!-- Modal -->
  <div class="modal" tabindex="-1" role="dialog" ref="myModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">新增Mac</h5>
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
              <input type="text" class="form-control" id="productDescription" v-model="NewProduct.productDescription">
            </div>
            <div class="form-group">
              <label for="price">價格(元):</label>
              <input type="text" class="form-control" id="price" v-model="NewProduct.price">
            </div>
            <div class="form-group">
              <label for="capacity">容量:</label>
              <input type="text" class="form-control" id="chip" v-model="NewProduct.chip">
            </div>
            <div class="form-group">
              <label for="capacity">處理器(CPU):</label>
              <input type="text" class="form-control" id="cpu" v-model="NewProduct.cpu">
            </div>
            <div class="form-group">
              <label for="capacity">記憶體:</label>
              <input type="text" class="form-control" id="memory" v-model="NewProduct.memory">
            </div>
            <div class="form-group">
              <label for="capacity">硬碟:</label>
              <input type="text" class="form-control" id="productDisk" v-model="NewProduct.productDisk">
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
              <input type="text" class="form-control" id="productDescription" v-model="NewProduct.productDescription">
            </div>
            <div class="form-group">
              <label for="price">價格(元):</label>
              <input type="text" class="form-control" id="price" v-model="NewProduct.price">
            </div>
            <div class="form-group">
              <label for="capacity">容量:</label>
              <input type="text" class="form-control" id="chip" v-model="NewProduct.chip">
            </div>
            <div class="form-group">
              <label for="capacity">處理器(CPU):</label>
              <input type="text" class="form-control" id="cpu" v-model="NewProduct.cpu">
            </div>
            <div class="form-group">
              <label for="capacity">記憶體:</label>
              <input type="text" class="form-control" id="memory" v-model="NewProduct.memory">
            </div>
            <div class="form-group">
              <label for="capacity">硬碟:</label>
              <input type="text" class="form-control" id="productDisk" v-model="NewProduct.productDisk">
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
        productDescription: '',
        productName: '',
        price: '',
        chip: '',
        size: '',
        cpu: '',
        memory: '',
        productDisk: '',
      },

    };
  },

  methods: {
    saveProduct() {
      // 保存产品前先显示二次确认提示
      if (confirm("您確定要新增這筆產品嗎？")) {
        console.log('New Product:', this.NewProduct);

        axios.post(`${this.API_URL}/products/insertMac`, this.NewProduct)
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
    axios.get(`${this.API_URL}/products/getProductByCategoryId?categoryId=B`)
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

.table thead th {
  white-space: nowrap;
}

.table tbody th {
  white-space: nowrap;
}

/* 模态框样式 */
.modal-dialog {
  overflow-y: auto; /* 仅在垂直方向上显示滚动条 */
  max-height: calc(100vh - 50px); /* 设置最大高度，以适应不同屏幕尺寸，减去标题栏高度 */
}

/* 滚动条样式 */
.modal-dialog::-webkit-scrollbar {
  width: 8px; /* 滚动条宽度 */
}

.modal-dialog::-webkit-scrollbar-thumb {
  background-color: rgb(0, 0, 0); /* 滚动条滑块颜色 */
  border-radius: 4px; /* 滚动条滑块边框半径 */
}

.modal-dialog::-webkit-scrollbar-thumb:hover {
  background-color: rgb(0, 0, 0); /* 滚动条滑块悬停时颜色 */
}

</style>
