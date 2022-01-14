<template>
  <!--標籤列-->
<section class="container mb-7">
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><router-link to="/">首頁</router-link></li>
    <li class="breadcrumb-item active" aria-current="page">節慶活動</li>
  </ol>
</nav>
</section>
<!--篩選列-->
<section class="container mb-8">
  <div class="row flex-row justify-content-center g-1">
    <div class="col-12 col-md-3">
      <select class="form-select me-3" v-model="param.city">
        <option value="" selected>全部縣市</option>
        <option v-for=" (item,index) in CityList" :key="index" :value="item.City">{{item.CityName}}
        </option>
      </select>
    </div>
    <div class="col-12 col-md-3">
      <select class="form-select me-3" v-model="param.type">
        <option value="" selected>全部主題</option>
        <option v-for=" (type,index) in types" :key="index" :value="type.name">{{type.name}}</option>
      </select>
    </div>
    <div class="col-12 col-md-4">
      <input class="form-control me-3" type="text" placeholder="你想去哪裡？請輸入關鍵字" v-model="param.keyword">
    </div>
    <div class="col-12 col-md-2">
      <button type="button" class="btn btn-primary w-100 text-white d-flex justify-content-center" @click="search">
        <span class="material-icons text-white pe-3">
        search
        </span>
         搜    尋</button>
    </div>
  </div>
</section>
<!--熱門主題-->
<section v-if="!isSearched" class="container">
  <div class="row">
      <div class="col-12 fs-7">熱門主題</div>
      <div class="col-6 col-md-4 col-lg-3 position-relative mb-2" v-for=" (type,index) in types" :key="index" @click="searchType(type)">
        <div class="imgWrap" style="cursor:pointer">
          <div class="imgCard overflow-hidden" style="border-radius:30px;">
          <img :src="type.img" class="card-img-top" :alt="type.name" style="height: 100%; width: 100%;">
          <h3 class="position-absolute top-50 start-50 translate-middle text-white fw-bold fs-4">{{type.name}}</h3>
          </div>
        </div>
      </div>
  </div>
</section>
<!--搜尋結果-->
<SearchResult v-else :list="resultList" routeName="event"/>
</template>
<script>
import getAuthorizationHeader from '@/utils/authorizationHeader.js'
import SearchResult from '@/components/SearchResult'
export default {
  components: {
    SearchResult
  },
  data () {
    return {
      CityList: [],
      param: {
        city: '',
        type: '',
        keyword: null
      },
      types: [
        {
          name: '節慶活動',
          img: require('@/assets/img/festival/festival.png')
        },
        {
          name: '自行車活動',
          img: require('@/assets/img/festival/bike.png')
        },
        {
          name: '遊憩類',
          img: require('@/assets/img/festival/play.png')
        },
        {
          name: '產業文化活動',
          img: require('@/assets/img/festival/culture.png')
        },
        {
          name: '年度活動',
          img: require('@/assets/img/festival/annual.png')
        },
        {
          name: '四季活動',
          img: require('@/assets/img/festival/seasons.png')
        }
      ],
      isSearched: false,
      resultList: []
    }
  },
  methods: {
    getCity () {
      const url = 'https://gist.motc.gov.tw/gist_api/V3/Map/Basic/City?$format=JSON'
      this.$http
        .get(url, {
          // eslint-disable-next-line indent
          headers: getAuthorizationHeader()
        })
        .then((res) => {
          this.CityList = res.data
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    querySearch () {
      const queryKeyword = this.$route.query.keyword
      if (queryKeyword) {
        this.param.keyword = queryKeyword
        this.search()
      }
    },
    searchType (className) {
      this.param.type = className.name
      this.search()
    },
    search () {
      let filterData = ''
      if (this.param.keyword && this.param.type) {
        filterData = `contains(ActivityName, '${this.param.keyword}')and (contains(Class1, '${this.param.type}')or contains(Class2, '${this.param.type}'))`
      } else {
        if (this.param.keyword) {
          filterData = `contains(ActivityName, '${this.param.keyword}')`
        }
        if (this.param.type) {
          filterData = `contains(Class1, '${this.param.type}')or contains(Class2, '${this.param.type}')`
        }
      }
      const url = `${process.env.VUE_APP_API}/Tourism/Activity/${this.param.city}?%24filter=${filterData}&%24top=30&%24format=JSON`
      this.$http
        .get(url, {
          // eslint-disable-next-line indent
          headers: getAuthorizationHeader()
        })
        .then((res) => {
          res.data.forEach(item => {
            if (item.Picture.PictureUrl1 === undefined) {
              item.Picture.PictureUrl1 = require('../assets/img/onerror-255x200.png')
            }
          })
          this.resultList = res.data
          this.isSearched = true
          console.log(this.resultList)
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getCity()
    this.querySearch()
  }
}
</script>
