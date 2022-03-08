<template>
  <ul class="nav nav-tabs m-2">
    <li class="nav-item">
      <router-link class="nav-link" :class="{ active: isHome }" to="/"
        >Home</router-link
      >
    </li>
    <li class="nav-item">
      <router-link class="nav-link" :class="{ active: !isHome }" to="#">
        {{ $route.params.name }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  watch: {
    $route(to, from) {},
  },
  computed: {
    isHome() {
      return this.$route.path == "/";
    },
  },
};
</script>

<style></style>
