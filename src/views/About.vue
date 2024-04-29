<script setup>
  import CablesPatch from '@/components/CablesPatch.vue'
  import { request } from 'graphql-request';
  import Footer from '@/components/Footer.vue';
</script>

<template>
  <section id="about-page">
    <div v-if="loading">Loading...</div>
    <div v-else-if="aboutInfo">
      <!-- <video src="/Diana_FrozenGlow.webm" autoplay loop muted playsinline class="about-logo" aria-hidden="true"></video> -->
      <img src="/DLW_Visual-White.svg" class="about-logo">
      <h1 v-html="aboutInfo.aboutText.html"></h1>
      <!-- <img v-if="aboutInfo.aboutimage" :src="aboutInfo.aboutimage.url" alt="About Image" class="about-image"> -->
      <div class="canvasContainer">
      <CablesPatch
      patchDir="/patch_3D_scan/"
      :patchOptions="{ glCanvasResizeToWindow: true }"
      />
      </div>
      <div class="section" v-for="(section, index) in ['published', 'clients', 'previouslyAt', 'contact']" :key="index">
        <h2 class="about-title">{{ section.toUpperCase() }}</h2>
        <div v-html="aboutInfo[section].html" class="about-links"></div>
      </div>
    </div>
    <Footer />
  </section>
</template>

<script>
export default {
  data() {
    return {
        aboutInfo: null, // Initialize aboutInfo
        richtextContent: '',
        loading: true,
    };
  },
  created() {
    this.fetchAbout();
  },

  mounted() {
  // Disable the logo when the component mounts
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.style.display = 'none'; // Hide the logo
  }
  const footerimg = document.querySelector('.footer-image');
  // if (footerimg) {
  //   footerimg.style.display = 'none'; // Hide the logo
  // }
  document.body.style.backgroundColor = '#bdc4cb';
},

beforeUnmount() {
  // Reset the logo visibility when the component is about to be destroyed
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.style.display = ''; // Remove the inline style to reset its visibility
  }
  // const footerimg = document.querySelector('.footer-image');
  // if (footerimg) {
  //   footerimg.style.display = ''; // Hide the logo
  // }
  document.body.style.backgroundColor = ''; 
},


  methods: {
    async fetchAbout() {
      try {
        const authToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MDczMjUzMDEsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEtc2hhcmVkLXVzZWExLTAyLmh5Z3JhcGguY29tL3YyL2Nsczh6ZHl6NzFqaDMwMXczOWp4enZjOWsvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtdXMtZWFzdC0xLXNoYXJlZC11c2VhMS0wMi5oeWdyYXBoLmNvbS8iLCJzdWIiOiI3ZDE0ZmI3NC01MGZhLTRkYTMtODMwMi00ZTBjYzIyODk5ZjciLCJqdGkiOiJjbHNjMWVobXQwMWdxMDFscTk0ZHNjOXBzIn0.TstUbA1fSKAzEGxJLofSbJe1PPSdiVl9s6lJMzhhHLSjxo-mCRp0_7j7sZuBjrKamNge_42qwl4omSngbiuloNirqolmC8c6QtFncBobjTYPblYRQqvQGE9ogHd5ZkLLJlXQEllcB-yoehxZB7vDCLFAt-t_b6y4rAnqIZqlA5scAF5hQJvgJYEmV4fm5aeUC3WE2PsG038umlGvoVt46Jr1xsbKQScgotO1EkRsusbSDwez8nr-u3RznKFBwLayJe8jxj0UbJXrvHaSdPNbog6j1xo6Y_6Gfv_qm9V-pVRfX-55XONj-Mag4Lrge_G9rw3t53E26UigxiwDpZtS8xiW_bdDCZDUp3l3z7TqTeOf996hHixz9Sp9mpreJw2b0bb2q9_uSBemCzZ6nJAzZma7Q_RCi9WP8rZS-TWKmp8P4nJ0qvibk57XtNfQiDnHQt5RWACS6LIrQT7hFLkj_NWvEUO1E_zAtiaUlEIVduTRQ355oCEtL-fs82iq6vELbXVnntX8zL6Q0iTwfJt7Iw_HE41dK7AOYjxIwBskUNk4O2QrmBWhfgpQd4AzpOiVvgLBbOo7nT3OT9JW7NnKE1IwPCygX_ZMnxvPSkoRLeOWqBkzLBgfOx81Y4WvpeaQ2uCEHQVsgoFwV8vNSWB6iXamCBaf7AC6MtEo3xYkcl0';
        const query = `
        query GetFirstAbout {
            abouts(first: 1) {
              aboutText {
                html
                text
              }
              published {
                html
                text
              }
              aboutimage {
                url
              }
              clients {
                html
                text
              }
              previouslyAt {
                html
                text
              }
              contact {
                html
                text
              }

            }
          }
        `;
        
        const response = await request('https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cls8zdyz71jh301w39jxzvc9k/master', query, null, {
          Authorization: `Bearer ${authToken}`,
        });

        this.aboutInfo = response.abouts[0]; 
        this.loading = false;
      } catch (error) {
        console.error('Error fetching about info:', error);
        this.loading = false;
      }
    },
  },
  components: { Footer }
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
    margin-top: 40%;
    box-sizing: border-box;
}

h1 {
  text-align: center;
  font-family: GreedTRIAL-SemiBold;
  z-index: 100;
  font-weight: 400;
  font-size: clamp(32px, 5vw, 70px);
  /* text-shadow: 0 0 0.0125em rgb(235,235,235), 0.00625em 0 0.0125em white, 0.00625em 0.00625em 0.0125em white, -0.00625em 0 0.0125em white, -0.00625em -0.00625em 0.0125em white, 0px 0px 0.1em rgb(0, 0, 0), 0px 0px 0.25em rgba(0,0,255,.1), 0px 0.0125em 0.025em rgba(255,0,235,.5); */
  filter: blur(0.01em) saturate(2);
  
}

.about-logo {
  width: 80%; 
  height: auto; 
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* min-width: 100%; 
  min-height: 100%;  */
  z-index: -1;
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
  position: relative;
}

#glcanvas{
  width: 100%;
  height: 100%;
  z-index: 0;
}

@media (max-width: 768px) {
    #about-page {
        padding: 5em;
        margin-top: 10%;
    }

    .about-title {
        margin-top: 1em;
    }
    h1 {
    font-size: 20px;
  }  
}

</style>