<template >
  <div id="app" >
    <transition :name="transitionName"   appear>
      <router-view  class="RouterView"></router-view >
    </transition>
  </div >
</template >
<script >
  export default {
    name: 'app',
    data(){
      return {
         transitionName: 'slide-left'
      }
    },
    watch:{
      '$route': {
        handler(val, oval) {
          console.log("p路径改变了", val)
          let isBack=this.$router.isBack;
          if (isBack) {
              this.transitionName = 'slide-right'
            } else {
              this.transitionName = 'slide-left'
            }
            this.$router.isBack = false
          console.info("isback",isBack)

        }
      },
    },
  }
</script >
