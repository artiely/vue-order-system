<template>
  <transition name="fade" mode="out-in" appear>
    <div class="orderdetail">
      <div>
        <mt-header :title="$t('message.Detail')" fixed style="z-index: 9;">
          <mt-button icon="back" @click="back" slot="left">{{$t('message.Back')}}</mt-button>
        </mt-header>
        <scroller class="page-content" style="background:#fafafa;">
          <div class="shadow-box content">
            <div style="padding: 8px">
              <div> {{$t('message.NO')}}：<span id="oid">{{orderNum}}</span>
                <span class="state-label" v-if="status==8">{{$t('message.Complete')}}</span>
                <div v-if="priceRemark" v-html="priceRemark">123</div>
              </div>

            </div>
          </div>
          <div class="shadow-box">
            <div class="titlebox yellowbg">{{$t('message.Order_status')}}</div>
            <swiper :options="swiperOption" ref="mySwiper" class="step-box">
              <!-- slides -->
              <swiper-slide>
                <div class="item" :class="status >= 0 ?'fw1':'fw0'">
                  <i class="iconfont icon-marketing_fill"></i><br>
                  {{$t('message.Accept')}}
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="item" :class="status >= 1 ?'fw1':'fw0'">
                  <i class="iconfont icon-time_fill"></i><br>
                  {{$t('message.Depart')}}
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="item" :class="status >= 2 ?'fw1':'fw0'">
                  <i class="iconfont icon-emoji_fill"></i><br>
                  {{$t('message.Arrive')}}
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="item" :class="status >= 3 ?'fw1':'fw0'">
                  <i class="iconfont icon-brush_fill"></i><br>
                  {{$t('message.Sign')}}
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="item" :class="status >= 4 ?'fw1':'fw0'">
                  <i class="iconfont icon-financial_fill"></i><br>
                  {{$t('message.Confirm_price')}}
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="item" :class="status >= 5 ?'fw1':'fw0'">
                  <i class="iconfont icon-coupons_fill"></i><br>
                  {{$t('message.Invoice')}}
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="item" :class="status >= 6 ?'fw1':'fw0'">
                  <i class="iconfont icon-transaction_fill"></i><br>
                  {{$t('message.Payment')}}
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="item" :class="status >= 7 ?'fw1':'fw0'">
                  <i class="iconfont icon-task_fill"></i><br>
                  {{$t('message.Complete')}}
                </div>
              </swiper-slide>
            </swiper>
          </div>
          <div class="shadow-box">
            <div class="titlebox yellowbg">{{$t('message.Service_detail')}}</div>
            <div v-for="(item,index) in detailData.callDetails" :key="index">
              <table v-for="(subitem,i) in item " :key="i" class="callDetails" style="width: 100%">
                <tr>
                  <td colspan="2" style="width: 100%"><label>{{subitem.serviceName}}</label> <span class="label greenbg"
                                                                                                   style="float: right"
                                                                                                   v-if="subitem.price">{{subitem.price}} <span
                    v-if="detailData.workFlow.serviceType">({{detailData.workFlow.serviceType}})</span></span>
                  </td>
                </tr>
                <tr>
                  <td width="66">{{$t('message.User')}}</td>
                  <td>{{subitem.yh}}</td>
                </tr>
                <tr>
                  <td width="66">{{$t('message.Engineer')}}</td>
                  <td><a>{{subitem.engineername}}</a></td>
                </tr>
                <tr>
                  <td width="66">{{$t('message.Duration')}}</td>
                  <td>{{subitem.startTime}}<br>{{subitem.finishTime}}</td>
                </tr>
                <tr>
                  <td width="66">{{$t('message.Fault_description')}}</td>
                  <td>
                    <div class="word-wrap">{{subitem.faultDesc}}</div>
                  </td>
                </tr>
                <tr>
                  <td width="66">{{$t('message.Solving_steps')}}</td>
                  <td>
                    <div class="word-wrap">{{subitem.faultSolve}}</div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <button size="small" class="footerBtn pull-right" v-if="status>=3&&subList.length>0"
                            @click="pingjia(subitem.id)">{{$t('message.Rate')}}
                    </button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div class="shadow-box">
            <div class="titlebox yellowbg">{{$t('message.Engineer_information')}}</div>
            <table v-for="(item,key) in detailData.engineers" :key="key" class="engineer-info">
              <tr>
                <td rowspan="3">
                  <div class="en-icon" style="line-height: 100px;">
                    <img :src="'image/download?imgName='+item.photoPath" alt=""
                         style="width: 100%;height: 100%;object-fit: cover">
                    <span v-if="!item.photoPath">{{$t('message.No_found')}}</span>
                  </div>
                </td>
                <td>{{$t('message.Name')}}：</td>
                <td>{{item.engineername}}</td>
              </tr>
              <tr>
                <td>{{$t('message.Postion')}}：</td>
                <td>{{item.post}}</td>
              </tr>
              <tr>
                <td>{{$t('message.Service_years')}}：</td>
                <td><span class="null" v-if="!item.entrytime">{{$t('message.No_found')}}</span>
                  <div v-if="item.entrytime">{{item.entrytime}}</div>
                </td>
              </tr>
              <tr>
                <td style="vertical-align: top">{{$t('message.Self_evaluation')}}</td>
                <td colspan="2"><span class="null" v-if="!item.evaluation">{{$t('message.No_found')}}</span>
                  <div v-if="item.evaluation" style="text-align: left">{{item.evaluation}}</div>
                </td>
              </tr>
              <tr>
                <td style="vertical-align: top">{{$t('message.Skills')}}</td>
                <td colspan="2"><span class="null"
                                      v-if="!item.skills||item.skills.length==0">{{$t('message.No_found')}}</span>
                  <div style="text-align: left">
                    <mt-badge size="small" v-if="item.skills" v-for="(skill,index) in item.skills" :key="index"
                              style="font-size: 10px;margin-bottom: 5px;margin-right: 5px">{{skill}}
                    </mt-badge>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="vertical-align: top">{{$t('message.Language')}}</td>
                <td colspan="2"><span class="null"
                                      v-if="!item.languages||item.languages.length==0">{{$t('message.No_found')}}</span>
                  <div style="text-align: left">
                    <mt-badge size="small" v-if="item.languages" v-for="(language,index) in item.languages" :key="index"
                              style="font-size: 10px;margin-bottom: 5px;margin-right: 5px">
                      {{language.language + language.certificate}}
                    </mt-badge>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div style="height: 80px"></div>
        </scroller>
        <div class="footerBar">
          <!--{{detailData.payway}},{{orderInfo.auditStatusMin}},{{orderInfo.fwoneCheckState}}-->
          <div class="pull-right pay-button" @click="toPay(orderNum)"
               v-if="detailData.payway==1 && orderInfo.auditStatusMin ==11000 && orderInfo.fwoneCheckState!=20 && orderInfo.fwoneCheckState!=30"
          >支付
          </div>
          <button size="small" class="footerBtn" v-if="status>=0 && status<2 && show_reminder" @click="reminder">
            {{$t('message.Reminder')}}
          </button>
          <button size="small" class="footerBtn" v-if="status<8 && status>=3" @click="toushuVisible=!toushuVisible">
            {{$t('message.complaint')}}
          </button>

          <!--<button size="small" class="footerBtn" v-if="status>=5">发票</button>-->
        </div>
        <!--评价-->
        <mt-popup
          v-model="pingjiaVisible"
          position="top" style="width: 100%;height: 100%;">
          <mt-header :title="$t('message.Service_level')" fixed style="z-index: 9;">
            <mt-button icon="back" @click="pingjiaVisible=!pingjiaVisible" slot="left">{{$t('message.Back')}}
            </mt-button>
          </mt-header>
          <scroller style="padding-top:40px">
            <table style="text-align: left">
              <tr>
                <td width="50">{{$t('message.Service_center')}}：</td>
                <td>
                  <div class="rating">
                    <star-rating :star-size="30" v-model="ratingToService" :show-rating="false"
                                 :inline="true"></star-rating>
                    <span v-if="ratingToService==0" class="text ">{{$t('message.Unvalued')}}</span>
                    <span v-if="ratingToService==1" class="text redbg">{{$t('message.Very_dissatisfied')}}</span>
                    <span v-if="ratingToService==2" class="text yellowbg">{{$t('message.Not_satisfied')}}</span>
                    <span v-if="ratingToService==3" class="text bluebg">{{$t('message.Ordinary')}}</span>
                    <span v-if="ratingToService==4" class="text bluebg">{{$t('message.Satisfied')}}</span>
                    <span v-if="ratingToService==5" class="text greenbg">{{$t('message.Very_satisfied')}}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td width="50"> {{$t('message.Engineer')}}：</td>
                <td>
                  <div class="rating">
                    <star-rating :star-size="30" v-model="ratingToEngineer" :show-rating="false"
                                 :inline="true"></star-rating>
                    <span v-if="ratingToEngineer==0" class="text ">{{$t('message.Unvalued')}}</span>
                    <span v-if="ratingToEngineer==1" class="text redbg">{{$t('message.Very_dissatisfied')}}</span>
                    <span v-if="ratingToEngineer==2" class="text yellowbg">{{$t('message.Not_satisfied')}}</span>
                    <span v-if="ratingToEngineer==3" class="text bluebg">{{$t('message.Ordinary')}}</span>
                    <span v-if="ratingToEngineer==4" class="text bluebg">{{$t('message.Satisfied')}}</span>
                    <span v-if="ratingToEngineer==5" class="text greenbg">{{$t('message.Very_satisfied')}}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td width="50"> {{$t('message.Overall')}}：</td>
                <td>
                  <div class="rating">
                    <star-rating :star-size="30" v-model="ratingToAll" :show-rating="false"
                                 :inline="true"></star-rating>
                    <span v-if="ratingToAll==0" class="text ">{{$t('message.Unvalued')}}</span>
                    <span v-if="ratingToAll==1" class="text redbg">{{$t('message.Very_dissatisfied')}}</span>
                    <span v-if="ratingToAll==2" class="text yellowbg">{{$t('message.Not_satisfied')}}</span>
                    <span v-if="ratingToAll==3" class="text bluebg">{{$t('message.Ordinary')}}</span>
                    <span v-if="ratingToAll==4" class="text bluebg">{{$t('message.Satisfied')}}</span>
                    <span v-if="ratingToAll==5" class="text greenbg">{{$t('message.Very_satisfied')}}</span>
                  </div>
                </td>
              </tr>
            </table>
            <mt-field :placeholder="$t('message.Rate_placeholder')" type="textarea" rows="3"
                      v-model="evaluate"></mt-field>
            <small v-if="evaluate_num!=0" class="pull-right" style="color: #888">
              {{$t('message.Publish_tip', {Num: evaluate_num})}}
            </small>
            <mt-button type="primary" size="large" :disabled="evaluate_num!=0" @click.native="RatingSubOrder">
              {{$t('message.Publish')}}
            </mt-button>
            <div v-if="ratingHistoryList.length>0">
              <h3 style="padding: 20px 0 0 0;margin: 0">历史评论：</h3>
              <mt-cell v-for="(item,index) in ratingHistoryList" :key="index">
                <div slot="title" style="text-align: left;font-size: 12px">
                  <p>满意度：
                    <span v-if="item.score==0" class="text ">{{$t('message.Unvalued')}}</span>
                    <span v-if="item.score==1" class="text redbg">{{$t('message.Very_dissatisfied')}}</span>
                    <span v-if="item.score==2" class="text yellowbg">{{$t('message.Not_satisfied')}}</span>
                    <span v-if="item.score==3" class="text bluebg">{{$t('message.Ordinary')}}</span>
                    <span v-if="item.score==4" class="text bluebg">{{$t('message.Satisfied')}}</span>
                    <span v-if="item.score==5" class="text greenbg">{{$t('message.Very_satisfied')}}</span>
                  </p>
                  <p style="font-size: 10px;text-align: left;color: #999;line-height: 1.2;">{{item.comments}}</p>
                </div>
              </mt-cell>
            </div>
            <div style="height: 100px;"></div>
          </scroller>
        </mt-popup>
        <!--评价/-->
        <!--投诉-->
        <mt-popup
          v-model="toushuVisible"
          position="top"
          style="width: 100%;height: 100%"
        >
          <mt-header :title="$t('message.complaint')" fixed style="z-index: 9;">
            <mt-button icon="back" @click="toushuVisible=!toushuVisible" slot="left">{{$t('message.Back')}}</mt-button>
          </mt-header>
          <scroller style="padding-top: 40px;text-align: left">
            <mt-radio
              :title="$t('message.Cause_complaint')"
              v-model="reasonId"
              align="right"
              :options="reason">
            </mt-radio>
            <mt-checklist
              :title="$t('message.Complaints_department')"
              v-model="departmentIds"
              align="left"
              :options="department">
            </mt-checklist>
            <mt-field :placeholder="$t('message.Complaints_suggestions')" type="textarea" rows="3"
                      v-model="complainTxt"></mt-field>
            <mt-button type="primary" size="large" :disabled="complainTxt.length==0" @click.native="toComplain">
              {{$t('message.Submit')}}
            </mt-button>
            <div style="height: 80px;"></div>
          </scroller>
        </mt-popup>
        <!--投诉/-->
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui';
  import vueSlider from 'vue-slider-component'
  import { mapState } from 'vuex';
  import { Indicator } from 'mint-ui';
  export default {
    name: 'orderdetail',
    props: {item: {}},
    components: {
      vueSlider
    },
    data () {
      return {
        swiperOption: {
          notNextTick: true,
          pagination: '.swiper-pagination',
          slidesPerView: 'auto',
          paginationClickable: true,
          spaceBetween: 10,
          freeMode: true,
          onTransitionStart(){
          },
        },
        some: '',
        pingjiaVisible: false,
        callDetailId: '',// 提交评价子单的id
        toushuVisible: false,
        ratingToService: 0,
        ratingToEngineer: 0,
        ratingHistoryList: [],
        ratingToAll: 0,
        subList: [],
        evaluate: '',
        complainTxt: '',
        show_reminder: true,
        reason: [
          {
            label: this.$t('message.Response_not_timely'),
            value: '1',
          },
          {
            label: this.$t('message.Engineer_issues'),
            value: '2'
          },
          {
            label: this.$t('message.Attitude_issues'),
            value: '3'
          },
          {
            label: this.$t('message.Engineers_frequently'),
            value: '4'
          },
          {
            label: this.$t('message.Other'),
            value: '5'
          }
        ],
        reasonId: '5',
        department: [
          {
            label: this.$t('message.Engineer'),
            value: '1'
          },
          {
            label: this.$t('message.Service_center'),
            value: '2'
          }, {
            label: this.$t('message.Other'),
            value: '3'
          }
        ],
        departmentIds: ['3'],
        timeout: '',
        priceRemark: ''
      }
    },
    watch: {
      'status': {
        handler(val){
          this.$refs.mySwiper.swiper.slideTo(val > 3 ? 7 : 0)
        }
      },
      'ratingToService': {
        handler(val){
          this.ratingToAll = Math.ceil((val + this.ratingToEngineer) / 2)
        }
      },
      'ratingToEngineer': {
        handler(val){
          this.ratingToAll = Math.ceil((val + this.ratingToService) / 2)
        }
      },
    },
    computed: mapState({
      state: state => state.detail,
      detailData: state => state.detail.detail,
      orderNum: state => state.detail.oid,
      orderInfo: state => state.detail.orderInfo,
      status: state => state.detail.detail.status,
      evaluate_num(){
        return 15 - this.evaluate.length >= 0 ? 15 - this.evaluate.length : 0
      },
      complainTarget(){
        let arr = [0, 0, 0]
        for (let i = 0; i < 3; i++) {
          if (this.departmentIds[i] == '1') {
            arr[0] = 1
          }
          if (this.departmentIds[i] == '2') {
            arr[1] = 1
          }
          if (this.departmentIds[i] == '3') {
            arr[2] = 1
          }
        }
        return arr
      }
    }),
    methods: {
      back() {
        this.$router.back();
      },
      getData() {

      },
      getPriceRemark(){
        this.$api.GET_PRICE_REMARK({callId: this.state.callId.toString()}).then(res => {
          this.priceRemark = res.remarkTrPrice
        })
      },
      pingjia(id)  {
        this.callDetailId = id
        this.pingjiaVisible = !this.pingjiaVisible
        this._ratingHistory()
      },
      getSubOrder() {
        this.$api.get_sub_order({callId: this.state.callId.toString()}).then(res => {
          if (res.code == ERR_OK) {
            this.subList = res.callDetailList
          } else {
            alert(res.msg)
          }
        }).catch(err => console.error(err))
      },
      /**
       * 评价子单
       * */
      RatingSubOrder() {
        let data = {
          callDetailIds: [this.callDetailId],
          comments: this.evaluate,
          onSiteScore: 0,
          score: this.ratingToAll,
          seatsScore: 0,
          serviceDeskScore: this.ratingToService
        };
        if (this.state.type == 5) {// 是驻场
          data.onSiteScore = this.ratingToEngineer
        } else {
          data.seatsScore = this.ratingToEngineer
        }
        this.$api.rating_sub_order(data).then(res => {
          if (res.code === ERR_OK) {
            this.$toast('评论成功')
            this._ratingHistory()
          } else {
            alert(res.msg)
          }
        })
      },
      /**
       * 子单评价历史
       */
      _ratingHistory(){
        this.$api.get_rating_history({callDetailId: this.callDetailId}).then(res => {
          if (res.code == ERR_OK) {
            this.ratingHistoryList = res.evaluateByCallDetailId.reverse() //结果倒叙
          } else {
            alert(res.msg)
          }
        })
      },
      reminder(){
        this.$api.reminder_order({callid: this.state.callId}).then(res => {
          if (res.code == ERR_OK) {
            alert(res.msg)
            this.show_reminder = false
            this.timeout = setTimeout(() => {
              this.show_reminder = true
            }, 10 * 60 * 1000)
          } else {
            alert(res.msg)
          }
        }).catch(err => console.error(err))
      },
      toComplain(){
        let data = {
          callId: this.state.callId,
          complainDesc: this.complainTxt,
          complainTarget: this.complainTarget,
          contentId: this.reasonId
        };
        this.$api.complain_order(data).then(res => {
          if (res.code == ERR_OK) {
            Toast(this.$t('message.Complaints_successfully'));
            this.toushuVisible = false
          } else {
            alert(res.msg)
          }
        }).catch(err => console.error(err))
      },
      toPay(oid){
        this.$store.commit('SET_ORDER_NUMBER', oid)
        this.$router.push({name: 'pay', params: {oid: oid}})
      }

    },

    mounted(){

    },
    created(){
      //页面刷新重新赋值
      this.$store.dispatch('new_detail', {
        oid: sessionStorage.getItem('oid'),
        id: sessionStorage.getItem('id'),
        type: sessionStorage.getItem('type')
      })
      var item = sessionStorage.getItem('orderInfo')
      if (item !== 'null' || item !== 'undefined') {
        this.$store.commit('SET_ORDER_INFO', JSON.parse(item))
      }

    },
    activated(){
      this.getSubOrder()
      this.show_reminder = true
      this.getPriceRemark()
    },
    deactivated(){
      clearTimeout(this.timeout)
    }

  }
