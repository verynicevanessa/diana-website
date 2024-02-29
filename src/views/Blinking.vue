<script setup>
import CablesPatch from "@/components/CablesPatch.vue"; //imported in root for possible use in other views
import Decision from "@/components/Decision.vue";
</script>

<template>
  <div>
    <CablesPatch
      v-if="mappedData"
      patchDir="/patch_blink/"
      :patchOptions="{ glCanvasResizeToWindow: true }"
      :projectsData = "mappedData"
    />
  </div>
</template>

<script>
import fetchProjectsMixin from "@/mixins/FetchProjectsMixin.vue";
export default {
  mixins: [fetchProjectsMixin],
  async created() {
    await this.fetchProjects();
  },

  methods: {
    handlePermissionRequest({ cameraAccess }) {
      this.cameraReady = cameraAccess;
    },
    forceReady() {
      this.cameraReady = true;
    }
  },

  computed: {
    mappedData() {
      return this.projects.map(el => [el.id, el.heroImage.url]);
    },
  },
};
</script>
<style></style>
