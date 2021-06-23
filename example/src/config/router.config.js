import { BlankLayout } from "@/layouts";

export const asyncRouterMap = [
  {
    path: "/",
    name: "index",
    component: BlankLayout,
    meta: { title: "首页" },
    redirect: "/dashboard",
    children: [
      // dashboard
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/Dashboard"),
        meta: {
          title: "仪表盘",
          icon: "dashboard",
          hiddenHeaderContent: false,
          keepAlive: false
        }
      }
    ]
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true
  }
];

export const constantRouterMap = [
  {
    path: "/login",
    name: "Login",
    meta: { title: "登录" },
    component: () => import("@/views/user/Login")
  },
  {
    path: "/404",
    name: "NotFound",
    component: () => import("@/views/exception/404")
  }
];
