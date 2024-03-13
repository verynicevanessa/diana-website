// Mixin to use projects data globally in any component. Data fetched only once, then stored in store
export default {
  created() {
    this.$store.dispatch("loadProjects");
  },
  methods: {
    getProjectBySlug(slug) {
      return this.projects.find((project) => {
        return project.projectSlug === slug;
      })
    },
  },
  computed: {
    projects() {
      return this.$store.state.loadedProjects;
    },
  },
};
