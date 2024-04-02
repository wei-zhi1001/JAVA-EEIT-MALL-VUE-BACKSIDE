<template>
    <header class="p-3 text-bg-dark mb-3">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li>
                        <router-link to="/" class="nav-link px-2 text-secondary">後臺系統</router-link>
                    </li>
                    <li>
                        <router-link to="/members" class="nav-link px-2 text-white">會員管理</router-link>
                    </li>
                    <li>
                        <router-link to="/products" class="nav-link px-2 text-white">商品管理</router-link>
                    </li>
                    <li>
                        <router-link to="/orders" class="nav-link px-2 text-white">訂單管理</router-link>
                    </li>
                </ul>

                <div class="text-end">


                    <router-link to="/login" class="text-decoration-none" v-if="!isLoggedIn">
                        <button type="button" class="btn btn-outline-light me-2">
                            登入
                        </button>
                    </router-link>

                    <template v-if="isLoggedIn">
                        <router-link to="/profile" class="text-decoration-none">
                            <button type="button" class="btn btn-warning">
                                {{ memberName }}
                            </button></router-link>
                        <img :src="memberPhoto" width="8%" class="mx-2" />

                        <button type="button" class="btn btn-outline-light" @click="logout()">登出</button>
                    </template>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
import { useMemberStore } from '@/stores/memberStore';
import axios from 'axios';
export default {
    computed: {
        memberId() {
            const memberStore = useMemberStore();
            return memberStore.memberId;
        },
        memberName() {
            const memberStore = useMemberStore();
            return memberStore.memberName;

        },
        memberPhoto() {
            const memberStore = useMemberStore();
            return memberStore.memberPhoto;
        },
        isLoggedIn() {
            const memberStore = useMemberStore();
            return memberStore.isLoggedIn;
        }
    },
    methods: {
        logout() {
            const memberStore = useMemberStore();
            axios.get(`${this.API_URL}/logout`).then((rs) => {
                memberStore.logout();
            })
            .catch((error) => {
                console.log("登出失敗",error)
            })
            console.log(memberStore)
            this.$router.push("/" );
        }

    },
}
</script>
<style></style>
