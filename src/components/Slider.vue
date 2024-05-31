<template>
  <swiper-container
    class="swiper"
    ref="projectSwiper"
    :slidesPerView="3"
    :spaceBetween="10"
    :loop="true"
    :grid="{
      rows: 2,
    }"
    :mousewheel="true"
    :grabCursor="true"
    :breakpoints="{
      320: {
        slidesPerView: 1,
        direction: 'vertical',
        spaceBetween: 30,
        loop: false,
        grid: {
          rows: 1,
        },
      },
      600: { slidesPerView: 2, spaceBetween: 10 },
      900: { slidesPerView: 2, spaceBetween: 10 },
      1200: { slidesPerView: 3, spaceBetween: 10 },
    }"
    @slideChange="onSlideChange"
  >
    <swiper-slide
      v-for="(media, index) in images"
      :key="index"
      class="swiper-slide"
    >
      <div v-if="isAboutLink(media)" @click="toggleDescription(media.description)" class="about-card">
        <h3>ABOUT {{ media.name }}</h3>
        <svg
          class="arrow-icon"
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
      <template v-else>
        <img
          v-if="isImage(media)"
          :src="media.url"
          alt="Project Image"
          class="media-item"
        />
        <div v-else-if="isVideo(media)" class="video-container">
          <video
            :src="media.url"
            :ref="`videoElement-${index}`"
            class="media-item"
            autoplay
            :muted="mutedStates[index]"
            loop
            muted
            playsinline
          >
            Your browser does not support the video tag.
          </video>
          <button @click="toggleSound(index)" class="sound-toggle">
            <img :src="buttonImages[index]" alt="Sound Toggle">
          </button>


        </div>
      </template>
    </swiper-slide>
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
      mutedStates: {},
      buttonImageStates: {}, // New data property for button image states
      buttonImages: [],
      swiper: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initSwiper();
      if (this.swiper) {
        this.attachSwiperListeners();
        this.initMuteStates();
        this.muteAllVideos(); // Ensure all videos are muted when component mounts
      } else {
        console.error("Swiper instance not available.");
      }
      this.initButtonImages();
    });
  },
  methods: {
    initSwiper() {
      this.swiper = this.$refs.projectSwiper.swiper;
      if (this.swiper) {
        this.attachSwiperListeners();
        this.initMuteStates();
      } else {
        console.error("Swiper instance not available.");
      }
    },
    attachSwiperListeners() {
      if (this.swiper) {
        this.swiper.on('breakpoint', () => {
          this.$forceUpdate();
        });
      } else {
        console.error("Attempted to attach listeners to an uninitialized Swiper instance.");
      }
    },
    updateSwiperOnMediaLoad() {
      if (this.swiper) {
        this.swiper.update();
      }
    },
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
    toggleDescription(description) {
      this.$emit('toggle-description', description);
    },
    initMuteStates() {
      this.images.forEach((item, index) => {
        if (this.isVideo(item)) {
          this.mutedStates[index] = true; // Directly set each video as muted initially
          this.buttonImageStates[index] = false; // Initialize button image states to "sound off"
        }
      });
    },
    // toggleSound(index) {
    //   this.mutedStates[index] = !this.mutedStates[index];
    //   this.buttonImageStates[index] = !this.buttonImageStates[index];
      
    //   const videoElement = this.$refs[`videoElement-${index}`][0];
    //   if (videoElement) {
    //     videoElement.muted = this.mutedStates[index];
    //     if (!videoElement.muted) {
    //       videoElement.play().catch(e => {
    //         this.mutedStates[index] = true;
    //         this.buttonImageStates[index] = false;
    //       });
    //     }
    //   }
    // },
    toggleSound(index) {
      this.mutedStates[index] = !this.mutedStates[index];
      this.buttonImageStates[index] = !this.buttonImageStates[index]; // Toggle the button image state
      this.updateButtonImage(index); // Update the button image
      this.$nextTick(() => {
        const videoElement = this.$refs[`videoElement-${index}`][0];
        if (videoElement) {
          videoElement.muted = this.mutedStates[index];
          if (!videoElement.muted) { // Force play to ensure sound can be heard
            videoElement.play().catch(e => {
              console.error('Error attempting to play video:', e);
              this.mutedStates[index] = true; // Revert if play fails
              this.buttonImageStates[index] = false; // Revert button image state if play fails
              this.updateButtonImage(index); // Update the button image
            });
          }
        } else {
          console.error('Video element not found');
        }
      });
    },

    resetSwiper() {
      if (this.swiper) {
        console.log('Resetting Swiper to the first slide');
        this.swiper.slideTo(0, 0); // Reset to the first slide without transition
      }
    },
    muteAllVideos() {
      this.$nextTick(() => {
        console.log('Muting all videos');
        this.images.forEach((item, index) => {
          if (this.isVideo(item)) {
            const videoElement = this.$refs[`videoElement-${index}`][0];
            if (videoElement) {
              videoElement.muted = true;
              this.mutedStates[index] = true;
              this.buttonImageStates[index] = false;
              console.log(`Muted video at index ${index}`);
            }
          }
        });
      });
    },
    onSlideChange() {
      console.log('Slide changed');
      this.muteAllVideos();
    },
    async initButtonImages() {
      for (let i = 0; i < this.images.length; i++) {
        if (this.isVideo(this.images[i])) {
          this.buttonImages[i] = await this.getButtonImageSrc(i);
        }
      }
    },
    async getButtonImageSrc(index) {
      const soundOnSrc = await import('@/assets/DLW-Sound-On.svg');
      const soundOffSrc = await import('@/assets/DLW-Sound-Off.svg');
      return this.buttonImageStates[index] ? soundOnSrc.default : soundOffSrc.default;
    },
    async updateButtonImage(index) {
      this.buttonImages[index] = await this.getButtonImageSrc(index);
    }
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
#app {
  height: 100%;
}

