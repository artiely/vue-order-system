<template>
  <div class="balance">
    <mt-header :title="$t('message.My_complains')" fixed style="z-index: 9;">
      <mt-button icon="back" @click="back" slot="left">{{$t('message.Back')}}</mt-button>
    </mt-header>
    <mt-navbar v-model="selected" fixed style="top: 40px;">
      <mt-tab-item id="1">{{$t('message.Unprocessed')}}
        <mt-badge type="error" size="small">{{count[0]}}</mt-badge>
      </mt-tab-item>
      <mt-tab-item id="2">{{$t('message.Processed')}}
        <mt-badge type="success" size="small">{{count[1]}}</mt-badge>
      </mt-tab-item>
      <mt-tab-item id="3">{{$t('message.Completed')}}
        <mt-badge type="primary" size="small">{{count[2]}}</mt-badge>
      </mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <scroller
      :on-infinite="onInfinite"
      :on-refresh="onRefresh"
      class="page-content"
      :refreshText="$t('message.Pull_to_refresh')"
      :noDataText="$t('message.No_more_data')"
    >
      <mt-tab-container v-model="selected" class="content">
        <mt-tab-container-item id="1" class="container">
          <div v-if="dataList1.length==0" class="noData"><i class="iconfont icon-zanwushuju"></i></div>
          <div class="cell border-top" v-for="(item,index) in dataList1" :key="item.callId">
            <div class="cellTit border-bottom" @click="showOrderDetail(item)">
              <div class="oNum"><span style="color:#999">{{$t('message.NO')}}</span> {{item.orderNumber}}</div>
              <div class="pull-left"><i class="iconfont icon-enter text-gray"></i></div>
            </div>
            <div>
            </div>
            <div @click="showComplainDetail(index)" class="border-bottom">
              <div class="cellBody">
                <div class="td1">受理状态</div>
                <div class="td2"><span v-if="item.status==0" class="span redbg">{{$t('message.Unprocessed')}}</span>
                </div>
              </div>
              <div class="cellBody">
                <div class="td1 ">{{$t('message.Complainant')}}</div>
                <div class="td2 ">
                  <i v-if="item.createPersonname" class="iconfont icon-mine"></i> {{item.createPersonname}}
                  <br>
                  <i v-if="item.createPersonname" class="iconfont icon-homepage"></i> {{item.createCompanyShortName}}
                </div>
              </div>
              <div class="cellBody">
                <div class="td1">{{$t('message.Create_time')}}</div>
                <div class="td2 textover">{{item.createDate}}</div>
              </div>
              <div class="cellBody">
                <div class="td1">{{$t('message.Complains_details')}}</div>
                <div class="td2 textover">{{item.complainDesc}}</div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2" class="container">
          <div v-if="dataList2.length==0" class="noData"><i class="iconfont icon-zanwushuju"></i></div>
          <div class="cell border-top" v-for="(item,index) in dataList2" :key="item.callId">
            <div class="cellTit border-bottom" @click="showOrderDetail(item)">
              <div class="oNum"><span style="color:#999">{{$t('message.NO')}}</span> {{item.orderNumber}}</div>
              <div class="pull-left"><i class="iconfont icon-enter text-gray"></i></div>
            </div>
            <div>
            </div>
            <div class="cellBody">
              <div class="td1">{{$t('message.Order_status')}}</div>
              <div class="td2"><span v-if="item.status==0" class="span redbg ">{{$t('message.Unprocessed')}}</span>
                <span v-if="item.status==1" class="span yellowbg">{{$t('message.Processing')}}</span>
                <span v-if="item.status==2" class="span greenbg">{{$t('message.Processed')}}</span>
                <span v-if="item.status==3" class="span bluebg">{{$t('message.Completed')}}</span></div>
            </div>
            <div @click="showComplainDetail(index)" class="border-bottom">
              <div class="cellBody">
                <div class="td1">{{$t('message.Complainant')}}</div>
                <div class="td2 textover">
                  <i v-if="item.createPersonname" class="iconfont icon-mine"></i> {{item.createPersonname}}
                  <br>
                  <i v-if="item.createPersonname" class="iconfont icon-homepage"></i> {{item.createCompanyShortName}}
                </div>
              </div>
              <div class="cellBody">
                <div class="td1">{{$t('message.Complains_details')}}</div>
                <div class="td2 textover">{{item.complainDesc}}</div>
              </div>
              <div class="cellBody">
                <div class="td1">{{$t('message.Create_time')}}</div>
                <div class="td2 textover">{{item.createDate}}</div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3" class="container">
          <div v-if="dataList3.length==0" class="noData"><i class="iconfont icon-zanwushuju"></i></div>
          <div class="cell border-top" v-for="(item,index) in dataList3" :key="item.callId">
            <!--{{item}}-->
            <div class="cellTit  border-bottom" @click="showOrderDetail(item)">
              <div class="oNum"><span style="color:#999">{{$t('message.NO')}}</span> {{item.orderNumber}}</div>
              <div class="pull-left"><i class="iconfont icon-enter text-gray"></i></div>
            </div>
            <div>
            </div>
            <div @click="showComplainDetail(index,item)" class="border-bottom">
              <div class="cellBody">
                <div class="td1">{{$t('message.Order_status')}}</div>
                <div class="td2"><span v-if="item.status==0" class="span redbg ">{{$t('message.Unprocessed')}}</span>
                  <span v-if="item.status==1" class="span yellowbg">{{$t('message.Processing')}}</span>
                  <span v-if="item.status==2" class="span greenbg">{{$t('message.Processed')}}</span>
                  <span v-if="item.status==3" class="span bluebg">{{$t('message.Completed')}}</span></div>
              </div>
              <div class="cellBody">
                <div class="td1">{{$t('message.Complainant')}}</div>
                <div class="td2 textover">
                  <i v-if="item.createPersonname" class="iconfont icon-mine"></i> {{item.createPersonname}}
                  <br>
                  <i v-if="item.createPersonname" class="iconfont icon-homepage"></i> {{item.createCompanyShortName}}
                </div>
              </div>
              <div class="cellBody">
                <div class="td1">{{$t('message.Complains_details')}}</div>
                <div class="td2 textover">{{item.complainDesc}}</div>
              </div>
              <div class="cellBody">
                <div class="td1">{{$t('message.Create_time')}}</div>
                <div class="td2 textover">{{item.createDate}}</div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </scroller>
    <mt-popup v-model="complainDetail" position="right"
              style="width: 100%;height: 100%;font-size: 14px;background: #f3f9fd">
      <mt-header :title="$t('message.Back')" fixed style="z-index: 9;">
        <mt-button icon="back" @click="showComplainDetail" slot="left">{{$t('message.Back')}}</mt-button>
      </mt-header>
      <scroller class="detail-content">
        <div class="border-top box">
          <div class="ts-tit">{{$t('message.Complaints')}}</div>
          <div class="cellBody"><span class="td1">{{$t('message.Complainant')}}</span>
            <span class="td2">
            <i class="iconfont icon-mine" v-if="detailData.createPersonname"></i> {{detailData.createPersonname}} <br>
            <i class="iconfont icon-homepage" v-if="detailData.createCompanyShortName"></i> {{detailData.createCompanyShortName}}</span>
          </div>
          <div class="cellBody"><span class="td1">{{$t('message.Create_time')}}</span><span class="td2">{{detailData.createDate}}</span>
          </div>
          <div class="cellBody"><span class="td1">{{$t('message.NO')}}</span><span
            class="td2">{{detailData.orderNumber}}</span></div>
          <div class="cellBody"><span class="td1">{{$t('message.Complaints_department')}}</span>
            <span class="td2">
          <span v-if="complainTargetObj[0]==1">{{$t('message.Engineer')}}</span>
          <span v-if="complainTargetObj[1]==1">{{$t('message.Service_center')}}</span>
          <span v-if="complainTargetObj[2]==1">{{$t('message.Other')}}</span>
            </span>
          </div>
          <div class="cellBody">
            <span class="td1">{{$t('message.Cause_complaint')}}</span>
            <span class="td2">
            <span v-if="detailData.contentId">
            <span v-if="detailData.contentId==1">{{$t('message.Response_not_timely')}}</span>
            <span v-if="detailData.contentId==2">{{$t('message.Engineer_issues')}}</span>
            <span v-if="detailData.contentId==3">{{$t('message.Attitude_issues')}}</span>
            <span v-if="detailData.contentId==4">{{$t('message.Engineers_frequently')}}</span>
            <span v-if="detailData.contentId==5">{{$t('message.Other')}}</span>
          </span>
          </span>
          </div>
          <div class="cellBody border-bottom"><span class="td1">{{ $t('message.Complains_details') }}</span>
            <span class="td2">
          <div v-html="detailData.complainDesc"></div>
            </span>
          </div>
        </div>
        <div class="border-top box">
          <div class="ts-tit">{{$t('message.Result')}}</div>
          <div class="cell-no-flex border-bottom text-gray" v-if="selected==1">
            <i class="iconfont icon-prompt"></i> {{$t('message.Complaint_wait')}}
          </div>
          <div v-if="selected>1">
            <div class="cellBody"><span class="td1">{{$t('message.Received_by')}}</span><span class="td2">{{detailData.processPersonname}}</span>
            </div>
            <div class="cellBody"><span class="td1">{{$t('message.Process_time')}}</span><span class="td2">{{detailData.processDate}}</span>
            </div>
            <div class="cell-no-flex border-bottom"><span class="td1">{{$t('message.Reply')}}</span>
              <span class="td2">
              <div v-html="detailData.processNotes"></div>
            </span>
            </div>
          </div>
        </div>
        <div class="box border-top" v-if="detailData.processDate">
          <div class="ts-tit">{{$t('message.Rating')}}</div>
          <div class="cell-no-flex border-bottom">
            <!--<div><span class="td1">{{$t('message.Rating_processing_result')}}</span></div>-->
            <div class="rating">
              <star-rating :star-size="30" v-model="detailData.rating" :show-rating="false" :inline="true"
                           :read-only="mystatus==3"></star-rating>
              <span v-if="detailData.rating==0" class="text ">{{$t('message.Please_score')}}</span>
              <span v-if="detailData.rating==1" class="text redbg">{{$t('message.Very_dissatisfied')}}</span>
              <span v-if="detailData.rating==2" class="text yellowbg">{{$t('message.Not_satisfied')}}</span>
              <span v-if="detailData.rating==3" class="text bluebg">{{$t('message.Ordinary')}}</span>
              <span v-if="detailData.rating==4" class="text bluebg">{{$t('message.Satisfied')}}</span>
              <span v-if="detailData.rating==5" class="text greenbg">{{$t('message.Very_satisfied')}}</span>
            </div>
          </div>
        </div>
        <div style="height: 80px"></div>
      </scroller>
    </mt-popup>
  </div>
