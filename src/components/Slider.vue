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
      <div v-if="isVideo(media)" class="video-container">
      <video
        v-if="isVideo(media)"
        :src="media.url"
        :ref="`videoElement-${index}`"
        class="media-item"
        autoplay
        muted="mutedStates[index]"
        loop
        playsinline
      >
        Your browser does not support the video tag.
      </video>
      <button v-if="isVideo(media)" @click="toggleSound(index)" class="sound-toggle">
        <svg viewBox="0 0 48 35.11" fill="#fff" xmlns="http://www.w3.org/2000/svg"><g id="Layer_2" data-name="Layer 2"><g id="Icon"><path d="m20.92.53-10.92 7.02h-6a4 4 0 0 0 -4 4v12a4 4 0 0 0 4 4h6l10.92 7a2 2 0 0 0 3.08-1.66v-30.67a2 2 0 0 0 -3.08-1.69z"/><path d="m31.07 27.46a2 2 0 0 1 0-2.83 10 10 0 0 0 0-14.15 2 2 0 0 1 2.83-2.82 14 14 0 0 1 0 19.8 2 2 0 0 1 -2.83 0z"/><path d="m38.14 34.53a2 2 0 0 1 0-2.83 20 20 0 0 0 0-28.29 2 2 0 0 1 2.86-2.82 24 24 0 0 1 0 33.94 2 2 0 0 1 -2.86 0z"/></g></g></svg>
      </button>
    </div>
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
      mutedStates: {},
      swiper: null,
    };
  },
 
  mounted() {
  this.$nextTick(() => {
    this.initSwiper();
    if (this.swiper) {
      this.attachSwiperListeners();
      this.initMuteStates();
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
    }
  });
},

  toggleSound(index) {
    this.mutedStates[index] = !this.mutedStates[index];
    const videoElement = this.$refs[`videoElement-${index}`][0];
    if (videoElement) {
      videoElement.muted = this.mutedStates[index];
    }
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
    background-color: #ffffff46; /* Button background color */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    z-index: 50;
  }



.sound-toggle {
  margin: auto;
  background-color: #333; /* Dark background */
  border: none; /* No border */
  color: rgb(172, 172, 172); /* White icon */
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

.sound-toggle:hover {
  background-color: #555; /* Slightly lighter on hover */
}

.sound-toggle:active {
  background-color: #ffffff3a; /* Slightly darker when clicked */
  opacity: 0;
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
  
  .project-description {
    position: fixed;
    /* left: 0;
  right: 0; */
    top: auto;
  }
}
</style>
