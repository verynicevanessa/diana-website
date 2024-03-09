<template>
  <main>

    <Project :project="project" v-for="project in selectedProjects"></Project>

  </main>
</template>

<script>
import Project from "@/components/Project.vue";

export default {
  methods: {},
  computed: {
    selectedProjects() {
      return this.$store.state.selectedProjects;
    },
  },
  components: { Project },
};
</script>

<style>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 100px;
}
/* .project {

} */


.project {
  width: 100%;
  max-width: 500px;
  left: 0;
  top: 0;
  margin-top: -100px; /* Adjust as needed for the amount of overlap */
}
</style>
