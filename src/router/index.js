import { createRouter, createWebHistory } from "vue-router";
import {useUserStore} from "@/stores/userStore";
const router = new createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/HomePage.vue"),
    },
    {
      path: "/login",
      component: () => import("@/views/LoginPage.vue"),
    },
    {
      path: "/members",
      component: () => import("@/views/Members.vue"),
      meta: {requiresAuth: true}
    },
    {
      path: "/products",
      component: () => import("@/views/ProductsMenu.vue"),
      meta: {requiresAuth: true}
    },
    {
      path: "/products/phone",
      component: () => import("@/views/ProductsPhone.vue"),
      meta: {requiresAuth: true}
    },
    {
      path: "/products/mac",
      component: () => import("@/views/ProductsMac.vue"),
      meta: {requiresAuth: true}
    },
    {
      path: "/products/pad",
      component: () => import("@/views/ProductsPad.vue"),
      meta: {requiresAuth: true}
    },
    {
      path: "/products/Spec/",
      name: "Spec",
      component: () => import("@/views/ProductsSpec.vue"),
      meta: {requiresAuth: true}
      
    },
    {
      path: "/statistics",
      component: () => import("@/views/DataStatistics.vue"),
      meta: {requiresAuth: true}
    },
    {
      path: "/orders",
      component: () => import("@/views/MemberOrders.vue"),
      meta: {requiresAuth: true}
    },
    {
      path: "/orders/detail",
      name: "detail",
      component: () => import("@/views/OrdersDetail.vue"),
      meta: {requiresAuth: true}
    },

    {
      path: "/orders/print",
      name: "print",
      component: () => import("@/views/OrdersPrint.vue"),
      meta: {requiresAuth: true}
    },


    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/NotFound.vue"),
    },
    {
      path: "/products/uploadPhotos",
      component: () => import("@/views/UploadPhotos.vue"),
      meta: {requiresAuth: true}
    },
    {
      path: "/products/ShowPhoto",
      component: () => import("@/views/ShowPhoto.vue"),
      meta: {requiresAuth: true}
    },

  
    {
      path: "/test",
      component: () => import("@/views/Test.vue"),
    },
    {
      path:"/feedback",
      component: () => import("@/views/Feedback.vue"),
      meta: {requiresAuth: true}
    },

    

  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.matched.some(record => record.meta.requiresAuth) && !userStore.isLoggedIn) {
    sessionStorage.setItem('redirectRoute', to.fullPath);
    var myModal = new bootstrap.Modal(document.getElementById('blockedAccountModal'));
    myModal.show();
  } else {
    // 確保一定要調用 next()
    next();
  }
});
export default router;
