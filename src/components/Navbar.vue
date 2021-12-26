<template>
  <nav class="navbar navbar-expand-md mb-6 bg-white fixed-top" style="border-bottom:1px solid #e5e5e5;">
    <div class="container">
      <h1><router-link to="/" class="logo navbar-brand ">台灣走走</router-link></h1>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" >
        <img src="@/assets/img/menu-mobile.png" alt="">
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav text-center d-flex justify-content-around">
          <li class="nav-item fs-2"><router-link to="/spots" class="nav-link">探索景點</router-link></li>
          <li class="nav-item fs-2"><router-link to="/events" class="nav-link">節慶活動</router-link></li>
          <li class="nav-item fs-2"><router-link to="/taste-food" class="nav-link">品嚐美食</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<style lang="scss">
@import '@/assets/stylesheets/all';
.logo {
  display: block;
  background: no-repeat center url(../assets/img/logo.jpg);
  width: 240px;
  text-indent: 110%;
  overflow: hidden;
  white-space: nowrap;
  @include mobile() {
    display: block;
    background: no-repeat center url(../assets/img/logo-mobile.jpg);
    padding: 0;
    width: 118px;
  }
}
.nav-link {
  &:hover,
  &:focus {
    color: $primary;
    border-bottom: 2px solid #e0da48;
    text-decoration: if($link-hover-decoration == underline, none, null);
  }
}
</style>
