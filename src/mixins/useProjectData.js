// Mixin to use projects data globally in any component. Data fetched only once, then stored in store
export default {
  created() {
    this.$store.dispatch("loadProjects");
  },
  computed: {
    projects() {
      return this.$store.state.loadedProjects;
    },
  },
};
