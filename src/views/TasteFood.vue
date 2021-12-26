<template>
  <!--標籤列-->
<section class="container mb-7">
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="index.html">首頁</a></li>
    <li class="breadcrumb-item active" aria-current="page">品嘗美食</li>
  </ol>
</nav>
</section>

<!--篩選列-->
<section class="container mb-8">
  <div class="row flex-row justify-content-center g-1">
    <div class="col-12 col-md-3">
      <select class="form-select me-3" aria-label="Default select example">
        <option selected>全部縣市</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
    <div class="col-12 col-md-6">
      <input class="form-control me-3" type="text" placeholder="你想去哪裡？請輸入關鍵字" aria-label="default input example">
    </div>
    <div class="col-12 col-md-3">
      <button type="button" class="btn btn-primary w-100 text-white d-flex justify-content-center">
        <span class="material-icons text-white pe-3">
        search
        </span>
         搜    尋</button>
    </div>
  </div>
</section>

<!--熱門分類-->
<section class="container">
  <div class="row">
      <div class="col-12 fs-7">熱門分類</div>
      <div class="col-6 col-md-4 col-lg-3 position-relative mb-2" v-for=" (type,index) in types" :key="index">
        <div class="imgWrap">
          <div class="imgCard overflow-hidden" style="border-radius:30px;">
          <img :src="type.img" class="card-img-top" :alt="type.name" style="height: 100%; width: 100%;">
          <h3 class="position-absolute top-50 start-50 translate-middle text-white fw-bold fs-4">{{type.name}}</h3>
          </div>
        </div>
      </div>
  </div>
</section>
</template>
<script>
export default {
  data () {
    return {
      types: [
        {
          name: '地方特產',
          img: require('@/assets/img/food/local-specialty.png')
        },
        {
          name: '中式美食',
          img: require('@/assets/img/food/chinese-cuisine.png')
        },
        {
          name: '甜點冰品',
          img: require('@/assets/img/food/dessert.png')
        },
        {
          name: '異國料理',
          img: require('@/assets/img/food/exotic-cuisine.png')
        },
        {
          name: '伴手禮',
          img: require('@/assets/img/food/souvenir.png')
        },
        {
          name: '素食',
          img: require('@/assets/img/food/vegetarian.png')
        }
      ]
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
