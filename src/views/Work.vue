<template>
  <div v-if="isLoading" class="loading">
    <img src="../assets/Menu-Snowflake.png" style="width: 100px" />
  </div>
  <transition
    mode="out-in"
    @before-enter="handleBeforeEnter"
    @enter="handleEnter"
    @leave="handleLeave"
  >
    <div v-if="showContent" :key="masonryKey">
      <div class="grid-container">
        <div
          v-for="(column, colIndex) in reorderedProjects"
          :key="'column-' + colIndex"
          class="grid-column"
        >
          <div
            v-for="(item, index) in column"
            :key="item.id"
            class="grid-item"
          >
            <Project :project="item" />
            <video
              v-if="item.type === 'video'"
              controls
              loading="lazy"
              preload="metadata"
            >
              <source :src="item.videoSrc" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
      <Footer v-if="footerVisible" />
    </div>
  </transition>
</template>




<script>
import Footer from "../components/Footer.vue";
import useProjectData from "@/mixins/useProjectData";
import Project from "@/components/Project.vue";

export default {
  mixins: [useProjectData],
  components: { Footer, Project },
  data() {
    return {
      masonryKey: 0,
      showContent: false,
      isLoading: true,
      footerVisible: false,
      columns: 3, // Initial column count
    };
  },
  async mounted() {
    await this.loadProjects();
    window.addEventListener("resize", this.updateColumns);
    this.updateColumns(); // Call once to set initial value based on window size
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateColumns);
  },
  watch: {
    sortedByPriority() {
      this.masonryKey++;
      this.$nextTick(() => {
        this.onLayout();
      });
    },
  },
  methods: {
    async loadProjects() {
      try {
        await this.$store.dispatch("loadProjects");
        this.showContent = true;
        this.isLoading = false;
        this.$nextTick(() => {
          console.log("Sorted Projects:", this.sortedByPriority);
          this.onLayout();
          this.lazyLoadVideos();
        });
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    },
    onLayout() {
      this.masonryKey++;
      this.$nextTick(() => {
        this.footerVisible = true;
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
        rootMargin: "0px 0px",
        threshold: 0.1,
      };

      let observer = new IntersectionObserver((entries, self) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.preloadVideo(entry.target);
            self.unobserve(entry.target);
          }
        });
      }, config);

      videos.forEach((video) => {
        observer.observe(video);
      });
    },
    preloadVideo(video) {
      video.setAttribute("preload", "auto");
      video.load();
    },
    reorderProjects(projects, columns) {
      let columnArrays = Array.from({ length: columns }, () => []);

      for (let i = 0; i < projects.length; i++) {
        const columnIndex = i % columns;
        columnArrays[columnIndex].push(projects[i]);
        console.log(`Project ${projects[i].projectName} assigned to column ${columnIndex + 1}`);
      }

      columnArrays.forEach((col, index) => {
        console.log(`Column ${index + 1} projects:`, col.map(p => p.projectName));
      });

      return columnArrays;
    },
    updateColumns() {
      const width = window.innerWidth;
      if (width > 1200) {
        this.columns = 3;
      } else if (width > 768) {
        this.columns = 2;
      } else {
        this.columns = 1;
      }
      console.log(`Columns updated to: ${this.columns}`);
    },
  },
  computed: {
    sortedByPriority() {
      let priorityCounter = 100;
      const sortedProjects = this.projects
        .map(project => {
          if (project.priority === undefined || project.priority === null) {
            project.priority = priorityCounter++;
          }
          return project;
        })
        .sort((a, b) => a.priority - b.priority);
      console.log("Sorted by Priority:", sortedProjects);
      return sortedProjects;
    },
    reorderedProjects() {
      const reordered = this.reorderProjects(this.sortedByPriority, this.columns);
      console.log("Reordered Projects:", reordered);
      return reordered;
    },
  },
};
</script>








<style scoped>
.grid-container {
  display: flex;
  gap: 16px;
  margin-top: 10vh;
}

.grid-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.grid-item {
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
