import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueFormGenerator from "vue-form-generator";
import fieldCustomdate from "./components/fieldCustomdate.vue";
import FieldMatrix from "./components/Fields/Matrix.vue"
import Vuesax from "vuesax";
import FieldMatrixBuilder from "./components/FieldBuilders/FieldMatrixBuilder.vue"
import VueSelect from './components/Fields/VueSelect.vue'

Vue.component('FieldVueSelect', VueSelect);
Vue.component(FieldMatrixBuilder.name, FieldMatrixBuilder);
Vue.component(FieldMatrix.name, FieldMatrix);
Vue.component("fieldCustomdate", fieldCustomdate);
Vue.use(VueFormGenerator);

import "material-icons/iconfont/material-icons.css";
import "vuesax/dist/vuesax.css";
import "vue-select/dist/vue-select.css";

Vue.use(Vuesax, {
  // options here
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
