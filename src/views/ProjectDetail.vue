<script setup>
import Slider from "@/components/Slider.vue";
import { ref, watch, nextTick } from 'vue';

const showContent = ref(true);

function handleBeforeEnter(el) {
  el.style.opacity = 0;
}

function handleEnter(el, done) {
  el.style.transition = "opacity 0.5s";
  el.style.opacity = 1;
  done();
}

function handleLeave(el, done) {
  el.style.transition = "opacity 0.5s";
  el.style.opacity = 0;
  setTimeout(() => {
    done();
  }, 500);
}
</script>

<template>
  <transition
    mode="out-in"
    @before-enter="handleBeforeEnter"
    @enter="handleEnter"
    @leave="handleLeave"
  >
    <div v-if="project" :key="projectSlug" class="project-page">
      <!-- Swiper -->
      <Slider ref="slider" :images="project.projectimages" />

      <!-- Previous and Next buttons -->
      <div class="project-navigation"></div>

      <div class="project-name">
        <h3 @click="navigateToPreviousProject" class="Previous">PREV</h3>
        <h3 @click.stop="toggleDescription" class="this-project">
          {{ project.projectName }}
        </h3>
        <h3 @click="navigateToNextProject" class="Next">NEXT</h3>
      </div>

      <div v-if="showDescription" ref="description" class="project-description">
        <p>{{ project.projectDescription }}</p>
      </div>
    </div>
    <div v-else>Loading</div>
  </transition>


</template>

<script>
import useProjectData from "@/mixins/useProjectData";

export default {
  data() {
    return {
      showDescription: false,
    };
  },
  mounted() {
    document.addEventListener("click", this.closeDescriptionOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.closeDescriptionOutside);
  },
  mixins: [useProjectData],
  methods: {
    navigateToPreviousProject() {
      let prevSlug;
      const currentIndex = this.projects.findIndex(
        (p) => p.id === this.project.id
      );
      if (currentIndex > 0) {
        prevSlug = this.projects[currentIndex - 1].projectSlug;
      } else {
        console.log("No previous project found, looping to last project");
        prevSlug = this.projects[this.projects.length - 1].projectSlug;
      }
      this.$router.push({
        name: "ProjectDetail",
        params: { projectSlug: prevSlug },
      }).then(() => {
        this.handleSliderResetAndMute();
      });
    },
    navigateToNextProject() {
      let nextSlug;
      const currentIndex = this.projects.findIndex(
        (p) => p.id === this.project.id
      );
      if (currentIndex >= 0 && currentIndex < this.projects.length - 1) {
        nextSlug = this.projects[currentIndex + 1].projectSlug;
      } else {
        console.log("No next project found, looping to first project");
        nextSlug = this.projects[0].projectSlug;
      }
      this.$router.push({
        name: "ProjectDetail",
        params: { projectSlug: nextSlug },
      }).then(() => {
        this.handleSliderResetAndMute();
      });
    },
    toggleDescription() {
      this.showDescription = !this.showDescription;
    },
    closeDescriptionOutside(event) {
      if (
        this.showDescription &&
        this.$refs.description &&
        !this.$refs.description.contains(event.target)
      ) {
        this.showDescription = false;
      }
    },
    handleSliderResetAndMute() {
      this.$nextTick(() => {
        if (this.$refs.slider) {
          console.log('Slider ref is available.');
          if (typeof this.$refs.slider.resetSwiper === 'function') {
            console.log('Calling resetSwiper');
            this.$refs.slider.resetSwiper();
          } else {
            console.error('resetSwiper method is not available.');
          }
          if (typeof this.$refs.slider.muteAllVideos === 'function') {
            console.log('Calling muteAllVideos');
            this.$refs.slider.muteAllVideos();
          } else {
            console.error('muteAllVideos method is not available.');
          }
        } else {
          console.error('Slider ref is not available.');
        }
      });
    },
  },
  watch: {
    '$route.params.projectSlug': {
      handler(newSlug, oldSlug) {
        if (newSlug !== oldSlug) {
          this.handleSliderResetAndMute();
        }
      },
      immediate: true
    }
  },
  computed: {
    projectSlug() {
      return this.$route.params.projectSlug;
    },
    project() {
      return this.getProjectBySlug(this.$route.params.projectSlug);
    },
  },
};
</script>

<style scoped>
.main {
  width: 100vw;
  height: 100vh;
  position: relative;
}

.project-name {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 500;
  text-transform: uppercase;
}

.this-project {
  flex: 1; /* Take up remaining space */
  text-align: center;
  background-color: rgba(170, 171, 204, 0.37);
  border-radius: 8px;
  padding: 8px 16px;
  backdrop-filter: blur(10px);
  cursor: pointer;
}

.previous,
.next {
  background-color: rgba(170, 171, 204, 0.37);
  border-radius: 8px;
  padding: 8px 16px;
  backdrop-filter: blur(10px);
  cursor: pointer;
}

.previous:hover,
.next:hover {
  background-color: rgba(223, 223, 223, 0.37);
}

.project-name h3 {
  background-color: rgba(137, 137, 137, 0.37);
  border-radius: 8px;
  padding: 8px 16px;
  backdrop-filter: blur(10px);
}

.project-name h3:hover {
  background-color: rgba(223, 223, 223, 0.37);
}

.project-description {
  position: fixed;
  left: 0;
  right: 0;
  top: 40%;
  margin: auto;
  font-size: 30px;
  color: black; /* Text color */
  max-width: 800px; /* Or any max-width or width you prefer */
  z-index: 10; /* Ensure it's above other content */
  border-radius: 10px; /* Optional: for rounded corners */
  background-color: rgba(137, 137, 137, 0.37);
  border-radius: 8px;
  padding: 8px 16px;
  backdrop-filter: blur(10px);
  font-family: Kommuna Demo;
}

@media (max-width: 650px) {
  .project-page {
    width: 100vw;
    height: 95vh;
  }

  .project-description {
    font-size: 15px;
    max-width: 80%;
  }
  .project-name {
    padding: 0 20px;
  }
  
}
/* For touch screens with coarse pointers, disable hover effects */
@media (hover: none) or (pointer: coarse) {
  .project-navigation:hover,
  .previous:hover,
  .next:hover {
    background-color: initial;
  }
}
</style>
