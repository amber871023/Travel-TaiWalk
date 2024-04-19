<template>
  <Navbar />
  <router-view />
  <Footer />
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
export default {
  components: {
    Navbar,
    Footer
  }
}
</script>
<style scoped lang="scss">
@import '../assets/stylesheets/all';

html,
body {
  height: 100%;
  margin: 0;
}
.wrapper {
  min-height: calc(100% - 60px); /*減去footer高度*/
}
footer {
  height: 60px; /*設定footer本身高度*/
  margin-top: 60px;
}
</style>
