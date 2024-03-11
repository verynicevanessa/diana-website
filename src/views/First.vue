<script setup>
import WelcomeAnimation from "@/components/WelcomeAnimation.vue";
</script>

<template>
  <WelcomeAnimation @animationFinished="handleAnimationFinished" />;
</template>

<script>
export default {
  methods: {
    handleAnimationFinished() {
      this.$router.push("decision");
    },
  },
};
</script>
