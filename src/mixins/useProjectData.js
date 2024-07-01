// useProjectData.js
export default {
  created() {
    this.$store.dispatch("loadProjects").then(() => {
      console.log("Projects loaded:", this.projects);
    });
  },
  methods: {
    getProjectBySlug(slug) {
      if (!this.projects) return null;
      return this.projects.find((project) => project.projectSlug === slug);
    },
  },
  computed: {
    projects() {
      return this.$store.state.loadedProjects || [];
    },
    sortedByPriority() {
      return this.projects.slice().sort((a, b) => {
        const priorityA = a.priority !== null ? a.priority : Number.MAX_SAFE_INTEGER;
        const priorityB = b.priority !== null ? b.priority : Number.MAX_SAFE_INTEGER;
        return priorityA - priorityB;
      });
    },
  },
};
