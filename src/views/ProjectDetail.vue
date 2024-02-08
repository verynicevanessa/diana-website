<template>
    <div v-if="project" class="project-page">
      <!-- Swiper -->
      <swiper-container class="swiper" 
        :slidesPerView="auto"
        :centeredSlides="true"
        :spaceBetween="30"
        :slides-per-view="1"  
        :loop="true" 
        :mousewheel="true"
        :grabCursor="true">
        <swiper-slide v-for="(image, index) in project.projectimages" :key="index" class="swiper-slide">
          <img v-if="isImage(image)" :src="image.url" alt="Project Image" class="media-item"/>
          <video v-else :src="image.url" class="media-item" autoplay muted loop>
                  Your browser does not support the video tag.
                </video>
        </swiper-slide>
        <!-- Pagination -->
    </swiper-container>

    <div class="project-name" @click="toggleDescription">
        <h1>{{ project.projectName }}</h1>
    </div>
 
    <div v-if="showDescription" class="project-description">
        <p>{{ project.projectDescription }}</p>
    </div>



</div>
    <div v-else>Loading project details...</div>
  </template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { request } from 'graphql-request';

import { register } from 'swiper/element/bundle';
// Install modules
register();


const project = ref(null);
const route = useRoute();

const isImage = (media) => {
  if (!media || !media.url) return false; // Check if media or media.url is undefined/null
  return media.mimeType.startsWith('image/');
};

const showDescription = ref(false); // Initially, the description is not shown

const toggleDescription = () => {
  showDescription.value = !showDescription.value;
};


onMounted(async () => {
  try {
    const projectSlug = route.params.projectSlug; 
    const authToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MDczMjUzMDEsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEtc2hhcmVkLXVzZWExLTAyLmh5Z3JhcGguY29tL3YyL2Nsczh6ZHl6NzFqaDMwMXczOWp4enZjOWsvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtdXMtZWFzdC0xLXNoYXJlZC11c2VhMS0wMi5oeWdyYXBoLmNvbS8iLCJzdWIiOiI3ZDE0ZmI3NC01MGZhLTRkYTMtODMwMi00ZTBjYzIyODk5ZjciLCJqdGkiOiJjbHNjMWVobXQwMWdxMDFscTk0ZHNjOXBzIn0.TstUbA1fSKAzEGxJLofSbJe1PPSdiVl9s6lJMzhhHLSjxo-mCRp0_7j7sZuBjrKamNge_42qwl4omSngbiuloNirqolmC8c6QtFncBobjTYPblYRQqvQGE9ogHd5ZkLLJlXQEllcB-yoehxZB7vDCLFAt-t_b6y4rAnqIZqlA5scAF5hQJvgJYEmV4fm5aeUC3WE2PsG038umlGvoVt46Jr1xsbKQScgotO1EkRsusbSDwez8nr-u3RznKFBwLayJe8jxj0UbJXrvHaSdPNbog6j1xo6Y_6Gfv_qm9V-pVRfX-55XONj-Mag4Lrge_G9rw3t53E26UigxiwDpZtS8xiW_bdDCZDUp3l3z7TqTeOf996hHixz9Sp9mpreJw2b0bb2q9_uSBemCzZ6nJAzZma7Q_RCi9WP8rZS-TWKmp8P4nJ0qvibk57XtNfQiDnHQt5RWACS6LIrQT7hFLkj_NWvEUO1E_zAtiaUlEIVduTRQ355oCEtL-fs82iq6vELbXVnntX8zL6Q0iTwfJt7Iw_HE41dK7AOYjxIwBskUNk4O2QrmBWhfgpQd4AzpOiVvgLBbOo7nT3OT9JW7NnKE1IwPCygX_ZMnxvPSkoRLeOWqBkzLBgfOx81Y4WvpeaQ2uCEHQVsgoFwV8vNSWB6iXamCBaf7AC6MtEo3xYkcl0';
    const query = `
    query ProjectBySlug($slug: String!) {
        project(where: {projectSlug: $slug}) {
            id
            projectName
            projectDescription
            heroImage {
                url
                mimeType
            }
            projectSlug
            projectimages {
                url
                mimeType
            }
        }
    }`;
    const variables = { slug: projectSlug };
    const response = await request('https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cls8zdyz71jh301w39jxzvc9k/master', query, variables, {
      Authorization: `Bearer ${authToken}`,
    });
   
    // Directly assign the project from the response, assuming your query correctly fetches a single project
    if (response.project) {
      project.value = response.project;
    } else {
      console.error('Project not found');
    }
  } catch (error) {
    console.error('Error fetching project:', error);
  }
});

</script>




<style scoped>
.project-page {
    width: 100vw;
    height: 100vh;
}
.project-name {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  color: #fff; /* Adjust text color as needed */
  padding: 20px;
  text-align: center; /* Centers the project name */
  z-index: 900;
  cursor: pointer;
}

.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  overflow-x: scroll;
  overflow-y: hidden;
  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
} 
/*.swiper-slide img {
    display: block;
  width: 100%;
  height: 100%; /* Set height to fill the full height of the swiper container 
  object-fit: contain; /* Scale the image down proportionally to fit within the container 
  margin: 0 auto; /* Center the image horizontally 
}*/

.swiper-slide img, .swiper-slide video {
  max-width: 100%; /* Ensures the content is not wider than its container */
  max-height: 100vh; /* Ensures the content does not exceed the viewport height */
  object-fit: contain; /* Resizes the content to fit within the container while maintaining its aspect ratio */
  margin: auto; /* Centers the content if it's smaller than its container */
}

.project-description {
  position: fixed; /* or absolute, depending on your layout */
  top: 20%; /* Adjust based on your layout */
  left: 0;
  right: 0;
  margin: auto;
  background-color: white; /* Choose a background color that fits your theme */
  color: black; /* Text color */
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1); /* Optional: adds a subtle shadow */
  max-width: 600px; /* Or any max-width or width you prefer */
  z-index: 1000; /* Ensure it's above other content */
  border-radius: 10px; /* Optional: for rounded corners */
}


</style>
