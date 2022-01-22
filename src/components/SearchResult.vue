<template>
  <section class="container">
  <div class="row">
    <div class="col-12 d-flex align-items-center">
      <h2 class="fs-7 me-1">搜尋結果</h2>
      <small>共有 <span class="text-secondary">{{totalList.length}}</span> 筆</small>
      </div>
  </div>
  <div class="row" v-if="totalList.length == 0">
    <div class="col-12 text-center mt-8 mb-6">
      <img src="../assets/img/noresult.png" alt="目前查無資料 請重新搜尋">
    </div>
  </div>
  <div v-else class="row">
    <SearchCard v-for="(item, index) in list" :key="index" :item="item" :routeName="routeName"/>
    <Pagination :pageTotal="pages.pageTotal" v-model="activePage"  :currentPage="pages.currentPage" @emit-page ="getPage"/>
  </div>
</section>
</template>

<script>
import SearchCard from '@/components/SearchCard'
import Pagination from '@/components/Pagination'

export default {
  components: {
    SearchCard,
    Pagination
  },
  data () {
    return {
      minData: 0,
      maxData: 0,
      showList: [],
      activePage: 1
    }
  },
  props: {
    list: {
      type: Array,
      default: null
    },
    totalList: {
      type: Array,
      default: null
    },
    routeName: {
      type: String,
      default: null
    },
    pages: {
      type: Object,
      default: function () {
        return {
          pageSize: 20,
          pageTotal: 0,
          currentPage: 1
        }
      }
    }
  },
  methods: {
    getPage (page = 1) {
      this.activePage = page
      this.minData = this.activePage * this.pages.pageSize - this.pages.pageSize + 1
      this.maxData = this.activePage * this.pages.pageSize
      this.$emit('filter-list', this.minData, this.maxData, this.activePage)
    }
  },
  watch: {
    $route (to, from) {
      // 相同path 不同 param 時需要 透過watch $route 來重新Render
      if (this.$route.name === 'spots') {
        this.getPage()
      }
    }
  },
  mounted () {
    this.getPage()
  }
}
</script>
