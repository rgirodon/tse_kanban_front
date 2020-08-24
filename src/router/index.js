import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Tasks from '../components/Tasks.vue'
import Developers from '../components/Developers.vue'
import AddTask from '../components/AddTask.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks
  },
  {
    path: '/developers',
    name: 'Developers',
    component: Developers
  },
  {
    path: '/add_task',
    name: 'AddTask',
    component: AddTask
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
