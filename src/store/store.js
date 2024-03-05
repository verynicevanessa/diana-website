import { createStore } from "vuex";
import { fetchProjects } from "@/api/api";

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
			console.log(selected);
      state.selectedProjects = selected;
    },
  },

  actions: {
    async loadProjects(context, forceReload = false) {
      // Do not load projects if they've been loaded previously, unless its forced
      if (!forceReload && context.state.loadedProjects.length) return;

      try {
        const result = await fetchProjects();
        context.commit("setProjects", result);
      } catch (e) {
        console.error("Failed to load projects", e);
      }
    },
  },
});
