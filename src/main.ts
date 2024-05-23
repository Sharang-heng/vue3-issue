import { createApp } from 'vue';
import App from '@/App';
import router from '@/assets/scripts/router';

import 'uno.css';
import '@unocss/reset/tailwind.css';

const app = createApp(App);

app.use(router);

app.mount('#app');
