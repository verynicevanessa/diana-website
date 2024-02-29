<script setup>
import CablesPatch from "@/components/CablesPatch.vue"; //imported in root for possible use in other views
import Decision from "@/components/Decision.vue";
</script>

<template>
  <div>
    <Decision :handlePermission="handlePermissionRequest"/>
  </div>
</template>

<script>
export default {
  methods: {
    handlePermissionRequest() {
        this.$router.push('/blinking')
    }
  },

  computed: {
    readyToRender() {
      return this.projects.length > 0 && this.cameraReady;
    },
  },
};
</script>
<style></style>
