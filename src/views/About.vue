<script setup>
 import CablesPatch from '@/components/CablesPatch.vue'
  import Footer from '@/components/Footer.vue';
  import FixedElement from '@/components/FixedElement.vue';
  import { fetchAbout, fetchAboutBlocks } from '@/api/api.js';
  </script>

<template>
  <section id="about-page">
    
    <div v-if="loading"></div>
    <div v-else-if="aboutInfo">
      <div class="canvasContainer">
      <CablesPatch
      patchDir="/patch_diiana_selfie/"
      :patchOptions="{ glCanvasResizeToWindow: true }"
      />
      </div>
      <!-- <video src="/dianafrosted_0430_02.mp4" autoplay loop muted playsinline class="about-logo" aria-hidden="true"></video> -->
      <FixedElement>
      <img src="/DLW-Visual-Re.png" class="about-logo">
      </FixedElement>
      
      <h1 v-html="aboutInfo.aboutText.html"></h1>
      
      
      <img v-if="aboutInfo.aboutimage" :src="aboutInfo.aboutimage.url" alt="About Image" class="about-image">
  
      <!-- <div class="section" v-for="(section, index) in ['publishedTitle','published', 'published', 'clients', 'previously_at', 'contact']" :key="index">

        <h2 class="about-title">{{ section.toUpperCase().replace("_", " ") }}</h2>
        <div v-html="aboutInfo[section].html" class="about-links"></div> -->

        <div v-for="(block, index) in aboutBlocks" :key="index" class="section">
        <h2 class="about-title">{{ block.abouttitle }}</h2>
        <div v-html="block.aboutblock.html" class="about-links"></div>
      </div>

     
    </div>
  </section>
  <Footer />
</template>

<script>
 
 export default {
  components: {
    CablesPatch,
    Footer,
    FixedElement
  },
  data() {
    return {
      aboutInfo: null,
      aboutBlocks: [], // Initialize aboutBlocks as an empty array
      loading: true,
    };
  },
  async mounted() {
    this.loading = true;
    await this.getAboutInfo();
    await this.getAboutBlocks();
    this.loading = false;

    // Disable the logo when the component mounts
    const logo = document.querySelector('.logo');
    if (logo) {
      logo.style.display = 'none'; // Hide the logo
    }
    const footerimg = document.querySelector('.footer-image');
    if (footerimg) {
      footerimg.style.display = 'none'; // Hide the logo
    }
    document.body.style.backgroundColor = '#bdc4cb';
    document.body.style.backgroundColor = '#fff';
  },
  beforeUnmount() {
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
  },
  methods: {
    async getAboutInfo() {
      try {
        const response = await fetchAbout();
        console.log('About Info:', response); // Debug: Log the response
        this.aboutInfo = response;
      } catch (error) {
        console.error('Error fetching about info:', error);
      }
    },
    async getAboutBlocks() {
      try {
        const response = await fetchAboutBlocks();
        console.log('About Blocks:', response); // Debug: Log the response
        this.aboutBlocks = response;
      } catch (error) {
        console.error('Error fetching about blocks:', error);
      }
    },
  },
};
</script>




<style scoped>
#about-page {
    padding: 3em;
    max-width: 1440px; /* Adjust this value to your desired maximum width */
    margin: 0 auto;
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

.about-logo {
  width: 50vw;
  height: auto;
  pointer-events: none;
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

.canvasContainer{
  margin: -3em;
  min-height: 300px;
  overflow: hidden;
  margin-bottom: -3em;
  cursor: inherit;
}

#glcanvas{
  position: relative;
  transform: translate(-50%,0);
  left: 50%;
  height: 90vh !important;
  width: auto;
  cursor: inherit !important;
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
  
    #about-page {
        margin-top: 10%;
    }

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

</style>