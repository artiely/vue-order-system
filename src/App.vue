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
<style lang="less">
  #app{
    .mint-navbar .mint-tab-item.is-selected{
      margin-bottom: 0;
    }
    .RouterView{
      background: #f3f9fd;
    }
    .mint-header{
      background: #00deff;
      background: -webkit-linear-gradient(315deg,#00deff 0,#02caff 56%,#03b5ff 100%);
      background: -o-linear-gradient(315deg,#00deff 0,#02caff 56%,#03b5ff 100%);
      background: linear-gradient(135deg,#00deff 0,#02caff 56%,#03b5ff 100%);
      box-shadow: 0 1px 3px rgba(3,81,55,.5);
    }
    .mu-text-field {
      width: 100%;
      padding-left: 10px;
    }
    .mu-text-field.error .mu-text-field-help {
      padding-left: 10px !important;
    }
  }
</style>
