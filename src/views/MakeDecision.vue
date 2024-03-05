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
};
</script>
<style></style>
