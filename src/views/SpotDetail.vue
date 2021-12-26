<template>
  <!--標籤列-->
<section class="container mb-7">
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><router-link to="/" class="text-primary">首頁</router-link ></li>
    <li class="breadcrumb-item"><router-link to="/spots" class="text-primary">探索景點</router-link></li>
    <li class="breadcrumb-item"><a href="#" class="text-primary">{{spotDetail.city}}</a></li>
    <li class="breadcrumb-item active" aria-current="page">{{spotDetail.Name}}
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
        <img class="d-block bannerImg" :src="spotDetail.Picture?.PictureUrl1" :onerror="defaultImg">
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
  <div class="col-12"><h3 class="fs-7">{{spotDetail.Name}}</h3></div>
  <div class="col-12 mb-5">
    <div class="fs-3 d-inline-block border border-secondary rounded-pill text-secondary px-3 me-1" v-if="spotDetail.Class1"># {{spotDetail.Class1}}</div>
    <div class="fs-3 d-inline-block border border-secondary rounded-pill text-secondary px-3 me-1" v-if="spotDetail.Class2"># {{spotDetail.Class2}}</div>
    <div class="fs-3 d-inline-block border border-secondary rounded-pill text-secondary px-3" v-if="spotDetail.Class3"># {{spotDetail.Class3}}</div>
  </div>
  <div class="col-12 mb-2">
    <h5 class="fw-bold">景點介紹：</h5>
  </div>
  <div class="col-12 mb-8">
    <p>{{spotDetail.DescriptionDetail}}</p>
  </div>
</div>
</section>
<!--相關資訊-->
<section class="container mb-6">
<div class="row g-5">
  <div class="col-12 col-md-6 mt-0">
    <div class="bg-darkLight p-5 text-break" style="border-radius: 12px;">
      <div class="d-flex justify-content-start">
        <h5 class="fw-bold">開放時間：</h5>
      <span class="text-break textIndent">{{spotDetail.OpenTime?spotDetail.OpenTime:'無'}}</span>
      </div>
      <div class="d-flex justify-content-start">
        <h5 class="fw-bold">服務電話：</h5>
      <span>{{spotDetail.Phone?spotDetail.Phone:'無'}}</span>
      </div>
      <div class="d-flex justify-content-start">
        <h5 class="fw-bold">景點地址：</h5>
      <a :href="'https://www.google.com.tw/maps/place/' + spotDetail.Address" class="text-break textOver text-primary" style="text-decoration: underline;" target="_blank">{{spotDetail.Address}}</a>
      </div>
      <div class="d-flex justify-content-start"  v-if="spotDetail.WebsiteUrl">
        <h5 class="fw-bold">官方網站：</h5>
      <a :href="spotDetail.WebsiteUrl"  class="text-break textIndent text-primary" style="text-decoration: underline;" target="_blank">{{spotDetail.WebsiteUrl}}</a>
      </div>
      <div class="d-flex justify-content-start">
        <h5 class="fw-bold">票價資訊：</h5>
      <span class="text-break textIndent">{{spotDetail.TicketInfo?spotDetail.TicketInfo:'無'}}</span>
      </div>
      <div class="d-flex justify-content-start">
        <h5 class="fw-bold">注意事項：</h5>
      <span class="text-break textIndent">{{spotDetail.Remarks?spotDetail.Remarks:'無'}}</span>
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
      <div class="col-6 d-flex justify-content-end align-items-center"><router-link to="/spots" class=" text-info">查看更多景點></router-link></div>
      <SpotCard v-for="spot in newSpotData" :key="spot.id" :spot="spot" @click="getSpot(), getOtherSpots()"/>
  </div>
</section>
</template>
<script>
// @ is an alias to /src
import getAuthorizationHeader from '@/utils/authorizationHeader.js'
import SpotCard from '@/components/SpotCard'
import L from 'leaflet'

export default {
  components: {
    SpotCard
  },
  data () {
    return {
      id: '',
      spotDetail: {
        city: ''
      },
      defaultImg: 'this.src="' + require('../assets/img/onerror-1100x400.png') + '"',
      otherSpotDataList: [],
      newSpotData: [],
      position: {
        lat: '',
        lon: ''
      }
    }
  },
  methods: {
    getSpot () {
      const url = `${process.env.VUE_APP_API}/Tourism/ScenicSpot?%24filter=ID%20eq%20'${this.id}'&%24format=JSON`
      this.$http
        .get(url, {
          // eslint-disable-next-line indent
          headers: getAuthorizationHeader()
        })
        .then((res) => {
          this.spotDetail = res.data[0]
          this.spotDetail.city = this.spotDetail.City ? this.spotDetail.City : this.spotDetail.Address.substr(0, 3)
          this.position.lat = this.spotDetail.Position.PositionLat
          this.position.lon = this.spotDetail.Position.PositionLon
          this.getMap()
          console.log(this.spotDetail)
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
    getOtherSpots () {
      this.newSpotData = []
      const url = `${process.env.VUE_APP_API}/Tourism/ScenicSpot?$select=ID%2CPicture%2CName%2CAddress&$filter=Picture%2FPictureUrl1%20ne%20null&$top=20&$format=JSON`
      this.$http
        .get(url, {
          // eslint-disable-next-line indent
          headers: getAuthorizationHeader()
        })
        .then((res) => {
          this.otherSpotDataList = res.data
          // console.log(this.spotDataList)
          for (let i = 0; i <= 3; i++) {
            this.newSpotData.push(this.otherSpotDataList[Math.floor(Math.random() * this.otherSpotDataList.length)])
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  watch: {
    $route (to) {
      if (this.spotDetail.ID === to.params.ID || to.params.ID === undefined) {
        return
      }
      this.getSpot()
    }
  },
  mounted () {
    this.id = this.$route.params.ID
    this.getSpot()
    this.getOtherSpots()
  }
}
</script>
