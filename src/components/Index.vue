<template>
  <div class="index">
    <mt-header fixed title="FWONE">
      <mt-button icon="more" slot="right" @click="showSheet"></mt-button>
    </mt-header>
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
  </div>
</template>

<script >
  import {
    Toast
  } from 'mint-ui';
  export default {
    name: 'index',
    data() {
      return {
        sheetVisible: false,
        actions: [],
        banners: ['statics/mobile/img/2.jpg', 'statics/mobile/img/1.jpg'],
        swiperOption: {
          autoplay: 5000,
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
        Toast('敬请期待完善')
        this.locale = 0
        console.log('改成英文了')
      },
      CNFN() {
        this.locale = 1
        console.log('改成中文了')
      },
    },
    watch: {
      locale: function(val) {
        console.log('语言改变了', val)
        if (val == 1) {
          this.$i18n.locale = 'CN'
        } else {
          this.$i18n.locale = 'EN'
        }
      }
    },
    mounted() {
      this.actions = [{
        name: 'English',
        method: this.ENFN
      }, {
        name: '中文',
        method: this.CNFN
      }];
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
    height: 125px;
    background: yellow;
    margin: 0;
  }
  .swiper-slide img {
    width: 100%;
    height: 125px;
  }
</style>