</template>
<script type="text/ecmascript-6">
  import {Toast} from 'mint-ui';

  export default {
    name: 'balance',
    data() {
      return {
        complainDetail: false,
        detailData: {},
        complainTargetObj: [],
        rating: 0,
        selected: '1',
        dataList1: [],
        dataList2: [],
        dataList3: [],
        state1: 0, //待受理
        state2: 2,//已受理
        state3: 3, //已完成
        page1: 1,
        page2: 1,
        page3: 1,
        count: [0, 0, 0],
        callId: '',
        mystatus: ''
      }
    },
    methods: {
      back() {
        this.$router.back()
      },
      showOrderDetail(item) {
        let payload = {
          id: item.callId,
          oid: item.orderNumber,
          type: item.busniesstypeid
        }
        // 获取对应id的详情
        this.$store.dispatch('new_detail', payload)
        this.$store.commit('SET_ORDER_INFO', item)
        this.$router.push({path: '/orderdetail'})
      },
      showComplainDetail(index, item) {
//        console.log(this.dataList1)
        if(item){
          this.mystatus = item.status
        }
        this.complainDetail = !this.complainDetail;
        if (this.complainDetail == true) {
          if (this.selected == 1) {
            this.detailData = this.dataList1[index]
          } else if (this.selected == 2) {
            this.detailData = this.dataList2[index]
          } else if (this.selected == 3) {
            this.detailData = this.dataList3[index]
          }
          let tmp = JSON.parse(this.detailData.complainTarget)
          this.complainTargetObj = tmp
        }
      },
      onRefresh(done) {
        this._initData(() => done(true))
      },
      onInfinite(done) {
        if (this.selected == 1) {
          this.page1++
          let params = {page: this.page1, limit: 10, status: this.state1}
          this.get_complain(params, () => done(true))
        } else if (this.selected == 2) {
          this.page2++
          let params = {page: this.page2, limit: 10, status: this.state2}
          this.get_complain(params, () => done(true))
        } else if (this.selected == 3) {
          this.page3++
          let params = {page: this.page3, limit: 10, status: this.state3}
          this.get_complain(params, () => done(true))
        }
      },
      get_complain(params, cb) {
        this.$api.get_complain_list(params).then(res => {
          if (params.status == this.state1) {
            if (params.page == 1) {
              this.dataList1 = res.list
            } else {
              this.dataList1 = this.dataList1.concat(res.list)
            }

          } else if (params.status == this.state2) {
            if (params.page == 1) {
              this.dataList2 = res.list
            } else {
              this.dataList2 = this.dataList2.concat(res.list)
            }

          } else {
            if (params.page == 1) {
              this.dataList3 = res.list
            } else {
              this.dataList3 = this.dataList3.concat(res.list)
            }
          }
          if (cb && typeof cb == 'function') {
            cb()
          }
        }).catch(err => console.error(err))
      },
      get_count() {
        this.$api.get_complain_count().then(res => {
          this.count = res
        })
      },
      _initData(cb) {
        this.get_complain({page: 1, limit: 10, status: this.state1}, cb)
        this.get_complain({page: 1, limit: 10, status: this.state2}, cb)
        this.get_complain({page: 1, limit: 10, status: this.state3}, cb)
        this.get_count()
      }
    },
    watch: {
      'detailData.rating': {
        handler(val, oval) {
          let _this = this;
          if (val != oval && val > 0) {
            let data = {
              id: this.detailData.id, rating: this.detailData.rating, status: 3
            }
            this.$api.update_complain_rating(data).then(res => {
              if (res.code == ERR_OK) {
                Toast(r.msg)
                this._initData()
              } else {
                alert(res.msg)
              }
            }).catch(err => console.log(err))
          }
        }
      }
    },
    created() {
      this._initData()
    },
    mounted() {

    }
  }


