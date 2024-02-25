<script setup>
import CablesPatch from '@/components/CablesPatch.vue' //imported in root for possible use in other views
</script>

<template>
    <div>
        <CablesPatch patchDir="/patch_test/" :patchOptions="{ glCanvasResizeToWindow: true }"  @patch-loaded="handlePatchLoaded" />
    </div>
</template>

<script>
export default {
  name: 'CablesGLComponent',
  data() {
    return {
      // Define your component data properties here
    };
  },
  mounted() {
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
      
      if(myVar) {
        myVar.on("change", newValue => {
          console.log(newValue);
          // Here you can also update a Vue data property or emit an event
          // this.someDataProperty = newValue;
          // this.$emit('variableChanged', newValue);
        });
      }
    },
    watchPatchVisibility() {
      const targetElement = document.getElementById('glcanvas');

      if (targetElement) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                CABLES.patch.pause()
                console.log('Cables patch paused');
            } else {
                CABLES.patch.resume()
                console.log('Cables patch resumed');
            }
          });
        }, { threshold: 0.1 });

        observer.observe(targetElement);
      } else {
        console.error('Target element for observing is not available');
      }
    }
  }
}
</script>

<style>
</style>