<template>
  <div class="app-wrapper">
    <transition name="fade">
      <router-view class="wrapper"></router-view>
    </transition>
  </div>
</template>

<script>
import './styles/reset.css'
import './styles/global.less'

export default {
  name: 'app'
}
</script>

<style media="screen">
  html {
    height: 100%
  }

  .wrapper {
    position: relative;
    height: 100%;
  }
</style>
