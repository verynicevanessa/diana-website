
<script>
import { request } from 'graphql-request';
import Footer from '../components/Footer.vue'

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
},
beforeUnmount() {
  // Reset the logo visibility when the component is about to be destroyed
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.style.display = ''; // Remove the inline style to reset its visibility
  }
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

<template>
  <div id="about-page">
    <div v-if="loading">Loading...</div>
    <div v-else-if="aboutInfo">
      <!-- Display aboutText as HTML -->
      <img src="/DWLogo.png" class="about-logo">
      <h1 v-html="aboutInfo.aboutText.html" ></h1>
      <img v-if="aboutInfo.aboutimage" :src="aboutInfo.aboutimage.url" alt="About Image" class="about-image">
      <p class="about-title">Published</p><div v-html="aboutInfo.published.html" class="about-links"></div>
      <p class="about-title">CLIENTS</p><div v-html="aboutInfo.clients.html" class="about-links"></div>
      <p class="about-title">PREVIOUSLY AT</p><div v-html="aboutInfo.previouslyAt.html" class="about-links"></div>
      <p class="about-title">CONTACT</p><div v-html="aboutInfo.contact.html" class="about-links contact"></div>

      <!-- Display other fields as needed -->
      
    </div>
    <div v-else>Error loading About page content.</div>
  </div>
  <Footer />
</template>


<style scoped>
#about-page {
    padding: 5em;
    max-width: 1200px; /* Adjust this value to your desired maximum width */
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 100;
    margin-top: 20%;
}

h1 {
  text-align: center;
  font-size: 50px;
  z-index: 100;
  font-weight: 400;
  font-size: clamp(20px, 5vw, 50px);
}

.about-logo {
  width: 80%;
  max-width: 800px; 
  position: fixed;
  z-index: -1;
  margin: auto;
  left: 0;
  right:0;
  top:0;
  bottom: 0;
}


.about-title {
  font-size: clamp(12px, 2vw, 16px);
  margin-top: clamp(20px, 10vw, 200px);
}

.about-image {
  display: block;
  width: 100%;
  margin: 10em auto;
  max-width: 400px;
}

.about-links {
  font-size: clamp(18px, 3vw, 32px);
  text-decoration: none;
  width: 50%;
  flex-direction: column;

}
.contact {
  line-height: 1.5;
}

@media (max-width: 768px) {
  #about-page {
    padding: 1em;
  }

  h1 {
    font-size: 20px;
  }  
}

</style>