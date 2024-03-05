<script>
import { ref, onMounted } from 'vue';
import { request } from 'graphql-request'; // Ensure this is correctly imported
import Footer from '../components/Footer.vue';

export default {
  components: { Footer },
  setup() {
    const projects = ref([]);
    const hovered = ref(null);
    const isLoading = ref(true); 

    // Method to fetch projects
    const fetchProjects = async () => {
      try {
        const authToken = import.meta.env.VITE_GRAPHQL_AUTH_TOKEN 
        const query = `
          query Projects {
            projects(first: 15) {
              id
              projectName
              projectDescription
              heroImage {
                url
                mimeType
              }
              projectSlug
            }
          }`;
        const response = await request('https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cls8zdyz71jh301w39jxzvc9k/master', query, null, {
          Authorization: `Bearer ${authToken}`,
        });
        projects.value = response.projects;
        isLoading.value = false;
      } catch (error) {
        console.error('Error fetching projects:', error);
        isLoading.value = false;
      }
    };

    // Called immediately after the component is mounted
    onMounted(() => {
      fetchProjects();
    });

    // Method to check if the media is an image
    const isImage = (media) => {
      return media && media.url && media.mimeType.startsWith('image/');
    };

    // Method to check if the media is a video
    const isVideo = (media) => {
      return media && media.url && media.mimeType.startsWith('video/');
    };

    // Method to get transformed image URL
    const getTransformedImageUrl = (url, mimeType) => {
  if (mimeType.startsWith('image/')) {
    // Apply your image transformation logic here
    return `${url}?resize=width:800,fit:clip`; // Example transformation
  }
  return url; // Return the original URL for non-image types or if no transformation is needed
};

    // Hover state methods
    const setHovered = (id) => {
      hovered.value = id;
    };
    const clearHovered = () => {
      hovered.value = null;
    };
    const isHovered = (id) => {
      return hovered.value === id;
    };

    // Expose to template
    return {
      projects,
      hovered,
      isImage,
      isVideo,
      getTransformedImageUrl,
      setHovered,
      clearHovered,
      isHovered,
    };
  },
};
</script>


<template>
  <div v-if="isLoading" class="loader">Loading projects...</div>
  <div class="masonry" v-cloak>
    <div class="project" v-for="project in projects" :key="project.id">
      
      <router-link  :to="{ name: 'ProjectDetail', params: { projectSlug: project.projectSlug } }">
        <div class="project-wrapper">
          <div class="media-wrapper" @mouseover="setHovered(project.id)" @mouseleave="clearHovered()">
            <div v-if="project.heroImage">
              <img v-if="isImage(project.heroImage)" :src="getTransformedImageUrl(project.heroImage.url, project.heroImage.mimeType)" alt="Project Hero Image" class="media-item" :class="{ 'blurred': isHovered(project.id) }">

              <video v-else :src="project.heroImage.url" class="media-item" autoplay muted loop playsinline :class="{ 'blurred': isHovered(project.id) }">
                Your browser does not support the video tag.
              </video>
            </div>
           
            <div class="project-name">{{ project.projectName }}</div>

          </div>
        </div>
      </router-link>
    </div>
  </div>
  <Footer v-if="!isLoading"></Footer>
</template>


<style scoped>
 .masonry {
    column-count: 3;
    gap: 10px;
    row-gap: 10px;
    margin: 10px;
  }

  .project-wrapper {
    position: relative;
    overflow: hidden; /* Hide overflow for consistent layout */
    margin-bottom: 10px; /* Add vertical gap between projects */
    
  }



  .media-item {
    width: 100%;
    height: auto;
    display: block; /* Ensure the image/video takes up the full width of its container */
    transition: filter 0.3s ease; /* Apply transition effect to the filter property */
  }

  .blurred {
    filter: blur(20px); /* Apply the blur effect when the item is hovered */
  }

  .project-name {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    padding: 10px;
    font-size: 4rem;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    background-blend-mode: difference;
  }

  .project-wrapper:hover .project-name {
    opacity: 1;
  }

@media (min-width: 1000px) {
  .masonry-grid {
    grid-template-columns: repeat(3, 1fr); /* Three items per row */
  }
}
@media (max-width: 768px) {
  .masonry {
    column-count: 2; /* Switch to two columns for screens up to 768px */
  }
}

/* Adjust column count for even smaller screens */
@media (max-width: 480px) {
  .masonry {
    column-count: 1; /* Switch to one column for screens up to 480px */
  }
}
</style>