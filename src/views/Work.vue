<template>
    <div class="masonry">
      <div class="project" v-for="project in projects" :key="project.id">
        
        <router-link :to="{ name: 'ProjectDetail', params: { projectSlug: project.projectSlug } }">
          <div class="project-wrapper">
            <div class="media-wrapper" @mouseover="setHovered(project.id)" @mouseleave="clearHovered()">
              <div v-if="project.heroImage">
                <img v-if="isImage(project.heroImage)" :src="project.heroImage.url" alt="Project Hero Image" class="media-item" :class="{ 'blurred': isHovered(project.id) }">
                <video v-else :src="project.heroImage.url" class="media-item" autoplay muted loop :class="{ 'blurred': isHovered(project.id) }">
                  Your browser does not support the video tag.
                </video>
              </div>
             
              <div class="project-name">{{ project.projectName }}</div>

            </div>
          </div>
        </router-link>
      </div>
    </div>
  </template>

<script>
  import { ref, computed } from 'vue';
  import { request } from 'graphql-request';
  import VueMasonryCss from 'vue-masonry-css'



export default {
    data() {
      return {
        projects: [],
        hovered: null // Define hovered variable
      };
    },
    created() {
      this.fetchProjects();
    },
    methods: {
      async fetchProjects() {
        try {
          const authToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MDczMjUzMDEsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEtc2hhcmVkLXVzZWExLTAyLmh5Z3JhcGguY29tL3YyL2Nsczh6ZHl6NzFqaDMwMXczOWp4enZjOWsvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtdXMtZWFzdC0xLXNoYXJlZC11c2VhMS0wMi5oeWdyYXBoLmNvbS8iLCJzdWIiOiI3ZDE0ZmI3NC01MGZhLTRkYTMtODMwMi00ZTBjYzIyODk5ZjciLCJqdGkiOiJjbHNjMWVobXQwMWdxMDFscTk0ZHNjOXBzIn0.TstUbA1fSKAzEGxJLofSbJe1PPSdiVl9s6lJMzhhHLSjxo-mCRp0_7j7sZuBjrKamNge_42qwl4omSngbiuloNirqolmC8c6QtFncBobjTYPblYRQqvQGE9ogHd5ZkLLJlXQEllcB-yoehxZB7vDCLFAt-t_b6y4rAnqIZqlA5scAF5hQJvgJYEmV4fm5aeUC3WE2PsG038umlGvoVt46Jr1xsbKQScgotO1EkRsusbSDwez8nr-u3RznKFBwLayJe8jxj0UbJXrvHaSdPNbog6j1xo6Y_6Gfv_qm9V-pVRfX-55XONj-Mag4Lrge_G9rw3t53E26UigxiwDpZtS8xiW_bdDCZDUp3l3z7TqTeOf996hHixz9Sp9mpreJw2b0bb2q9_uSBemCzZ6nJAzZma7Q_RCi9WP8rZS-TWKmp8P4nJ0qvibk57XtNfQiDnHQt5RWACS6LIrQT7hFLkj_NWvEUO1E_zAtiaUlEIVduTRQ355oCEtL-fs82iq6vELbXVnntX8zL6Q0iTwfJt7Iw_HE41dK7AOYjxIwBskUNk4O2QrmBWhfgpQd4AzpOiVvgLBbOo7nT3OT9JW7NnKE1IwPCygX_ZMnxvPSkoRLeOWqBkzLBgfOx81Y4WvpeaQ2uCEHQVsgoFwV8vNSWB6iXamCBaf7AC6MtEo3xYkcl0';
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
                    projectimages {
                        url
                    }
                }
            }
          `;
          
          const response = await request('https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cls8zdyz71jh301w39jxzvc9k/master', query, null, {
            Authorization: `Bearer ${authToken}`,
          });
  
          // Extract the data from the response and update the recipes array
          this.projects = response.projects;
        } catch (error) {
          console.error('Error fetching project:', error);
        }
      },
      isImage(media) {
      if (!media.url) return false; // If there's no URL, it's not an image
      return media.mimeType.startsWith('image/'); // Check if the MIME type starts with 'image/'
    },
    setHovered(id) {
      this.hovered = id;
    },
    clearHovered() {
      this.hovered = null;
    },
    isHovered(id) {
      return this.hovered === id;
    }
  }
};


</script>

<style scoped>
 .masonry {
    column-count: 3;
    gap: 20px;
    row-gap: 20px;
    margin: 20px;
  }

  .project-wrapper {
    position: relative;
    overflow: hidden; /* Hide overflow for consistent layout */
    margin-bottom: 20px; /* Add vertical gap between projects */
    padding: 10%;
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