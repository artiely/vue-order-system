<template>
  <div class="balance">
    <mt-header :title="$t('message.Balance')" fixed style="z-index: 9;">
      <mt-button icon="back" @click="back" slot="left">{{$t('message.Back')}}</mt-button>
    </mt-header>
    <scroller
      style="background:#fafafa;"
      class="page-content"
      :on-refresh="onRefresh"
      ref="myScroller"
      :on-infinite="onInfinite"
      :refreshText="$t('message.Pull_to_refresh')"
      :noDataText="$t('message.No_more_data')"
    >
      <div class="balanceBox">
        <div v-if="total.length>0" class="balanceNum" v-for="item in total">{{item.balance}}<span
          class="balanceTxt">{{item.currency}}</span>
        </div>
        <div v-if="total.length==0" class="balanceNum">0.00<span class="balanceTxt">{{$t('message.Overall_balance')}}</span></div>
        <div class="btn yellowbg" @click="pay" style="width: 60%;margin: 6px auto;padding: 6px;border-radius: 22px">{{$t('message.Recharge')}}</div>
      </div>
        <div class="col1 border-bottom">
          <router-link tag="div" class="balanceBtm" to="record">{{$t('message.record')}}<i class="iconfont icon-enter text-gray pull-right"></i> </router-link>
        </div>
      <div class="mxBox">
        <div class="mxTit">
          <div class="tit" v-for="(item ,index) in mxTit" :class="{active:mxShow[index]}" @click="mxPay(index)"
               :index="index">{{item}}
          </div>
        </div>
        <div class="mxItem" v-for="(item,index) in mxUnData" v-if="mxShow[0]" :key="item.id"
             @click="showDetail(item.id)">
          <div class="line gray"><i class="iconfont icon-stealth_fill"></i></div>
          <div class="content">
            <div>{{item.partyAName}}</div>
            <div class="textover">{{item.invoiceContent}}</div>
            <div class="invoiceAmount">{{item.invoiceAmount}}({{item.currencyName}})</div>
            <div class="rq_text">{{$t('message.invoice_date')}}：{{item.invoiceDate}} </div>
            <div class="rq_text">{{$t('message.Collection_date')}}：{{item.contractReceiveDate}} </div>
          </div>
        </div>
        <div class="mxItem" v-for="(item,index) in mxData" v-if="mxShow[1]" :key="item.id"
             @click="showDetail(item.receiveId)">
          <div class="line"><i class="iconfont icon-stealth_fill"></i></div>
          <div class="content">
            <div>{{item.partyAName}}</div>
            <div class="textover">{{item.invoiceContent}}</div>
            <div class="invoiceAmount">{{item.invoiceAmount}}({{item.currencyName}})</div>
            <div class="rq_text">{{$t('message.invoice_date')}}：{{item.invoiceDate}} </div>
            <div class="rq_text">{{$t('message.Collection_date')}}：{{item.receiveDate}} </div>
          </div>
        </div>
      </div>

    </scroller>
    <div v-show="isBackShow" class="backTop" @click="backTop"><i class="iconfont icon-huidaodingbu1"></i></div>
    <mt-popup v-model="payDetail" position="right" class="payDetail">
      <mt-header :title="$t('message.cost_breakdown')" fixed style="z-index: 9;color: #333;background: white;box-shadow:0px 1px 1px #c9c9c9;">
        <mt-button  @click="payDetail=false" icon="back" slot="left"></mt-button>
      </mt-header>
      <scroller :on-infinite="onInfiniteByDetail">
        <div style="height:40px"></div>
        <div class="col-d" v-for="(item,index) in detail" :key="index">
          <div class="col1-d">
            <div>{{item.price}} </div>
            <div><span>{{item.currencyName}}</span></div>
          </div>
          <div class="col4-d">
            <div><i class="iconfont icon-lvshi"></i> <span class="btn-label-blue" v-if="item.dealType">{{item.dealType}}</span> {{item.detailName}}</div>
            <div class="textover"><i class="iconfont iconfont icon-homepage"></i> {{item.companyName}}</div>

            <div><i class="iconfont iconfont icon-time"></i> <span v-html="item.detailStartDate.substr(0,10)"></span>~<span v-html="item.detailFinishDate.substr(0,10)"></span>
            </div>
          </div>
        </div>
        <div v-if="detail.length==0" class="noData"><i class="iconfont icon-zanwushuju"></i><br>{{$t('message.No_detail')}}</div>

      </scroller>
    </mt-popup>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  export default {
    name: 'balance',
    data () {
      return {
        mxData: [],
        mxUnData: [],
        mxShow: [true, false],
        mxTit: [this.$t('message.Not_Paid'), this.$t('message.Paid')],
        page: 1,
        totalPage: 1,
        unPage: 1,
        unTotalPage: 1,
        total: [], //总金额
        payDetail: false,
        detail: [],
        isBackShow: false,
        receiveId: '',//展示明细的id
        detailPage: 0 ,//明细分页
      }
    },
    methods: {
      back() {
        this.$router.back()
      },
      getMxPaid(cb){
        this.$api.get_paid_charge({page: this.page, limit: 10}).then(res => {

          if (this.page == 1) {
            this.mxData = res.list
          } else {
            this.mxData = this.mxData.concat(res.list)
          }

          cb && cb()
        })
      },
      getMxUnPaid(cb){
        this.$api.get_unpaid_charge({page: this.page, limit: 10}).then(res => {

          if (this.page == 1) {
            this.mxUnData = res.list
          } else {
            this.mxUnData = this.mxUnData.concat(res.list)
          }

          cb && cb()
        })
      },
      mxPay(index){
        this.mxShow = [false, false];
        this.mxShow[index] = true
      },
      onRefresh(done){
        this.page = 1;
        this.unPage = 1;
        this.getMxPaid(() => {
          done(true)
        });
        this.getMxUnPaid(() => {
          done(true)
        });
      },
      onInfinite(done){
        if (this.mxShow[1]) {
          this.page++;
          this.getMxPaid(function () {
            done(true)
          });
        } else if (this.mxShow[0]) {
          this.unPage++;
          this.getMxUnPaid(function () {
            done(true)
          });
        }

      },
      getDetailData(cb){
        this.$api.get_contract_detail({page: this.detailPage, limit: 10, receiveId: this.receiveId}).then(res => {

          if (this.detailPage == 1) {
            this.detail = res.list
          } else {
            this.detail = this.detail.concat(res.list);
          }

          cb && cb()
        })
      },
      showDetail(receiveId){
        let _this = this;
        this.payDetail = true;
        this.detailPage = 1;
        this.receiveId = receiveId;
        this.getDetailData(function () {
        })
      },
      backTop(){
        this.$refs.myScroller.scrollTo(0, 0, false)
      },
      showBack(){
        let _this = this
        setInterval(() => {
          let {left, top} = _this.$refs.myScroller.getPosition()
          if (top > 400) {
            _this.isBackShow = true
          } else {
            _this.isBackShow = false
          }
        }, 500)
      },
      onInfiniteByDetail(done){
        this.detailPage++;
        this.getDetailData(function () {
          done(true)
        })
      },
      _getTotal(){
        this.$api.QUERY_BALANCE_TOTAL().then(res => {
          if (res.code == 0) {
            this.total = res.balanceTotal
          }
        })
      },
      pay(){
//        window.location.href='http://172.16.7.248:8088/statics/mobile/detail.htm'
//        return
        this.$router.push('/pay?isCharge=1')
      }

    },
    watch: {
      'receiveId': {
        handler(val, oval){
          if (val != oval) {
            this.detail = []
          }
        }
      }
    },
    created(){
      this.getMxPaid();
      this.getMxUnPaid()

    },
    activated(){
      this._getTotal()
    },
    mounted(){
//      this.showBack()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .rq_text {
    font-size: 12px;
    color: #666
  }

  .backTop {
    position: absolute;
    bottom: 50px;
    right: 10px;
    z-index: 99;
    width: 40px;
    height: 40px;
  }

  .backTop i {
    font-size: 40px;
    line-height: 1;
    color: rgba(38, 162, 255, .3);
  }

  .col-d {
    display: flex;
    font-size: 14px;
    padding: 10px 0;
    border-bottom: 1px dashed #eee;
    /*border-top: 1px dashed #eee;*/
  }

  .col1-d {
    width: 55px;
    border-right: 1px solid #eee;
    color: #26a2ff;
    line-height: 1.5;
    padding-top: 5px;
  }

  .col4-d {
    padding-left: 10px;
    text-align: left;
    flex: 1;
    font-size: 12px;
  }
  .col4-d div{
    line-height: 20px;
  }

  .content {
    padding-top: 15px;
    font-size: 14px;
    color: #444;
  }

  .mxTit {
    display: flex;
  }

  .invoiceAmount {
    color: #26a2ff;
  }

  .mxItem {
    padding-left: 20px;
    padding-bottom: 6px;
    position: relative;
    width: 100%;
    background: #fff;
    border-bottom: dashed 1px #eee;
    overflow: hidden;
    text-align: left;
  }
  .payDetail{
    width: 100%;height: 100%;font-size: 14px
  }
  .payDetail .iconfont{
    color: #999;
    font-size: 13px;
  }
  .btn-label-blue{
    border:1px solid #26a2ff;
    color:#26a2ff;
    background: white;
    border-radius: 2px;
    font-size: 12px;
    padding:1px
  }

  .line {
    position: absolute;
    top: 0;
    left: 10px;
    height: 100%;
    width: 0;
    border-left: 1px solid #26a2ff;
  }

  .line.gray {
    border-left: 1px solid #ddd;
  }

  .line .iconfont {
    position: absolute;
    top: 0;
    left: -8px;
    color: #26a2ff;
  }

  .line.gray .iconfont {
    position: absolute;
    top: 0;
    left: -8px;
    color: #ddd;
  }

  .tit {
    width: 25%;
    padding: 8px 0 5px;
    margin:0 10px;
    text-align: center;
    cursor: pointer;
  }

  .tit.active {
    color: #26a2ff;
    border-bottom: 3px solid #26a2ff ;
  }

  .mxBox {
    width: 100%;
    background: #fff;
  }

  .page-content {
    padding-top: 40px;
  }

  .col {
    display: flex;
    background: #fff;
    margin-bottom: 10px;

  }

  .col1 {
    flex: 1;
    background: white;
  }

  .balanceTop {
    padding-top: 10px;
    color: #26a2ff;
    font-size: 18px;
    line-height: 1;
  }

  .balanceBtm {
    line-height: 40px;
    color: #333;
    font-size: 14px;
  }

  .balanceTxt {
    color: #fff;
    margin-top: 0;
    font-size: 14px;
  }

  .balanceBox {
    width: 100%;
    padding-bottom: 10px;
    background: #26a2ff;
  }

  .balanceNum {
    padding-top: 10px;
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: #fff;
  }
  .icon-zanwushuju{
    font-size: 80px!important;
    color: #e1e1e1!important;
  }
  .noData{
    color: #999999;
    font-size: 13px;
  }
</style>
