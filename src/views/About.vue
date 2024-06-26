<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import CablesPatch from '@/components/CablesPatch.vue';
import Footer from '@/components/Footer.vue';
import FixedElement from '@/components/FixedElement.vue';
import { fetchAbout, fetchAboutBlocks } from '@/api/api.js';
import loadingMixin from "@/mixins/loadingMixin";
import logger from '@/utils/logger';

const aboutInfo = ref(null);
const aboutBlocks = ref([]);
const loading = ref(true);
const showContent = ref(false);

const getAboutInfo = async () => {
  try {
    const response = await fetchAbout();
    console.log('About Info:', response); // Debug: Log the response
    aboutInfo.value = response;
  } catch (error) {
    console.error('Error fetching about info:', error);
  }
};

const getAboutBlocks = async () => {
  try {
    const response = await fetchAboutBlocks();
    console.log('About Blocks:', response); // Debug: Log the response
    aboutBlocks.value = response;
  } catch (error) {
    console.error('Error fetching about blocks:', error);
  }
};

onMounted(async () => {
  // Verstecke .logo sofort
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.style.display = 'none'; // Hide the logo immediately
  }

  await getAboutInfo();
  await getAboutBlocks();
  loading.value = false;
  showContent.value = true;

  const footerimg = document.querySelector('.footer-image');
  if (footerimg) {
    footerimg.style.display = 'none'; // Hide the footer image
  }
  document.body.style.backgroundColor = '#bdc4cb';
  document.body.style.backgroundColor = '#fff';
});

onBeforeUnmount(() => {
  // Reset the logo visibility when the component is about to be destroyed
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.style.display = ''; // Remove the inline style to reset its visibility
  }
  const footerimg = document.querySelector('.footer-image');
  if (footerimg) {
    footerimg.style.display = ''; // Remove the inline style to reset its visibility
  }
  document.body.style.backgroundColor = '';
});
</script>

<template>
  <section id="about-page">
    <transition name="fade" mode="out-in">
      <div v-if="loading" class="loading">
        <img src="../assets/Menu-Snowflake.png" style="width: 100px;">
      </div>
      <div v-else class="fade-in">
        <div class="canvasContainer">
          <iframe id='scanDiiana' src="/patch_diiana_selfie_iframe/index.html" width="100%" height="600px"></iframe>
        </div>
        <FixedElement v-if="showContent">
          <img src="/DLW-Visual-Re.png" class="about-logo" />
        </FixedElement>

        <h1 v-html="aboutInfo?.aboutText?.html"></h1>

        <img
          v-if="aboutInfo?.aboutimage"
          :src="aboutInfo.aboutimage.url"
          alt="About Image"
          class="about-image"
        />

        <div v-for="(block, index) in aboutBlocks" :key="index" class="section">
          <h2 class="about-title">{{ block.abouttitle }}</h2>
          <div v-html="block.aboutblock.html" class="about-links"></div>
        </div>
      </div>
    </transition>
  </section>
  <Footer />
</template>

<style scoped>
#about-page {
  padding: 3em;
  max-width: 1440px; /* Adjust this value to your desired maximum width */
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 100;
  /* margin-top: 40%; */
  box-sizing: border-box;
}

h1 {
  text-align: center;
  font-family: GreedNarrow-SemiBold;
  z-index: 100;
  font-weight: normal;
  font-size: clamp(50px, 6vw, 70px);
  /* text-shadow: 0 0 0.0125em rgb(235,235,235), 0.00625em 0 0.0125em white, 0.00625em 0.00625em 0.0125em white, -0.00625em 0 0.0125em white, -0.00625em -0.00625em 0.0125em white, 0px 0px 0.1em rgb(0, 0, 0), 0px 0px 0.25em rgba(0,0,255,.1), 0px 0.0125em 0.025em rgba(255,0,235,.5); */
  /* filter: blur(0.01em) saturate(2); */
}

.logo {
  display: none; /* Standardmäßig verstecken */
}

.about-logo {
  width: 50vw;
  height: auto;
  pointer-events: none;
  margin: auto;
}

.about-title {
  font-size: clamp(12px, 2vw, 16px);
  margin-top: clamp(20px, 10vw, 200px);
  font-family: Kommuna Demo;
  src: url(@/assets/kommuna_demo_400_narrow-webfont.woff) format("opentype");
}

.about-image {
  display: block;
  width: 100%;
  margin: 10em auto;
  max-width: 400px;
}

.about-links {
  font-size: clamp(24px, 3vw, 46px);
  text-decoration: none;
  width: 50%;
  flex-direction: column;
  text-transform: uppercase;
}
.contact {
  line-height: 1.5;
}

.canvasContainer {
  margin: -3em;
  min-height: 300px;
  overflow: hidden;
  margin-bottom: -3em;
  cursor: inherit !important;
}

#scanDiiana {
  border: none;
  position: relative;
  transform: translate(-50%, 0);
  left: 50%;
  height: 90vh !important;
  width: 100%;
}

@media (pointer: coarse) {
  /* Styles for touch devices */
  .canvasContainer {
    pointer-events: none;
  }
}


@media (max-width: 768px) {
  .about-logo {
    width: 80vw;
    height: auto;
    pointer-events: none;
  }
  #glcanvas {
    margin-top: -1em;
    height: 80vh !important;
  }

  /* #about-page {
    margin-top: 10%;
  } */

  .footer {
    padding: 0em;
  }
  .about-title {
    margin-top: 1em;
  }
  h1 {
    font-size: 36px;
  }
  .about-links {
    width: 80%;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
}
</style>
