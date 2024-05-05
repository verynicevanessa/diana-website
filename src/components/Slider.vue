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
      100: {
        slidesPerView: 1,
        spaceBetween: 10,
        direction: 'vertical',
        loop: false,
        grid: {
          rows:1
        }
       
      },
      600: { slidesPerView: 2, spaceBetween: 10 },
      900: { slidesPerView: 2, spaceBetween: 10 },
      1200: { slidesPerView: 3, spaceBetween: 10 },
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
      <div v-if="isNameProject(image)" class="about-card">
        <h3>About {{ isNameProject(image) }}</h3>
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
    isNameProject(media) {
      if (typeof media !== "object") {
        console.log(media,"+++++++++++");
        return media;
      }
    },
    isImage(media) {
      console.log(media, "----------");
      if (!media || !media.url) return false; // Check if media or media.url is undefined/null
      return media.mimeType.startsWith("image/");
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
  max-width: 100%; /* Ensures the content is not wider than its container */
  max-height: auto; /* Ensures the content does not exceed the viewport height */
  object-fit: contain; /* Resizes the content to fit within the container while maintaining its aspect ratio */
  margin: auto; /* Centers the content if it's smaller than its container */
}
.about-card {
  text-align:left;
  font-size: 50px;
  /* Center slide text vertically */

  background-color: #fff;
  max-width: 100%;
}

@media (max-width: 600px){
  .swiper-slide {
 
  overflow-x:visible;
  overflow-y: visible;
 

}
}

</style>
