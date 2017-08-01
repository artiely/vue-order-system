<template>
  <div class="ma">
    <mt-header title="候鸟服务" fixed>
      <router-link to="/shop" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="page-content">
      <mt-cell title="服务点" ></mt-cell >
      <div class="companyName" @click.native="toggleOpen" >
        <mt-field label="" :state="stateTip" v-model="addressTip" readonly @click.native="toggleOpen" placeholder="请选择服务点" ></mt-field >
      </div >
      <!--服务点模态s-->
      <mt-popup v-model="popupVisibleCompany" position="right" style="width: 280px;height: 100%;font-size: 14px;text-align: left" >
        <scroller >
          <mt-checklist title="服务点列表" v-model="checkValue" :options='serviceAddress' ></mt-checklist >
        </scroller >
      </mt-popup >

      <!--日期s-->
      <div>
        <mt-cell title="日期范围" ></mt-cell >
        <div class="dateWrap">
        <!--   <date-picker class="dateItem" hintText="点击选择日期" :minDate="minDate" v-model="startDate" :underlineShow="false"></date-picker>
          <date-picker class="dateItem" hintText="点击选择日期" :shouldDisableDate="shouldDisableDate" :minDate="startDate" v-model="endDate" :underlineShow="false"></date-picker> -->
        </div>
      </div>
      <!--日期e-->

      <!--时间s-->
      <div class="flexBox" >
        <mt-cell title="时间范围" ></mt-cell >
        <vue-slider ref="slider" v-model="rangeTimeOption.rangeTimeValue" :processStyle="rangeTimeOption.processStyle" :bgStyle="rangeTimeOption.bgStyle" :dotSize="rangeTimeOption.dotSize" :min="rangeTimeOption.min" :max="rangeTimeOption.max" :formatter="rangeTimeOption.formatter" :tooltipStyle="rangeTimeOption.tooltipStyle"  ></vue-slider >
        <div style="height: 20px;" ></div >
      </div >
      <!--时间e-->
      <!--其他s-->
      <div>
        <mt-cell class="my-cell" title="是否午休" >
          <mt-switch v-model="query.sfwx" ></mt-switch >
        </mt-cell >
        <mt-cell class="my-cell" title="仅限工作日" >
          <mt-switch v-model="query.sfgzr" ></mt-switch >
        </mt-cell >
        <mt-cell class="my-cell" title="工程师数量" >
          <select v-model="query.rysl" class="select">
            <option :value="item" v-for="item in query.ryzs" >{{item}}</option >
          </select >
        </mt-cell >
      </div>
      <!--其他e-->
    <div>
      <mt-cell class="my-cell" title="需求描述" >
      </mt-cell >
      <textarea  rows="4 " placeholder="简单描述故障..."></textarea>
    </div>

      <div class="footerBar" >
        <div class="b_btn" >
          <mt-button class="an_order"  @click="anOrder"  type="danger" :disabled="checkValue.length==0">
            预约服务
          </mt-button >
        </div >
      </div >

    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import { Toast } from 'mint-ui';
  import vueSlider from 'vue-slider-component'
export default {
  name: 'ma',
  components: {
    vueSlider
  },
  data () {
    return {
      addressTip:'',
      stateTip:'error',
      popupVisibleCompany:false,
      checkValue:[],companyOptions:[],
      serviceAddress:[],
      minDate:moment().format('YYYY-MM-DD'),
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      rangeTimeOption: {
        rangeTimeValue: [8 * 60, 18 * 60],
        formatter: function (value) {
          let HS = parseInt(value / 60).toString().length < 2 ? '0' + parseInt(value / 60) : parseInt(value / 60);
          let MS = (value % 60).toString().length < 2 ? '0' + (value % 60) : (value % 60);
          var formatTime = HS + ':' + MS;
          return formatTime
        },
        processStyle: {
          "height": '2px',
          "backgroundColor": "#26a2ff",
        }, tooltipStyle: {
          "backgroundColor": "#26a2ff",
          "borderColor": "#26a2ff"
        },
        bgStyle: {
          "height": '2px'
        },
        dotSize: 30,
        min: 0,
        max: 24 * 60,
      },
      query:{
        sfwx:false,
        sfgzr:false,
        rysl:1,
        ryzs:[1,2,3,4,5,6,7,8,9,10]

      }
    }
  },
  watch:{
    'checkValue':{
      handler: function (val) {
        if(val.length==0){
          this.addressTip =''
          this.stateTip="error"
        }else{
          this.addressTip = '您已选择'+val.length+'个服务点'
          this.stateTip="success"
        }

      }
    },
    'startDate': {
      handler: function (val, oldVal) {
        if(moment(val).valueOf()>moment(this.endDate).valueOf()){
          this.endDate=val;
        }
      }
    },
  },
  created(){
    this.getServiceAddress()
  },
  methods:{
    getServiceAddress () {
      var _this=this;
      $.ajax({
        url: localPath+"/company/getServiceAddress",
        dataType:'json',
        success: function (r) {
          if (r.code == 0) {
            let _temp=[];
            let _data=r.serviceAddress
            for(var i=0;i<_data.length;i++){
              _temp.push({
                label:_data[i].allAddress,
                value:_data[i].companyId
              })
            }
            _this.serviceAddress = _temp
          }
        }
      })
    },
    shouldDisableDate(date){
      return moment(this.startDate).valueOf()>moment(date).valueOf()
    },
    toggleOpen(){
      this.popupVisibleCompany = !this.popupVisibleCompany
    },
    anOrder(){
      let newData=[];
      for(var i=0;i< x.length;i++){
//要计算价格 没法继续
      }
      $.ajax({
        url: localPath+'/Tr/saveTrOrder',
        data: JSON.stringify(newData),
        type: "POST",
        dataType:'json',
        success: function (r) {
          if (r.code == 0) {
            Toast("下单成功")
          }else{
            Toast('系统忙，请稍后重试')
          }

        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .select{
    height: 32px;
    width: 52px;
    border: 1px solid #d9d9d9;
    border-radius: 16px;
    box-sizing: border-box;
    background: #fff;
  }

.page-content{
  padding-top: 40px;
  text-align: left;
  padding-bottom: 40px;
}
.dateWrap{
  display: flex;
}
.dateItem{
  flex: 1;
  text-indent:6px;;
  width: 50%;
}
</style>
