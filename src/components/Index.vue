<template>
  <div class="index">
    <mt-header fixed title="FWONE">
      <mt-button icon="more" slot="right" @click="showSheet"></mt-button>
    </mt-header>
    <scroller>
      <div style="padding-bottom: 80px">
        <div class="page-content">
          <swiper :options="swiperOption" class="swiper-box">
            <div class="swiper-slide" v-for="banner in banners">
              <img :src="banner">
            </div>
          </swiper>
        </div>
        <div>
          <div
            style="color: #9e9e9e;margin: 10px auto ;width: 90%;border-radius: 10px;padding:4px 6px;background:#fff;">
            <p>{{$t('message.des')}}</p>
          </div>
          <div style="color: #9e9e9e;margin: 10px auto ;width: 90%;border-radius: 10px;padding:4px 6px;background:#fff">
            <p>{{$t('message.title')}}</p>
          </div>
          <p style="font-size: 12px;color: #999"> ©2011-2017 <span >fwone.com</span > <span lang>版权所有</span><br>
            京ICP备 11003662号 | 公网安备11010502025657号</p>
        </div>
      </div>
    </scroller>
    <mt-actionsheet :actions="actions" :closeOnClickModal='true' cancelText="取消(cancel)" v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        sheetVisible: false,
        actions: [],
        banners: ['statics/mobile/img/a.jpg', 'statics/mobile/img/b.jpg', 'statics/mobile/img/c.jpg', 'statics/mobile/img/d.jpg'],
        swiperOption: {
          autoplay: 2000,
          initialSlide: 1,
          loop: true,
          pagination: '.swiper-pagination',
          onSlideChangeEnd: swiper => {
//            console.log('onSlideChangeEnd', swiper.realIndex)
          }
        },
        locale: 'CN'
      }
    },
    methods: {
      showSheet() {
        this.sheetVisible = true
      },
      ENFN() {
        this.locale = 'EN'
        window.location.reload()
      },
      CNFN() {
        this.locale = 'CN'
        window.location.reload()
      },
      TNFN() {
        this.locale = 'TN'
        window.location.reload()
      },
    },
    watch: {
      locale: function (val) {
        if (val == 'CN') {
          this.$i18n.locale = 'CN'
          window.localStorage.setItem('lang', 'CN')
        } else if (val == 'EN') {
          this.$i18n.locale = 'EN'
          window.localStorage.setItem('lang', 'EN')
        } else if (val == 'TN') {
          this.$i18n.locale = 'TN'
          window.localStorage.setItem('lang', 'TN')
        } else {
          this.$i18n.locale = 'CN'
          window.localStorage.setItem('lang', 'CN')
        }
      }
    },
    created(){
      this.$api.get_user_id().then((r) => { // 获取userid作为登录凭证
        if (r.code == ERR_OK) {
          let userId = r.user.id;
          let personId = r.user.personId;
          this.$store.dispatch('login', {userId, personId});
          this.$api.CHECK_ACCOUNT().then(res => { // 判断注册信息是否完善
            if (res.code === 0) {
              if (res.state == 4) { // 不完善
                this.$router.push('/type?state=4')
              } else if (res.state == 7) {
                this.$router.push('/reject?state=7')
                return
              } else if (res.state == 8) {
                this.$router.push('/reject?state=8')
                return
              } else {

              }
            } else {
              alert(JSON.stringify(res))
            }
          })
        } else {
          this.error = true;
          this.errorMsg = '连接失败'
        }
      })
    },
    activated(){

    },
    mounted() {
      this.actions = [{
        name: 'English',
        method: this.ENFN
      }, {
        name: '中文简体',
        method: this.CNFN
      },
//        {
//          name: '中文繁体',
//          method: this.TNFN
//        }
      ];
      let lang = window.localStorage.getItem('lang');
      if (lang) {
        this.locale = lang
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .page-content {
    padding-top: 40px;
  }

  .swiper-box {
    margin-top: 40px;
    width: 100%;
    font-size: 0;
    background: yellow;
    margin: 0;
  }

  .swiper-slide img {
    width: 100%;
  }
</style>
