<template>
  <div class="demo4">
    <h1>Vue Component</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  // The @Component decorator indicates the class is a Vue component
  @Component({
    // All component options are allowed in here
    // template: '<button @click="onClick">Click!</button>'
  })
  export default class Example4 extends Vue {
    // Initial data can be declared as instance properties
    message: string = 'Hello from vue component!';

    // Component methods can be declared as instance methods
    // onClick (): void {
    //   window.alert(this.message)
    // }
  }
</script>

<style lang="scss">
  .demo4 {
    background-color: deepskyblue;
  }
</style>
