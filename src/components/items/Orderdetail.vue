<template>
  <transition name="fade" mode="out-in" appear>
    <div class="orderdetail">
      <div>
        <mt-header :title="$t('message.Detail')" fixed style="z-index: 9;">
          <mt-button icon="back" @click="back" slot="left">{{$t('message.Back')}}</mt-button>
        </mt-header>
        <scroller class="page-content" style="background:#fafafa;">
          <div class="shadow-box">
            <div class="titlebox">{{$t('message.Order_status')}}</div>
            <swiper :options="swiperOption" ref="mySwiper">
              <!-- slides -->
              <swiper-slide>
                <div class="item" :class="{'fw1':status >= 0 ? true : false}">
                  <i class="iconfont icon-marketing_fill"></i><br>
                  {{$t('message.Accept')}}
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="item" :class="{'fw1':status >= 1 ? true : false}">
                  <i class="iconfont icon-time_fill"></i><br>
                  {{$t('message.Depart')}}
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="item" :class="{'fw1':status >= 2 ? true : false}">
                  <i class="iconfont icon-emoji_fill"></i><br>
                  {{$t('message.Arrive')}}
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="item" :class="{'fw1':status >= 3 ? true : false}">
                  <i class="iconfont icon-brush_fill"></i><br>
                  {{$t('message.Sign')}}
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="item" :class="{'fw1':status >= 4 ? true : false}">
                  <i class="iconfont icon-financial_fill"></i><br>
                  {{$t('message.Confirm_price')}}
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="item" :class="{'fw1':status >= 5 ? true : false}">
                  <i class="iconfont icon-coupons_fill"></i><br>
                  {{$t('message.Invoice')}}
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="item" :class="{'fw1':status >= 6 ? true : false}">
                  <i class="iconfont icon-transaction_fill"></i><br>
                  {{$t('message.Payment')}}
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="item" :class="{'fw1':status >= 7 ? true : false}">
                  <i class="iconfont icon-task_fill"></i><br>
                  {{$t('message.Complete')}}
                </div>
              </swiper-slide>
            </swiper>
          </div>
          <div class="shadow-box">
            <div class="titlebox">{{$t('message.Service_detail')}}</div>
            <div v-for="item in detailData.callDetails">
              <table v-for="subitem in item " class="callDetails" style="width: 100%">
                <tr>
                  <td colspan="2">{{subitem.serviceName}}  <span class="label"
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
                    <button size="small" class="footerBtn pull-right" v-if="status>=3" @click="pingjia">评价</button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div class="shadow-box">
            <div class="titlebox">{{$t('message.Engineer_information')}}</div>
            <table v-for="item in detailData.engineers">
              <tr>
                <td rowspan="3">
                  <div class="en-icon"></div>
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
                  <div v-if="item.entrytime" v-cutTime="item.entrytime">{{item.entrytime}}</div>
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
          <div class="content">
            <div class="content-header">
              <div> {{$t('message.NO')}}：<span id="oid">{{orderNum}}</span></div>
            </div>
          </div>
          <div style="height: 80px"></div>
        </scroller>
        <div class="footerBar">
          <button size="small" class="footerBtn" v-if="status>0 && status<2">催单</button>

          <button size="small" class="footerBtn" v-if="status>=3">投诉</button>
          <button size="small" class="footerBtn" v-if="status>=5">发票</button>
        </div>
        <!--评价-->
        <mt-popup
          v-model="pingjiaVisible"
          position="top" style="width: 100%;height: 100%;">
          <mt-header title="评价" fixed style="z-index: 9;">
            <mt-button icon="back" @click="pingjiaVisible=!pingjiaVisible" slot="left">返回</mt-button>
          </mt-header>
          <div style="height: 40px;"></div>
          <table>
            <tr>
              <td>服务台：</td>
              <td>
                <div class="rating">
                  <star-rating :star-size="30" v-model="ratingToService" :show-rating="false"
                               :inline="true"></star-rating>
                  <span v-if="ratingToService==0" class="text ">未评价</span>
                  <span v-if="ratingToService==1" class="text redbg">服务待跟进</span>
                  <span v-if="ratingToService==2" class="text yellowbg">不满意</span>
                  <span v-if="ratingToService==3" class="text bluebg">一般</span>
                  <span v-if="ratingToService==4" class="text bluebg">满意</span>
                  <span v-if="ratingToService==5" class="text greenbg">非常满意</span>
                </div>
              </td>
            </tr>
            <tr>
              <td> 工程师：</td>
              <td>
                <div class="rating">
                  <star-rating :star-size="30" v-model="ratingToEngineer" :show-rating="false"
                               :inline="true"></star-rating>
                  <span v-if="ratingToEngineer==0" class="text ">未评价</span>
                  <span v-if="ratingToEngineer==1" class="text redbg">服务待跟进</span>
                  <span v-if="ratingToEngineer==2" class="text yellowbg">不满意</span>
                  <span v-if="ratingToEngineer==3" class="text bluebg">一般</span>
                  <span v-if="ratingToEngineer==4" class="text bluebg">满意</span>
                  <span v-if="ratingToEngineer==5" class="text greenbg">非常满意</span>
                </div>
              </td>
            </tr>
            <tr>
              <td> 总&nbsp;&nbsp;&nbsp;&nbsp;体：</td>
              <td>
                <div class="rating">
                  <star-rating :star-size="30" v-model="ratingToAll" :show-rating="false" :inline="true"></star-rating>
                  <span v-if="ratingToAll==0" class="text ">未评价</span>
                  <span v-if="ratingToAll==1" class="text redbg">服务待跟进</span>
                  <span v-if="ratingToAll==2" class="text yellowbg">不满意</span>
                  <span v-if="ratingToAll==3" class="text bluebg">一般</span>
                  <span v-if="ratingToAll==4" class="text bluebg">满意</span>
                  <span v-if="ratingToAll==5" class="text greenbg">非常满意</span>
                </div>
              </td>
            </tr>
          </table>
          <mt-field placeholder="服务周到吗?（写够15字才是好同志）" type="textarea" rows="3" v-model="evaluate"></mt-field>
          <small v-if="evaluate_num!=0" class="pull-right" style="color: #888">加油！还差字{{evaluate_num}}就可以发布了。</small>
          <mt-button type="primary" size="large" :disabled="evaluate_num!=0" @click.native="RatingSubOrder">发布</mt-button>

        </mt-popup>
        <!--评价/-->
        <!--投诉-->
        <mt-popup
          v-model="toushuVisible"
          position="top"
          style="width: 100%;height: 100%"
        >
          <mt-header title="投诉" fixed style="z-index: 9;">
            <mt-button icon="back" @click="toushuVisible=!toushuVisible" slot="left">返回</mt-button>
          </mt-header>
          投诉
        </mt-popup>
        <!--投诉/-->
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import {Toast} from 'mint-ui';
  import vueSlider from 'vue-slider-component'
  import {mapState} from 'vuex';
  import {Indicator} from 'mint-ui';
  export default {
    name: 'orderdetail',
    props: {item: {}},
    components: {
      vueSlider
    },
    data () {
      return {
        swiperOption: {
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
        toushuVisible: false,
        ratingToService: 0,
        ratingToEngineer: 0,
        ratingToAll: 0,
        subList: [],
        evaluate: ''
      }
    },
    watch: {
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
      status: state => state.detail.detail.status,
      evaluate_num(){
        return 15 - this.evaluate.length >= 0 ? 15 - this.evaluate.length : 0
      }
    }),
    methods: {
      back() {
        this.$router.back();
      },
      getData(){

      },
      pingjia(){
        this.pingjiaVisible = !this.pingjiaVisible,
          this.getSubOrder()
      },
      getSubOrder(){
        this.$api.get_sub_order({callId: this.state.callId}).then(res => {
          if (res.code == ERR_OK) {
            this.subList = res.callDetailList
          } else {
            alert(res.msg)
          }
        }).catch(err => console.error(err))
      },
      RatingSubOrder(){
        let data = {
          callDetailIds: ["523524"],
          comments: this.evaluate,
          onSiteScore: "1",
          score: this.ratingToAll,
          seatsScore: 0,
          serviceDeskScore: this.ratingToService
        }
        this.$api.rating_sub_order(data).then(res => {
          console.log(res)
        })
      }

    },

    mounted(){

    },
    created() {
      //页面刷新重新赋值
      this.$store.dispatch('new_detail', {oid: sessionStorage.getItem('oid'), id: sessionStorage.getItem('id'),type:sessionStorage.getItem('type')})
    }
  }
</script>
<style scoped>
  .orderdetail {
    font-size: 12px !important
  }

  .rating {
    float: left
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
    background: #fff;
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
    color: #fff;
    background: #1ab394;
    border-radius: 10px;
    font-size: 13px;
    padding: 2px 4px;
  }

  .shadow-box {
    width: 90%;
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
  }

  .fw1 {
    color: #26a2ff;
  }

  .fw2 {
    color: #f44336;
  }

  #oidbtn {
    float: right;
    padding: 0 10px;
  }

  .item-body.nopadding td {
    padding: 0;
  }

  .content {
    width: 90%;
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

</style>
