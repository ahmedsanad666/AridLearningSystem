// import './assets/main.css'

// import './assets/ma'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import MainCom from './components/MainCom.vue';
import SectionHead from './components/bases/SectionHead.vue';
import BaseButton from './components/bases/BaseButton.vue';
import TheFooter from './components/layout/TheFooter.vue';
import BaseIntro from './components/bases/BaseIntro.vue';
import LessonHead from './components/bases/LessonHead.vue';
import UserData from './components/bases/UserData.vue';
import AllCourses from './components/Courses/AllCourses.vue';
import BaseSpinner from './components/bases/BaseSpinner.vue';
import BaseTextArea from './components/bases/BaseTextArea.vue';
import './assets/tailwind.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import{
    faTwitter,
  faFacebook,
  faInstagramSquare,
  // faInstagram,
  faGooglePlus,
} from "@fortawesome/free-brands-svg-icons";
const app = createApp(App)

app.component("font-awesome-icon", FontAwesomeIcon);

app.component('main-com',MainCom);
app.component("base-btn",BaseButton);
app.component("section-head",SectionHead)
app.component("the-footer", TheFooter);
app.component("base-intro", BaseIntro);
app.component("lesson-head",LessonHead);
app.component("user-data",UserData);
app.component('all-courses',AllCourses);
app.component('base-spinner',BaseSpinner);
app.component('base-textarea',BaseTextArea);
library.add(fas, faTwitter, faFacebook, faInstagramSquare, faGooglePlus);

app.use(store);
app.use(router);
app.mount('#app')
