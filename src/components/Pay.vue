<template>
  <div class="pay">
    <mt-header :title="$t('message.Submit_orders')" fixed style="z-index: 9;">
      <mt-button icon="back" @click="back" slot="left"></mt-button>
    </mt-header>
    <scroller class="page-content">
      <div v-if="isCharge!=1">
        <div class="card"  style="margin-bottom: 10px" >
          订单编号： {{orderNo}}
        </div>


        <div v-for="(list,index) in callDetails" v-if="callDetails.length>0">
          <div class="card">
            {{list[index].serviceName}}
          </div>
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
                  <td rowspan="2" width="20" style="vertical-align: top"><i class="iconfont icon-shielding_fill"></i></td>
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
                  <td rowspan="2" width="20" style="vertical-align: top"><i class="iconfont icon-decoration_fill"></i></td>
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
          </div>
          <div class="card">
            <div style="text-align: right;font-size: 14px">{{$t('message.Subtotal')}} <span
              class="countStyle">￥{{list[index].price}}</span></div>
          </div>
        </div>
      </div>
      <div v-if="isCharge==1" class="card">
        群思科技有限公司预付款充值  ({{orderNo}})
        <mu-text-field v-model="orderPrice" fullWidth :label="$t('message.pay_count')" :hintText="$t('message.please_enter')" type="number" labelFloat/>
        <br/>
      </div>
      <div class="card-box" style="margin-top: 10px">
        <div class="cell" @click="payType">
          <div class="title">
            {{$t('message.Modes_of_Payment')}} <span class="value"></span> <i class="iconfont icon-unfold"></i>
          </div>
        </div>
        <label class="zf-cell">
          <table>
            <tr>
              <td width="50">
                <input type="radio" name="payType" v-model="payWayCode" value="ALIPAY">
                <img :src="require('@/assets/img/zfb.png')" alt="">
              </td>
              <td>
                {{$t('message.Alipay')}} <i class="iconfont icon-right" v-if="payWayCode=='ALIPAY'"></i>
              </td>
            </tr>
          </table>

        </label>
        <label class="zf-cell" name="payType">
          <table>
            <tr>
              <td width="50">
                <input type="radio" name="payType" v-model="payWayCode" value="WEIXIN">
                <img :src="require('@/assets/img/wx.png')" alt="">
              </td>
              <td>
                {{$t('message.WeChat_Pay')}}<i class="iconfont icon-right" v-if="payWayCode=='WEIXIN'"></i>
              </td>
            </tr>
          </table>

        </label>
        <label class="zf-cell" name="payType">
          <table>
            <tr>
              <td width="50">
                <input type="radio" name="payType" v-model="payWayCode" value="UNIONPAY">
                <img :src="require('@/assets/img/yl.png')" alt="">
              </td>
              <td>
                {{$t('message.UnionPay')}}<i class="iconfont icon-right" v-if="payWayCode=='UNIONPAY'"></i>
              </td>
            </tr>
          </table>

        </label>
        <label class="zf-cell" name="payType" v-if="isCharge!=1">
          <table>
            <tr>
              <td width="50">
                <input type="radio" name="payType" v-model="payWayCode" value="ADVPAY">
                <img :src="require('@/assets/img/fw.png')" alt="">
              </td>
              <td>
                {{$t('message.FwonePay')}}<i class="iconfont icon-right" v-if="payWayCode=='ADVPAY'"></i>
              </td>
            </tr>
          </table>
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
        <div class="cell" @click="showCoupons" v-if="couponsList.length>0&&isCharge!=1">
          <div class="title">
            {{$t('message.use_coupon')}}
            <!--已为您优惠{{choiceCoupon[0].amount}}元-->
            <span class="value" v-if="couponId!=''"> {{$t('message.Offer_rmb',{msg:choiceCoupon[0].amount})}}</span>
            <i class="iconfont icon-enter"></i>
          </div>
        </div>
      </div>
      <div style="height: 140px"></div>
    </scroller>
    <!--提交订单-->

    <div class="pay-group">
      <div class="payBtn" @click="Pay" :class="{disabled:(orderPrice <= 0 || disabled)&& couponId==''}">
        {{$t('message.Submit_orders')}}
      </div>
      <div class="count" v-if="orderPrice>=0">{{$t('message.Total')}} <span class="countStyle">￥{{orderPrice}}</span>
      </div>
    </div>
    <!--发票-->
    <mt-popup
      v-model="invoiceVisible"
      position="right" style="height: 100%;width: 100%">
      <mt-header :title="$t('message.Invoice')" fixed style="z-index: 9;">
        <mt-button icon="back" @click="invoiceHide" slot="left"></mt-button>
        <mt-button @click="invoiceHide" slot="right">{{$t('message.Done')}}</mt-button>
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
                      v-show="invoice.invoiceType!=0&&invoice.invoiceType!=1"></mt-field>
          </div>
        </div>
      </div>
    </mt-popup>
    <!--发票/-->
    <!--优惠券-->
    <mt-popup
      v-model="couponVisible"
      position="right" style="height: 100%;width: 100%">
      <mt-header title="优惠券" fixed style="z-index: 9;">
        <mt-button icon="back" @click="hideCoupons" slot="left"></mt-button>
        <mt-button @click="hideCoupons" slot="right">{{$t('message.Done')}}</mt-button>
      </mt-header>
      <scroller class="page-content"
                :on-infinite="onInfinite"
                :refreshText="$t('message.Pull_to_refresh')"
                :noDataText="$t('message.No_more_data')">
        <label v-for="item in couponsList" class="coupons-item redbg "
               style=";text-align: left;padding: 6px;margin-bottom: 2px" @click.prevent="couponHandler(item)">
          <div class="dot-line left">
            <div v-for="i in 10" class="o-o"></div>
          </div>
          <div class="dot-line right">
            <div v-for="i in 10" class="o-o"></div>
          </div>
          <input type="radio" name="" v-model="couponId" :value="item.id" style="display: none">
          <div style="display: flex">
            <div style="font-size: 14px;margin: 0;padding: 6px;box-sizing: border-box;flex: 1">
              <table style="width: 100%" cellspacing="0" border="0" cellpadding="0">
                <tr>
                  <td rowspan="2">￥<span style="font-size: 40px">{{item.amount}}</span></td>
                  <td style="text-align: right">
                    <div>优惠券</div>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: right">
                    <div style="font-size: 10px"> 不可叠加</div>
                  </td>
                </tr>
              </table>
              <div style="font-size: 10px">请于{{item.expStartDate}}前使用</div>
            </div>
            <div style="width: 80px;border-left: 1px dashed #fff;padding: 8px;font-size: 20px;line-height: 58px;">
              <div v-show="couponId!==item.id" style="font-size: 14px">点击使用</div>
              <div v-show="couponId===item.id" style="text-align: center">
                <i class="iconfont icon-right"
                   style="font-size: 40px"></i>
              </div>

            </div>
          </div>
        </label>
        <div style="height: 80px;"></div>
      </scroller>
    </mt-popup>
    <!--优惠券/-->
    <!--历史开票-->
    <mt-popup
      v-model="invoiceHistoryVisible"
      position="bottom" style="height: 60%;width: 100%;background:#eee;overflow: auto">
      <div>
        <label v-for="item in invoiceList"
               style="position: relative;text-align: left;margin-bottom: 8px;background:#fff;overflow: hidden;display: block"
               @click="checkHistory(item)">
          <span v-if="item.accountNumber" class="bluebg invoice-type">增票</span>
          <span v-else class="greenbg invoice-type">普票</span>
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
    <!--历史开票/-->
    <form id="rppaysubmit" name="rppaysubmit" :action="payFormData.actionUrl" :method="payFormData.submitMethod">
      <input type="hidden" :name="key" :value="val" v-for="(val, key) in payFormData.formItemMap"/>
    </form>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import { isWeixnBrowser, gatAlipayInWeixin, GetQueryString } from '@/utils'
  import { Indicator } from 'mint-ui';
  import { MessageBox } from 'mint-ui';

  export default {
    name: 'pay',
    data () {
      return {
        payWayCode: 'ALIPAY',
        disabled: false, // 发票信息不全控制
        callDetails: [],
        productName: '',
        orderPrice: 1000,// 最后的价格
        originalPrice: 0,
        invoiceVisible: false,
        invoiceHistoryVisible: false,
        invoiceList: [],
        couponVisible: false,
        couponsList: [],
        couponId: '', // 优惠券id
        choiceCoupon: '',
        isCharge: '',
        orderNo: '', // 订单号oid
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
        params: {
          page: 1,
          limit: 10,
          state: 0, // 表示未使用、1表示已使用
          expire: 0 // 表示未过期、1表示已过期
        },
        payFormData: {
          actionUrl: '',
          submitMethod: 'post',
          formItemMap: {}
        }
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
      couponId: {
        handler(val){
          this.choiceCoupon = this.couponsList.filter(item => {
            if (item.id == val) {
              return item
            }
          })
          if (val === '') {
            this.orderPrice = this.originalPrice
          } else {
            this.orderPrice = this.originalPrice - this.choiceCoupon[0].amount < 0 ? 0 : this.originalPrice - this.choiceCoupon[0].amount
          }

        }
      }
    },
    computed: {
      oid(){
        return this.$store.state.detail.oid
      },
      invoiceUrl(){
        return SERVER_BASE_URL + '/invoice/queryInvoiceHistory?taxNumber=' + this.invoice.taxNumber + '&columnName=PARTY_A_NAME&partAName' + this.invoice.partAName
      }
    },

    methods: {
      back(){
        this.$router.back()
      },
      invoiceHide() {
        this.invoiceVisible = false
      },
      setInvoice() {
        this.invoiceVisible = true
        this.initInvoiceData()
      },
      payType() {},
      getList(){
        let _oid = this.$route.params.oid;
        if (!_oid) {
          _oid = sessionStorage.getItem('oid')
        }
        this.orderNo = _oid
        let data = {
          ordernumber: _oid
        }

        this.$api.get_call_detail(data).then(res => {
          if (res.code === ERR_OK) {
            this.callDetails = res.callDetails;
            let sum = 0;
            for (var i = 0; i < res.callDetails.length; i++) {
              sum += Number(res.callDetails[i][0].price || 0)
            }
            this.productName = res.callDetails[0][0].serviceName;
            this.orderPrice = sum;
            this.originalPrice = sum;// 原始的订单价格
          } else {
            alert(res.msg)
          }
        })
      },
      Pay() {
        if(sessionStorage.getItem('isGuest')&&sessionStorage.getItem('isGuest')=='true'){
          this.$store.commit('GUEST_TIP')
          return
        }
        if ((this.orderPrice <= 0 || this.disabled) && this.couponId == '') {
          return
        }// 没有价格或者发票信息完整并且优惠券为空

        let data = {
          payWayCode: this.payWayCode,
          orderPrice: this.originalPrice, // 默认提交不减优惠券的价格 呵呵
          orderNo: this.orderNo,
          productName: this.productName
        }
        if (this.isCharge == 1) {
          data.orderNo = this.orderNo;
          data.productName = '群思科技有限公司预付款充值';
          data.isCharge = 1;
          data.orderPrice = this.orderPrice;
        }

        let openId = window.localStorage.getItem("openId");
        this.invoice.invoiceTitle = this.invoice.partAName;
        let postData = Object.assign({}, data, this.invoice, openId ? {openId: openId} : {}, this.couponId ? {couponId: this.couponId} : {})
        let isInnerWeixin = isWeixnBrowser();

        Indicator.open({
          text: '正在打开支付端,请稍后...',
          spinnerType: 'fading-circle'
        });

        this.$api.post_pay_ment(postData).then(res => {
          Indicator.close();
          if (res.code != 0) {
            alert('支付出错')
            return
          }
          let curThis = this;
          let backPath = curThis.isCharge ? "/balance" : "/order";
          if (data.payWayCode == 'ADVPAY' || this.orderPrice === 0) {
            window.location.href = SERVER_BASE_URL + "/" + res.data;
          } else if (data.payWayCode == 'WEIXIN') {
            if (isInnerWeixin) {
              onBridgeReady(res, curThis);
            } else {
              window.location.href = res.data + "?resultData=" + data.orderPrice + "_" + data.orderNo + '_' + backPath;
            }
          } else {
            curThis.payFormData = JSON.parse(res.data);
            curThis.payFormData.formItemMap.backPath = backPath;
            setTimeout(() => {
              if (data.payWayCode == 'ALIPAY' && isInnerWeixin) {
                var queryParam = '';
                for (let k in curThis.payFormData.formItemMap) {
                  queryParam += k + "=" + encodeURIComponent(curThis.payFormData.formItemMap[k]) + '&';
                }
                var gotoUrl = curThis.payFormData.actionUrl + '?' + queryParam;
                if (typeof _AP != 'function') {
                  gatAlipayInWeixin();
                }
                _AP.pay(gotoUrl);
              } else {
                document.forms[document.forms.length - 1].submit();
              }
            }, 20);
          }
        })
      },
      showCoupons() {
        this.couponVisible = true
      },
      hideCoupons() {
        this.couponVisible = false
      },
      couponHandler(item){
        console.log(item)
        if (this.couponId == item.id) {
          this.couponId = ''
//          this.orderPrice = this.orderPrice + item.amount
        } else {
          this.couponId = item.id
//          this.orderPrice = this.orderPrice - item.amount < 0 ? 0 : this.orderPrice - item.amount
        }
      },
      getCouponsList(cb){
        this.$api.COUPON(this.params).then(res => {
          if (res.code == 0) {
            if (this.params.page == 1) {
              this.couponsList = res.page.list
            } else {
              this.couponsList = this.couponsList.concat(res.page.list)
            }
            cb && cb()
          } else {
            alert(JSON.stringify(res))
          }
        })
      },
      onInfinite(done) {
        this.params.page++
        this.getCouponsList(function () {done(true)})
      },
      showInvoiceHistory(){
        this.invoiceHistoryVisible = true
      },
      checkHistory(item){
        this.invoice = Object.assign({}, this.invoice, item)
        if (this.invoice.accountNumber != '') {
          this.invoice.invoiceType = 2
        } else {
          this.invoice.invoiceType = 1
        }
      },
      initInvoiceData(){
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
      autoInput(item){
        this.$api.AUTO_COM_INVOICE({
          taxNumber: '',
          columnName: 'PARTY_A_NAME',
          partAName: ''
        }).then(res => {
          console.log('res99999' + res)
          if (res.code == 0) {
            this.invoice = res.invoiceHistory[0]
          }
        })
      }
    },
    created(){
    },
    activated() {
      this.isCharge = GetQueryString("isCharge");
      if (this.isCharge) {
        this.orderNo = "Advc" + new Date().getTime();
      } else {
        this.getList()
      }
      this.params.page = 1
      this.getCouponsList()
      // 清除历史
      this.invoiceType = 0
      this.couponId = ''
      this.payWayCode = 'ALIPAY'
      this.orderPrice = 1000

    },
    mounted() {
    }
  }
  function dateFtt (fmt, date) {
    var o = {
      "M+": date.getMonth() + 1,                 //月份
      "d+": date.getDate(),                    //日
      "h+": date.getHours(),                   //小时
      "m+": date.getMinutes(),                 //分
      "s+": date.getSeconds(),                 //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }

  function onBridgeReady (json, curThis) {
    let paramJson = JSON.parse(json.data);
    WeixinJSBridge.invoke('getBrandWCPayRequest', paramJson, function (res2) {
      // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
      if (res2.err_msg == "get_brand_wcpay_request:ok") {
        let backPath = curThis.isCharge ? "/balance" : "/order";
        let od = curThis.orderNo || curThis.oid;
        curThis.$router.replace({
          path: '/payok',
          query: {
            orderPrice: curThis.orderPrice,
            orderNo: od,
            orderTime: dateFtt("yyyy年MM月dd日 hh:mm:ss", new Date()),
            backPath: backPath
          }
        });
        return true;
      } else if (res2.err_msg == "get_brand_wcpay_request:cancel") {
        curThis.$toast("您取消了支付");
      } else {
        curThis.$toast("支付失败");
      }
      return true;
    });
    if (typeof WeixinJSBridge == "undefined") {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
      }
    } else {
      onBridgeReady();
    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less" type="text/less">
  .pay-group .payBtn.disabled {
    background: #e8e8e8;
    color: #999;
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
    background: #f8f8f8;
  }

  .countStyle {
    color: #ff4949;
  }

  .pay-group {
    position: fixed;
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
      width: 120px;
      text-align: center;
      line-height: 40px;
      font-size: 14px;
      background: #ffc107;
    }
  }

</style>
