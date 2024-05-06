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
      masonryKey: 0, // ключ для пересоздания компонента Masonry
    };
  },
  mounted() {
    setTimeout(() => {
      this.masonryKey++; // Изменение ключа вызовет пересоздание компонента
    }, 100); // задержка 500 мс
  },
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
    style="margin-top: 10vh"
  >
    <template #default="{ item, index }">
      <Project :project="item" />
    </template>
  </MasonryWall>
  <Footer></Footer>
</template>

<style></style>
