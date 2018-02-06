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
        <div v-if="total.length>0" class="balanceNum" v-for="item in total" :key="item.balance">{{item.balance}}<span
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
          <div class="tit" :key="index" v-for="(item ,index) in mxTit" :class="{active:mxShow[index]}" @click="mxPay(index)"
               :index="index">{{item}}
          </div>
        </div>
        <div class="mxItem" v-for="(item) in mxUnData" v-if="mxShow[0]" :key="item.id"
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
        <div class="mxItem" v-for="(item) in mxData" v-if="mxShow[1]" :key="item.id"
             >
          <div class="line"><i class="iconfont icon-stealth_fill"></i></div>
          <div class="content" @click="showDetail(item.receiveId)">
            <div>{{item.partyAName}}</div>
            <div class="textover">{{item.invoiceContent}}</div>
            <div class="invoiceAmount">{{item.invoiceAmount}}({{item.currencyName}})</div>
            <div class="rq_text">{{$t('message.invoice_date')}}：{{item.invoiceDate}} </div>
            <div class="rq_text">{{$t('message.Collection_date')}}：{{item.receiveDate}} </div>
            <div class="rq_text">{{$t('message.ordernumber')}}：{{item.orderNumber}} </div>
          </div>
          <div class="rq_text" v-if="item.eInvoiceUrl"></div>
           <div class="rq_text" v-else-if="item.kaifapiao"><mt-button size="small" @click.self="kaifapiao(item.receiveId,item.orderNumber)">申请发票</mt-button></div>
           <!-- {{item}} -->
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
   <!--发票-->
    <mt-popup
      v-model="invoiceVisible"
      position="right" style="height: 100%;width: 100%">
      <mt-header :title="$t('message.Invoice')" fixed style="z-index: 9;">
        <mt-button icon="back" @click="invoiceHide" slot="left"></mt-button>
        <mt-button @click="postVoice" slot="right">{{$t('message.Done')}}</mt-button>
      </mt-header>
      <div class="page-content2" style="height: 100vh;overflow: auto">
        <div>
          <div style="height: 40px;"></div>
          <label class="zf-cell">
            <input type="radio" name="invoice" v-model="invoice.invoiceType" value="0">
            {{$t('message.Without_the_invoice')}} <i class="iconfont icon-right" v-if="invoice.invoiceType=='0'"></i>
          </label>
          <label class="zf-cell" name="invoice">
            <input type="radio" name="payType" v-model="invoice.invoiceType" value="1">
            {{$t('message.Regular_invoice')}}<i class="iconfont icon-right" v-if="invoice.invoiceType=='1'"></i>
          </label>
          <label class="zf-cell" name="invoice">
            <input type="radio" name="payType" v-model="invoice.invoiceType" value="2">
            {{$t('message.Value-added_invoice')}}<i class="iconfont icon-right" v-if="invoice.invoiceType=='2'"></i>
          </label>
          <div style="height:10px;background:#f8f8f8"></div>

          <div @click="showInvoiceHistory" v-if="invoice.invoiceType!=0&&invoiceList.length>0" class="yellowbg"
               style=";border-radius: 22px;font-size: 12px;display: inline-block;margin: 4px auto;padding: 8px 14px">
            {{$t('message.history_select')}}
          </div>
          <div style="margin-top: 10px">
            <mt-field type="text" :placeholder="$t('message.Company_name')" v-model="invoice.partAName"
                      v-if="invoice.invoiceType!=0"></mt-field>
            <mt-field type="text" :placeholder="$t('message.taxpayer_registration_number')" v-model="invoice.taxNumber"
                      v-if="invoice.invoiceType!=0"></mt-field>
            <mt-field type="text" :placeholder="$t('message.bank_of_deposit')" v-model="invoice.bankName"
                      v-if="invoice.invoiceType!=0&&invoice.invoiceType!=1"></mt-field>
            <mt-field type="text" :placeholder="$t('message.credit_card_numbers')" v-model="invoice.accountNumber"
                      v-if="invoice.invoiceType!=0&&invoice.invoiceType!=1"></mt-field>
            <mt-field type="text" :placeholder="$t('message.company_tel')" v-model="invoice.telephone"
                      v-if="invoice.invoiceType!=0&&invoice.invoiceType!=1"></mt-field>
            <mt-field type="text" :placeholder="$t('message.company_address')" v-model="invoice.companyAddress"
                      v-if="invoice.invoiceType!=0&&invoice.invoiceType!=1"></mt-field>
            <mt-field type="text" :placeholder="$t('message.Bill-to_address')" v-model="invoice.invoiceAddress"
                      v-if="invoice.invoiceType!=0&&invoice.invoiceType!=1"></mt-field>
          </div>
        </div>
      </div>
    </mt-popup>
    <!--发票/-->
    <!--历史开票-->
    <mt-popup
      v-model="invoiceHistoryVisible"
      position="bottom" style="height: 60%;width: 100%;background:#eee;overflow: auto">
      <div>
        <label v-for="(item,i) in invoiceList" :key="i"
               style="position: relative;text-align: left;margin-bottom: 8px;background:#fff;overflow: hidden;display: block"
               @click="checkHistory(item)">
          <span v-if="item.accountNumber" class="bluebg invoice-type">{{$t('message.Value-added_invoice')}}</span>
          <span v-else class="greenbg invoice-type">{{$t('message.Regular_invoice')}}</span>
          <div style="padding-left: 50px;padding-bottom:10px;padding-top:10px;font-size: 14px ">
            <div style="color: #444">{{item.partAName}}</div>
            <div style="color: #777">{{item.taxNumber}}</div>
          </div>
          <div class="right-box " v-if="invoice.taxNumber==item.taxNumber&&invoice.partAName==item.partAName">
            <span class="check-right bluebg"></span>
            <i class="iconfont icon-right"></i>
          </div>
        </label>
      </div>
    </mt-popup>
  </div>
