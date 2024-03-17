<template>
  <div class="project" :key="project.id">
    <router-link
      :to="{
        name: 'ProjectDetail',
        params: { projectSlug: project.projectSlug },
      }"
    >
      <div class="project-wrapper">
        <div class="media-wrapper">
          <div v-if="project.heroImage">
            <img
              v-if="isImage(project.heroImage)"
              :src="project.heroImage.url"
              alt="Project Hero Image"
              class="media-item"
            />
            <video
              v-else
              :src="project.heroImage.url"
              class="media-item"
              autoplay
              muted
              loop
              playsinline
            >
              Your browser does not support the video tag.
            </video>
          </div>

          <div class="project-name">{{ project.projectName }}</div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
    },
  },
  methods: {
    isImage(media) {
      if (!media.url) return false; // If there's no URL, it's not an image
      return media.mimeType.startsWith("image/"); // Check if the MIME type starts with 'image/'
    },
  },
};
</script>

<style scoped>
.project-wrapper {
  position: relative;
  overflow: hidden; /* Hide overflow for consistent layout */
  margin-bottom: 10px; /* Add vertical gap between projects */
}

.project-wrapper:hover img,
.project-wrapper:hover video {
    filter: blur(20px);
}

.media-item {
  width: 100%;
  height: auto;
  display: block; /* Ensure the image/video takes up the full width of its container */
  transition: filter 0.3s ease; /* Apply transition effect to the filter property */
}
.project-name {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  padding: 10px;
  font-size: clamp(22px, 3vw, 50px);
  pointer-events: none;
  transition: opacity 0.3s ease;
  mix-blend-mode: exclusion;
  opacity: 0;
}

.project-wrapper:hover .project-name {
  opacity: 1;
}
</style>
