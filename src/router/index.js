import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Work.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue')
    },
    {
      path: '/blinking',
      name: 'blinking',
      component: () => import('@/views/Blinking.vue')
    },
    {
    path: '/project/:projectSlug', // Define the route parameter ':projectSlug'
    name: 'ProjectDetail',
    component: () => import('@/views/ProjectDetail.vue'),
    props: true, // Automatically pass route params as props to the component
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // return desired position
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
})

export default router
