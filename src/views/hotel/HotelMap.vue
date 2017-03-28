<template lang="html">
  <div class="hotel-map">
    <baidu-map>
      <map-view class="map-view" :style="mapstyle" :center="location" :zoom="zoom">
        <map-overlay-marker :point="location" :dragging="false" animation="BMAP_ANIMATION_BOUNCE"/>
    </map-view>
    </baidu-map>
    <div class="pro_info" v-if="productInfo != ''">
      <div class="inner">
        {{productInfo.cname}}        
      </div>
    </div>
  </div>
</template>

<script>
export default{
  created(){
    this.getDetail();
  },
  data () {
    return {
      location:{lng:this.$route.params.lng, lat:this.$route.params.lat},
      zoom:20,
      mapstyle:{
        height:window.screen.availHeight  + 'px' ,
        width:window.screen.availWidth  + 'px'
      },
      productInfo:''
    }
  },
  methods:{
    getDetail () {
      let url = "/api/hotel/info";
      let id = this.$route.params.id;
      let send = {"id": id};
      this.$http.get(url, {params: send}).then((response) => {
        let responseBody = JSON.parse(response.body);
        if (responseBody.status === 1) {
          this.productInfo = responseBody.data;
        } else {
          console.log("请求失败！");
        }
      }, (response) => {
      });
    },
  }
}
</script>


<style lang="less">
  .hotel-map{
    position: relative;
    z-index: 1001;
  }
  .pro_info{
    position: fixed;
    z-index: 10;
    bottom: 0;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 0.3rem 0;
    .inner{
      line-height: 1.5rem;
      height: 1.5rem;
      font-size: 0.7rem;
      padding: 0 0.5rem 0 1.5rem;
      background-image: url('/static/images/hotel/icon-map.png');
      background-repeat: no-repeat;
      background-position: 0.5rem center;
      background-size: 0.5rem;
    }    
  }
</style>
