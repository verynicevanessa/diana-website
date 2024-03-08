<template>
  <main>
    <Project :project="project" v-for="project in selectedProjects"></Project>
  </main>
</template>

<script>
import Project from "@/components/Project.vue";

export default {
  mounted() {
    this.disableCameraAccess();
  },
  methods: {
    async disableCameraAccess() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      } catch (error) {
        console.log("Error", error);
      }
    },
  },
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
</style>
