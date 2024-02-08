import { createRouter, createWebHistory } from 'vue-router'
import Work from '../views/Work.vue'
import ProjectDetail from '../views/ProjectDetail.vue'; 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Work
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
    path: '/project/:projectSlug', // Define the route parameter ':projectSlug'
    name: 'ProjectDetail',
    component: ProjectDetail,
    props: true, // Automatically pass route params as props to the component
    }
  ]
})

export default router
