<template>
    <div v-if="project">
      <h1>{{ project.projectName }}</h1>
      <p>{{ project.projectDescription }}</p>

      <div v-if="project.projectimages.length > 0">
      <h2>Project Images</h2>
      <div v-for="(image, index) in project.projectimages" :key="index">
        <img :src="image.url" alt="Project Image" />
      </div>
    </div>
    <div v-else>
      <p>No images available for this project.</p>
    </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </template>
<script setup>
import { ref, onMounted } from 'vue';
import { request } from 'graphql-request';
import { useRoute } from 'vue-router'; 

const project = ref(null);
const route = useRoute();

onMounted(async () => {
  try {
   // const projectSlug = route.params.projectSlug; 
   const projectBySlug = response.project;

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
        }

    `;
    const variables = { slug: projectSlug };
    const response = await request('https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cls8zdyz71jh301w39jxzvc9k/master', query, { slug: projectSlug }, {
      Authorization: `Bearer ${authToken}`,
    });
    // Filter projects to find the one with the specified slug
    const projectBySlug = response.projects.find(project => project.projectSlug === projectSlug);
    if (projectBySlug) {
      project.value = projectBySlug;
    } else {
      console.error('Project not found');
    }
  } catch (error) {
    console.error('Error fetching project:', error);
  }
});
</script>