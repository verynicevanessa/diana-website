<script>
import { ref, computed } from "vue";
import { request } from "graphql-request";
import VueMasonryCss from "vue-masonry-css";
import Footer from "../components/Footer.vue";
import fetchProjectsMixin from "@/mixins/FetchProjectsMixin.vue";


// import { fetchProjects } from "../utils/fetchProjects";

export default {
  data() {
    return {
      hovered: null, // Define hovered variable
    };
  },
  mixins: [fetchProjectsMixin],
  created() {
    this.fetchProjects()
  },
  methods: {
    isImage(media) {
      if (!media.url) return false; // If there's no URL, it's not an image
      return media.mimeType.startsWith("image/"); // Check if the MIME type starts with 'image/'
    },
    setHovered(id) {
      this.hovered = id;
    },
    clearHovered() {
      this.hovered = null;
    },
    isHovered(id) {
      return this.hovered === id;
    },
  },
  components: { Footer },
};
</script>

<template>
  <div class="masonry">
    <div class="project" v-for="project in projects" :key="project.id">
      <router-link
        :to="{
          name: 'ProjectDetail',
          params: { projectSlug: project.projectSlug },
        }"
      >
        <div class="project-wrapper">
          <div
            class="media-wrapper"
            @mouseover="setHovered(project.id)"
            @mouseleave="clearHovered()"
          >
            <div v-if="project.heroImage">
              <img
                v-if="isImage(project.heroImage)"
                :src="project.heroImage.url"
                alt="Project Hero Image"
                class="media-item"
                :class="{ blurred: isHovered(project.id) }"
              />
              <video
                v-else
                :src="project.heroImage.url"
                class="media-item"
                autoplay
                muted
                loop
                :class="{ blurred: isHovered(project.id) }"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <div class="project-name">{{ project.projectName }}</div>
          </div>
        </div>
      </router-link>
    </div>
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

.project-wrapper {
  position: relative;
  overflow: hidden; /* Hide overflow for consistent layout */
  margin-bottom: 10px; /* Add vertical gap between projects */
}

.media-item {
  width: 100%;
  height: auto;
  display: block; /* Ensure the image/video takes up the full width of its container */
  transition: filter 0.3s ease; /* Apply transition effect to the filter property */
}

.blurred {
  filter: blur(20px); /* Apply the blur effect when the item is hovered */
}

.project-name {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  padding: 10px;
  font-size: 4rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  background-blend-mode: difference;
}

.project-wrapper:hover .project-name {
  opacity: 1;
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
