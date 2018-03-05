<template>
  <div class="demo3">
    <h1>Vue Component</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  const Example3 = Vue.extend({
    // type inference enabled
    data() {
      return {
        message: 'Hello from vue component'
      }
    }
  });

  export default Example3;
</script>

<style>
 .demo3 {
   background-color: aqua;
 }
</style>
