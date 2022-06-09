import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Main",
    component: () => import("../views/Main.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/join",
    name: "Join",
    component: () => import("../views/Join.vue"),
  },
  {
    path: "/exhibition",
    name: "Exhibition",
    component: () => import("../views/Exhibition.vue"),
  },
  {
    path: "/common-place",
    name: "CommonPlace",
    component: () => import("../views/CommonPlace.vue"),
  },
  {
    path: "/board/:categoryName/:id",
    name: "BoardDetail",
    component: () => import("../views/BoardDetail.vue"),
  },
  {
    path: "/board/add",
    name: "AddBoard",
    component: () => import("../views/AddBoard.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    document.getElementById("app")?.scrollIntoView({ behavior: "smooth" });
  },
});

export default router;
