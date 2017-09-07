<template>
  <div class="pay">
    <mt-header :title="$t('message.Submit_orders')" fixed style="z-index: 9;">
      <mt-button icon="back" @click="back" slot="left"></mt-button>

    </mt-header>
    <scroller class="page-content">
      <div class="card" style="margin-bottom: 10px">
        {{productName}}
      </div>
      <div v-for="(list,index) in callDetails" v-if="callDetails.length>0">
        <div v-for="item in list">
          <div class="card">
            <div class="admin-type">
              <small class="type">{{item.detailName}}</small>
              <span class="admin">{{item.yh}}</span></div>
          </div>
          <div class="splitLine">
            <div class="dot dot1"></div>
            <div class="line"></div>
            <div class="dot dot2"></div>
          </div>
          <div class="card">
            <table class="card_t">
              <tr>
                <td rowspan="2" width="20"><i class="iconfont icon-shielding_fill"></i></td>
                <td>
                  <!-- 故障描述-->
                  <div class="tit-t">{{$t('message.Fault_description')}}</div>
                </td>
              </tr>
              <tr>
                <td><p class="des-t">{{item.faultDesc}}</p></td>
              </tr>
            </table>
          </div>
          <div class="splitLine">
            <div class="dot dot1"></div>
            <div class="line"></div>
            <div class="dot dot2"></div>
          </div>
          <div class="card">
            <table class="card_t">
              <tr>
                <td rowspan="2" width="20"><i class="iconfont icon-decoration_fill"></i></td>
                <td>
                  <!--处理过程-->
                  <div class="tit-t">{{$t('message.Solving_steps')}}</div>
                </td>
              </tr>
              <tr>
                <td><p class="des-t">{{item.faultSolve}}</p></td>
              </tr>
            </table>
          </div>
          <div class="splitLine">
            <div class="dot dot1"></div>
            <div class="line"></div>
            <div class="dot dot2"></div>
          </div>
          <div class="card">
            <table class="card_t">
              <tr>
                <td>{{$t('message.Engineer')}}</td>
                <td class="right">{{item.engineername}}</td>
              </tr>
              <tr>
                <td>{{$t('message.Start_time')}}</td>
                <td class="right">{{item.startTime}}</td>
              </tr>
              <tr>
                <td>{{$t('message.End_time')}}</td>
                <td class="right">{{item.finishTime}}</td>
              </tr>
            </table>
          </div>
          <div class="splitLine">
            <div class="dot dot1"></div>
            <div class="line"></div>
            <div class="dot dot2"></div>
          </div>
          <div class="card">
            <div style="text-align: right;font-size: 14px">{{$t('message.Subtotal')}} <span
              class="countStyle">￥{{item.price}}</span></div>
          </div>
        </div>
      </div>
      <div class="card-box" style="margin-top: 10px">
        <div class="cell" @click="payType">
          <div class="title">
            {{$t('message.Modes_of_Payment')}} <span class="value"></span> <i class="iconfont icon-unfold"></i>
          </div>
        </div>
        <label class="zf-cell">
          <input type="radio" name="payType" v-model="payWayCode" value="ALIPAY">
          <img :src="require('@/assets/img/zfb.png')" alt="">{{$t('message.Alipay')}} <i class="iconfont icon-right"
                                                                                         v-if="payWayCode=='ALIPAY'"></i>
        </label>
        <label class="zf-cell" name="payType">
          <input type="radio" name="payType" v-model="payWayCode" value="WEIXIN">
          <img :src="require('@/assets/img/wx.png')" alt="">{{$t('message.WeChat_Pay')}}<i class="iconfont icon-right"
                                                                                           v-if="payWayCode=='WEIXIN'"></i>
        </label>
        <label class="zf-cell" name="payType">
          <input type="radio" name="payType" v-model="payWayCode" value="UNIONPAY">
          <img :src="require('@/assets/img/yl.png')" alt="">{{$t('message.UnionPay')}}<i class="iconfont icon-right"
                                                                                         v-if="payWayCode=='UNIONPAY'"></i>
        </label>

        <div class="cell" @click="setInvoice">
          <div class="title">
            {{$t('message.Invoice')}}
            <span class="value" v-if="invoice.invoiceType==0">{{$t('message.Without_the_invoice')}}</span>
            <span class="value" v-if="invoice.invoiceType==1">{{$t('message.Regular_invoice')}}</span>
            <span class="value" v-if="invoice.invoiceType==2">{{$t('message.Value-added_invoice')}}</span>

            <i class="iconfont icon-enter"></i>
          </div>
        </div>
        <div v-if="disabled" class="warning"><i
          class="iconfont icon-prompt_fill"></i>{{$t('message.invoice_information_incomplete')}}
        </div>
      </div>
      <div style="height: 300px"></div>
    </scroller>
    <!--提交订单-->
    <div class="pay-group">
      <div class="payBtn" @click="Pay" :class="{disabled:!orderPrice||disabled}">{{$t('message.Submit_orders')}}</div>
      <div class="count" v-if="orderPrice">{{$t('message.Total')}} <span class="countStyle">￥{{orderPrice}}</span></div>
    </div>
    <!--发票-->
    <mt-popup
      v-model="invoiceVisible"
      position="right" style="height: 100%;width: 100%">
      <mt-header :title="$t('message.Invoice')" fixed style="z-index: 9;">
        <mt-button icon="back" @click="invoiceHide" slot="left"></mt-button>
        <mt-button @click="invoiceHide" slot="right">{{$t('message.Done')}}</mt-button>
      </mt-header>
      <div class="page-content">
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
        <div style="margin-top: 10px">
          <mt-field type="text" :placeholder="$t('message.Company_name')" v-model="invoice.invoiceTitle"
                    v-show="invoice.invoiceType!=0"></mt-field>
          <mt-field type="text" :placeholder="$t('message.taxpayer_registration_number')" v-model="invoice.taxNumber"
                    v-show="invoice.invoiceType!=0"></mt-field>
          <mt-field type="text" :placeholder="$t('message.bank_of_deposit')" v-model="invoice.bankName"
                    v-show="invoice.invoiceType!=0&&invoice.invoiceType!=1"></mt-field>
          <mt-field type="text" :placeholder="$t('message.credit_card_numbers')" v-model="invoice.accountNumber"
                    v-show="invoice.invoiceType!=0&&invoice.invoiceType!=1"></mt-field>
          <mt-field type="text" :placeholder="$t('message.company_tel')" v-model="invoice.telephone"
                    v-show="invoice.invoiceType!=0&&invoice.invoiceType!=1"></mt-field>
          <mt-field type="text" :placeholder="$t('message.company_address')" v-model="invoice.companyAddress"
                    v-show="invoice.invoiceType!=0&&invoice.invoiceType!=1"></mt-field>
          <mt-field type="text" :placeholder="$t('message.Bill-to_address')" v-model="invoice.invoiceAddress"
                    v-show="invoice.invoiceType!=0"></mt-field>
        </div>
      </div>
    </mt-popup>
    <!--发票/-->
  </div>
