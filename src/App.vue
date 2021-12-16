<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <button type="button" class="btn btn-primary">Primary</button>
  </div>
  <router-view/>
</template>

<style scoped lang="scss">
@import './assets/stylesheets/all';
</style>
