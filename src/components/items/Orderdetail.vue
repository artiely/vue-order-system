<template >
  <transition name="fade" mode="out-in"  appear>
  <div class="orderdetail" >
    <div >
    <mt-header title="订单详情" fixed style="z-index: 9;" >
      <mt-button icon="back" @click="back" slot="left" >返回</mt-button >
    </mt-header >
    <scroller class="page-content" style="background:#fafafa;" >
      <div class="shadow-box" >
        <div class="titlebox" >工单状态</div >
        <swiper :options="swiperOption" ref="mySwiper" >
          <!-- slides -->
          <swiper-slide >
            <div class="item" :class="'fw'+thisStep[0]" >
              <i class="iconfont icon-marketing_fill" ></i ><br >
              接受
            </div >
          </swiper-slide >
          <swiper-slide >
            <div class="item" :class="'fw'+thisStep[1]" >
              <i class="iconfont icon-time_fill" ></i ><br >
              出发
            </div >
          </swiper-slide >
          <swiper-slide >
            <div class="item" :class="'fw'+thisStep[2]" >
              <i class="iconfont icon-emoji_fill" ></i ><br >
              到达
            </div >
          </swiper-slide >
          <swiper-slide >
            <div class="item" :class="'fw'+thisStep[3]" >
              <i class="iconfont icon-brush_fill" ></i ><br >
              客户签字
            </div >
          </swiper-slide >
          <swiper-slide >
            <div class="item" :class="'fw'+thisStep[4]" >
              <i class="iconfont icon-financial_fill" ></i ><br >
              价格确认
            </div >
          </swiper-slide >
          <swiper-slide >
            <div class="item" :class="'fw'+thisStep[5]" >
              <i class="iconfont icon-coupons_fill" ></i ><br >
              发票寄出
            </div >
          </swiper-slide >
          <swiper-slide >
            <div class="item" :class="'fw'+thisStep[6]" >
              <i class="iconfont icon-transaction_fill" ></i ><br >
              付款
            </div >
          </swiper-slide >
          <swiper-slide >
            <div class="item" :class="'fw'+thisStep[7]" >
              <i class="iconfont icon-task_fill" ></i ><br >
              完成
            </div >
          </swiper-slide >
        </swiper >
      </div >
      <div class="shadow-box" >
        <div class="titlebox" >服务明细</div >
        <div v-for="item in detailData.callDetails" >
          <table v-for="subitem in item " class="callDetails" style="width: 100%">
            <tr >
              <td >{{subitem.serviceName}}</td >
              <td >
                <span class="label" v-if="subitem.price" >{{subitem.price}} <span v-if="detailData.workFlow.serviceType" >({{detailData.workFlow.serviceType}})</span ></span >
              </td >
            </tr >
            <tr >
              <td >用户</td >
              <td >{{subitem.yh}}</td >
            </tr >
            <tr >
              <td >工程师</td >
              <td ><a >{{subitem.engineername}}</a ></td >
            </tr >
            <tr >
              <td >起止时间</td >
              <td >{{subitem.startTime}}<br>{{subitem.finishTime}}</td >
            </tr >
            <tr >
              <td >问题描述</td >
              <td > <div class="word-wrap">{{subitem.faultDesc}}</div></td >
            </tr >
            <tr >
              <td >处理过程</td >
              <td ><div class="word-wrap">{{subitem.faultSolve}}</div></td >
            </tr >
          </table >
        </div >
      </div >
      <div class="shadow-box" >
        <div class="titlebox" >工程师名片</div >
        <table v-for="item in detailData.engineers" >
          <tr >
            <td rowspan="3" >
              <div class="en-icon" ></div >
            </td >
            <td >姓名：</td >
            <td >{{item.engineername}}</td >
          </tr >
          <tr >
            <td >岗位：</td >
            <td >{{item.post}}</td >
          </tr >
          <tr >
            <td >服务年限：</td >
            <td ><span class="null" v-if="!item.entrytime" >暂无介绍...</span >
            <div v-if="item.entrytime" v-cutTime="item.entrytime">{{item.entrytime}}</div></td >
          </tr >
          <tr >
            <td style="vertical-align: top">自我评价</td >
            <td colspan="2"> <span class="null" v-if="!item.evaluation" >暂无介绍...</span >
              <div v-if="item.evaluation"  style="text-align: left">{{item.evaluation}}</div>
            </td >
          </tr >
          <tr >
            <td  style="vertical-align: top">技能</td >
            <td colspan="2" > <span class="null" v-if="!item.skills||item.skills.length==0" >暂无介绍...</span >
              <div style="text-align: left"> <mt-badge size="small" v-if="item.skills" v-for="(skill,index) in item.skills" :key="index" style="font-size: 10px;margin-bottom: 5px;margin-right: 5px">{{skill}}</mt-badge> </div>
            </td >
          </tr >
          <tr >
            <td style="vertical-align: top">语言</td >
            <td colspan="2" ><span class="null" v-if="!item.languages||item.languages.length==0" >暂无介绍...</span >
              <div style="text-align: left"> <mt-badge size="small" v-if="item.languages" v-for="(language,index) in item.languages" :key="index" style="font-size: 10px;margin-bottom: 5px;margin-right: 5px">{{language.language+language.certificate}}</mt-badge> </div>
            </td >
          </tr >
        </table >
      </div >
      <div class="content" >
        <div class="content-header" >
          <div > 工单编号：<span id="oid" >{{orderNum}}</span > </div >
        </div >
      </div >
      <div style="height: 80px"></div>
    </scroller >
    <div class="footerBar" >
      <button size="small" class="footerBtn" v-if="btnState.pingjia" @click="pingjia" >评价</button >
      <button size="small" class="footerBtn" v-if="btnState.tousu" >投诉</button >
      <button size="small" class="footerBtn" v-if="btnState.zhuiping" >追评</button >
      <button size="small" class="footerBtn" v-if="btnState.cuidan" >催单</button >
      <button size="small" class="footerBtn" v-if="btnState.fapiaocuicu" >发票催促</button >
      <button size="small" class="footerBtn" v-if="btnState.fapiaoxixinyouwu" >发票信息有误</button >
    </div >
      <mt-popup
              v-model="pingjiaVisible"
              position="top" style="width: 100%;height: 100%;">
        <mt-header title="评价" fixed style="z-index: 9;" >
          <mt-button icon="back" @click="pingjiaVisible=!pingjiaVisible" slot="left" >返回</mt-button >
        </mt-header >
        <div style="height: 40px;"></div>
        <table>
          <tr>
            <td>服务台：</td>
            <td><div class="rating">
              <star-rating :star-size="30" v-model="ratingToService" :show-rating="false"  :inline="true"></star-rating>
              <span v-if="ratingToService==0" class="text ">未评价</span>
              <span v-if="ratingToService==1" class="text redbg">服务待跟进</span>
              <span v-if="ratingToService==2" class="text yellowbg">不满意</span>
              <span v-if="ratingToService==3" class="text bluebg">一般</span>
              <span v-if="ratingToService==4" class="text bluebg">满意</span>
              <span v-if="ratingToService==5" class="text greenbg">非常满意</span>
            </div></td>
          </tr>
          <tr>
            <td> 工程师：</td>
            <td>
              <div class="rating">
                <star-rating :star-size="30" v-model="ratingToEngineer" :show-rating="false"  :inline="true"></star-rating>
                <span v-if="ratingToEngineer==0" class="text ">未评价</span>
                <span v-if="ratingToEngineer==1" class="text redbg">服务待跟进</span>
                <span v-if="ratingToEngineer==2" class="text yellowbg">不满意</span>
                <span v-if="ratingToEngineer==3" class="text bluebg">一般</span>
                <span v-if="ratingToEngineer==4" class="text bluebg">满意</span>
                <span v-if="ratingToEngineer==5" class="text greenbg">非常满意</span>
              </div>
            </td>
          </tr>
        </table>
      </mt-popup>
  </div >
  </div>
    </transition>
