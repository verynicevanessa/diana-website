<script setup>
import CablesPatch from "@/components/CablesPatch.vue"; //imported in root for possible use in other views
import Decision from "@/components/Decision.vue";
import FetchProjectsMixin from "@/mixins/FetchProjectsMixin.vue";
</script>

<template>
  <div>
    <CablesPatch
      v-if="projects.length"
      patchDir="/patch_test/"
      :patchOptions="{ glCanvasResizeToWindow: true }"
      :projectsData="mappedData"
      @patch-loaded="handlePatchLoaded"
    />
  </div>
</template>

<script>
export default {
  name: "CablesGLComponent",
  mixins: [FetchProjectsMixin],
  async created() {
    await this.fetchProjects()
  },
  methods: {
    handlePatchLoaded() {
      // Handle any initialization you might need here
      this.initializeCablesPatch();

      // Then set up the intersection observer to watch visibility
      this.watchPatchVisibility();
    },
    initializeCablesPatch() {
      // Assume you have the cablesGL script loaded and the patch initialized
      // Now, we listen to a specific variable from the patch
      console.log("Cables patch initialized");
      const myVar = CABLES.patch.getVar("testNumber");
      // localStorage.removeItem("savedData");
      let savedData = [];
      localStorage.removeItem("savedData");
      // while (savedData.length < 3) {
      //   savedData.push(myVar);
      //   localStorage.setItem("savedData", JSON.stringify(savedData));
      // }
      // for (let i=0; i<=3; i++){
      //   const data = savedData[i]
      //   // console.log(data);
      // }
      // console.log(savedData);
      // console.log(localStorage);

      if (myVar) {
        myVar.on("change", (newValue) => {
          if (savedData.length < 3) {
            savedData.push(newValue);
            console.log(savedData);
            localStorage.setItem("savedData", JSON.stringify(savedData));
          }
          if (savedData.length === 3) {
            setTimeout(() => {
              this.$router.push("/selectedProjects");
            }, 500);
          }

          // console.log(newValue);
          // Here you can also update a Vue data property or emit an event
          // this.someDataProperty = newValue;
          // this.$emit('variableChanged', newValue);
        });
      }
    },
    handleClick() {
      console.log("hello");
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
      console.log(this.projects);
      return this.projects.map(o => ({id: o.id, url: o.heroImage.url, mime: o.heroImage.mimeType}))
    }
  }
};
</script>

<style></style>
