<script setup>
import { SwiperSlide } from 'swiper/vue';
</script>
<template>
  <div v-if="project" class="project-page">
    <!-- Swiper -->
    <swiper-container
      class="swiper"
      ref="projectSwiper"
      :slidesPerView="2"
      :spaceBetween="30"
      :loop="true"
      :grid="{
        rows: 2,
      }"
      :mousewheel="true"
      :grabCursor="true"
      :breakpoints="{
        600: { slidesPerView: 1, rows: 1, spaceBetween: 30 },
        900: { slidesPerView: 3, spaceBetween: 30 },
        1200: { slidesPerView: 3, spaceBetween: 30 },
      }"
    >
      <SwiperSlide
        v-for="(image, index) in project.projectimages"
        :key="index"
        class="swiper-slide"
      >
        <img
          v-if="isImage(image)"
          :src="image.url"
          alt="Project Image"
          class="media-item"
        />
        <video
          v-else
          :src="image.url"
          class="media-item"
          autoplay
          muted
          loop
          playsinline
        >
          Your browser does not support the video tag.
        </video>
      </SwiperSlide>
    </swiper-container>

    <!-- Previous and Next buttons -->
    <div class="project-navigation"></div>

    <div class="project-name">
      <h3 @click="navigateToPreviousProject" class="Previous">PREV</h3>
      <h3 @click="toggleDescription" class="this-project">
        ABOUT {{ project.projectName }}
      </h3>
      <h3 @click="navigateToNextProject" class="Next">NEXT</h3>
    </div>

    <div v-if="showDescription" class="project-description">
      <p>{{ project.projectDescription }}</p>
    </div>
  </div>

  <div v-else>Loading</div>
</template>

<script>
import useProjectData from "@/mixins/useProjectData";
import { register } from 'swiper/element/bundle';

register();

export default {
  data() {
    return {
      projectSlug: null,
      showDescription: false
    };
  },
  mounted() {
    this.swiper = document.querySelector("swiper-container");
  },
  mixins: [useProjectData],
  methods: {
    isImage(media) {
      if (!media || !media.url) return false; // Check if media or media.url is undefined/null
      return media.mimeType.startsWith("image/");
    },
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
      });
    },
    navigateToNextProject(){
      let nextSlug;
      const currentIndex = this.projects.findIndex(
        (p) => p.id === this.project.id
      );
      if (currentIndex >= 0 && currentIndex < this.projects.length - 1) {
        nextSlug = this.projects[currentIndex + 1].projectSlug;
      }
      else {
        console.log("No next project found, looping to last project");
        nextSlug = this.projects[0].projectSlug;
      }
      this.$router.push({
        name: "ProjectDetail",
        params: { projectSlug: nextSlug },
      });
    },
    toggleDescription(){
      if(this.showDescription === false){
        this.showDescription = true
      } else {
        this.showDescription = false
      }
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
  watch: {
    $route() {
      console.log('updated');
      this.$nextTick(() => {
        if (this.$refs.projectSwiper && this.$refs.projectSwiper.swiper) {
          this.$refs.projectSwiper.swiper.update();
        }
      });
    }
  },
};
</script>

<style scoped>
.project-page {
  width: 100vw;
  height: 100vh;
}

.project-name {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 500;
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

.swiper {
  height: 100%;
}

.swiper-container {
  height: 100%;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  overflow-x: hidden;
  overflow-y: hidden;
  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img,
.swiper-slide video {
  max-width: 100%; /* Ensures the content is not wider than its container */
  max-height: 50vh; /* Ensures the content does not exceed the viewport height */
  object-fit: contain; /* Resizes the content to fit within the container while maintaining its aspect ratio */
  margin: auto; /* Centers the content if it's smaller than its container */
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
}

@media (max-width: 650px) {
  .project-page {
    width: 100vw;
    height: 90vh;
}

.project-description {
  font-size: 15px;
  max-width: 80%;
}
}

</style>
