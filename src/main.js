import { createApp } from "vue"
import App from "./App"
import { createRouter, createWebHashHistory } from "vue-router"
import Icon from './components/Icon.vue'
import IconsView from './views/IconsView.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [{
        name: "Home",
        path: "/",
        component: IconsView
    }]
})

const app = createApp(App)
app.component("icon", Icon)
app.component("IconLayout", IconsView)
app.use(router)
app.mount("#app")