<script setup>
import Slider from "@/components/Slider.vue";
</script>

<template>
  <main>
    <Slider
      v-if="selectedProjectsImages.length"
      :images="selectedProjectsImages"
      @toggle-description="toggleDescription"
      @image-loaded="onImageLoad"
    />
    <div
      v-if="showDescription"
      @click="closeDescription"
      ref="description"
      class="project-description"
    >
      <p>{{ selectedProjectDescription }}</p>
    </div>
  </main>
</template>

<script>
import Project from "@/components/Project.vue";
import useProjectData from "@/mixins/useProjectData";

export default {
  mixins: [useProjectData],
  data() {
    return {
      showDescription: false,
      selectedProjectDescription: '',
    };
  },
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
        // Add the about card first
        acc.push({
          type: "link",
          name: item.projectName,
          slug: item.projectSlug,
          description: item.projectDescription,
        });

        // Then add the project images
        acc.push(...item.projectimages);
        
        return acc;
      }, []);
    },
  },
  methods: {
    toggleDescription(description) {
      this.selectedProjectDescription = description;
      this.showDescription = !this.showDescription;
    },
    closeDescription() {
      this.showDescription = false;
    },
  },
  components: { Project },
};
</script>

<style scoped>
main {
  width: 100vw;
  height: 100vh;
}

.project-description {
  font-size: 30px;
  color: black; /* Text color */
  max-width: 800px; /* Or any max-width or width you prefer */
  z-index: 10; /* Ensure it's above other content */
  border-radius: 10px; /* Optional: for rounded corners */
  background-color: rgba(137, 137, 137, 0.37);
  border-radius: 8px;
  padding: 8px 16px;
  backdrop-filter: blur(10px);
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

/* Add this to your existing CSS */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 1s ease-in forwards;
}


.project-description p {
  font-family: Kommuna Demo;
}
@media (max-width: 650px) {
  .project-description {
    font-size: 18px;
    max-width: 90%;
  }
}
</style>