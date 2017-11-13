<template>
  <div class="urge">
    <mt-header :title="$t('message.Call_reminder')" fixed style="z-index: 9;">
      <mt-button icon="back" @click="back" slot="left">{{$t('message.Back')}}</mt-button>
    </mt-header>
    <scroller :on-refresh="onRefresh" ref="myScroller" class="page-content" :on-infinite="onInfinite"
              :refreshText="$t('message.Pull_to_refresh')"
              :noDataText="$t('message.No_more_data')">
      <div style="margin-bottom: 10px;">
        <table class="order-item" v-for="(item,index) in orderList" :key="index"
               @click="showOrderDetail({id:item.callId,oid:item.orderNumber})">
          <tr class="border-bottom" style="line-height: 25px">
            <td colspan="2"> <span class="label">{{$t('message.NO')}}</span>{{item.orderNumber}}</td>
          </tr>
          <tr>
            <td> <span class="label">催单人</span></td>
            <td>{{item.createPersonName}}</td>
          </tr>
          <tr>
            <td> <span class="label"><!--{{$t('message.status')}}：-->受理状态</span></td>
            <td>
              <span v-if="item.processDate" class="bluebg span">已受理</span> <span v-else class="redbg span">待受理</span>
            </td>
          </tr>
          <tr v-if="item.processName">
            <td> <span class="label">受理人 </span></td>
            <td>{{item.processName}}</td>
          </tr>
          <tr>
            <td><span class="label">催单时间</span></td>
            <td><span class="label">{{item.createDate}}</span></td>
          </tr>
          <tr>
            <td><span class="label">预约时间</span></td>
            <td style="color:#26a2ff">{{item.reservationTimeEntity.reservationDate.substr(0,10)}} {{item.reservationTimeEntity.startTime}} - {{item.reservationTimeEntity.endTime}}</td>
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
        this.$store.commit('GET_ORDER_NUMBER', {id: parames.id, oid: parames.oid})
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
<style scoped lang="less">
  span.label{
    color: #999;
  }
  .page-content {
    padding-top: 40px;
    font-size: 13px;
  }

  .order-item {
    background: #fff;
    margin-bottom: 10px;
    width: 100%;
    border-left: 2px solid #26a2ff;
    padding-left: 4px;
    padding-right: 4px;
    box-shadow: 0 0 2px rgba(0, 0, 0, .1);
  }

  .order-item tr td:nth-of-type(1) {
    text-align: left;
    width:70px;
    .label{
      width:70px;
      display:inline-block
    }
  }

  .order-item tr td:nth-of-type(2) {
    text-align: left;
  }
</style>
