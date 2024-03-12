<template>
  <main>
    <Project :project="project" v-for="project in selectedProjects"></Project>
  </main>
</template>

<script>
import Project from "@/components/Project.vue";
import useProjectData from "@/mixins/useProjectData";

export default {
  mixins: [useProjectData],
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
      if (this.$store.state.selectedProjects.length === 0) {
        const random = [...this.$store.state.loadedProjects].sort(
          () => 0.5 - Math.random()
        );
        return random.slice(0, 3);
      } else {
        return this.$store.state.selectedProjects;
      }
    },
  },
  components: { Project },
};
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 100vh;
}

.project {
  width: 100%;
  max-width: 200px;
  left: 0;
  top: 0;
  margin: 10px;
}
</style>
