<template>
  <!--搜尋列-->
  <section class="container mb-8">
    <div class="row flex-row justify-content-center">
      <div class="col-12 col-md-10 d-md-flex">
        <div class="col-12 col-md-8 titleText">
          <p class="fs-8">
            探索<span style="border-bottom: solid 2px #e0da48">台灣之美</span>
            <br />讓我們更親近這片土地
          </p>
          <p class="fs-3 text-dark d-flex justify-content-start smallTitle">
            <span class="material-icons text-light"> place </span>
            台灣旅遊景點導覽
            <span class="fs-2 fw-bold" style="font-family: 'Playfair Display'">
              Taiwan Travel Guide</span
            >
          </p>
        </div>
        <div class="col-12 col-md-4">
          <select class="form-select mb-1" aria-label="Default select example">
            <option selected>探索景點</option>
            <option value="1">節慶活動</option>
            <option value="2">品嚐美食</option>
          </select>
          <input
            class="form-control mb-1"
            type="text"
            placeholder="你想去哪裡？請輸入關鍵字"
            aria-label="default input example"
          />
          <button
            type="button"
            class="btn btn-primary w-100 text-white d-flex justify-content-center"
            @click="searchBtn"
          >
            <span class="material-icons text-white pe-3"> search </span>
            搜 尋
          </button>
        </div>
      </div>
    </div>
  </section>
  <!--Banner-->
  <section class="container mb-6">
    <div
      id="carousel"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carousel"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#carousel"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
        <button
          type="button"
          data-bs-target="#carousel"
          data-bs-slide-to="4"
          aria-label="Slide 5"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item text-center" v-for="(banner,index) in bannerData"
        :key="banner.id" :class="{'active': index == 0}">
         <router-link :to="`/spots/${banner.ScenicSpotID}`">
          <img
            :src="banner.Picture.PictureUrl1"
            class="d-block bannerImg"
            :alt="banner.Picture.PictureDescription1"
            :onerror="defaultBannerImg"
          />
          <div class="carousel-caption d-none d-md-block py-0">
            <h3 class="mb-0">{{banner.Address.slice(0,3)}} | {{banner.ScenicSpotName}}</h3>
          </div>
          </router-link>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </section>
  <!--近期活動-->
<section class="container mb-6">
  <div class="row">
      <div class="col-6 fs-7">近期活動</div>
      <div class="col-6 d-flex justify-content-end align-items-center"> <router-link to="/events" class=" text-info">查看更多活動 ></router-link></div>
  </div>
  <div class="row">
    <div class="col-12 col-lg-6 d-flex flex-column mb-3" v-for="activity in activityDataList" :key="activity.id">
      <router-link :to="`/events/${activity.ActivityID}`" class=" text-primary">
      <div class="card d-flex flex-row">
        <div class="imgWrap">
        <div class="imgCard overflow-hidden">
          <img :src="activity.Picture.PictureUrl1" class="card-img-top" :alt="activity.Picture.PictureDescription1" style="height: 160px; width: 160px;" :onerror="defaultImg">
        </div>
        </div>
        <div class="card-body bg-darkLight d-flex flex-column justify-content-between">
          <div class="d-flex flex-column">
            <p class="card-text text-dark mb-1">{{ activity.StartTime + " - " + activity.EndTime }}</p>
            <h3 class="card-title text-dark fs-4 fw-bold">{{activity.ActivityName}}</h3>
          </div>
          <div class="d-flex justify-content-between">
            <p class="text-dark d-flex justify-content-center mb-0">
              <span class="material-icons text-light">
              place
              </span>  {{activity.Address.slice(0,3)}}</p>
              詳細介紹 >
          </div>
        </div>
      </div>
      </router-link>
    </div>
  </div>
</section>
<!--熱門打卡景點-->
<section class="container mb-6">
  <div class="row">
      <div class="col-6 fs-7">熱門打卡景點</div>
      <div class="col-6 d-flex justify-content-end align-items-center"> <router-link to="/spots" class=" text-info">查看更多景點></router-link></div>
  </div>
  <div class="row">
    <SpotCard v-for="item in newSpotData" :key="item.id" :item="item"/>
  </div>
</section>
<!--一再回訪美食-->
<section class="container">
  <div class="row">
      <div class="col-6 fs-7">一再回訪美食</div>
      <div class="col-6 d-flex justify-content-end align-items-center"> <router-link to="/taste-food" class=" text-info">查看更多美食></router-link></div>
  </div>
  <div class="row">
    <FoodCard v-for="item in newFoodData" :key="item.id" :item="item"/>
  </div>
</section>
</template>

<script>
// @ is an alias to /src
import getAuthorizationHeader from '@/utils/authorizationHeader.js'
import formatDate from '@/utils/formatDate.js'
import SpotCard from '@/components/SpotCard'
import FoodCard from '@/components/FoodCard'

export default {
  components: {
    SpotCard,
    FoodCard
  },
  data () {
    return {
      bannerData: [],
      defaultBannerImg: 'this.src="' + require('../assets/img/onerror-1100x400.png') + '"',
      activityDataList: [],
      defaultImg: 'this.src="' + require('../assets/img/onerror-160x160.png') + '"',
      spotDataList: [],
      newSpotData: [],
      foodDataList: [],
      newFoodData: []
    }
  },
  methods: {
    getBanner () {
      const url = `${process.env.VUE_APP_API}/Tourism/ScenicSpot?$filter=%20Picture%2FPictureUrl1%20ne%20null&$top=5&$format=JSON`
      this.$http
        .get(url, {
          // eslint-disable-next-line indent
          headers: getAuthorizationHeader()
        })
        .then((res) => {
          this.bannerData = res.data
          // console.log(this.bannerData)
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    getActivity () {
      const url = `${process.env.VUE_APP_API}/Tourism/Activity?$filter=month(StartTime)%20eq%2012%20and%20year(EndTime)%20gt%202021%20and%20Picture%2FPictureUrl1%20ne%20null&$top=4&$format=JSON`
      this.$http
        .get(url, {
          // eslint-disable-next-line indent
          headers: getAuthorizationHeader()
        })
        .then((res) => {
          this.activityDataList = res.data
          this.activityDataList.forEach((item) => {
            item.StartTime = formatDate(item.StartTime)
            item.EndTime = formatDate(item.EndTime)
          })
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    getSpots () {
      const url = `${process.env.VUE_APP_API}/Tourism/ScenicSpot?$filter=Picture%2FPictureUrl1%20ne%20null&$top=50&$format=JSON`
      this.$http
        .get(url, {
          // eslint-disable-next-line indent
          headers: getAuthorizationHeader()
        })
        .then((res) => {
          this.spotDataList = res.data
          // console.log(this.spotDataList)
          for (let i = 0; i <= 3; i++) {
            this.newSpotData.push(this.spotDataList[Math.floor(Math.random() * this.spotDataList.length)])
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    getFood () {
      const url = `${process.env.VUE_APP_API}/Tourism/Restaurant?$filter=Picture%2FPictureUrl1%20ne%20null&$top=50&$format=JSON`
      this.$http
        .get(url, {
          // eslint-disable-next-line indent
          headers: getAuthorizationHeader()
        })
        .then((res) => {
          this.foodDataList = res.data
          // console.log(this.foodDataList)
          for (let i = 0; i <= 3; i++) {
            this.newFoodData.push(this.foodDataList[Math.floor(Math.random() * this.foodDataList.length)])
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getBanner()
    this.getActivity()
    this.getSpots()
    this.getFood()
  }
}
</script>
<style scoped lang="scss">
@import "@/assets/stylesheets/all.scss";
</style>
