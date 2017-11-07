<template>
  <div class="home">
    <transition :name="transitionName" appear>
      <keep-alive>
        <router-view class="Router"></router-view>
      </keep-alive>
    </transition>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="1">
        <i slot="icon" class="iconfont" :class="selected==1?'icon-homepage_fill':'icon-homepage'"></i>
        {{ $t('message.home')}}
      </mt-tab-item>
      <mt-tab-item id="2">
        <i slot="icon" class="iconfont" :class="selected==2?'icon-service_fill':'icon-service'"></i>
        {{ $t('message.service')}}
      </mt-tab-item>
      <mt-tab-item id="3">
        <i slot="icon" class="iconfont " :class="selected==3?'icon-createtask_fill':'icon-createtask'"></i>
        {{ $t('message.order')}}
      </mt-tab-item>
      <mt-tab-item id="4">
        <mt-badge type="error" size="small" style="position: absolute;top:2px;right: 10px;font-size: 8px" v-if="customerNotificationList.length>0">
          {{customerNotificationList.length > 99 ?'99' : customerNotificationList.length}}
        </mt-badge>
        <i slot="icon" class="iconfont" :class="selected==4?'icon-people_fill':'icon-people'"></i> {{ $t('message.user')}}
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import { mapState } from 'vuex';
  export default {
    name: 'home',
    data() {
      return {
        selected: '1',
        transitionName: 'slide-right',
//        customerNotificationList:[]
      }
    },
    computed: mapState({
      customerNotificationList: state => state.userInfo.customerNotificationList
    }),

    watch: {
      selected: function (val, oldVal) {
        // 这里就可以通过 val 的值变更来确定
        console.info(val)
        switch (val) {
          case '1':
            this.$router.push({
              name: 'index',
              path: '/index'
            });
            break;
          case '2':
            this.$router.push({
              name: 'shop',
              path: '/shop'
            });
            break;
          case '3':
            this.$router.push({
              name: 'order',
              path: '/order',
              query: this.$route.query
            });
            break;
          case '4':
            this.$router.push({
              name: 'user',
              path: '/user',
              query: this.$route.query
            });
            break;
        }
        if (val > oldVal) {
          this.transitionName = 'slide-left'
        } else {
          this.transitionName = 'slide-right'
        }
      },
      $route: {
        handler(val){
          let urlmark = val.path;
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
      }

    },

    methods: {
      selectPath() {
        let urlmark = this.$route.path;
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
      },
      getMsg(){
        this.$api.GET_MSG().then(r => {
          if (r.code == 0) {
            if (r.msg && r.msg.perm) {
//              Toast(r.msg.content);
            } else {
//              Toast(r.msg.content);
            }
//            this.getCustomerNotification()
            this.$store.dispatch('getCustomerNotification')
          } else if (r.code == 600) {  //同一个账号最多能同时打开3浏览器窗口
            alert("同一个账号最多能同时打开3浏览器窗口");
            window.close();
            return;
          }
          this.getMsg();
        })
      },
      getCustomerNotification () {
        this.$api.get_notification_list().then(res => {
          if (res.code == ERR_OK) {
            this.customerNotificationList = res.customerNotificationList
          } else {
            alert(`获取消息` + res.msg)
          }
        })
      },
    },
    mounted() {
      this.getMsg();
      this.selectPath()
      this.$api.get_user_id().then((r) => { // 获取userid作为登录凭证
        if (r.code == ERR_OK) {
          let userId = r.user.id;
          let personId = r.user.personId;
          this.$store.dispatch('login', {userId, personId});
          console.log('userId', userId)
          let redirect = decodeURIComponent(this.$route.query.redirect || '/');
        } else {
          this.error = true;
          this.errorMsg = '连接失败'
        }
      })
    },
    activated(){
//      this.getCustomerNotification()
      this.$store.dispatch('getCustomerNotification')
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
    background: #f3f9fd;
    height: 100vh
  }

  .mint-tabbar {
    background: rgba(255, 255, 255, .97);
  }

  .mint-tabbar > .mint-tab-item.is-selected {
    background: transparent;
    color: #03b5ff;
  }

  .mint-tab-item {
    color: #888;
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
    color: lightgray;
  }
</style>
