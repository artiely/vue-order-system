<template>
  <div class="reject">
    <div>
      <!--<i class="iconfont icon-success" style="font-size: 84px;color: #5edc7b"></i>-->
      <div class="video-success">
        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="0" cy="0" r="0" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
      </div>
      <p class="t">交易金额：{{payResult.orderPrice | formatMoney}}元</p>
      <p class="t">订单号：{{payResult.orderNo}}</p>
      <p class="t">交易时间：{{payResult.orderTime}}</p>
<!--  <router-link :to="{path:payResult.backPath}" replace>返回订单页</router-link>
      <div style="height: 40px"></div>-->
      <router-link to="/index" replace>返回首页</router-link>
    </div>
  </div>
</template>
<script>
  import { GetQueryString } from '@/utils'
  export default {
    name: 'reject',
    data () {
      return {
        state: '',
        payResult : {}
      }
    },
    filters : {
      formatMoney : function (value) {
        return Number(value).toFixed(2);
      }
    },
    methods:{
      toOrder(){
        this.$router.push('/order')
      }
    },
    activated(){
      this.payResult = this.$route.query
    }
  }
</script>
<style scoped lang="less">
  .video-success {
    width: 100px;
    height: 60px;
    margin:40px auto 0 auto;
  }
  .video-success .checkmark__circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: #5edc7b;
    fill: none;
    -webkit-animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
  }
  .video-success .checkmark {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: block;
    stroke-width: 2;
    stroke: #fff;
    stroke-miterlimit: 10;
    margin: 10% auto;
    box-shadow: inset 0px 0px 0px #5edc7b;
    -webkit-animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
    animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
  }
  .video-success .checkmark__check {
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    -webkit-animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
  }
  @-webkit-keyframes stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }
  @keyframes stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }
  @-webkit-keyframes scale {
    0%, 100% {
      -webkit-transform: none;
      transform: none;
    }
    50% {
      -webkit-transform: scale3d(1.1, 1.1, 1);
      transform: scale3d(1.1, 1.1, 1);
    }
  }
  @keyframes scale {
    0%, 100% {
      -webkit-transform: none;
      transform: none;
    }
    50% {
      -webkit-transform: scale3d(1.1, 1.1, 1);
      transform: scale3d(1.1, 1.1, 1);
    }
  }
  @-webkit-keyframes fill {
    100% {
      box-shadow: inset 0px 0px 0px 30px #5edc7b;
    }
  }
  @keyframes fill {
    100% {
      box-shadow: inset 0px 0px 0px 30px #5edc7b;
    }
  }
  .t {
    font-size: 12px;
  }
  .info-box {
    background: #fff;
    padding: 20px;
    text-align: center;
    font-size: 20px;
    color: #999;
  }

  .help {
    font-size: 10px;
    color: rgba(206, 129, 17, 0.64);
    padding-left: 10px;
  }

  .help.is-danger {
    font-size: 10px;
    color: #f00;
    text-align: left;
    padding-left: 10px;
  }

</style>
