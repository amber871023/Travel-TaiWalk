<template>
  <!--標籤列-->
<section class="container mb-7">
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><router-link to="/" class="text-primary">首頁</router-link ></li>
    <li class="breadcrumb-item"><router-link to="/taste-food" class="text-primary">品嘗美食</router-link></li>
    <li class="breadcrumb-item"><a href="#" class="text-primary">{{foodDetail.city}}</a></li>
    <li class="breadcrumb-item active" aria-current="page">{{foodDetail.Name}}
    </li>
  </ol>
</nav>
</section>
<!--圖片區-->
<section class="container mb-6">
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    </div>
    <div class="carousel-inner js-banner">
      <div class="carousel-item active text-center">
        <img class="d-block bannerImg" :src="foodDetail.Picture?.PictureUrl1" :onerror="defaultImg">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</section>
<!--詳細介紹-->
<section class="container">
<div class="row">
  <div class="col-12"><h3 class="fs-7">{{foodDetail.Name}}</h3></div>
  <div class="col-12 mb-5">
    <div class="fs-3 d-inline-block border border-secondary rounded-pill text-secondary px-3 me-1" v-if="foodDetail.Class1"># {{foodDetail.Class1}}</div>
    <div class="fs-3 d-inline-block border border-secondary rounded-pill text-secondary px-3 me-1" v-if="foodDetail.Class2"># {{foodDetail.Class2}}</div>
    <div class="fs-3 d-inline-block border border-secondary rounded-pill text-secondary px-3" v-if="foodDetail.Class3"># {{foodDetail.Class3}}</div>
  </div>
  <div class="col-12 mb-2">
    <h5 class="fw-bold">餐廳介紹：</h5>
  </div>
  <div class="col-12 mb-8">
    <p>{{foodDetail.Description}}</p>
  </div>
</div>
</section>
<!--相關資訊-->
<section class="container mb-6">
<div class="row g-5">
  <div class="col-12 col-md-6 mt-0">
    <div class="bg-darkLight p-5 text-break" style="border-radius: 12px;">
      <div class="d-flex justify-content-start">
        <h5 class="fw-bold">營業時間：</h5>
      <span class="text-break textIndent">{{foodDetail.OpenTime?foodDetail.OpenTime:'無'}}</span>
      </div>
      <div class="d-flex justify-content-start">
        <h5 class="fw-bold">聯絡電話：</h5>
      <span>{{foodDetail.Phone?foodDetail.Phone:'無'}}</span>
      </div>
      <div class="d-flex justify-content-start">
        <h5 class="fw-bold">餐廳地址：</h5>
      <a :href="'https://www.google.com.tw/maps/place/' + foodDetail.Address" class="text-break textOver text-primary" style="text-decoration: underline;" target="_blank">{{foodDetail.Address}}</a>
      </div>
      <div class="d-flex justify-content-start"  v-if="foodDetail.WebsiteUrl">
        <h5 class="fw-bold">官方網站：</h5>
      <a :href="foodDetail.WebsiteUrl"  class="text-break textIndent text-primary" style="text-decoration: underline;" target="_blank">{{foodDetail.WebsiteUrl}}</a>
      </div>
    </div>

  </div>
  <div class="col-12 col-md-6 mt-0">
    <div class="col-12 mb-5">
      <div id="map" style="height: 250px; border-radius:12px;"></div>
    </div>
    <div class="col-12">
      <h5 class="fw-bold">周邊資訊：</h5>
      <div class="col-12 d-flex">
        <div class="col-4">
          <button class="btn d-flex flex-column align-items-center px-7 py-5" style="border: 1.33px solid #E5E5E5;">
            <img src="../assets/img/nearby-spot.png" alt="">
            <span class="text-primary">附近景點</span>
          </button>
        </div>
        <div class="col-4">
          <button class="btn d-flex flex-column align-items-center px-7 py-5" style="border: 1.33px solid #E5E5E5;">
            <img src="../assets/img/nearby-event.png" alt="">
            <span class="text-primary">附近活動</span>
          </button>
        </div>
        <div class="col-4">
          <button class="btn d-flex flex-column align-items-center px-7 py-5" style="border: 1.33px solid #E5E5E5;">
            <img src="../assets/img/nearby-food.png" alt="">
            <span class="text-primary">附近美食</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</section>

<!--其他景點-->
<section class="container">
  <div class="row">
      <div class="col-6 fs-7">這些也不能錯過</div>
      <div class="col-6 d-flex justify-content-end align-items-center"><router-link to="/taste-food" class=" text-info">查看更多餐廳></router-link></div>
      <MainImgCard v-for="item in newFoodData" :key="item.id" :item="item" routeName="food"/>
  </div>
</section>
</template>
<script>
// @ is an alias to /src
import getAuthorizationHeader from '@/utils/authorizationHeader.js'
import MainImgCard from '@/components/MainImgCard'
import L from 'leaflet'

export default {
  components: {
    MainImgCard
  },
  data () {
    return {
      id: '',
      foodDetail: {
        city: ''
      },
      defaultImg: 'this.src="' + require('../assets/img/onerror-1100x400.png') + '"',
      otherFoodDataList: [],
      newFoodData: [],
      position: {
        lat: '',
        lon: ''
      }
    }
  },
  methods: {
    getFood () {
      const url = `${process.env.VUE_APP_API}/Tourism/Restaurant?%24filter=ID%20eq%20'${this.id}'&%24format=JSON`
      this.$http
        .get(url, {
          // eslint-disable-next-line indent
          headers: getAuthorizationHeader()
        })
        .then((res) => {
          this.foodDetail = res.data[0]
          this.foodDetail.city = this.foodDetail.City ? this.foodDetail.City : this.foodDetail.Address.substr(0, 3)
          this.position.lat = this.foodDetail.Position.PositionLat
          this.position.lon = this.foodDetail.Position.PositionLon
          this.getMap()
          console.log(this.foodDetail)
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    getMap () {
      const myMap = L.map('map')
      myMap.setView([this.position.lat, this.position.lon], 15)
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 30,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYW1iZXJjeXQiLCJhIjoiY2t3NHExeG1nZW1xczJvcGdhZHl4ankzayJ9.zzynZZe72haux4VYvqCDeA' // 'your.mapbox.access.token'
      }).addTo(myMap)
      L.marker([this.position.lat, this.position.lon]).addTo(myMap)
    },
    getOtherFood () {
      this.newFoodData = []
      const url = `${process.env.VUE_APP_API}/Tourism/Restaurant?$select=ID%2CPicture%2CName%2CAddress&$filter=Picture%2FPictureUrl1%20ne%20null&$top=20&$format=JSON`
      this.$http
        .get(url, {
          // eslint-disable-next-line indent
          headers: getAuthorizationHeader()
        })
        .then((res) => {
          this.otherFoodDataList = res.data
          for (let i = 0; i <= 3; i++) {
            this.newFoodData.push(this.otherFoodDataList[Math.floor(Math.random() * this.otherFoodDataList.length)])
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  mounted () {
    this.id = this.$route.params.ID
    this.getFood()
    this.getOtherFood()
  }
}
</script>
