import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import Register from '@/views/Auth/Register.vue'
import Login from '@/views/Auth/Login.vue'
import Tasks from '@/views/Tasks.vue'
import Task from '@/views/Task.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        },
      ]
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: Tasks
    },
    {
      path: '/tasks/:id',
      name: 'Task',
      component: Task,
      props: true
    }
  ]
})


// Protecting routes
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('taskToken');
  
  // public routes
  const publicRoutes = ['Index', 'Login', 'Register'];

  if (!publicRoutes.includes(to.name) && !token) {
    next({ name: 'Login' });
  } else {
    next();
  }
});


export default router