</template>
<script type="text/ecmascript-6">
import axios from 'axios'
export default {
  name: 'balance',
  data() {
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
      oid:'', // orderNumber
      detailPage: 0,//明细分页
      invoiceVisible: false,
      invoiceHistoryVisible: false,
      invoice: {
        invoiceType: 0, // 发票类型  0 1 2  无票 普票 增票
        partAName: '', // 发票抬头
        companyAddress: '', // 公司地址
        taxNumber: '',    // 纳税人识别号
        bankName: '',      // 开户银行
        accountNumber: '',// 银行卡号
        invoiceAddress: '', // 收票地址
        telephone: '' // 公司电话
      },
      invoiceList: []
    }
  },
  watch: {
    invoice: {
      handler: function () {
        if (this.invoice.invoiceType == 0) {
          this.disabled = false
        } else if (this.invoice.invoiceType == 1) {
          this.disabled = true
          if (!this.invoice.partAName) {
            return
          } else if (!this.invoice.taxNumber) {
            return
          } else {
            this.disabled = false
          }
        } else if (this.invoice.invoiceType == 2) {
          this.disabled = true
          if (!this.invoice.partAName) {
            return
          } else if (!this.invoice.bankName) {
            return
          } else if (!this.invoice.taxNumber) {
            return
          } else if (!this.invoice.telephone) {
            return
          } else if (!this.invoice.accountNumber) {
            return
          }
          else if (!this.invoice.invoiceAddress) {
            return
          }
          else {
            this.disabled = false
          }
        }
      },
      deep: true
    },
  },
  methods: {
    kaifapiao(id,oid) {
      this.receiveId = id
      this.oid = oid
      this.invoiceVisible = true
    },
    showInvoiceHistory() {
      this.invoiceHistoryVisible = true
    },
    invoiceHide() {
      this.invoiceVisible = false
    },
    postVoice() {
      this.$api.POST_VOICE({ ...this.invoice, receiveId: this.receiveId ,orderNumber:this.oid,invoiceTitle:this.invoice.partAName}).then(res => {
        if (res.code === 0) {
          this.$toast('成功')
          this.invoiceVisible = false
          this.getMxPaid()
          this.getMxUnPaid()
          this.initInvoiceData()
        } else {
          this.$toast('失败')
        }
      })
    },
    setInvoice() {
      this.invoiceVisible = true
      this.initInvoiceData()
    },
    checkHistory(item) {
      this.invoice = Object.assign({}, this.invoice, item)
      if (this.invoice.accountNumber != '') {
        this.invoice.invoiceType = 2
      } else {
        this.invoice.invoiceType = 1
      }
    },
    initInvoiceData() {
      this.$api.AUTO_COM_INVOICE({
        taxNumber: this.invoice.taxNumber,
        columnName: 'PARTY_A_NAME',
        partAName: this.invoice.partAName
      }).then(res => {
        if (res.code == 0) {
          this.invoiceList = res.invoiceHistory
        }
      })

    },
    back() {
      this.$router.back()
    },
    getMxPaid(cb) {
      this.$api.get_paid_charge({ page: this.page, limit: 10 }).then(res => {

        if (this.page == 1) {
          this.mxData = res.list.map(v => {
            if (v.receiveDate && v.orderNumber) {
              var startD = new Date(Date.parse(v.receiveDate.replace(/-/g, "/")))
              var endD = new Date()
              var days = parseInt((endD.getTime() - startD.getTime()) / (1000 * 60 * 60 * 24))
              v.kaifapiao = days <= 30 ? true : false
            }
            return v
          })
        } else {
          let _r = res.list.map(v => {
            if (v.receiveDate && v.orderNumber) {
              var startD = new Date(Date.parse(v.receiveDate.replace(/-/g, "/")))
              var endD = new Date()
              var days = parseInt((endD.getTime() - startD.getTime()) / (1000 * 60 * 60 * 24))
              v.kaifapiao = days <= 30 ? true : false
            }
            return v
          })

          this.mxData = this.mxData.concat(_r)
        }

        cb && cb()
      })
    },
    getMxUnPaid(cb) {
      this.$api.get_unpaid_charge({ page: this.page, limit: 10 }).then(res => {

        if (this.page == 1) {
          this.mxUnData = res.list
        } else {
          this.mxUnData = this.mxUnData.concat(res.list)
        }

        cb && cb()
      })
    },
    mxPay(index) {
      this.mxShow = [false, false];
      this.mxShow[index] = true
    },
    onRefresh(done) {
      this.page = 1;
      this.unPage = 1;
      this.getMxPaid(() => {
        done(true)
      });
      this.getMxUnPaid(() => {
        done(true)
      });
    },
    onInfinite(done) {
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
    getDetailData(cb) {
      this.$api.get_contract_detail({ page: this.detailPage, limit: 10, receiveId: this.receiveId }).then(res => {

        if (this.detailPage == 1) {
          this.detail = res.list
        } else {
          this.detail = this.detail.concat(res.list);
        }

        cb && cb()
      })
    },
    showDetail(receiveId) {
      let _this = this;
      this.payDetail = true;
      this.detailPage = 1;
      this.receiveId = receiveId;
      this.getDetailData(function () {
      })
    },
    backTop() {
      this.$refs.myScroller.scrollTo(0, 0, false)
    },
    showBack() {
      let _this = this
      setInterval(() => {
        let { left, top } = _this.$refs.myScroller.getPosition()
        if (top > 400) {
          _this.isBackShow = true
        } else {
          _this.isBackShow = false
        }
      }, 500)
    },
    onInfiniteByDetail(done) {
      this.detailPage++;
      this.getDetailData(function () {
        done(true)
      })
    },
    _getTotal() {
      this.$api.QUERY_BALANCE_TOTAL().then(res => {
        if (res.code == 0) {
          this.total = res.balanceTotal
        }
      })
    },
    pay() {
      //        window.location.href='http://172.16.7.248:8088/statics/mobile/detail.htm'
      //        return
      this.$router.push('/pay?isCharge=1')
      //        this.$router.push({name:'pay',params:{isCharge:'1'}})
    }

  },
  watch: {
    'receiveId': {
      handler(val, oval) {
        if (val != oval) {
          this.detail = []
        }
      }
    }
  },
  created() {
    this.getMxPaid();
    this.getMxUnPaid()
    this.initInvoiceData()

  },
  activated() {
    this._getTotal()
  },
  mounted() {
    //      this.showBack()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.check-right {
  height: 50px;
  width: 50px;
  display: block;
  position: absolute;
  top: -25px;
  right: -25px;
  transform: rotate(45deg);
}

.invoice-type {
  font-size: 12px;
  position: absolute;
  top: 0;
  left: 0;
  padding: 2px 6px;
}
.right-box {
  position: absolute;
  top: 0;
  right: 0;
  i {
    position: absolute;
    top: -3px;
    right: 0;
    color: #fff;
  }
}
.zf-cell {
  position: relative;
  display: block;
  height: 35px;
  line-height: 35px;
  text-align: left;
  font-size: 14px;
  color: #777;
  margin-top: 4px;
  background: #fff;
  overflow: hidden;
  padding-left: 8px;
  input[type="radio"] {
    position: absolute;
    left: -100px;
  }
  img {
    vertical-align: middle;
    padding-right: 10px;
  }
  .iconfont {
    position: absolute;
    top: 0;
    right: 0;
    height: 35px;
    width: 35px;
    text-align: center;
    font-size: 20px;
    color: #26a2ff;
  }
}
.rq_text {
  font-size: 12px;
  color: #666;
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
  color: rgba(38, 162, 255, 0.3);
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
.col4-d div {
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
.payDetail {
  width: 100%;
  height: 100%;
  font-size: 14px;
}
.payDetail .iconfont {
  color: #999;
  font-size: 13px;
}
.btn-label-blue {
  border: 1px solid #26a2ff;
  color: #26a2ff;
  background: white;
  border-radius: 2px;
  font-size: 12px;
  padding: 1px;
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
  margin: 0 10px;
  text-align: center;
  cursor: pointer;
}

.tit.active {
  color: #26a2ff;
  border-bottom: 3px solid #26a2ff;
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
.icon-zanwushuju {
  font-size: 80px !important;
  color: #e1e1e1 !important;
}
.noData {
  color: #999999;
  font-size: 13px;
}
</style>
