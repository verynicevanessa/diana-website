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
      showContent: false,
      isLoading: true,
      footerVisible: false
    };
  },
  mounted() {
    this.loadProjects();
  },
  methods: {
    loadProjects() {
      setTimeout(() => {
        this.showContent = true;
        this.isLoading = false;
        this.$nextTick(() => {
          this.onLayout(); // Ensure layout is triggered after content is shown
          this.lazyLoadVideos(); // Start lazy loading videos
        });
      }, 100);
    },
    onLayout() {
      this.masonryKey++; // Trigger a re-render
      this.$nextTick(() => {
        this.footerVisible = true; // Make footer visible after MasonryWall layout
      });
    },
    handleBeforeEnter(el) {
      el.style.opacity = 0;
    },
    handleEnter(el, done) {
      el.style.transition = "opacity 1s";
      requestAnimationFrame(() => {
        el.style.opacity = 1;
        done();
      });
    },
    handleLeave(el, done) {
      el.style.transition = "opacity 1s";
      el.style.opacity = 0;
      setTimeout(() => {
        done();
      }, 100);
    },
    lazyLoadVideos() {
      const videos = document.querySelectorAll('video[loading="lazy"]');
      const config = {
        rootMargin: '0px 0px',
        threshold: 0.1
      };

      let observer = new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.preloadVideo(entry.target);
            self.unobserve(entry.target);
          }
        });
      }, config);

      videos.forEach(video => {
        observer.observe(video);
      });
    },
    preloadVideo(video) {
      video.setAttribute('preload', 'auto');
      video.load();
    }
  }
};
</script>

<template>
  <div v-if="isLoading" class="loading"><img src="../assets/Menu-Snowflake.png" style="width: 100px;"></div>
  <transition
    mode="out-in"
    @before-enter="handleBeforeEnter"
    @enter="handleEnter"
    @leave="handleLeave"
  >
    <div v-if="showContent" :key="masonryKey">
      <MasonryWall
        v-if="sortedByPriotity.length"
        :items="sortedByPriotity"
        :max-columns="3"
        :column-width="200"
        :gap="16"
        @layout="onLayout"
        style="margin-top: 10vh"
      >
        <template #default="{ item, index }">
          <div :key="item.id" class="fade-in">
            <Project :project="item" />
            <!-- Example of a video element -->
            <video v-if="item.type === 'video'" controls loading="lazy" preload="metadata">
              <source :src="item.videoSrc" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
        </template>
      </MasonryWall>
      <!-- Footer is displayed only after layout is done -->
      <Footer v-if="footerVisible"></Footer>
    </div>
  </transition>
</template>

<style scoped>

.fade-in {
  animation: fadeIn 0.1s ease-in forwards;
}

.hidden {
  opacity: 0;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
}

/* Unified and minimal CSS animation */
.fade-in {
  animation: fadeIn 0.1s ease-in forwards;
  transition: opacity 1s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
