import { createApp } from 'vue'
import router from './router.js'
import store from "./store/index.js";
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseContainer from './components/ui/BaseContainer.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseSpiner from './components/ui/BaseSpinner.vue';
import BaseDialog from './components/ui/BaseDialog.vue';

import App from './App.vue'

const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-badge', BaseBadge);
app.component('base-container', BaseContainer);
app.component('base-button', BaseButton);
app.component('base-spiner', BaseSpiner);
app.component('base-dialog', BaseDialog);

app.mount('#app')