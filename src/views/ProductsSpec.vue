<template>
  <main class="container">
    <div>
      <h3>產品編號:{{ x }}<br>產品名稱:{{ y }}<br>售價:{{ z }}
        <router-link :to="{ path: '/products/uploadPhotos' }"> 上傳照片</router-link>
        <router-link :to="{ path: '/products/ShowPhoto' }"> 顯示照片</router-link>

        <button @click="openaddModal">新增樣式</button>
        <button @click="openquantityModal">庫存管理</button>
      </h3>
    </div>
    <table class="table table-striped table-hover">
      <thead>
        <tr class="text-center">
          <th scope="col">款式編號</th>
          <th scope="col">顏色</th>
          <th scope="col">庫存</th>
          <th scope="col">刪除</th>

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


          <td><button @click="deleteProductSpec(spec)"><i class="fas fa-trash"></i></button></td>
        </tr>
      </tbody>
    </table>


    <!-- Modal -->
    <div class="modal" tabindex="-1" role="dialog" ref="addModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">新增款式</h5>
            <button type="button" class="close " aria-label="Close" @click="closeaddModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <h4>產品編號: {{ x }}</h4>
              </div>
              <div class="form-group">
                <label for="specId">款式編號:</label>
                <input type="text" class="form-control" id="specId" v-model="NewProductSpec.specId">
              </div>
              <div class="form-group">
                <label for="color">顏色</label>
                <input type="text" class="form-control" id="color" v-model="NewProductSpec.color">
              </div>
              <div class="form-group">
                <label for="stockQuantity">數量</label>
                <input type="text" class="form-control" id="stockQuantity" v-model="NewProductSpec.stockQuantity">
              </div>
              <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-secondary" @click="closeaddModal">Close</button>
                <button type="submit" class="btn btn-primary ml-2" @click="saveProductSpec">save</button>
              </div>
            </form>

          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal" tabindex="-1" role="dialog" ref="quantityModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">庫存管理</h5>
            <button type="button" class="close" aria-label="Close" @click="closequantityModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <select v-model="selectedProductSpec">
                  <option v-for="productSpec in productSpecs" :key="productSpec.specId" :value="productSpec">
                    {{ productSpec.specId }}
                  </option>
                </select>
                <p>產品編號: {{ selectedProductSpec.specId }}</p>
              </div>

              <div class="form-group">
                <p>顏色: {{ selectedProductSpec.color }}</p>
              </div>
              <div class="form-group">
                <label for="stockQuantity">數量</label>
                <input type="text" class="form-control" id="stockQuantity" v-model="selectedProductSpec.stockQuantity">
              </div>

              <div class="d-flex justify-content-end"> <!-- 新添加的 div -->
                <button type="button" class="btn btn-secondary" @click="closequantityModal">Close</button>
                <button type="submit" class="btn btn-primary ml-2" @click="changProductSpecQuantity">Save</button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>



  </main>
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
      error: false,
      NewProductSpec: {
        specId: '',
        color: '',
        stockQuantity: '',
      },
      selectedProductSpec: {
        specId: '',
        color: '',
        stockQuantity: '',
      },


    };
  },
  created() {

    this.fetchData();
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
    this.loading = true; // 設置 loading 為 true，顯示“加載中...”的訊息
    axios.get(`${this.API_URL}/products/findProductSpecByProductId?productId=${this.x}`)
      .then(response => {
        this.productSpecs = response.data;
        this.loading = false; // 加載完成後設置 loading 為 false
      })
      .catch(error => {
        console.error('获取产品规格时出错:', error);
        this.loading = false; // 發生錯誤時設置 loading 為 false
        this.error = true; // 設置 error 為 true，顯示錯誤訊息
      });
    },

    openaddModal() {
      this.$refs.addModal.classList.add('show');
      this.$refs.addModal.style.display = 'block';
      // document.body.classList.add('modal-open');
      this.NewProductSpec.specId = this.x;

    },
    closeaddModal() {
      this.$refs.addModal.classList.remove('show');
      this.$refs.addModal.style.display = 'none';
      // document.body.classList.remove('modal-open');
      this.resetFormData()
    },
    openquantityModal() {
      this.$refs.quantityModal.classList.add('show');
      this.$refs.quantityModal.style.display = 'block';
      // document.body.classList.add('modal-open');

    },
    closequantityModal() {
      this.$refs.quantityModal.classList.remove('show');
      this.$refs.quantityModal.style.display = 'none';
      // document.body.classList.remove('modal-open');
      this.resetFormData()
    },
    resetFormData() {
      this.NewProductSpec = {
        specId: '',
        color: '',
        stockQuantity: '',
      }
      this.selectedProductSpec = {
        specId: '',
        color: '',
        stockQuantity: '',
      };
    },
    saveProductSpec() {
      console.log(this.NewProductSpec);
      if (confirm('確定要新增嗎?')) {
        axios.post(`${this.API_URL}/products/insertProductSpec`, this.NewProductSpec)
          .then(response => {
            console.log(response.data);

            this.closeaddModal();
            this.fetchData();
          })
          .catch(error => {
            console.error('Error:', error);
          });
      } else {

        // 如果用户取消保存操作，则不执行保存逻辑
        console.log('取消保存');
      }
    },
    changProductSpecQuantity() {
      console.log(this.selectedProductSpec);
      if (confirm('確定要修改嗎?')) {

        axios.put(`${this.API_URL}/products/updateProductSpec?specId=${this.selectedProductSpec.specId}&stockQuantity=${this.selectedProductSpec.stockQuantity}`)
          .then(response => {
            console.log(response.data);

            this.closequantityModal();
            this.fetchData();
          })
          .catch(error => {
            console.error('Error:', error);
          })
      } else {
        this.closequantityModal();
        console.log('取消修改');
      }
    },
    deleteProductSpec(spec) {
      if (confirm('確定要刪除嗎?')) {
        axios.delete(`${this.API_URL}/products/deleteProductSpec?specId=${spec.specId}`)
          .then(response => {
            console.log(response.data);
            this.$router.go();
            alert('刪除成功');
            this.fetchData();
          })
          .catch(error => {
            console.error('Error:', error);
            alert('刪除失敗');
          });
      } else {
        console.log('取消刪除');
        alert('已取消刪除');
      }
    },



  }
};

</script>

<style>
.table button:hover {
  background-color: var(--primary-color);
  color: #fff;
}

.table button {
  margin-right: 0px;
  /* 設定按鈕的右邊距 */
}
</style>
