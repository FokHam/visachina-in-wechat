<template lang="html">
  <div class="hotel-map">
    <div id="googleMap"></div>
    酒店地图正在开发中
  </div>
</template>

<script>
export default {
  created () {
    this.getMap();
  },
  methods: {
    getMap () {
      let url = "https://maps.googleapis.com/maps/api/staticmap";
      let send = {
        center: this.$store.state.hotel.hotelDetail.latitude + "," + this.$store.state.hotel.hotelDetail.longitude,
        scale: 2,
        size: window.screen.width + "x" + window.screen.height,
        zoom: 14,
        key: "AIzaSyDEzL5GkmtsvXsmKmCBaBn0_OsDHgM4_Rg"
      };
      console.log(send);
      this.$http.get(url, {params: send}).then((response) => {
        console.log(JSON.parse(response.body));
      })
      // let map;
      // let lat = this.$store.state.hotel.hotelDetail.latitude;
      // let lng = this.$store.state.hotel.hotelDetail.longtitude;
      // function initialize() {
      //   let mapDiv = document.getElementById('googleMap');
      //     map = new google.maps.Map(mapDiv, {
      //       center: new google.maps.LatLng(lat,lng),
      //       zoom: 15,
      //       mapTypeId: google.maps.MapTypeId.ROADMAP
      //   });
      //   let marker = new google.maps.Marker({
      //       position: new google.maps.LatLng(lat,lng),
      //       map: map
      //   });
      // }
      // google.maps.event.addDomListener(window, 'load', initialize);
    }
  }
}
</script>

<style lang="less">
  .hotel-map {
    width: 100%;
    height: 100%;
  }
</style>
