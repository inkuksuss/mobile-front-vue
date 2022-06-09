import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store, { storeKey } from "./store";
import Datepicker from "@vuepic/vue-datepicker";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueClickAway from "vue3-click-away";
import { quillEditor, Quill } from "vue3-quill";

library.add(fas);

createApp(App)
  .component("DatePicker", Datepicker)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(store, storeKey)
  .use(VueClickAway)
  .use(quillEditor)
  .use(router)
  .mount("#app");
