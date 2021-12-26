<template>
  <div class="col-6 col-md-4 col-lg-3">
        <router-link :to="{name: routeName, params:{'id': item.ID} }">
        <div class="overflow-hidden mb-2" style="border-radius:20px;">
          <img :src="item.Picture.PictureUrl1" class="card-img-top" :alt="item.Picture.PictureDescription1" :onerror="defaultImg">
        </div>
          <div class="card-info">
              <h3 class="card-title fw-bold fs-4 textOver">{{item.Name}}</h3>
            <div class="d-flex justify-content-between">
              <p class="text-dark d-flex justify-content-center mb-0">
                <span class="material-icons text-light">
                place
                </span> {{item.Address.slice(0,3)}} </p>
            </div>
        </div>
      </router-link>
    </div>
</template>
<script>
export default {
  data () {
    return {
      defaultImg: 'this.src="' + require('../assets/img/onerror-255x200.png') + '"'
    }
  },
  props: {
    item: {
      type: Object,
      default: () => { return {} }
    },
    routeName: {
      type: String,
      default: null
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
