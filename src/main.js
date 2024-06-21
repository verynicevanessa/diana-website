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
    if (window.CABLES && window.CABLES.patch && window.CABLES.patch !== null) {
        console.log('Disposing CABLES patch in router guard');
        window.CABLES.patch.dispose();
        window.CABLES.patch = null;
    } else {
        console.log('No CABLES patch to dispose');
    }

    const visited = localStorage.getItem('visited');
    if (!visited && to.name !== 'first') {
        next({ name: 'first' });
        localStorage.setItem('visited', true);
    } else {
        next();
    }
});

router.afterEach((to) => {
    // Find the Menu component and call handleRouteChange
    const appInstance = app._instance;
    if (appInstance) {
        const menuComponent = appInstance.proxy.$children.find(child => child.$options.name === 'Menu');
        if (menuComponent) {
            menuComponent.handleRouteChange(to);
        }
    }
});

app.use(router);
app.mount('#app');