</script>
<style scoped>
  .ts-tit {
    padding: 6px 15px;
    color: #26a2ff;
    background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 30%, transparent 50%);
    background-image: linear-gradient(0deg, #26a2ff, rgba(38, 162, 255, 0.33) 100%, transparent 50%);
    background-size: 5px 40%;
    background-repeat: no-repeat;
    background-position: 5px;
  }

  .detail-content {
    text-align: left;
    padding: 40px 0px;
  }

  .page-content {
    padding-top: 80px;
  }

  .td1 {
    text-align: left;
    color: #999;
    font-size: 13px;
    font-weight: 500;
    width: 60px;
  }

  .td2 {
    padding-left: 10px;
    color: #333;
    font-size: 13px;
    flex: 1;
  }

  .cell {
    text-align: left;
    width: 100%;
    background: #fff;
    margin-bottom: 10px;
  }

  .cellTit {
    display: flex;
    line-height: 20px;
    font-size: 14px;
    padding: 10px 10px 5px
  }

  .cellBody {
    display: flex;
    line-height: 15px;
    padding: 5px 10px
  }

  .cell-no-flex {
    padding: 5px 10px
  }

  .cell-no-flex .td2 p {
    margin: 0
  }

  .oNum {
    flex: 1;
  }

  .pull-left {
    width: 50px;
    text-align: right;
  }

  .mint-navbar .mint-tab-item {
    padding: 10px 0;
  }

  .text-gray {
    color: #999
  }

  .cellBody .iconfont {
    color: #999;
    font-size: 14px;
  }

  p br {
    margin: 0;
    padding: 0
  }

  .border-bottom {
    margin-bottom: 10px;
  }

  .box {
    background-color: white;
  }


</style>
