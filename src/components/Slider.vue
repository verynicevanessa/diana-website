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
    @slideChange="onSlideChange"
  >
    <SwiperSlide
      v-for="(media, index) in images"
      :key="index"
      class="swiper-slide"
    >
      <div v-if="isAboutLink(media)" @click="aboutProject()" class="about-card">
        <h3>About {{ media.name }}</h3>
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
            <img :src="buttonImageStates[index] ? '/src/assets/DLW-Sound-On.svg' : '/src/assets/DLW-Sound-Off.svg'">
          </button>
        </div>
      </template>
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
      mutedStates: {},
      buttonImageStates: {}, // New data property for button image states
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
    initMuteStates() {
      this.images.forEach((item, index) => {
        if (this.isVideo(item)) {
          this.mutedStates[index] = true; // Directly set each video as muted initially
          this.buttonImageStates[index] = false; // Initialize button image states to "sound off"
        }
      });
    },
    toggleSound(index) {
      this.mutedStates[index] = !this.mutedStates[index];
      this.buttonImageStates[index] = !this.buttonImageStates[index]; // Toggle the button image state
      this.$nextTick(() => {
        const videoElement = this.$refs[`videoElement-${index}`][0];
        if (videoElement) {
          videoElement.muted = this.mutedStates[index];
          if (!videoElement.muted) { // Force play to ensure sound can be heard
            videoElement.play().catch(e => {
              console.error('Error attempting to play video:', e);
              this.mutedStates[index] = true; // Revert if play fails
              this.buttonImageStates[index] = false; // Revert button image state if play fails
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
  width: 100%; /* Full width of the container */
  height: 100%; /* Full height of the container */
  object-fit: contain; 
 
  margin: auto; /* Centers the content if it's smaller than its container */
}

.video-container {
  width: auto;
  height: 100%;
  position: relative;
}

.video-container video{
  width: 100%; /* Full width of the container */
  height: 100%; /* Full height of the container */
  object-fit: contain; 
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
  font-family: GreedNarrow-SemiBold;
}
.swiper-slide button {
    position: absolute;
    top: 10px; /* Adjust as needed */
    right: 10px; /* Adjust as needed */
    padding: 10px;
    background-color: #ffffff00;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    z-index: 50;
  }

.sound-toggle {
  margin: auto;
  border: none; /* No border */
  font-size: 16px; /* Icon size, adjust as needed */
  padding: 10px; /* Padding around the icon */
  border-radius: 50%; /* Circular button */
  cursor: pointer; /* Pointer cursor on hover */
  display: flex; /* Centering the icon */
  align-items: center; 
  justify-content: center;
  width: 40px; /* Specific width */
  height: 40px; /* Specific height */
  transition: background-color 0.3s; /* Smooth transition for hover effect */
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
    width: auto; /* Full width of the container */
    object-fit: contain; 
    margin: auto; /* Centers the content if it's smaller than its container */
  }

  .video-container {
    max-height: 50vh;
  }
  
  .project-description {
    position: fixed;
    top: auto;
  }
  .arrow-icon {
    transform: rotate(90deg); /* Rotate the arrow 90 degrees to point down */
  }
}

/* For touch screens with coarse pointers, disable hover effects */
@media (hover: none) or (pointer: coarse) {
  .button:hover {
    background-color: initial;
  }
}
</style>
