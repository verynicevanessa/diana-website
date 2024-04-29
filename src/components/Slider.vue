<template>
  <swiper-container
    class="swiper"
    ref="projectSwiper"
    :direction="horizontal"
    :slidesPerView="2"
    :spaceBetween="30"
    :loop="true"
    :grid="{
      rows: 2,
   }"
   :max-columns="1"

    :mousewheel="true"
    :grabCursor="true"
    :breakpoints="{
      100: { slidesPerView: 1, spaceBetween: 0, direction: vertical},
      600: { slidesPerView: 2, spaceBetween: 30,direction: vertical },
      900: { slidesPerView: 3, spaceBetween: 30 },
      1200: { slidesPerView: 3, spaceBetween: 30 },
    }"
  >
    <SwiperSlide
      v-for="(image, index) in images"
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
</template>

<script>
import { register } from "swiper/element/bundle";

register();

export default {
  props: {
    images: {
        type: Array
    }
  },
  mounted() {
    console.log(this.images);
    this.swiper = document.querySelector("swiper-container");
  },
  methods: {
    isImage(media) {
      if (!media || !media.url) return false; // Check if media or media.url is undefined/null
      return media.mimeType.startsWith("image/");
    },
  },
  watch: {
    $route() {
      this.$nextTick(() => {
        if (this.$refs.projectSwiper && this.$refs.projectSwiper.swiper) {
          this.$refs.projectSwiper.swiper.update();
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
</style>
