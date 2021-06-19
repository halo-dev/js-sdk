import router from "./router";
import { haloRestApiClient } from "./core/haloSdk";
const whiteList = ["Login"]; // no redirect whitelist
const loginRoutePath = "/login";
const defaultRoutePath = "/dashboard";

router.beforeEach((to, from, next) => {
  to.meta && typeof to.meta.title !== "undefined";
  const tokenProvider = haloRestApiClient.getTokenProvider();
  /* has token */
  if (tokenProvider) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath });
    } else {
      next();
    }
  } else {
    console.log(to.name);
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } });
    }
  }
});
