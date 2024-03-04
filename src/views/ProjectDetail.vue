<!-- freemode -->

<template>
    <div v-if="project" class="project-page">
      <!-- Swiper -->
      <swiper-container class="swiper" 
        :slidesPerView="3"
        :spaceBetween="30"
        :freeMode="true"
        :loop="true" 
        :grid="{
          rows: 2,
          }"
        :mousewheel="true"
        :grabCursor="true">
        <SwiperSlide v-for="(image, index) in project.projectimages" :key="index" class="swiper-slide">
          <img v-if="isImage(image)" :src="image.url" alt="Project Image" class="media-item" />
          <video v-else :src="image.url" class="media-item" autoplay muted loop playsinline>
                  Your browser does not support the video tag.
                </video>
        </SwiperSlide>
        <!-- Pagination -->
    </swiper-container>

    <div class="project-name" @click="toggleDescription">
        <h1>{{ project.projectName }}</h1>
    </div>
 
    <div v-if="showDescription" class="project-description">
        <p>{{ project.projectDescription }}</p>
    </div>



</div>
    <div v-else><Loading /></div>
  </template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { request } from 'graphql-request';
import Loading from '../components/Loading.vue'

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
    const authToken = import.meta.env.VITE_GRAPHQL_AUTH_TOKEN;
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
  color: #000000; /* Adjust text color as needed */
  text-align: center; /* Centers the project name */
  z-index: 900;
  cursor: pointer;
  width: fit-content;
  margin: auto;

}

.project-name h1 {
  background-color: rgba(137, 137, 137, 0.37);
  border-radius: 8px;
  padding: 8px 16px;
  backdrop-filter: blur(10px);
}

.project-name h1:hover {
  background-color: rgba(223, 223, 223, 0.37);
}

.swiper {
  height: 100%;
}

.swiper-container {
  height: 100%;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
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
  max-width: 100%;/* Ensures the content is not wider than its container */
  max-height: 50vh; /* Ensures the content does not exceed the viewport height */
  object-fit: contain; /* Resizes the content to fit within the container while maintaining its aspect ratio */
  margin: auto; /* Centers the content if it's smaller than its container */
}

.project-description {
  position: fixed; 
  left: 0;
  right: 0;
  top:40%;
  margin: auto;
  font-size: 30px;
  color: black; /* Text color */
  max-width: 800px; /* Or any max-width or width you prefer */
  z-index: 1000; /* Ensure it's above other content */
  border-radius: 10px; /* Optional: for rounded corners */
  background-color: rgba(137, 137, 137, 0.37);
  border-radius: 8px;
  padding: 8px 16px;
  backdrop-filter: blur(10px);
  ;

}



</style>
