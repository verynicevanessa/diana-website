<script>
import Footer from "../components/Footer.vue";
import useProjectData from "@/mixins/useProjectData";
import Project from "@/components/Project.vue";
import MasonryWall from "@yeger/vue-masonry-wall";

export default {
  mixins: [useProjectData],
  components: { Footer, Project },
  data() {
    return {
      masonryKey: 0, 
    };
  },
  methods: {
    onLayout() {
      this.$nextTick(() => {
        this.masonryKey++; // Trigger a re-render
      });
    }
  }
};
</script>

<template>
  <MasonryWall
    v-if="sortedByPriotity.length"
    :items="this.sortedByPriotity"
    :max-columns="3"
    :column-width="200"
    :gap="16"
    :key="masonryKey"
    @layout="onLayout"
    style="margin-top: 10vh"
  >
    <template #default="{ item, index }">
      <Project :project="item" />
    </template>
  </MasonryWall>
  <Footer></Footer>
</template>

<style></style>
