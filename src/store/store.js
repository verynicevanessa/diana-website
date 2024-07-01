import { createStore } from "vuex";
import { fetchProjects } from "@/api/api";
import logger from '@/utils/logger';

export const store = createStore({
  state() {
    return {
      loadedProjects: [],
      selectedProjects: [],
    };
  },
  mutations: {
    setProjects(state, receivedProjects) {
      state.loadedProjects = receivedProjects;
    },

    selectProjects(state, projectsIdsArray) {	
      const selected = state.loadedProjects.filter((el) => projectsIdsArray.includes(el.id));
      logger.log(selected);
      state.selectedProjects = selected;
    },
  },

  actions: {
    async loadProjects(context, forceReload = false) {
      // Do not load projects if they've been loaded previously, unless its forced
      if (!forceReload && context.state.loadedProjects.length) return;

      try {
        const result = await fetchProjects();
        
        // Überprüfen der Projekte auf fehlende Priorität und Standardwert zuweisen
        result.forEach(project => {
          if (project.priority === undefined || project.priority === null) {
            console.warn(`Project missing priority:`, project);
            project.priority = 100; // Standardpriorität zuweisen
          }
        });

        context.commit("setProjects", result);
      } catch (e) {
        console.error("Failed to load projects", e);
      }
    },
  },
  getters: {
    // Getter for the projects count
    projectsCount: state => state.loadedProjects.length,
  },
});
