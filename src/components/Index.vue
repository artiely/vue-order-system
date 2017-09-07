<template>
  <div class="index">
    <mt-header fixed title="FWONE">
      <mt-button icon="more" slot="right" @click="showSheet"></mt-button>
    </mt-header>
    <scroller >
    <div class="page-content">
      <swiper :options="swiperOption" class="swiper-box">
        <div class="swiper-slide" v-for="banner in banners">
          <img :src="banner">
        </div>
      </swiper>
    </div>
    <div>
      <p>{{$t('message.des')}}</p>
      <p>{{$t('message.title')}}</p>
    </div>
    <mt-actionsheet :actions="actions" :closeOnClickModal='true' cancelText="取消(cancel)" v-model="sheetVisible">
    </mt-actionsheet>
  </scroller>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        sheetVisible: false,
        actions: [],
        banners: ['statics/mobile/img/a.jpg', 'statics/mobile/img/b.jpg','statics/mobile/img/c.jpg','statics/mobile/img/d.jpg'],
        swiperOption: {
          autoplay: 2000,
          initialSlide: 1,
          loop: true,
          pagination: '.swiper-pagination',
          onSlideChangeEnd: swiper => {
            console.log('onSlideChangeEnd', swiper.realIndex)
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
        this.locale = 0
        window.location.reload()
      },
      CNFN() {
        this.locale = 1
        window.location.reload()
      },
    },
    watch: {
      locale: function (val) {
        if (val == 1) {
          this.$i18n.locale = 'CN'
          window.localStorage.setItem('lang', 'CN')
        } else {
          this.$i18n.locale = 'EN'
          window.localStorage.setItem('lang', 'EN')
        }
      }
    },
    created(){
    },
    mounted() {
      this.actions = [{
        name: 'English',
        method: this.ENFN
      }, {
        name: '中文',
        method: this.CNFN
      }];
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
