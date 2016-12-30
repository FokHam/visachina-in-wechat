<template>
  <div id="app">
    <nav>
      <router-link to="/home">首页</router-link>
      <router-link to="/visa">签证</router-link>
      <router-link to="/insurance">保险</router-link>
      <router-link to="/wifi">wifi</router-link>
      <router-link to="/hotel">酒店</router-link>
    </nav>
    <suspend-ball></suspend-ball>
    <router-view></router-view>
  </div>
</template>

<script>
import Home from './views/home/Home'
import SuspendBall from './components/SuspendBall'
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
