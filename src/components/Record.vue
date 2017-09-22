<template>
  <div class="record">
    <mt-header title="" fixed style="z-index: 10;">
      <mt-button icon="back" @click="back" slot="left">返回</mt-button>
    </mt-header>
    <!-- tab-container -->
    <scroller style="padding-top: 40px;" :on-infinite="onInfinite">
      <mt-navbar v-model="selected" fixed>
        <mt-tab-item id="1">充值</mt-tab-item>
        <mt-tab-item id="2">消费</mt-tab-item>
        <mt-tab-item id="0">全部</mt-tab-item>
      </mt-navbar>
      <mt-cell v-for="item in dataList">
        <table slot="title" style="text-align: left">
          <tr>
            <td rowspan="2">
              <mt-badge :type="item.add==1?'success':'error'">
                <span class="re-price">{{item.price}}</span>
                <div style="font-size: 10px">{{item.currencyName}}</div>
              </mt-badge>
            </td>
            <td>
              <div style="font-size: 12px;color: #666">{{item.reMark}}</div>
            </td>
          </tr>
          <tr>
            <td>
              <div style="font-size: 10px;color: #999">{{item.receiveDate}}</div>
            </td>
          </tr>
        </table>
      </mt-cell>
    </scroller>
  </div>
</template>
<script>
  export default {
    name: 'record',
    data () {
      return {
        selected: '1',
        dataList: [],// all
        page: 1,
      }
    },
    watch: {
      selected: {
        handler(val){
          this.page = 1
          this.dataList = []
          this.getData()
        }
      }
    },
    methods: {
      back() {
        this.$router.back()
      },
      getData(cb){
        this.$api.QUERY_BALANCE({page: this.page, limit:10, consumeType: this.selected}).then(res => {
          res.list.map(item => {
            if (item.price.indexOf('-') == '-1') {
              item.add = 1
            } else {
              item.add = 0
            }
          })
          if (this.page == 1) {
            this.dataList = res.list
          } else {
            this.dataList = this.dataList.concat(res.list)
          }
          cb && cb()
        })
      },
      onInfinite(done){
        this.page++
        this.getData(function(){
          done(true)
        })
      },
    },
    activated(){
      this.getData()
    }
  }
</script>
<style scoped lang="less">
  .re-cell {
    display: flex;
  }

  .re-left {
    width: 100px;
  }

  .re-price {
    font-size: 14px;
  }

  .re-right {
    flex: 1;
  }

</style>
