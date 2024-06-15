<script>
import Footer from "../components/Footer.vue";
import useProjectData from "@/mixins/useProjectData";
import Project from "@/components/Project.vue";
import MasonryWall from "@yeger/vue-masonry-wall";

export default {
  mixins: [useProjectData],
  components: { Footer, Project },
  data() {
    return {
      masonryKey: 0,
      showContent: false,
      isLoading: true
    };
  },
  mounted() {
    this.loadProjects();
  },
  methods: {
    loadProjects() {
      // Simulating a load delay for demonstration purposes.
      setTimeout(() => {
        this.showContent = true;
        this.isLoading = false;
      }, 1000); // Adjust the timeout duration as needed.
    },
    onLayout() {
      this.$nextTick(() => {
        this.masonryKey++; // Trigger a re-render
      });
    },
    handleBeforeEnter(el) {
      el.style.opacity = 0;
    },
    handleEnter(el, done) {
      el.style.transition = "opacity 1s";
      el.style.opacity = 1;
      done();
    },
    handleLeave(el, done) {
      el.style.transition = "opacity 1s";
      el.style.opacity = 0;
      setTimeout(() => {
        done();
      }, 1000);
    }
  }
};
</script>

<template>
  <div v-if="isLoading" class="loading"></div>
  <transition
    mode="out-in"
    @before-enter="handleBeforeEnter"
    @enter="handleEnter"
    @leave="handleLeave"
  >
    <div v-if="showContent" :key="masonryKey">
      <MasonryWall
        v-if="sortedByPriotity.length"
        :items="sortedByPriotity"
        :max-columns="3"
        :column-width="200"
        :gap="16"
        @layout="onLayout"
        style="margin-top: 10vh"
      >
        <template #default="{ item, index }">
          <div :key="item.id" class="fade-in">
            <Project :project="item" />
          </div>
        </template>
      </MasonryWall>
      <Footer></Footer>
    </div>
  </transition>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.2s ease-in forwards;
}

.hidden {
  opacity: 0;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
}
</style>