</template>
<script>
  import { mapState } from 'vuex'
//  import $ from 'n-zepto'
  export default {
    name: 'pay',
    data () {
      return {
        payWayCode: 'ALIPAY',
        disabled: false, // 发票信息不全控制
        callDetails: [],
        productName: '',
        orderPrice: '',
        invoiceVisible: false,
        invoice: {
          invoiceType: 0, // 发票类型  0 1 2  无票 普票 增票
          invoiceTitle: '', // 发票抬头
          companyAddress: '', // 公司地址
          taxNumber: '',    // 纳税人识别号
          bankName: '',      // 开户银行
          accountNumber: '',// 银行卡号
          invoiceAddress: '', // 收票地址
          telephone: '' // 公司电话
        },
      }
    },
    watch: {
      invoice: {
        handler: function () {
          if (this.invoice.invoiceType == 0) {
            this.disabled = false
          } else if (this.invoice.invoiceType == 1) {
            this.disabled = true
            if (!this.invoice.invoiceTitle) {
              return
            } else if (!this.invoice.taxNumber) {
              return
            } else if (!this.invoice.invoiceAddress) {
              return
            }
            else {
              this.disabled = false
            }
          } else if (this.invoice.invoiceType == 2) {
            this.disabled = true
            if (!this.invoice.invoiceTitle) {
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
      }
    },
    computed: mapState({
      oid: state => state.detail.oid,
    }),
    methods: {
      back () {
        this.$router.back()
      },
      invoiceHide () {
        this.invoiceVisible = false
      },
      setInvoice () {
        this.invoiceVisible = true
      },
      payType() {},
      getList () {
        let oid = this.$route.params.oid
        if (oid) {
          this.$store.commit('SET_ORDER_NUMBER', oid)
        } else {
          let _oid = sessionStorage.getItem('oid')
          this.$store.commit('SET_ORDER_NUMBER', _oid)
        }

        let data = {
          ordernumber: this.oid
        }
        this.$api.get_call_detail(data).then(res => {
          if (res.code === ERR_OK) {
            this.callDetails = res.callDetails;
            let sum = 0;
            for (var i = 0; i < res.callDetails.length; i++) {
              sum += Number(res.callDetails[i][0].price)
            }
            this.productName = res.callDetails[0][0].serviceName;
            this.orderPrice = sum;
          } else {
            alert(res.msg)
          }
        })
      },
      Pay(){
        let data = {
          payWayCode: this.payWayCode,
          orderPrice: this.orderPrice,
          orderNo: this.oid,
          productName: this.productName
        }
        let postData = Object.assign({}, data, this.invoice)
        if (this.disabled || !this.orderPrice) {return} // 有价格并且发票信息完整
        this.$api.post_pay_ment(postData).then(res => {
//          $('body').append(res)
          document.body.innerHTML += res
          setTimeout(() => {
            document.forms['rppaysubmit'].submit();
          }, 20)
        })
      }
    },
    created(){},
    activated(){
      this.getList()
    },
    mounted(){

    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less" type="text/less">
  .pay-group .payBtn.disabled {
    background: #e8e8e8;
    color: #999;
  }

  .warning {
    font-size: 10px;
    color: #ff4949;
    text-align: right;
    padding: 4px;
    .iconfont {
      vertical-align: middle;
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
    input[type=radio] {
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

  .cell {
    height: 35px;
    width: 100%;
    background: #fff;
    line-height: 35px;
    font-size: 14px;
    margin-top: 4px;
    padding: 0 10px;
    text-align: left;
    position: relative;
    .title {
      .iconfont {
        position: absolute;
        right: 10px;
        font-size: 12px;
        color: #999;
      }
      .value {
        position: absolute;
        right: 30px;
        font-size: 12px;
        color: #999;
      }
    }
  }

  .splitLine {
    position: relative;
    width: 96%;
    margin: 0 auto;
    border: 1px dashed #ddd;
    .dot {
      position: absolute;
      top: -7px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #f8f8f8;

      &.dot1 {
        left: -9px;
      }
      &.dot2 {
        right: -9px;
      }
    }
  }

  .card_t {
    width: 100%;
    text-align: left;
    font-size: 11px;
    .right {
      text-align: right;
    }
    .des-t {
      font-size: 10px;
      color: #999;
      padding: 0;
      margin: 0;
    }
    .tit-t {
      font-size: 11px;
    }
  }

  .card-box {
    width: 96%;
    margin: 0 auto;
  }

  .card {
    width: 96%;
    margin: 0 auto;
    background: #fff;
    padding: 6px;
    .admin-type {
      font-size: 12px;
      text-align: left;
      .type {
        text-align: left;
        background: #f8f8f8;
        padding: 2px 4px;
        border-radius: 10px;
      }
      .admin {
        float: right;
        text-align: right;
      }
    }
  }

  .page-content {
    padding-top: 40px;
    height: 100vh;
    background: #f8f8f8;
    overflow: scroll;
  }

  .countStyle {
    color: #ff4949;
  }

  .pay-group {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 40px;
    width: 100%;
    background: #f8feff;
    .count {
      float: right;
      line-height: 40px;
      padding-right: 10px;

    }
    .payBtn {
      float: right;
      height: 100%;
      width: 88px;
      text-align: center;
      line-height: 40px;
      font-size: 14px;
      background: #ffc107;
    }
  }

</style>
