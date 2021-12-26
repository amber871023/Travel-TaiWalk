<template>
  <section class="container">
  <div class="row">
    <div class="col-12 d-flex align-items-center">
      <h2 class="fs-7 me-1">搜尋結果</h2>
      <small>共有 <span class="text-secondary">240</span> 筆</small>
      </div>
  </div>
  <div class="row" v-if="resultList.length == 0">
    <div class="col-12 text-center mt-8">
      <img src="./assets/img/noresult.png" alt="目前查無資料 請重新搜尋">
    </div>
  </div>
  <div v-else class="row">
    <SearchCard v-for="(item, index) in resultList" :key="index" :item="item" :routeName="routeName"/>
  </div>
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
    item: {
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
