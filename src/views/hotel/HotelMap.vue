<template lang="html">
  <div class="hotel-map">
    <baidu-map>
      <map-view class="map-view" :style="mapstyle" :center="location" :zoom="zoom">
        <map-overlay-marker :point="location" :dragging="false" animation="BMAP_ANIMATION_BOUNCE"/>
    </map-view>
    </baidu-map>
  </div>
</template>

<script>

export default{
  data () {
    return {
      location:{lng:this.$route.params.lng, lat:this.$route.params.lat},
      zoom:20,
      mapstyle:{
        height:window.screen.availHeight  + 'px' ,
        width:window.screen.availWidth  + 'px'
      }
    }
  }
}
</script>


<style lang="less">

</style>
