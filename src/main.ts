import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

/* Import Font Awesome */
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* Add icons to the library */
library.add(faInstagram, faFacebook, faLinkedin);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
