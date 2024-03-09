<!-- freemode -->
<template>
  <div v-if="project" class="project-page">
    <!-- Swiper -->
    <swiper-container class="swiper" 
      :slidesPerView="2"
      :spaceBetween="30"
      :loop="true" 
      :grid="{
        rows: 2,
      }"
      :mousewheel="true"
      :grabCursor="true"
      :breakpoints="{600:{ slidesPerView:1, rows:1, spaceBetween:30 }, 900:{ slidesPerView:3, spaceBetween:30 } }"
      >
      <SwiperSlide v-for="(image, index) in project.projectimages" :key="index" class="swiper-slide">
        <img v-if="isImage(image)" :src="image.url" alt="Project Image" class="media-item" />
        <video v-else :src="image.url" class="media-item" autoplay muted loop playsinline>
          Your browser does not support the video tag.
        </video>
      </SwiperSlide>
    </swiper-container>

    <!-- Previous and Next buttons -->
    <div  class="project-navigation">
     
    </div>

    <div  class="project-name" >
      <h1 @click="navigateToPreviousProject" class="Previous">PREV</h1>
      <h1 @click="toggleDescription" class="this-project">ABOUT {{ project.projectName }}</h1>
      <h1 @click="navigateToNextProject" class="Next">NEXT</h1>
    </div>
  
    <div v-if="showDescription" class="project-description">
      <p>{{ project.projectDescription }}</p>
    </div>
  </div>

  <div v-else>Loading</div>
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

const navigateToPreviousProject = async () => {
  console.log('Navigating to previous project');
  const allProjects = await fetchAllProjects();
  console.log('All projects:', allProjects);
  const currentIndex = allProjects.findIndex(p => p.id === project.value.id);
  console.log('Current index:', currentIndex);
  if (currentIndex > 0) {
    project.value = allProjects[currentIndex - 1];
  } else {
    console.log('No previous project found, looping to last project');
    project.value = allProjects[allProjects.length - 1];
  }
};

const navigateToNextProject = async () => {
  // Assuming you have a list of all projects and the current project's index in that list
  const allProjects = await fetchAllProjects(); // You need to implement this function
  const currentIndex = allProjects.findIndex(p => p.id === project.value.id);
  if (currentIndex < allProjects.length - 1) {
    project.value = allProjects[currentIndex + 1];
  } else {
    // If there's no next project, you can loop back to the first project
    project.value = allProjects[0];
  }
};

const fetchAllProjects = async () => {
  try {
    // Fetch all projects from your GraphQL endpoint
    const authToken = import.meta.env.VITE_GRAPHQL_AUTH_TOKEN;
    const query = `
      query AllProjects {
        projects {
          id
          projectName
          projectDescription
          heroImage {
            url
            mimeType
          }
          projectSlug
          projectimages(first: 500) {
            url
            mimeType
          }
        }
      }`;
    const response = await request('https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cls8zdyz71jh301w39jxzvc9k/master', query, null, {
      Authorization: `Bearer ${authToken}`,
    });
   
    return response.projects;
  } catch (error) {
    console.error('Error fetching all projects:', error);
    return [];
  }
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
            projectimages(first: 500) {
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
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 500;
}

.this-project {
  flex: 1; /* Take up remaining space */
  text-align: center;
  background-color: rgba(137, 137, 137, 0.37);
  border-radius: 8px;
  padding: 8px 16px;
  backdrop-filter: blur(10px);
  cursor: pointer;
}

.previous, .next {
  background-color: rgba(137, 137, 137, 0.37);
  border-radius: 8px;
  padding: 8px 16px;
  backdrop-filter: blur(10px);
  cursor: pointer;
}

.previous:hover, .next:hover {
  background-color: rgba(223, 223, 223, 0.37);
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
