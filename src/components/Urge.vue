<template>
  <div class="urge">
    <mt-header :title="$t('message.Call_reminder')" fixed style="z-index: 9;">
      <mt-button icon="back" @click="back" slot="left">{{$t('message.Back')}}</mt-button>
    </mt-header>
    <scroller :on-refresh="onRefresh" ref="myScroller" class="page-content" :on-infinite="onInfinite"
              :refreshText="$t('message.Pull_to_refresh')"
              :noDataText="$t('message.No_more_data')">
      <div style="background:#f8f8f8;">
        <table class="order-item" v-for="(item,index) in orderList" :key="index"
               @click="showOrderDetail({id:item.callId,oid:item.orderNumber})">
          <tr>
            <td colspan="2"> <span class="label">{{$t('message.NO')}}：</span>{{item.orderNumber}}</td>
          </tr>
          <tr>
            <td> <span class="label">{{$t('message.Requestor')}}：</span></td>
            <td>{{item.processName}}</td>
          </tr>
          <tr v-if="item.companyName">
            <td> <span class="label">{{$t('message.Company')}}：</span></td>
            <td>{{item.companyName}}</td>
          </tr>
          <tr>
            <td><span class="label">{{$t('message.Appointment_time')}}：</span></td>
            <td>{{item.processDate}}</td>
          </tr>
        </table>
      </div>
    </scroller>
  </div>
</template>
<script>
  import axios from 'axios'
  import $ from 'n-zepto'
  import {mapState} from 'vuex';
  export default {
    name: 'urge',
    data () {
      return {
        orderList: [],
        page: 1
      }
    },
    computed: mapState({
//      state: state => state.urge,
    }),
    methods: {
      back() {
        this.$router.goBack()
      },
      showOrderDetail(parames){
        this.$store.dispatch('get_order_number', {id: parames.id, oid: parames.oid})
        this.$router.push({path: '/orderdetail'})
      },
      onRefresh(done){
        this.page = 1
        this.getData(() => {
          done(true)
        })
      },
      onInfinite(done){
        this.page++
        this.getData(() => {
          done(true)
        })
      },
      getData(cb){
        this.$api.get_reminder_list({page: this.page, limit: 10}).then(res => {
          if (this.page == 1) {
            this.orderList = res.list
          } else {
            this.orderList = this.orderList.concat(res.list)
          }

          if (cb && typeof cb == 'function') {
            cb()
          }
        }).catch(err => console.log(err))
      }
    },

    created(){
      this.getData()
    },
    mounted(){

    }
  }
</script>
<style scoped>
  span.label{
    color: #999;
  }
  .page-content {
    padding-top: 40px;
    font-size: 14px;
  }

  .order-item {
    background: #fff;
    margin-bottom: 10px;
    width: 100%;
    border-left: 2px solid #26a2ff;
    padding-left: 4px;
    padding-right: 4px;
  }

  .order-item tr td:nth-of-type(1) {
    text-align: left;
  }

  .order-item tr td:nth-of-type(2) {
    text-align: right;
  }
</style>
