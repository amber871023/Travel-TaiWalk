<template>
  <section class="container">
  <div class="row">
    <div class="col-12 d-flex align-items-center">
      <h2 class="fs-7 me-1">搜尋結果</h2>
      <small>共有 <span class="text-secondary">{{list.length}}</span> 筆</small>
      </div>
  </div>
  <div class="row" v-if="list.length == 0">
    <div class="col-12 text-center mt-8">
      <img src="../assets/img/noresult.png" alt="目前查無資料 請重新搜尋">
    </div>
  </div>
  <div v-else class="row">
    <SearchCard v-for="(item, index) in list" :key="index" :item="item" :routeName="routeName"/>
  </div>
  <nav class="d-flex justify-content-center" aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item me-1">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item me-1"><a class="page-link" href="#">1</a></li>
    <li class="page-item me-1"><a class="page-link" href="#">2</a></li>
    <li class="page-item me-1"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
</section>
</template>

<script>
import SearchCard from '@/components/SearchCard'

export default {
  components: {
    SearchCard
  },
  data () {
    return {
      resultList: []
    }
  },
  props: {
    list: {
      type: Array,
      default: null
    },
    routeName: {
      type: String,
      default: null
    }
  }
}
</script>
