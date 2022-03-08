<template>
  <div id="app">
    <Nav />

    <router-view class="container"></router-view>
    <notifications position="bottom right" />
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";

export default {
  name: "simple-storage",
  components: { Nav },
};
</script>

<style>
@import "./assets/bootstrap.min.css";
</style>
