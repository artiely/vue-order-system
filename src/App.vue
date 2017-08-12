<template>
  <div id="app">
    <transition :name="transitionName" appear>
      <keep-alive>
        <router-view class="RouterView"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'app',
    data(){
      return {
        transitionName: 'slide-left'
      }
    },
    watch: {
      '$route': {
        handler(val, oval) {
          let isBack = this.$router.isBack;
          if (isBack) {
            this.transitionName = 'slide-right'
            if(val.path=='/login'){
              this.$router.push('/index')
            }
          } else {
            this.transitionName = 'slide-left'
          }
          this.$router.isBack = false
        }
      },
    },
  }
</script>
