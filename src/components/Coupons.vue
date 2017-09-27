<template>
  <div class="coupons">
    <mt-header fixed title="我的优惠券">
      <mt-button icon="back" slot="left" @click="back"></mt-button>
    </mt-header>
    <scroller style="padding-top: 40px"
              :on-infinite="onInfinite"
              :on-refresh="onRefresh"
              :refreshText="$t('message.Pull_to_refresh')"
              :noDataText="$t('message.No_more_data')">
      <mt-navbar v-model="selected">
        <mt-tab-item id="0">可使用</mt-tab-item>
        <mt-tab-item id="1">已使用/已过期</mt-tab-item>
      </mt-navbar>

      <div v-for="item in DataList" class="coupons-item redbg " :class="selected==1?'expire':''"
           style=";text-align: left;padding: 6px;margin-bottom: 2px">
        <div class="dot-line left">
          <div v-for="i in 10" class="o-o"></div>
        </div>
        <div class="dot-line right" >
          <div v-for="i in 10" class="o-o"></div>
        </div>
        <div style="display: flex">
          <div style="font-size: 14px;margin: 0;padding: 6px;box-sizing: border-box;flex: 1">
            <table style="width: 100%" cellspacing="0" border="0" cellpadding="0">
              <tr>
                <td rowspan="2">￥<span style="font-size: 40px">{{item.amount}}</span></td>
                <td style="text-align: right"><div>优惠券</div></td>
              </tr>
              <tr>
                <td style="text-align: right"><div style="font-size: 10px"> 不可叠加</div></td>
              </tr>
            </table>
            <div style="font-size: 10px">请于{{item.expEndDate}}前使用</div>
          </div>
          <div style="width: 80px;border-left: 1px dashed #fff;padding: 8px;font-size: 20px;line-height: 58px;">
            <span v-if="item.state==0&&selected!=1">可使用</span>
            <span v-if="item.state==1">已使用</span>
            <span v-if="item.state==0&&selected==1">已过期</span>
          </div>
        </div>
      </div>

    </scroller>
  </div>
</template>
<script>
  import { GetQueryString } from '@/utils'
  export default {
    name: 'coupons',
    data () {
      return {
        selected: '0',
        params: {
          page: 1,
          limit: 10,
          state: 0, // 表示未使用、1表示已使用
          expire: 0 // 表示未过期、1表示已过期
        },
        DataList: []
      }
    },
    watch: {
      selected: {
        handler(val){
            this.params.page = 1
            this.DataList = []
            this.getData()
        }
      }
    },
    methods: {
      back(){
        this.$router.back()
      },
      getData(cb){
        if(this.selected==0){
          this.$api.COUPON(this.params).then(res => {
            if (res.code == 0) {
              if (this.params.page == 1) {
                this.DataList = res.page.list
              } else {
                this.DataList = this.DataList.concat(res.page.list)
              }
              cb && cb()
            } else {
              alert(JSON.stringify(res))
            }
          })
        }else{
          this.$api.UN_COUPON({page:this.params.page,limit:10}).then(res => {
            if (res.code == 0) {
              if (this.params.page == 1) {
                this.DataList = res.page.list
              } else {
                this.DataList = this.DataList.concat(res.page.list)
              }
              cb && cb()
            } else {
              alert(JSON.stringify(res))
            }
          })
        }

      },
      onRefresh(done){
        this.params.page=1
        this.getData(() => {done(true)})
      },
      onInfinite(done){
        this.params.page++
        this.getData(() => {done(true)})
      }
    },
    activated(){
      this.params.page = 1
      this.getData()
    }
  }
</script>
<style scoped lang="less">

  .expire {
    color: #999;
    background: #eee;
  }

  .card {
    p {
      margin: 0;
    }
  }
</style>
