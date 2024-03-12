<script setup>
import Decision from "@/components/Decision.vue";
</script>

<template>
  <div>
    <Decision @proceed="handleProceed" />
  </div>
</template>

<script>
export default {
  methods: {
    handleProceed() {
      this.$router.push("/blinking");
    },
  },

  computed: {
    readyToRender() {
      return this.projects.length > 0 && this.cameraReady;
    },
  },
  mounted() {
    // Disable the logo when the component mounts
    const logo = document.querySelector('.logo');
    if (logo) {
      logo.style.display = 'none'; // Hide the logo
    }
  },
  beforeUnmount() {
    // Reset the logo visibility when the component is about to be destroyed
    const logo = document.querySelector('.logo');
    if (logo) {
      logo.style.display = ''; // Remove the inline style to reset its visibility
    }
  },
};
</script>
<style></style>
