import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home.vue"
import Login from "../components/LoginForm.vue";
import SignUp from "../components/SignupForm.vue";
import Logged from "../components/Logged.vue";
import Profile from "../views/Profile.vue";
import Logout from "../views/Logout.vue";
import EditAccount from "../views/EditAccount.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
    },
    {
      path: "/logged",
      name: "logged",
      component: Logged,
    },
    {
      path: "/users/:id",
      name: "profile",
      component: Profile,
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
    },
    {
      path: "/editaccount",
      name: "editaccount",
      component: EditAccount,
    },
  ]
})

export default router
