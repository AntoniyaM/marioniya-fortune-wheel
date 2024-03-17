import './assets/scss/app.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
// Firebase.
import { VueFire } from 'vuefire';
import { firebaseApp } from '@/firebase';
// PrimeVue.
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Panel from 'primevue/panel';
import Textarea from 'primevue/textarea';
import Toolbar from 'primevue/toolbar';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueFire, {
  firebaseApp,
});
app.use(PrimeVue, { ripple: true });

// Components.
app.component('AppButton', Button);
app.component('AppTextarea', Textarea);
app.component('Column', Column);
app.component('ContentCard', Card);
app.component('DataTable', DataTable);
app.component('InfoDialog', Dialog);
app.component('InputText', InputText);
app.component('Panel', Panel);
app.component('Toolbar', Toolbar);

app.mount('#app');
