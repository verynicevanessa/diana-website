import { createRouter, createWebHistory } from 'vue-router'

import Work from '../views/Work.vue'
import ProjectDetail from '../views/ProjectDetail.vue'; 
import MakeDecision from '../views/MakeDecision.vue'
import SelectedProjects from '../views/SelectedProjects.vue'


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
      component: () => import('@/views/About.vue')
    },
    {
      path: '/blinking',
      name: 'blinking',
      component: () => import('@/views/Blinking.vue')
    },
    {
      path: '/makeDecision',
      name: 'makeDecision',
      component: MakeDecision
    },
    {
      path: '/selectedProjects',
      name: 'selectedProjects',
      component: SelectedProjects
    },
    {
    path: '/project/:projectSlug', // Define the route parameter ':projectSlug'
    name: 'ProjectDetail',
    // component: ProjectDetail,
    component: () => import('@/views/ProjectDetail.vue'),
    props: true, // Automatically pass route params as props to the component
    loading: Loading,
    delay: 200,
  
    },
    {
      path: '/intro',
      name: 'intro',
      component: () => import('@/views/intro.vue')
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
