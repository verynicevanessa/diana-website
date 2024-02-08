<template>
  <div v-if="project">
    <!-- Swiper -->
    <Swiper :modules="modules" class="swiper">
      <SwiperSlide v-for="(image, index) in project.projectimages" :key="index" class="swiper-slide">
        <img :src="image.url" alt="Project Image" />
      </SwiperSlide>
      <!-- Pagination -->
      <div class="swiper-pagination"></div>
    </Swiper>

    <!-- Fixed Project Name at the Bottom -->
    <div class="project-name">
      <h1>{{ project.projectName }}</h1>
    </div>
  </div>
  <div v-else>Loading project details...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { request } from 'graphql-request';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Install modules
SwiperCore.use([Navigation, Pagination]);

const project = ref(null);
const route = useRoute();
const modules = [Pagination];

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

 Swiper.use([Navigation, Pagination]);
  new Swiper('.swiper', {
    modules: [Navigation, Pagination],
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    // Consider adding 'loop: true' for a continuous loop effect
  });
});

</script>

<style scoped>
.images-scroller {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 100px; /* Adjust based on the height of your project name container */
  overflow-x: auto;
  white-space: nowrap; /* Ensures images are in a single line */
  padding: 20px 0; /* Optional: Adds some padding around the images */
}

.image-container {
  display: inline-block;
  width: auto; /* Adjust based on your needs */
  margin-right: 10px; /* Spacing between images */
}

.image-container img {
  width: 100%; /* Makes images responsive within their containers */
  height: auto; /* Maintain aspect ratio */
  vertical-align: bottom; /* Aligns images to the bottom, removing white space below inline-block elements */
}

.project-name {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  color: #fff; /* Adjust text color as needed */
  padding: 20px;
  text-align: center; /* Centers the project name */
}

.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
}

</style>
