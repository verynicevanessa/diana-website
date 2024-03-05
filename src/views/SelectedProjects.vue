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
}
.project {

}
</style>
