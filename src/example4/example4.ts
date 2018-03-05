import Vue from 'vue';
import Example4 from './example4.vue';

Vue.config.productionTip = false;

new Vue({
  el: "#example4",
  template: `<example-4></example-4>`,
  components: {
    Example4: Example4
  }
});