import Vue from 'vue';
import Example3 from './example3.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(Example3)
}).$mount('#example3');