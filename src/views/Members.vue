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
          <th scope="col">        </th>
          <th scope="col">        </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(member, index) in menubarlist" :key="index" class="text-center">
          <td>{{ member.memberId }}</td>
          <td>{{ member.memberName }}</td>
          <td>{{ member.memberEmail }}</td>
          <td>{{ member.memberPhone }}</td>
          <td>{{ member.accountStatus }}</td>
          <td>{{ formatDate(member.createTime) }}</td>
          <td>{{ formatDate(member.lastLoginTime) }}</td>
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
      members: [] // 将数据保存在数组中
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
  computed: {
  
    menubarlist() {
      axios.get(`${this.API_URL}/members/getAllMembers`).then((rs) => {
        this.members = rs.data; // 将获取的数据存储在数组中
      });
      return this.members; // 返回数据数组
    }
  },
  created() {
    const loggedInMember = sessionStorage.getItem('loggedInMember');
    const loggedInMemberObject = JSON.parse(loggedInMember);
    console.log(loggedInMemberObject);
    if (loggedInMemberObject === null) {
      alert('請先登入');
      this.$router.push('/login');
    } else {
      const role = loggedInMemberObject.authentication;
      console.log(role);
      console.log(role);
      if (role == '1' || role == '0') {
        //  alert('歡迎回來，管理者!!');
      } else {
       alert('權限不足');
        this.$router.push('/');
      }
    }
  }
}
</script>
<style></style>