<template >
  <div class="balance" >
    <mt-header title="我的催单" fixed style="z-index: 9;" >
      <mt-button icon="back" @click="back" slot="left" >返回</mt-button >
    </mt-header >

    <scroller :on-refresh="onRefresh" ref="myScroller" class="page-content" :on-infinite="onInfinite">
      <div style="background:#f8f8f8;">
    <table class="order-item" v-for="(item,index) in state.orderList" :key="index" @click="showOrderDetail({id:item.callId,oid:item.orderNumber})">
     <tr><td>订单号：{{item.orderNumber}}</td></tr>
      <tr><td>报修人：</td><td>{{item.processName}}</td></tr>
      <tr v-if="item.companyName"><td>报修公司：</td><td>{{item.companyName}}</td></tr>
      <tr><td>最后可上门时间：</td><td>{{item.processDate}}</td></tr>
    </table>
      </div>
    </scroller>
  </div >
</template >
<script type="text/ecmascript-6" >
  import axios from 'axios'
  import $ from 'n-zepto'
  import { mapState } from 'vuex';
  export default {
    name: 'balance',
    data () {
      return {
      }
    },
    computed :mapState ({
      state: state => state.urge,
    }),
    methods: {
      back() {
        this.$router.go(-1)
      },
      showOrderDetail(parames){
        this.$store.dispatch('get_order_number',{id:parames.id,oid:parames.oid})
        this.$router.push({path:'/orderdetail'})
      },
      onRefresh(done){
        this.$store.dispatch('get_urge_data',{cb:function(){done(true)},refresh:true})
      },
      onInfinite(done){
        this.$store.dispatch('get_urge_data',{cb:function(){done(true)},refresh:false})
      }

    },

    created(){
      this.$store.dispatch('get_urge_data',{cb:function(){},refresh:true})
    },
    mounted(){

    }
  }
</script >
<style scoped>
  .page-content{
    padding-top: 40px;
  }
  .order-item{
    background: #fff;
    margin-bottom: 10px;
    width: 100%;
    border-left:2px solid #26a2ff;
    padding-left: 4px;
    padding-right: 4px;
  }
.order-item tr td:nth-of-type(1){
  text-align: left;
}
.order-item tr td:nth-of-type(2){
  text-align: right;
}
</style >
