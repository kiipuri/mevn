import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import Vue3Storage from "vue3-storage"
import "@mdi/font/css/materialdesignicons.css"
import "vuetify/styles"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import { aliases, mdi } from "vuetify/iconsets/mdi"
import Post from "./components/Post.vue"
import { Icon } from "@iconify/vue"

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
})

import "./assets/main.css"

const app = createApp(App)

app.use(router)
app.use(Vue3Storage)
app.use(vuetify)
app.component("Post", Post)
app.component("Icon", Icon)

app.mount("#app")
