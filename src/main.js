import { createApp } from 'vue';
import App from './App.vue';

import router from './routes/router';

import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import DataTable from 'primevue/datatable';
import ToastService from 'primevue/toastservice';
import Column from 'primevue/column';
import Menubar from 'primevue/menubar';
import MultiSelect from 'primevue/multiselect';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';

import 'primevue/resources/themes/md-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import './style.css';

const app = createApp(App);

app.use(PrimeVue);
app.use(ToastService);
app.use(router);

app.component('Toast', Toast);
app.component('InputText', InputText);
app.component('Button', Button);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Menubar', Menubar);
app.component('MultiSelect', MultiSelect);
app.component('Dialog', Dialog);
app.component('Dropdown', Dropdown);

app.mount('#app');
