<!-- <script setup>
import Slider from "@/components/Slider.vue";
</script> -->
<template>
  <main>
    <div v-if="isLoading" class="loading-screen fade-in-out">
      <p>LOADING<br>YOUR<br>SELECTION</p>
    </div>
    <Slider
      v-else-if="selectedProjectsImages.length"
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

<script setup>
import Slider from "@/components/Slider.vue";
import { ref, onMounted } from 'vue';
import useProjectData from "@/mixins/useProjectData";

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
});
</script>

<script>
import Project from "@/components/Project.vue";

export default {
  mixins: [useProjectData],
  data() {
    return {
      showDescription: false,
      selectedProjectDescription: '',
    };
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
    disableCameraAccess() {
      if (window.currentStream) {
        window.currentStream.getTracks().forEach(track => {
          track.stop();
        });
        window.currentStream = null;
      }
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

.loading-screen {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  /* background-color: white; */
  z-index: 999; /* Über anderen Inhalten liegen */
  opacity: 0; /* Anfangszustand unsichtbar */
  text-align: center;
}

.fade-in-out {
  animation: fadeInOut 2.5s ease-in-out forwards;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.project-description {
  font-size: 30px;
  color: black; /* Textfarbe */
  max-width: 800px; /* Maximalbreite */
  z-index: 10; /* Über anderen Inhalten liegen */
  border-radius: 10px; /* Optional: abgerundete Ecken */
  background-color: rgba(137, 137, 137, 0.37);
  border-radius: 8px;
  padding: 8px 16px;
  backdrop-filter: blur(10px);
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.fade-in {
  animation: fadeIn 1s ease-in forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
