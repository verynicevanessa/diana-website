<script setup>
import { ref, onMounted } from 'vue';
import Decision from "@/components/Decision.vue";

// Manage the visibility state
const isVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 2000); // 2 seconds delay
});
</script>

<template>
  <div>
    <transition name="fade">
      <div v-if="isVisible">
        <Decision @proceed="handleProceed" />
      </div>
    </transition>
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

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
