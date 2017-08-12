<template>
  <div class="home">
    <transition :name="transitionName" appear>
      <keep-alive>
        <router-view class="Router"></router-view>
      </keep-alive>
    </transition>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="1">
        <i slot="icon" class="iconfont icon-homepage"></i> {{ $t('message.home')}}
      </mt-tab-item>
      <mt-tab-item id="2">
        <i slot="icon" class="iconfont icon-service"></i> {{ $t('message.service')}}
      </mt-tab-item>
      <mt-tab-item id="3">
        <i slot="icon" class="iconfont icon-createtask"></i> {{ $t('message.order')}}
      </mt-tab-item>
      <mt-tab-item id="4">
        <i slot="icon" class="iconfont icon-people"></i> {{ $t('message.user')}}
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        selected: '1',
        transitionName: 'slide-right'
      }
    },

    watch: {
      selected: function(val, oldVal) {
        // 这里就可以通过 val 的值变更来确定
        console.info(val)
        switch (val) {
          case '1':
            this.$router.push({
              name: 'index',
              path: 'index'
            });
            break;
          case '2':
            this.$router.push({
              name: 'shop',
              path: 'shop'
            });
            break;
          case '3':
            this.$router.push({
              name: 'order',
              path: 'order'
            });
            break;
          case '4':
            this.$router.push({
              name: 'user',
              path: 'user'
            });
            break;
        }
        if(val>oldVal){
          this.transitionName='slide-left'
        }else{
          this.transitionName='slide-right'
        }
      },
      $route:{
          handler(val){
            if(val.path=='/index'){
                this.selected='1'
            }
          }
      }


    },

    methods: {
      selectPath() {
        var urlmark = this.$route.path;
        switch (urlmark) {
          case '/home':
            this.selected = '1';
            break;
          case '/':
            this.selected = '1';
            break;
          case '/index':
            this.selected = '1';
            break;
          case '/shop':
            this.selected = '2';
            break;
          case '/order':
            this.selected = '3';
            break;
          case '/user':
            this.selected = '4';
            break;
        }
      }
    },
    mounted() {
      this.selectPath()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .Router {
    position: absolute;
    width: 100%;
    transition: all .28s ease-out;
    top: 0px;
    background: #fff;
    height: 100vh
  }
  .home {
    margin: 0;
  }
  h1,
  h2 {
    font-weight: normal;
  }
  .swiper-wrapper {
    width: 100%;
    height: 200px;
    background: yellow;
    margin: 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
