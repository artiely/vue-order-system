<template>
  <div class="record">
    <mt-header :title="$t('message.record')" fixed style="z-index: 10;">
      <mt-button icon="back" @click="back" slot="left">{{$t('message.Back')}}</mt-button>
    </mt-header>
    <mt-navbar v-model="selected" fixed style="top: 40px;">
      <mt-tab-item id="1">{{$t('message.Recharge')}}</mt-tab-item>
      <mt-tab-item id="2">{{$t('message.consumption')}}</mt-tab-item>
      <mt-tab-item id="0">{{$t('message.all')}}</mt-tab-item>
    </mt-navbar>
    <scroller style="padding-top: 80px;height: 100vh;box-sizing: border-box;background:#fff;"
              :on-infinite="onInfinite"
              :on-refresh="onRefresh"
              ref="myScroller"
              :refreshText="$t('message.Pull_to_refresh')"
              :noDataText="$t('message.No_more_data')">
      <div>

        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <mt-cell v-for="item in dataList1">
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
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <mt-cell v-for="item in dataList2">
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
          </mt-tab-container-item>
          <mt-tab-container-item id="0">
            <mt-cell v-for="item in dataList0">
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
          </mt-tab-container-item>
        </mt-tab-container>

        <!-- <mt-cell v-for="item in dataList">
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
         </mt-cell>-->
      </div>

    </scroller>
  </div>
</template>
<script>
  export default {
    name: 'record',
    data() {
      return {
        selected: '1',
        dataList1: [],// all
        dataList2: [],// all
        dataList0: [],// all
        page1: 1,
        page2: 1,
        page0: 1,
      }
    },
    watch: {
      selected: {
        handler(val) {
          this.$refs.myScroller.scrollTo(0, 0, false)
//          this.page = 1
//          this.dataList = []
//          this.getData()
        }
      }
    },
    methods: {
      back() {
        this.$router.back()
      },
      getData(page, type, cb) {
        this.$api.QUERY_BALANCE({page: page, limit: 10, consumeType: type}).then(res => {
          res.list.map(item => {
            if (item.price.indexOf('-') == '-1') {
              item.add = 1
            } else {
              item.add = 0
            }
          })
          if (type == 1) {
            if (page == 1) {
              this.dataList1 = res.list
            } else {
              this.dataList1 = this.dataList1.concat(res.list)
            }
          } else if (type == 2) {
            if (page == 1) {
              this.dataList2 = res.list
            } else {
              this.dataList2 = this.dataList2.concat(res.list)
            }
          } else {
            if (page == 0) {
              this.dataList0 = res.list
            } else {
              this.dataList0 = this.dataList0.concat(res.list)
            }
          }
          cb && cb()
        })
      },
      onInfinite(done) {
        console.log(3333)
        switch (this.selected) {
          case '1':
            this.getData(this.page1++, 1, () => {
              done(true)
            });
            console.log(1111111)
            break
          case '2':
            this.getData(this.page2++, 2, () => {
              done(true)
            });
            console.log(222222)
            break
          case '0':
            this.getData(this.page0++, 0, () => {
              done(true)
            });
            console.log('00000000')
            break
        }
      },
      onRefresh(done) {
        this.dataList1 = []
        this.dataList2 = []
        this.dataList0 = []
        this.getData(1, 1, () => {
          done(true)
        })
        this.getData(1, 2, () => {
          done(true)
        })
        this.getData(1, 0, () => {
          done(true)
        })
      }
    },
    activated() {
      this.dataList1 = []
      this.dataList2 = []
      this.dataList0 = []
      this.getData(1, 1)
      this.getData(1, 2)
      this.getData(1, 0)
    }
  }
</script>
<style scoped lang="less">
  .mint-navbar .mint-tab-item {
    padding: 13px 0;
  }

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
