<template>
  <main class="container">
    <table class="table table-striped table-hover">
      <thead>
        <tr class="text-center">
          <th scope="col">會員編號</th>
          <th scope="col">會員名稱</th>
          <th scope="col">e-mail</th>
          <th scope="col">手機</th>
          <th scope="col">會員狀態</th>
          <th scope="col">註冊時間</th>
          <th scope="col">上次登入時間</th>
          <th scope="col">會員資料</th>
          <th scope="col">停權</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(member, index) in members" :key="index"
          :class="{ 'text-center': true, 'front.red': member.authentication === 3 }">
          <td>{{ member.userId }}</td>
          <td>{{ member.userName }}</td>
          <td>{{ member.email }}</td>
          <td>{{ member.phone }}</td>
          <td>
            {{ member.authentication === 2 ? '一般會員' : (member.authentication === 1 ? '管理者' : (member.authentication ===
              0 ? '系統管理員' : (member.authentication === 3 ? '已停權' : member.authentication))) }}
          </td>
          <td>{{ formatDate(member.registerDate) }}</td>
          <td>{{ formatDate(member.lastLoginTime) }}</td>
          <td><button @click="openModal(member)"><i class="fa-solid fa-user-pen"></i></button></td>
          <td>
            <button v-if="member.authentication == 2" @click="ban(member)">
              <i class="fa-solid fa-ban"></i></button>
            <button v-else @click="unban(member)">
              <i class="fa-solid fa-arrow-rotate-left"></i></button>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
  <!-- Modal -->
  <div class="modal" tabindex="-1" role="dialog" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">用戶明細</h5>
          <button type="button" class="close" aria-label="Close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="userId" style="font-size: larger;">用戶編號: {{ newMember.userId }}</label>
              <!-- <input type="text" class="form-control" id="userId" v-model="newMember.userId" readonly> -->
            </div>
            <div class="form-group">
              <label>第三方資訊:</label>
              <br />
              <ul class="list-unstyled">
                <li v-if="!newMember.thirdParty || newMember.thirdParty.length === 0" style="color: red;">未綁定</li>
                <li v-else v-for="(provider, index) in newMember.thirdParty" :key="index">
                  <div>
                    <label for="providerId">提供者ID:</label>
                    <input type="text" class="form-control" :id="'providerId' + index" v-model="provider.providerId"
                      readonly>
                  </div>
                  <div>
                    <label for="providerName">提供者名稱:</label>
                    <input type="text" class="form-control" :id="'providerName' + index" v-model="provider.providerName"
                      readonly>
                  </div>
                </li>
              </ul>
            </div>
            <div class="form-group">
              <label for="userName">用戶名稱:</label>
              <input type="text" class="form-control" id="userName" v-model="newMember.userName">
            </div>
            <div class="form-group">
              <label for="phone">電話:</label>
              <input type="text" class="form-control" id="phone" v-model="newMember.phone">
            </div>
            <div class="form-group">
              <label for="email">E-mail:</label>
              <input type="text" class="form-control" id="email" v-model="newMember.email">
            </div>
            <div class="form-group">
              <label for="lastLoginTime">最新登入時間:</label>
              <input type="text" class="form-control" id="lastLoginTime" :value="formatDate(newMember.lastLoginTime)"
                readonly>
            </div>
            <div class="form-group">
              <label for="registerDate">註冊時間:</label>
              <input type="text" class="form-control" id="registerDate" :value="formatDate(newMember.registerDate)"
                readonly>
            </div>
            <div class="form-group">
              <label for="userAddress">用戶地址:</label>
              <input type="text" class="form-control" id="userAddress" v-model="newMember.userAddress">
            </div>
            <div class="form-group">
              <label for="deliverAddress">預設運送地址:</label>
              <input type="text" class="form-control" id="deliverAddress" v-model="newMember.deliverAddress">
            </div>
            <div class="d-flex justify-content-end">
              <button type="button" class="btn btn-secondary mr-2" @click="closeModal">Close</button>
              <button type="button" class="btn btn-primary" @click="saveProduct">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import axios from 'axios';
import modal from './Test.vue';

export default {
  data() {
    return {
      members: [],// 将数据保存在数组中
      newMember: [],

    };
  },
  methods: {
    ban(member) {
      console.log(member.userId)
      axios.put(`${this.API_URL}/user/banUser?id=${member.userId}`).then((rs) => {
        console.log(rs.data);
        this.getmemebers();
      })
    },
    unban(member) {
      axios.put(`${this.API_URL}/user/unbanUser?id=${member.userId}`).then((rs) => {
        console.log(rs.data);
        this.getmemebers();
      })
    },
    formatDate(dateTimeString) {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const dateTime = new Date(dateTimeString);
      return dateTime.toLocaleString('zh-TW', options);
    },
    getmemebers() {
      axios.get(`${this.API_URL}/user/getAllUsers`).then((rs) => {
        this.members = rs.data; // 将获取的数据存储在数组中
      })
    },
    openModal(member) {
      this.$refs.modal.classList.add('show');
      this.$refs.modal.style.display = 'block';
      document.body.classList.add('modal-open');
      console.log(this.member);
      this.newMember = member;
      console.log(this.newMember);
    },
    closeModal() {
      this.$refs.modal.classList.remove('show');
      this.$refs.modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    },
    cancel() {
      // 取消按鈕點擊事件處理
      // 可以在這裡關閉modal等操作
    },
    edit() {
      // 修改按鈕點擊事件處理
      // 可以在這裡將頁面欄位轉為可變更狀態等操作
    },
  },
  computed: {


  },
  created() {
    this.getmemebers();

  }
}

</script>
<style>
.custom-link {
  background-color: transparent;
  /* 背景透明 */
  color: black;
  /* 文字颜色 */
  /* padding: 7px; */
  /* 设置内边距 */
  display: inline-block;
  /* 让链接变成行内块元素，以便控制宽度和高度 */
  position: relative;
  /* 使得子元素的绝对定位相对于父元素 */
  text-decoration: none;
  /* 移除下划线 */
  transition: color 0.3s;
  /* 添加文字颜色的过渡效果 */
  /* top: 10px; */
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
  top: 70px;
  right: 75PX;
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

/* 定義主顏色 */
:root {
  --primary-color: #007bff;
}

/* 定義按鈕樣式 */
.table button {
  border: 1px solid var(--primary-color);
  border-radius: 20px;
  padding: 6px 12px;
  background-color: transparent;
  color: var(--primary-color);
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

/* 按鈕懸停時變化 */
.table button:hover {
  background-color: var(--primary-color);
  color: #fff;
}

.table button {
  margin-right: 0px;
  /* 設定按鈕的右邊距 */
}

.table thead th {
  position: sticky;
  top: 0;
  z-index: 2;
  /* 確保標題行在上方 */
  background-color: #fff;
  /* 可以選擇性地設置背景色 */
}

.front.red {
  color: red;
  font-weight: bold;
}
</style>