</script>
<style scoped lang="less">
  .pay-button {
    height: 40px;
    width: 100px;
    line-height: 40px;
    text-align: center;
    background: #f44336;
    color: #fff;
  }

  .step-box {
    item {
      position: relative;
      overflow: hidden;
    }
    .item:after {
      overflow: hidden;
      content: '';
      position: absolute;
      top: 10px;
      left: 0;
      height: 1px;
      width: 110%;
    }
  }

  .orderdetail {
    font-size: 12px !important
  }

  .rating {
    float: left
  }

  .text {
    border-radius: 10px;
    padding: 2px 4px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .callDetails tr {
    display: flex;
  }

  .callDetails {
    border-bottom: 2px solid #26a2ff;
  }

  .null {
    color: #999;
  }

  .titlebox {
    padding: 8px;
    display: block;
    width: 100%;
    position: relative;
    box-shadow: 0 2px 10px -3px rgba(0, 0, 0, .1);
  }

  .page-content {
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .en-icon {
    width: 80px;
    height: 100px;
    background: #eee;
    overflow: hidden;
  }

  span.label {
    border-radius: 10px;
    font-size: 13px;
    padding: 2px 4px;
  }

  .shadow-box {
    width: 98%;
    margin: 10px auto;
    box-shadow: 0 0 0px rgba(0, 0, 0, .1);
    background: #fff;
  }

  .callDetails tr td:nth-of-type(1) {
    text-align: left;
  }

  .callDetails tr td:nth-of-type(2) {
    flex: 1;
    text-align: left;
    overflow: hidden;
  }

  .callDetails tr td {
    text-align: left;
    padding: 4px 8px;
  }

  .fw0 {
    color: #666;
    &:after {
      border-bottom: 1px dashed #666;
    }
  }

  .fw1 {
    color: #26a2ff;
    &:after {
      border-bottom: 1px dashed #26a2ff;
    }
  }

  .fw2 {
    color: #f44336;
    &:after {
      border-bottom: 1px dashed #f44336;
    }
  }

  #oidbtn {
    float: right;
    padding: 0 10px;
  }

  .item-body.nopadding td {
    padding: 0;
  }

  .content {
    width: 98%;
    margin: 10px auto;
    box-shadow: 0 1px 8px rgba(0, 0, 0, .1);
    text-align: left;
  }

  .content-header {
    height: 30px;
    line-height: 30px;
    padding: 0px 8px;
  }

  .item {
    min-width: 70px;
    font-size: 14px;
  }

  .footerBar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: #fafafa;
    box-shadow: 0 0px 1px rgba(0, 0, 0, .1);
  }

  .footerBtn {
    margin-top: 6px;
    margin-right: 5px;
    margin-left: 5px;
    float: right;
    border-radius: 0;
    color: #999;
    outline: none;
    background: #fff;
    border-radius: 14px;
    padding: 2px 10px;
    border: 1px solid #666;
  }

  .swiper-slide {
    width: 20%;
    font-size: 14px;
    margin-right: 0;
  }

  .state-label {
    margin-top: -2px;
    float: right;
    border: 2px solid #26a2ff;
    color: #26a2ff;
    border-radius: 2px;
    font-weight: 700;
    padding: 0 10px;
    transform: rotate(10deg);
  }

  label {
    font-weight: 700;
  }

  .engineer-info td:nth-child(1) {
  }

</style>
