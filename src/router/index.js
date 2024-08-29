import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import Tasks from '@/views/Tasks.vue'
import Task from '@/views/Task.vue'
import About from '@/views/About.vue'
import Offline from '@/views/Offline.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks
    },
    {
      path: '/tasks/:id',
      name: 'task',
      component: Task,
      props: true
    },
    {
      path: '/offline',
      name: 'offline',
      component: Offline
    },
  ]
})

export default router
