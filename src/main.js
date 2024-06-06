import "./assets/main.css";
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from "./store/store";
import MasonryWall from '@yeger/vue-masonry-wall';

import { register } from 'swiper/element/bundle';

register();

const app = createApp(App);
app.use(store);
app.use(MasonryWall);
router.beforeEach((to, from, next) => {
    const visited = localStorage.getItem('visited');
    if(!visited && to.name !== 'first'){
        next({name: 'first'});
        localStorage.setItem('visited', true)
    } else {
        next()
    }
});
app.use(router);

app.mount('#app')
