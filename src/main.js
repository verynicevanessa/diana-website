import "./assets/main.css";
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from "./store/store";
import * as Vue from 'vue';


const app = createApp(App);


app.use(store);
router.beforeEach((to, from, next) => {
    const visited = localStorage.getItem('visited');
    console.log({visited}, '++++++++++++++++++++++++++++');
    if(!visited && to.name !== 'first'){
        next({name: 'first'});
        localStorage.setItem('visited', true)
    } else {
        next()
    }
});
app.use(router);

app.mount('#app')
