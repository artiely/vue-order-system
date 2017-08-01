<template>
  <div class="home">
 <transition :name="transitionName"  appear>
    <keep-alive>
    <router-view class="Router"></router-view>
      </keep-alive>
    </transition>
    <mt-tabbar v-model="selected" fixed>

      <mt-tab-item id="home">
        <i slot="icon" class="iconfont icon-homepage"></i>
        {{ $t('message.home')}}
      </mt-tab-item>
      <mt-tab-item id="shop">
        <i slot="icon" class="iconfont icon-service"></i>
        {{ $t('message.service')}}
      </mt-tab-item>
      <mt-tab-item id="order">
        <i slot="icon" class="iconfont icon-createtask"></i>
        {{ $t('message.order')}}
      </mt-tab-item>
      <mt-tab-item id="user">
        <i slot="icon" class="iconfont icon-people"></i>
        {{ $t('message.user')}}
      </mt-tab-item>
    </mt-tabbar>

  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      selected:'home',
      transitionName: 'slide-right'
    }
  },
  beforeRouteUpdate (to, from, next) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    console.log(toDepth,fromDepth)
    this.transitionName = toDepth > fromDepth ? 'slide-right' : 'slide-left'
    next()
  },
  watch: {
    selected: function (val, oldVal) {
      // 这里就可以通过 val 的值变更来确定
      console.log(val)
      switch (val){
        case 'home':
          this.$router.push({name: 'index', path: 'index'});
          break;
        case 'shop':
          this.$router.push({name: 'shop', path: 'shop'});
          break;
        case 'order':
          this.$router.push({name: 'order', path: 'order'});
          break;
        case 'user':
          this.$router.push({name: 'user', path: 'user'});
          break;
      }},
    '$route':{
      handler(val,oval){
        console.log("路径改变了",val)
        this.selectPath()
      }
    },
//    '$route' (to, from) {
//      const toDepth = to.path.split('/').length
//      const fromDepth = from.path.split('/').length
//      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
//    }
  },
  methods:{
    selectPath(){
      console.log('home-router',this.$route.path)
      var urlmark=  this.$route.path;
      console.log(urlmark)
      switch (urlmark){
        case '/home':
          this.selected='home';
          break;
        case '/':
          this.selected='home';
          break;
        case '/index':
          this.selected='home';
          break;
        case '/shop':
          this.selected='shop';
          break;
        case '/order':
          this.selected='order';
          break;
        case '/user':
          this.selected='user';
          break;
      }
    }
  },
  mounted(){
   this.selectPath()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Router{
   position: absolute;
     width: 100%;
     transition: all .8s ease;
     top: 0px;
     background:#fff
}
  .home{
    margin: 0;
  }
h1, h2 {
  font-weight: normal;
}
.swiper-wrapper{
  width: 100%;
  height:200px;
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