</template >
<script type="text/ecmascript-6" >
  import { Toast } from 'mint-ui';
  import vueSlider from 'vue-slider-component'
  import { mapState } from 'vuex';
  import axios from 'axios'
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
          pagination: '.swiper-pagination',
          slidesPerView: 'auto',
          paginationClickable: true,
          spaceBetween: 10,
          freeMode: true,
          onTransitionStart(swiper){
            console.log(swiper)
          },
        },
        some: '',
        pingjiaVisible:false,
        ratingToService:0,ratingToEngineer:0
      }
    },
    computed: mapState({
      state: state => state.detail,
      detailData: state => state.detail.detail,
      thisStep: state => state.detail.thisStep,
      orderNum: state => state.detail.oid,
      btnState: state => state.detail.btnState
    }),
    methods: {
      back() {
        this.$router.back();
      },
      getData(){

      },
      pingjia(){
        this.pingjiaVisible=!this.pingjiaVisible
      }
    },

    mounted(){

    },
    created() {
      //页面刷新重新赋值
      this.$store.commit('GET_ORDER_NUMBER',{oid:sessionStorage.getItem('oid'),id:sessionStorage.getItem('id')})
      this.$store.dispatch('new_detail')
    }
  }
</script >
<style scoped >
.orderdetail{
  font-size:12px!important
}
  .rating{
    float:left
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
  .callDetails tr{
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
    width: 75px;
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
    margin-right: 10px;
    margin-left: 10px;
    float: right;
    border-radius: 0;
    color: #999;
    outline: none;
    background: #fff;
    border-radius: 14px;
    padding: 2px 10px;
    border:1px solid #666;
  }

  .swiper-slide {
    width: 20%;
    font-size: 14px;
    margin-right: 0;
  }

</style >
