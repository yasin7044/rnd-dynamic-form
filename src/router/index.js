import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Home from '../views/Home.vue'
import Template from '../views/Template.vue'
import Form from '../components/Form.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Template',
    component: Template,
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/Home",
    name: "Home",
    component: Home,
  },
  {

    path: "/YourForm",
    name: "form",
    component: Form,
  },
  {
    path:'/testing',
    name: 'TestingForm',
    component:()=> import ('../views/DemoFormBuilder.vue')
  },
  {
    path:'/testing-form',
    name:'Testing-form-view',
    component:()=> import ('../views/TestingForm.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
