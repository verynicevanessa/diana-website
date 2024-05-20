<script setup>
import CablesPatch from "@/components/CablesPatch.vue"; //imported in root for possible use in other views
import useProjectData from "@/mixins/useProjectData";
import loadingMixin from "@/mixins/loadingMixin";
import WelcomeAnimation from "@/components/WelcomeAnimation.vue";
import { formatProjectsData } from "@/utils/utils";
</script>

<template>
  <WelcomeAnimation v-if="isLoading"></WelcomeAnimation>
  <div class="canvasContainer">
    <CablesPatch v-if="projects.length" patchDir="/patch_blink/" :patchOptions="{ glCanvasResizeToWindow: true }"
      :projectsData="mappedData" @patch-loaded="handlePatchLoaded" />
  </div>
</template>

<script>
export default {
  name: "CablesGLComponent",
  mixins: [useProjectData, loadingMixin],
  mounted() {
    this.startLoading();
  },
  methods: {
    handlePatchLoaded() {
      this.stopLoading();
      // Handle any initialization you might need here
      this.initializeCablesPatch();

      // Then set up the intersection observer to watch visibility
      this.watchPatchVisibility();
    },
    initializeCablesPatch() {
      console.log("Cables patch initialized");
      const cabelsData = CABLES.patch.getVar("selected_project_ids");
      if (cabelsData) {
        cabelsData.on("change", this.handleSelectedIdsUpdated);
      }
    },
    handleSelectedIdsUpdated(stringOfSelectedIds) {
      const arrayOfIdsString = stringOfSelectedIds.split(",");

      if (arrayOfIdsString.length === 3) {
        this.$store.commit("selectProjects", arrayOfIdsString);
        CABLES.patch.setVariable("outroAnimation", true);

        // Start a timeout to redirect after 4 seconds
        this.timeoutId = setTimeout(() => {
          // window.location.href = '/selected-projects'
          this.$router.push("/selected-projects");
        }, 4000);
      }
      // or after another "blink" or click
      if (arrayOfIdsString.length === 4) {
        clearTimeout(this.timeoutId);
        this.$router.push("/selected-projects");
      }
    },
    watchPatchVisibility() {
      const targetElement = document.getElementById("glcanvas");

      if (targetElement) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) {
                CABLES.patch.pause();
                console.log("Cables patch paused");
              } else {
                CABLES.patch.resume();
                console.log("Cables patch resumed");
              }
            });
          },
          { threshold: 0.1 }
        );

        observer.observe(targetElement);
      } else {
        console.error("Target element for observing is not available");
      }
    },
  },
  computed: {
    mappedData() {
      return {"items": formatProjectsData(this.projects, 12)}; // Format the projects data for the Cables patch
    },
  },

  beforeUnmount() {
    // Reset the logo visibility when the component is about to be destroyed
    const logo = document.querySelector(".logo");
    if (logo) {
      logo.style.display = ""; // Remove the inline style to reset its visibility
    }
    // disableCameraAccess();
  },

};
</script>

<style>
.canvasContainer {
  height: 100vh;
  overflow: hidden;
}

.canvasContainer video {
  left: 0;
  top: 0;
  position: fixed;
  overflow: hidden;
}
</style>
