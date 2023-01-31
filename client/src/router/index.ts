import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/HomePage.vue"
import Login from "../components/LoginForm.vue"
import SignUp from "../components/SignupForm.vue"
import LoggedIn from "../components/LoggedIn.vue"
import Profile from "../views/ProfilePage.vue"
import Logout from "../views/LogoutPage.vue"
import EditAccount from "../views/EditAccountPage.vue"
import UserPostPage from "../views/UserPostPage.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp
    },
    {
      path: "/logged",
      name: "logged",
      component: LoggedIn
    },
    {
      path: "/users/:id",
      name: "profile",
      component: Profile
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout
    },
    {
      path: "/editaccount",
      name: "editaccount",
      component: EditAccount
    },
    {
      path: "/post/:id",
      name: "userpost",
      component: UserPostPage
    }
  ]
})

export default router
