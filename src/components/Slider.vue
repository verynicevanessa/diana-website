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
      <template v-if="isAboutLink(media)">
        <div @click="toggleDescription(media.description)" class="about-card">
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
      </template>
      <template v-else>
        <img
          v-if="isImage(media)"
          :src="media.url"
          alt="Project Image"
          class="media-item"
          @load="onImageLoad"
        />
        <div v-else-if="isVideo(media)" class="video-container">
          <video
            :src="media.url"
            :ref="`videoElement-${index}`"
            class="media-item"
            autoplay
            loop
            playsinline
            muted
            @loadedmetadata="checkForAudioTrack(index)"
            @loadeddata="checkForAudioTrack(index)"
          >
            Your browser does not support the video tag.
          </video>
          <button v-if="hasAudioTrack[index]" @click="toggleSound(index)" class="sound-toggle">
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
      required: true,
    },
  },
  data() {
    return {
      mutedStates: [], // Initializing muted states for videos
      buttonImageStates: [], // Initializing button image states for videos
      buttonImages: [],
      hasAudioTrack: this.images.map(() => false),
      swiper: null,
      imagesLoaded: false, // Track if images are loaded
    };
  },
  mounted() {
    this.preloadIcons();
    this.$nextTick(() => {
      this.initSwiper();
      this.waitForVideosToLoad();
    });
  },
  methods: {
    async preloadIcons() {
      const soundOnSrc = (await import('@/assets/DLW-Sound-On.svg')).default;
      const soundOffSrc = (await import('@/assets/DLW-Sound-Off.svg')).default;

      this.buttonImages = this.images.map(() => soundOffSrc);
      this.buttonImageStates = this.images.map(() => false);

      // Preload icons
      new Image().src = soundOnSrc;
      new Image().src = soundOffSrc;
    },
    initSwiper() {
      this.swiper = this.$refs.projectSwiper.swiper;
      if (this.swiper) {
        this.attachSwiperListeners();
        this.initMuteStates();
        this.muteAllVideos();
      }
      this.initButtonImages();
    },
    attachSwiperListeners() {
      if (this.swiper) {
        this.swiper.on('breakpoint', () => {
          this.$forceUpdate();
        });
      }
    },
    isAboutLink(media) {
      return media.type === "link";
    },
    isImage(media) {
      return media.mimeType.startsWith("image/");
    },
    isVideo(media) {
      return media.mimeType.startsWith("video/");
    },
    toggleDescription(description) {
      this.$emit("toggle-description", description);
    },
    initMuteStates() {
      this.images.forEach((item, index) => {
        if (this.isVideo(item)) {
          this.mutedStates[index] = true;
          this.buttonImageStates[index] = false;
          this.hasAudioTrack[index] = false;
        }
      });
    },
    toggleSound(index) {
      this.mutedStates[index] = !this.mutedStates[index];
      this.buttonImageStates[index] = !this.buttonImageStates[index];
      this.updateButtonImage(index);
      this.$nextTick(() => {
        const videoElement = this.$refs[`videoElement-${index}`][0]; // Ensure we get the correct element
        if (videoElement) {
          videoElement.muted = this.mutedStates[index];
          if (!videoElement.muted) {
            videoElement.play().catch((e) => {
              this.mutedStates[index] = true;
              this.buttonImageStates[index] = false;
              this.updateButtonImage(index);
            });
          }
        }
      });
    },
    muteAllVideos() {
      this.$nextTick(() => {
        this.images.forEach((item, index) => {
          if (this.isVideo(item)) {
            const videoElement = this.$refs[`videoElement-${index}`][0]; // Ensure we get the correct element
            if (videoElement) {
              videoElement.muted = true;
              this.mutedStates[index] = true;
              this.buttonImageStates[index] = false;
            }
          }
        });
      });
    },
    onSlideChange() {
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
      const soundOnSrc = (await import("@/assets/DLW-Sound-On.svg")).default;
      const soundOffSrc = (await import("@/assets/DLW-Sound-Off.svg")).default;
      return this.buttonImageStates[index] ? soundOnSrc : soundOffSrc;
    },
    async updateButtonImage(index) {
      this.buttonImages[index] = await this.getButtonImageSrc(index);
    },
    waitForVideosToLoad() {
      this.images.forEach((item, index) => {
        if (this.isVideo(item)) {
          const videoElement = this.$refs[`videoElement-${index}`][0]; // Ensure we get the correct element
          if (videoElement) {
            videoElement.onloadedmetadata = () => {
              this.checkForAudioTrack(index);
            };
            videoElement.onloadeddata = () => {
              this.checkForAudioTrack(index);
            };
          } else {
            console.error(`Video element not found for index: ${index}`);
          }
        }
      });
    },
    checkForAudioTrack(index) {
      this.$nextTick(() => {
        const videoElement = this.$refs[`videoElement-${index}`][0]; // Ensure we get the correct element
        console.log(`Checking audio for video index: ${index}`, videoElement);

        if (videoElement && videoElement instanceof HTMLMediaElement) {
          const hasAudio =
            videoElement.mozHasAudio ||
            Boolean(videoElement.webkitAudioDecodedByteCount) ||
            (videoElement.audioTracks && videoElement.audioTracks.length > 0);

          console.log(`Has audio: ${hasAudio}`);
          this.hasAudioTrack[index] = hasAudio;
          this.$forceUpdate();
        } else {
          console.error("Video element not found or not a media element for index: " + index);
        }
      });
    },
    resetSwiper() {
      if (this.swiper) {
        this.swiper.slideTo(0, 0); // Reset to the first slide without transition
      }
    },
    onImageLoad() {
      this.imagesLoaded = true;
      if (this.swiper) {
        this.swiper.update(); // Update swiper after image load
      }
    },
  },
  watch: {
    images() {
      this.$nextTick(() => {
        if (this.swiper) {
          this.swiper.update();
          this.muteAllVideos(); // Ensure all videos are muted after update
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
  height: 94vh;
  margin: auto 0;
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

.video-container {
  position: relative;
}

.sound-toggle {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  z-index: 50;
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
  background: #d9d9d91a;
  border-radius: 87px;
  height: 35px;
  left: 50%;
  position: absolute;
  transform: translate(-50%);
  width: 35px;
}

.sound-toggle img {
  width: 15px;
  height: 15px;
  mix-blend-mode: difference;
  margin: auto;
  opacity: 0.5;
}

.about-card {
  text-align: center;
  font-size: 50px;
  max-width: 100%;
  padding: 10vw;
  line-height: 1;
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
    margin: auto;
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
    opacity: 1;
  }

  .video-container {
    position: relative;
    width: 100%;
  }

  .sound-toggle {
    position: absolute;
    bottom: 80px;
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
