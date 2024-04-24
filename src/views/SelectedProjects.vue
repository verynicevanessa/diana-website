<script setup>
import Slider from "@/components/Slider.vue";
</script>

<template>
  <main>
    <Slider
      v-if="selectedProjectsImages.length"
      :images="selectedProjectsImages"
    />
  </main>
</template>

<script>
import Project from "@/components/Project.vue";
import useProjectData from "@/mixins/useProjectData";

export default {
  mixins: [useProjectData],
  mounted() {
    this.swiper = document.querySelector("swiper-container");
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
    selectedProjectsImages() {
      return this.selectedProjects.reduce((acc, item) => {
        console.log(item.projectimages);
        return [...acc, ...item.projectimages];
      }, []);
    },
  },
  components: { Project },
};
</script>

<style>
main {
  width: 100vw;
  height: 100vh;
}
</style>