html,
body {
  position: relative;
  height: 100%;
}


.swiper {
  width: 100vw;
  height: 100vh;
}

.swiper-container {
  height: 100vh;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img,
.swiper-slide video,
.video-container {
  display: block;
  height: 100%;
  width: 100%;
  object-fit: contain;
}

.video-container{
  position: relative;
}

.sound-toggle {
  position: absolute;
  top: 20px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  z-index: 50;
}

.sound-toggle img {
  width: 24px;
  height: 24px;
  mix-blend-mode: difference;
}

.about-card {
  text-align: center;
  font-size: 50px;
  max-width: 100%;
  padding: 10vw;
}

h3 {
  margin: 0;
  padding: 0;
  font-family: Kommuna Demo;
}


@media (max-width: 600px) {
  .swiper-slide {
  margin-left: 0 !important;
}
  .project-page {
    height: 90%;
    position: relative;
    padding: 10%;
  }
  .swiper-container {
    height: 90vh;
    width: 90vw;
    align-items: center; 
  }
  .swiper {
  width: 90vw;
  height: 90vh;
}

  .swiper-slide {
    text-align: center;
    font-size: 18px;

    /* Center slide text vertically */
    display: flex; 
    justify-content: center;
    align-items: center;
  }

  .swiper-slide {
    overflow-x: visible;
    overflow-y: visible;
  }
  .swiper-slide img,
  .swiper-slide video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    margin-left: 0px !important;
  }

  /* .video-container {
    display: block;
    width: 85vw;
    height: 100%;
    object-fit: contain;
  } */

  .video-container{
  position: relative;
  width: 100%;
}

.sound-toggle {
  position: absolute;
  top: 180px;
  right: 10px;
}

  .sound-toggle img {
  width: 24px;
  height: 24px;
}


  .project-description {
    position: fixed;
    top: auto;
  }
  .arrow-icon {
    transform: rotate(90deg);
  }
}

/* For touch screens with coarse pointers, disable hover effects */
@media (hover: none) or (pointer: coarse) {
  .button:hover {
    background-color: initial;
  }
}
</style>
