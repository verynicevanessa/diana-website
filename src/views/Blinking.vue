<script setup>
import CablesPatch from "@/components/CablesPatch.vue"; //imported in root for possible use in other views
import useProjectData from "@/mixins/useProjectData";
</script>

<template>
  <div class="canvasContainer">
    <CablesPatch
      v-if="projects.length"
      patchDir="/patch_blink_5/"
      :patchOptions="{ glCanvasResizeToWindow: true }"
      :projectsData="mappedData"
      @patch-loaded="handlePatchLoaded"
    />
  </div>
</template>

<script>
export default {
  name: "CablesGLComponent",
  mixins: [useProjectData],
  methods: {
    handlePatchLoaded() {
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
        CABLES.patch.setVariable("outroAnimation",true);

        // Start a timeout to redirect after 4 seconds
        this.timeoutId = setTimeout(() => {
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
      return {
        items: this.projects
          .filter((o) => o.heroImage.mimeType.indexOf("video") < 0) // Filter out "video"
          .map((o) => ({
            id: o.id,
            url: o.heroImage.url,
            mime: o.heroImage.mimeType,
          })),
      };
    },
  },
};
</script>

<style>
.canvasContainer {
  height: 100vh;
  overflow: hidden;
}
</style>
