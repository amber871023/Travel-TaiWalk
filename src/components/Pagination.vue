<template>
  <nav class="d-flex justify-content-center mt-4" aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item me-1" :class="{disabled : firstPage}">
      <a class="page-link" href="#" aria-label="Previous"  @click.prevent = "toPage(currentPage - 1)">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item" :class="{active : currentPage  == (index+1)}" v-for="(item, index) in pageTotal" :key="index">
      <a v-if="isShowPage(index + 1)" class="page-link me-1" href="#" @click.prevent = "toPage(index + 1)">{{index + 1}}</a>
      <a v-else-if="isShowEllipsis(index + 1)" class="page-link disabled me-1">...</a>
    </li>
    <li class="page-item" :class="{disabled : lastPage}">
      <a class="page-link" href="#" aria-label="Next" @click.prevent = "toPage(currentPage + 1)">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
  </nav>
</template>
<script>
export default {
  data () {
    return {
      firstPage: true,
      lastPage: false
    }
  },
  props: {
    pageTotal: {
      type: Number,
      default: null
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  methods: {
    toPage (page = 1) {
      this.firstPage = true
      this.lastPage = false
      if (page === 1 || page === undefined) {
        this.firstPage = true
      } else {
        this.firstPage = false
      }
      if (page === this.pageTotal) {
        this.lastPage = true
      } else {
        this.lastPage = false
      }
      this.$emit('emit-page', page)
    },
    isShowPage (index) { // 是否省略頁碼
      if (this.pageTotal < 10) {
        return true
      } else {
        if (index === 1 || index === this.pageTotal) {
          return true
        } else {
          if (this.currentPage < 4 && index < 6) {
            return true
          } else if (this.currentPage > this.pageTotal - 4 && index > this.pageTotal - 6) {
            return true
          } else if (index < this.currentPage + 3 && index > this.currentPage - 3) {
            return true
          } else {
            return false
          }
        }
      }
    },
    isShowEllipsis (index) { // 第2頁及倒數第2頁顯示省略
      return index === 2 || index === this.pageTotal - 1
    }
  },
  watch: {
    $route (to, from) {
      // 相同path 不同 param 時需要 透過watch $route 來重新Render
      if (this.$route.name === 'spots') {
        this.toPage()
      }
    }
  },
  mounted () {
    this.toPage()
  }
}
</script>
