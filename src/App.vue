<template>
  <div id="app"> 
    <suspend-ball></suspend-ball>
    <router-view></router-view>    
  </div>
</template>

<script>
import Home from './views/home/Home'
import SuspendBall from './components/SuspendBall'
import wx from 'weixin-js-sdk'
export default {
  name: 'app',
  components: {
    Home,
    SuspendBall
  }
}
</script>

<style>
</style>
