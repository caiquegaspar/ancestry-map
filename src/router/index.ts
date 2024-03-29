import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("../views/IndexView.vue"),
    },
    {
      path: "/results",
      name: "map",
      component: () => import("../views/MapView.vue"),
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../views/TestMap.vue"),
    },
  ],
});

export default router;
