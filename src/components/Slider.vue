<template>
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
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
        direction: 'vertical',
        loop: false,
        grid: {
          rows: 1,
        },
      },
      600: { slidesPerView: 2, spaceBetween: 10 },
      900: { slidesPerView: 2, spaceBetween: 10 },
      1200: { slidesPerView: 3, spaceBetween: 10 },
    }"
  >
    <SwiperSlide
      v-for="(media, index) in images"
      :key="index"
      class="swiper-slide"
    >
      <img
        v-if="isImage(media)"
        :src="media.url"
        alt="Project Image"
        class="media-item"
      />
      <video
        v-if="isVideo(media)"
        :src="media.url"
        class="media-item"
        autoplay
        muted
        loop
        playsinline
      >
        Your browser does not support the video tag.
      </video>
      <div v-if="isAboutLink(media)" @click="aboutProject()" class="about-card">
        <h3>About {{ media.name }}</h3>
        <svg
          width="50"
          height="30"
          viewBox="0 0 50 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 15H42M42 15L29 2M42 15L29 28"
            stroke="black"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div
        @click="closeDescription()"
        v-if="showDescription"
        ref="description"
        class="project-description"
      >
        <p>{{ media.description }}</p>
      </div>
    </SwiperSlide>
  </swiper-container>
</template>

<script>
import { register } from "swiper/element/bundle";

register();

export default {
  props: {
    images: {
      type: Array,
    },
  },
  data() {
    return {
      isSelectedPage: false,
      showDescription: false,
    };
  },
  mounted() {
    this.initSwiper();
    this.updateSwiperOnMediaLoad();
  },

  methods: {
    isSelectedPage() {
      if (this.$route.name === "selected-page") {
        return (isSelectedPage = true);
      }
    },
    isAboutLink(media) {
      return media.type === "link";
    },
    isImage(media) {
      if (!media || !media.url) return false;
      return media.mimeType.startsWith("image/");
    },
    isVideo(media) {
      if (!media || !media.url || media.mimeType.startsWith("image/"))
        return false;
      return media.mimeType.startsWith("video/");
    },
    aboutProject() {
      return (this.showDescription = true);
    },
    closeDescription() {
      if (this.showDescription === true) {
        return (this.showDescription = false);
      } else {
        return;
      }
    },

    initSwiper() {
      this.swiper = this.$refs.projectSwiper.swiper;
    },
    updateSwiperOnMediaLoad() {
      this.images.forEach((image) => {
        const media = new Image();
        media.onload = () => this.swiper.update();
        media.src = image.url;
      });
    },
  },
  watch: {
    $route() {
      this.$nextTick(() => {
        if (this.swiper) {
          this.swiper.update();
        }
      });
    },
  },
};
</script>

<style scoped>
.swiper {
  height: 100%;
}

.swiper-container {
  height: 1000;
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
  max-height: 100%; /* Ensures the content is not wider than its container */
  max-width: auto; /* Ensures the content does not exceed the viewport height */
  object-fit: contain; /* Resizes the content to fit within the container while maintaining its aspect ratio */
  margin: auto; /* Centers the content if it's smaller than its container */
}
.about-card {
  text-align: center;
  font-size: 50px;
  max-width: auto;
  padding: 10vw;
}
h3 {
  margin: 0;
  padding: 0;
  font-family: Kommuna Demo;
}
.project-description {
  position: fixed;
  /* left: 0;
  right: 0; */
  top: 40%;
  margin: auto;
  font-size: 30px;
  color: black; /* Text color */
  max-width: 800px; /* Or any max-width or width you prefer */
  z-index: 10; /* Ensure it's above other content */
  border-radius: 10px; /* Optional: for rounded corners */
  background-color: rgba(137, 137, 137, 0.37);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  font-family: GreedTRIAL-SemiBold;
}

@media (max-width: 600px) {
  .swiper-slide {
    overflow-x: visible;
    overflow-y: visible;
    padding: 20vh;
  }
  .swiper-slide img,
  .swiper-slide video {
    max-width: max-content;
    max-height: 50vh;
  }
  .project-description {
    position: fixed;
    /* left: 0;
  right: 0; */
    top: auto;
  }
}
</style>
