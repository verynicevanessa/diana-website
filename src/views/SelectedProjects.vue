<template>
  <main>
    Selected id's: {{ selectedProjects }}
  </main>
</template>

<script>
export default {
  data() {
    return {
      selectedProjects: []
    };
  },
  mounted() {
    this.selectedProjects = JSON.parse(localStorage.getItem("savedData"))[2];
  },
};
</script>

<style>
    main {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>