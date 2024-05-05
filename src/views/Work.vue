<script>
import Footer from "../components/Footer.vue";
import useProjectData from "@/mixins/useProjectData";
import Project from "@/components/Project.vue";


export default {
  mixins: [useProjectData],
  components: { Footer, Project },
}
</script>

<template>
  <masonry-wall v-if="sortedByPriotity.length" :items="this.sortedByPriotity" :max-columns="3" :column-width="270" :gap="16" style="margin-top: 15vh;">
    <template #default="{ item, index }">
      <Project :project="item"/>
    </template>
  </masonry-wall>
  <Footer></Footer>
</template>