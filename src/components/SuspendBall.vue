<template>
<div class="user-function" :class="{ani:moveAni}" @touchmove="logoMove" :style="{transform:'translate('+logoPositionX+'px,'+logoPositionY+'px)'}" @touchend="logoReposition" @touchstart="moveAni=false" @click="navDis=!navDis">
  <div class="logo"><img v-if="shopinfo != ''" :src="shopinfo.logo"></div>
  <div class="memu" :class="{active:navDis,left:whichSide=='left',right:whichSide=='right'}">
    <ul>
      <router-link class="n1" to="/home">首页</router-link>
      <span class="n2" @click="callTel()">客服</span>
      <router-link class="n3" to="/userCenter">我的</router-link>
    </ul>
  </div>
</div>
</template>

<script>
export default{
  created: function () {
    this.getShopInfo()
  },
  data:function(){
    return{
      shopinfo:'',
      whichSide:'right',
      moveAni:false,
      logoPositionX:window.screen.width-54,
      logoPositionY:window.screen.height*0.6,
      screenHeight:window.screen.height,
      screenWidth:window.screen.width,
      navDis:false
    }
  },
  methods:{
    getShopInfo:function(){
      var url = '/api/home/shop_info'
      this.$http.get(url).then(function(result){
        let rst = JSON.parse(result.body)
        if (rst.status == 1) {
          this.shopinfo = rst.data
          this.$store.commit('shopInfoSave',rst.data)
        }else{
          console.log(rst.msg)
        }      
      });
    },
    callTel:function(){
      window.location.href = 'tel:'+this.shopinfo.phone
    },
    logoMove:function(e){
      this.navDis = false
      e.preventDefault()
      var touchX = e.changedTouches[0].clientX
      var touchY = e.changedTouches[0].clientY
      if (touchX >= 0) {
        if (touchX < this.screenWidth) {
          this.logoPositionX = touchX-27
        }else {
          this.logoPositionX = this.screenWidth-54
        }
      }else {
        this.logoPositionX = 0
      }
      if (touchY >= 0) {
        if (touchY < this.screenHeight) {
          this.logoPositionY = touchY-27
        }else {
          this.logoPositionY = this.screenHeight-54
        }
      }else {
        this.logoPositionY = 0
      }
    },
    logoReposition:function(){
      this.moveAni = true
      if (this.logoPositionX <= this.screenWidth/2) {
        this.logoPositionX = 0
      }else {
        this.logoPositionX = this.screenWidth - 54
      }
    }
  },
  watch:{
    logoPositionX:function(str){
      if (str <= this.screenWidth/2) {
        this.whichSide = 'left'
      }else {
        this.whichSide = 'right'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-function{
  position: fixed;top: 0;left: 0;z-index: 1000;
  height: 54px;width: 54px;
  &.ani{transition: ease-in-out 0.1s;}
  .logo{
    position: relative;z-index: 99;
    height: 50px;width: 50px;border:2px solid #fff;
    border-radius: 50px;overflow: hidden;
    background-color: #58a6ea;color: #fff;line-height: 50px;
    font-size: 0.7rem;text-align: center;
    img {
      height: 50px;
      width: 50px;
    }
  }
  .memu{
    transition: ease-in-out 0.1s;
    position: absolute;top: 5px;
    background-color: #58a6ea;height: 44px;overflow: hidden;
    padding: 0;border-radius: 25px;width: 0px;
    &.left{
      left: 27px;
      &.active{width: 130px; padding: 0 20px 0 35px;}
    }
    &.right{
      right: 27px;
      &.active{width: 130px; padding: 0 35px 0 20px;}
    }
    a,span{
      display: block;text-align: center;
      font-size: 12px;color: #fff;
      height: 15px;line-height: 15px; 
      float: left;
      width: 33.33%;
      padding-top: 27px;
      background-position: center 4px;
      background-size: 21px;
      background-repeat: no-repeat;
      &.n1{background-image: url('/static/images/home/icon-home.png');}
      &.n2{background-image: url('/static/images/home/icon-contact.png');}
      &.n3{background-image: url('/static/images/home/icon-user.png');}
    }
  }
}
</style>
