<script setup>
import CablesPatch from "@/components/CablesPatch.vue"; //imported in root for possible use in other views
import useProjectData from "@/mixins/useProjectData";
import loadingMixin from "@/mixins/loadingMixin";
import WelcomeAnimation from "@/components/WelcomeAnimation.vue";
import { formatProjectsData } from "@/utils/utils";
import logger from '@/utils/logger';
</script>

<template>
  <WelcomeAnimation v-if="isLoading"></WelcomeAnimation>
  <div id="note">
    move your head  <br>
    from left to right  <br>
    and top to bottom  <br>
    to move the cluster. 
</div>
  <div class="canvasContainer">
   
    <CablesPatch v-if="projects.length" patchDir="/patch_blink/"
    :patchOptions="{
      glCanvasResizeToWindow: true,
      variables: {
                  HiresDisplay: 1,
                  showUI: 0
                 }
    }"
    :projectsData="mappedData"
    @patch-loaded="handlePatchLoaded" />
  </div>
</template>

<script>
export default {
  name: "CablesGLComponent",
  mixins: [useProjectData, loadingMixin],
  mounted() {
    this.startLoading();
    setTimeout(() => {
      const note = document.getElementById("note");
      if (note) {
        note.style.transition = "opacity 1s"; // Add a smooth transition for fading out
        note.style.opacity = 0;
        setTimeout(() => {
          note.style.display = "none";
        }, 1000); // Wait for the fade-out transition to complete before hiding
      }
    }, 4000); // 3 seconds delay before starting the fade out

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
                logger.log("Cables patch paused");
              } else {
                CABLES.patch.resume();
                logger.log("Cables patch resumed");
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
      logger.log(this.projects);
      logger.log(formatProjectsData(this.projects, 12));
      return {"items": formatProjectsData(this.projects, 12)}; // Format the projects data for the Cables patch
    },
  },

  beforeUnmount() {
    // Reset the logo visibility when the component is about to be destroyed
    const logo = document.querySelector(".logo");
    if (logo) {
      logo.style.display = ""; // Remove the inline style to reset its visibility
    }
    //disableCameraAccess();
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

#note {
  width: 100px;
  bottom: 0;
  left: 1;
  z-index: 900;
  background-color: rgba(255, 255, 255, 0.234);
  color: rgba(30, 30, 89, 0.578);
  border-radius: 18px;
  padding: 10px;
  margin: 18px 18px;
  position: absolute;
  font-size: 14px;
  transition: opacity 1s; /* Ensure that the note has a transition effect */
}
@media (max-width: 768px) {
  .canvasContainer {
    height: 100%;
  }
}
</style>
