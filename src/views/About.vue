<template>
    <div id="about-page">
      <div v-if="loading">Loading...</div>
      <div v-else-if="aboutInfo">
        <!-- Display aboutText as HTML -->
        <h1>{{ aboutInfo.aboutText }}</h1>
        <img v-if="aboutInfo.aboutimage" :src="aboutInfo.aboutimage.url" alt="About Image">
        <div v-html="aboutInfo.clients.html"></div>
        <div v-html="aboutInfo.previouslyAt.html"></div>
        <div v-html="aboutInfo.contact.html"></div>

        <!-- Display other fields as needed -->
      </div>
      <div v-else>Error loading About page content.</div>
    </div>
  </template>
  
<script>
import { request } from 'graphql-request';

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
    // Set the background color when the component mounts
    document.body.style.backgroundColor = 'lightblue';
  },
  beforeUnmount() {
    // Reset the background color when the component is about to be destroyed
    document.body.style.backgroundColor = ''; // Set to your default or previous value
  },

  methods: {
    async fetchAbout() {
      try {
        const authToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MDczMjUzMDEsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEtc2hhcmVkLXVzZWExLTAyLmh5Z3JhcGguY29tL3YyL2Nsczh6ZHl6NzFqaDMwMXczOWp4enZjOWsvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtdXMtZWFzdC0xLXNoYXJlZC11c2VhMS0wMi5oeWdyYXBoLmNvbS8iLCJzdWIiOiI3ZDE0ZmI3NC01MGZhLTRkYTMtODMwMi00ZTBjYzIyODk5ZjciLCJqdGkiOiJjbHNjMWVobXQwMWdxMDFscTk0ZHNjOXBzIn0.TstUbA1fSKAzEGxJLofSbJe1PPSdiVl9s6lJMzhhHLSjxo-mCRp0_7j7sZuBjrKamNge_42qwl4omSngbiuloNirqolmC8c6QtFncBobjTYPblYRQqvQGE9ogHd5ZkLLJlXQEllcB-yoehxZB7vDCLFAt-t_b6y4rAnqIZqlA5scAF5hQJvgJYEmV4fm5aeUC3WE2PsG038umlGvoVt46Jr1xsbKQScgotO1EkRsusbSDwez8nr-u3RznKFBwLayJe8jxj0UbJXrvHaSdPNbog6j1xo6Y_6Gfv_qm9V-pVRfX-55XONj-Mag4Lrge_G9rw3t53E26UigxiwDpZtS8xiW_bdDCZDUp3l3z7TqTeOf996hHixz9Sp9mpreJw2b0bb2q9_uSBemCzZ6nJAzZma7Q_RCi9WP8rZS-TWKmp8P4nJ0qvibk57XtNfQiDnHQt5RWACS6LIrQT7hFLkj_NWvEUO1E_zAtiaUlEIVduTRQ355oCEtL-fs82iq6vELbXVnntX8zL6Q0iTwfJt7Iw_HE41dK7AOYjxIwBskUNk4O2QrmBWhfgpQd4AzpOiVvgLBbOo7nT3OT9JW7NnKE1IwPCygX_ZMnxvPSkoRLeOWqBkzLBgfOx81Y4WvpeaQ2uCEHQVsgoFwV8vNSWB6iXamCBaf7AC6MtEo3xYkcl0';
        const query = `
        query GetFirstAbout {
            abouts(first: 1) {
              aboutText
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
  }
  
};


</script>

<style scoped>
#about-page {
    padding: 5em;
    max-width: 1200px; /* Adjust this value to your desired maximum width */
    margin: 0 auto;
}

h1 {
  text-align: center;
  font-size: 50px;
}

.logo {
  display: none;
}

body {
  background-color: red;
}
</style>