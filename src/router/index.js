import { createRouter, createWebHistory } from 'vue-router'

import Work from '../views/Work.vue'
import MakeDecision from '../views/MakeDecision.vue'
import SelectedProjects from '../views/SelectedProjects.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MakeDecision
    },
    {
      path: '/projects',
      name: 'projects',
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
      path: '/decision',
      name: 'makeDecision',
      component: MakeDecision
    },
    {
      path: '/selected-projects',
      name: 'selectedProjects',
      component: SelectedProjects
    },
    {
    path: '/project/:projectSlug', 
    name: 'ProjectDetail',
    component: () => import('@/views/ProjectDetail.vue'),
    props: true, // Automatically pass route params as props to the component
  
    },
    {
      path: '/intro',
      name: 'intro',
      component: () => import('@/views/Intro.vue')
    },
    {
      path: '/first',
      name: 'first',
      component: () => import('@/views/First.vue')
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
