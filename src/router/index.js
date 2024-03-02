import { createRouter, createWebHistory } from 'vue-router'
import Work from '../views/Work.vue'
import ProjectDetail from '../views/ProjectDetail.vue'; 
import About from '../views/About.vue'; 
import Blinking from '../views/Blinking.vue'
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
      component: About
    },
    {
      path: '/blinking',
      name: 'blinking',
      component: Blinking
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
    component: ProjectDetail,
    props: true, // Automatically pass route params as props to the component
    }
  ]
})

export default router
