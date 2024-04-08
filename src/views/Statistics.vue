<template>
    <main class="h-100" style="background-color: #eee">
        <h1>Statistics</h1>
    </main>
</template>
<script>
export default {
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
         // alert('歡迎回來，管理者!!');
      } else {
       alert('權限不足');
        this.$router.push('/');
      }
    }
    }
}
</script>
<style>
    
</style>