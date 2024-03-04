<script>
import { ref, computed } from "vue";
import VueMasonryCss from "vue-masonry-css";
import Footer from "../components/Footer.vue";
import useProjectData from "@/mixins/useProjectData";
import Project from "@/components/Project.vue";


export default {
  data() {
    return {
      hovered: null, // Define hovered variable
    };
  },
  mixins: [useProjectData],
  methods: {
    isImage(media) {
      if (!media.url) return false; // If there's no URL, it's not an image
      return media.mimeType.startsWith("image/"); // Check if the MIME type starts with 'image/'
    },
    
  },
  components: { Footer, Project },
};
</script>

<template>
  <div class="masonry">
    <Project :project="project" v-for="project in projects"/>
  </div>
  <Footer></Footer>
</template>

<style scoped>
.masonry {
  column-count: 3;
  gap: 10px;
  row-gap: 10px;
  margin: 10px;
}

@media (min-width: 1000px) {
  .masonry-grid {
    grid-template-columns: repeat(3, 1fr); /* Three items per row */
  }
}
@media (max-width: 768px) {
  .masonry {
    column-count: 2; /* Switch to two columns for screens up to 768px */
  }
}

/* Adjust column count for even smaller screens */
@media (max-width: 480px) {
  .masonry {
    column-count: 1; /* Switch to one column for screens up to 480px */
  }
}
</style>
