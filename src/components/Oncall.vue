<template>
  <div class="oncall">
    <mt-header :title="$t('message.Timely_assistance')" fixed>
      <mt-button icon="back" @click.native='back()' slot="left">{{$t('message.Back')}}</mt-button>
    </mt-header>
    <div class="page-content">
      <div class="wrapper-box">
      <mt-cell class="title-box">
        <span slot="title" class="title">{{$t('message.Address')}}</span>
      </mt-cell>
      <div class="companyName" @click.native="toggleopen">
        <mt-field label="" :state="addressObj.address?'success':'error'" v-model="addressObj.address" readonly
                  @click.native="toggleopen" :placeholder="$t('message.Choose_location')"></mt-field>
      </div>
      </div>
      <!--服务点模态s-->
      <mt-popup v-model="popupVisibleCompany" position="right" style="width: 80%;height: 100%;font-size: 14px">
        <scroller>
          <div class="bluebg"
               style="padding: 8px;width: 80%;margin: 0 auto;border-radius: 20px;text-align: center;margin-top: 8px"
               @click="goAddress">新增服务点
          </div>
          <mt-radio :title="$t('message.Location_list')" v-model="popupValue" :options='companyOptions'></mt-radio>
        </scroller>
      </mt-popup>

      <!--服务点模态e-->
      <!--服务日期快捷选择按钮s-->
      <div class="wrapper-box">
      <button-bar theme="assertive" :tab-items="promotions" :tab-index="promotionIndex"
                  :on-tab-click="index => promotionIndex = index" @click.native="showmodal"></button-bar>
      </div>
      <!--服务日期快捷选择按钮e-->
      <div v-if="popupVisibleTime" class="wrapper-box">
        <mt-cell  class="title-box">
          <span class="title" slot="title">{{$t('message.Range_date')}}</span>
        </mt-cell>
        <div class="dateWrap">
          <mu-date-picker class="dateItem" :hintText="$t('message.Start_date')" :minDate="minDate" v-model="startDate"
                          :underlineShow="false" :okLabel="$t('message.Ok')" :cancelLabel="$t('message.Cancel')"/>
          <mu-date-picker class="dateItem" :hintText="$t('message.End_date')" :shouldDisableDate="shouldDisableDate" :minDate="startDate"
                          v-model="endDate" :underlineShow="false" :okLabel="$t('message.Ok')" :cancelLabel="$t('message.Cancel')"/>
        </div>
      </div>
      <!--服务时间选择组件s-->
      <div class="wrapper-box">
      <div class="flexBox">
        <mt-cell  class="title-box">
          <span class="title" slot="title">{{$t('message.Range_time')}}</span>
        </mt-cell>
        <vue-slider ref="slider"
                    v-model="rangeTimeOption.rangeTimeValue"
                    :processStyle="rangeTimeOption.processStyle"
                    :bgStyle="rangeTimeOption.bgStyle"
                    :dotSize="rangeTimeOption.dotSize"
                    :min="rangeTimeOption.min"
                    :max="rangeTimeOption.max"
                    :real-time="true"
                    :formatter="rangeTimeOption.formatter"
                    :tooltipStyle="rangeTimeOption.tooltipStyle"
        ></vue-slider>
        <div style="height: 20px;"></div>
      </div>
      </div>
      <!--服务时间选择组件e-->
      <div class="wrapper-box">
      <div class="flexBox">
        <mt-cell class="title-box">
          <span class="title" slot="title">{{$t('message.Can_time_list')}}</span>
        </mt-cell>
        <table style="width: 100%" border="0" cellspacing="0" cellpadding="0">
          <tr v-for="(item,index) in timeMap" :key="index" :index="index" class="timeItem" v-if="timeMap.length>0">
            <td>{{item.date}}</td>
            <td><span class="label">{{item.weekday}}</span></td>
            <td @click="selectTime(index)">{{item.sTime}}</td>
            <td @click="selectTime(index)">{{item.eTime}}</td>
            <td @click="deleteDate(index)" class="del">{{$t('message.Delete')}}</td>
          </tr>
        </table>
      </div>
      </div>
      <div class="wrapper-box">
        <mt-cell class="my-cell title-box" >
          <span slot="title" class="title">{{$t('message.Fault_description')}}</span>
        </mt-cell>
        <mt-field  :placeholder="$t('message.Please_describe')" type="textarea" rows="4" v-model="faultDesc"></mt-field>
      </div>
      <mt-popup v-model="popupVisibleSelectTime" position="top" style="width: 100%;height: 200px;font-size: 14px">
        <div style="height: 30px;"></div>
        <table style="width: 100%" border="0" cellspacing="0" cellpadding="0" v-if="timeMap.length>0">
          <tr class="timeItem">
            <td>{{timeMap[selectIndex].date}}</td>
            <td><span class="label">{{timeMap[selectIndex].weekday}}</span></td>
            <td>{{timeMap[selectIndex].sTime}}</td>
            <td>{{timeMap[selectIndex].eTime}}</td>
          </tr>
        </table>
        <div style="height: 50px;"></div>
        <vue-slider
          ref="slider2"
          v-model="selectRangeValue"
          :processStyle="rangeTimeOption.processStyle"
          :bgStyle="rangeTimeOption.bgStyle"
          :dotSize="rangeTimeOption.dotSize"
          :min="rangeTimeOption.min"
          :max="rangeTimeOption.max"
          :formatter="rangeTimeOption.formatter"
          :real-time="true"
          :tooltipStyle="rangeTimeOption.tooltipStyle"></vue-slider>

      </mt-popup>
      <mt-cell :title="$t('message.Price_curve')">
        <mt-switch v-model="popupVisiblechart"></mt-switch>
      </mt-cell>
      <div v-if="popupVisiblechart">
        <div class="echarts" v-show="showchart" style="width: 100%;height: 300px;font-size: 14px">
          <canvas id="c1" style="width:95%;height:218px;margin:0 auto;display: block"></canvas>
        </div>
        <div class="flexbox" v-show="!showchart">
          {{$t('message.In_service')}}
        </div>
      </div>
    </div>

    <div class="footerBar">
      <div class="b_btn">
        <mt-button class="an_order" @click="anOrder" type="danger" :disabled="addressObj.id==null || faultDesc==''">
          {{$t('message.Confirm')}}
        </mt-button>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import vueSlider from 'vue-slider-component'
  import {Toast} from 'mint-ui';
  import moment from 'moment'
  import GM from 'g2-mobile'
  export default {
    name: 'oncall',
    components: {
      vueSlider,
//      'date-picker':datePicker
    },
    data () {
      return {
        promotions: [ this.$t('message.By_today'),this.$t('message.Before_Tomorrow') ,this.$t('message.Within_Week') ,this.$t('message.Before_week') , this.$t('message.Other')],
        promotionIndex: 0,
        popupVisibleCompany: false,
        popupVisibleTime: false,
        popupVisiblechart: false,
        popupVisibleSelectTime: false,
        popupValue: '',
        addressObj: {},//选择的服务点地址和id对象
        stateTip: 'error',
        pickerValue: '',
        minDate: moment().format('YYYY-MM-DD'),
        startTime: '08:00',
        endTime: '18:00',//最迟上门日期
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
        timeMap: [{
          'date': moment().format('YYYY-MM-DD'),
          'sTime': '08:00',
          's': 8 * 60,
          'eTime': '18:00',
          'e': 18 * 60,
          'weekday': this.$t('message.Today')
        }],//上门时间列表
        showOther: false,//是否显示其他可选日期
        selectIndex: 0,
        selectRangeValue: [8 * 60, 18 * 60],//选择后修改时间 和下面的全局初始一样
        companyOptions: [],
        showchart: true,
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
          },
          tooltipStyle: {
            "backgroundColor": "#26a2ff",
            "borderColor": "#26a2ff"
          },
          bgStyle: {
            "height": '2px'
          },
          dotSize: 30,
          min: 0,
          max: 24 * 60,
          interval: 4
        },
        loading: true,//控制图表的loading
        GMoptions: [],
        faultDesc: '',//故障描述,
        datepickerOption:{
            ok:this.$t('message.OK'),
          cancel:this.$t('message.Cancel')
        }
      }
    },
    watch: {
      'popupValue': {
        handler: function (val) {
          this.addressObj = JSON.parse(val);
        },
        deep: true
      },
      'promotionIndex': {
        handler: function (val) {
          this.selectIndex = 0;//每次选择前都得把之前修改过的select清0
          //判断用来展开模态
          if (val == 3) {
            this.showOther = true
          } else {
            this.showOther = false
          }
          //判断选择的是今天还是下周
          switch (val) {
            case 0:
              this.startDate = moment().format('YYYY-MM-DD');
              this.endDate = moment().format('YYYY-MM-DD');
              break;
            case 1:
              this.startDate = moment().format('YYYY-MM-DD');
              this.endDate = moment().add(1, 'days').format('YYYY-MM-DD');
              break;
            case 2:
              this.startDate = moment().format('YYYY-MM-DD');
              this.endDate = moment().isoWeekday(7).format('YYYY-MM-DD');
              break;
            case 3:
              this.startDate = moment().format('YYYY-MM-DD');
              this.endDate = moment().isoWeekday(14).format('YYYY-MM-DD');
              break;
            case 4:
              //此处在上面观察者中赋值
              break;
          }
        }
      },
      'rangeTimeOption.rangeTimeValue': {
        handler: function (val, oldVal) {
          console.log("changed", val);
          function formatTime(value) {
            let HS = parseInt(value / 60).toString().length < 2 ? '0' + parseInt(value / 60) : parseInt(value / 60);
            let MS = (value % 60).toString().length < 2 ? '0' + (value % 60) : (value % 60);
            var formatTime = HS + ':' + MS;
            return formatTime
          }


          for (let i = 0; i < this.timeMap.length; i++) {
            this.timeMap[i].sTime = formatTime(val[0]);
            this.timeMap[i].eTime = formatTime(val[1]);
            this.timeMap[i].s = this.rangeTimeOption.rangeTimeValue[0];
            this.timeMap[i].e = this.rangeTimeOption.rangeTimeValue[1]
          }
        }
      },
      'startDate': {
        handler: function (val) {
          this.timeMapTable();
          if (moment(val).valueOf() > moment(this.endDate).valueOf()) {
            this.endDate = val;
          }
        }
      },
      'endDate': {
        handler: function () {
          this.timeMapTable()
        }
      },
      'startTime': {
        handler: function (val) {
          this.timeChanged();
          this.startTime = val
        }
      },
      'endTime': {
        handler: function (val) {
          this.timeChanged();
          this.endTime = val
        }

      },
      'popupVisiblechart': {
        handler: function (val) {
          if (val == true) {
            this.getPriceLine()
          }
        }
      },
      'selectRangeValue': {
        handler: function (val, oldVal) {
          this.timeMap[this.selectIndex].s = this.selectRangeValue[0];
          this.timeMap[this.selectIndex].e = this.selectRangeValue[1];

          function formatTime(value) {
            let HS = parseInt(value / 60).toString().length < 2 ? '0' + parseInt(value / 60) : parseInt(value / 60);
            let MS = (value % 60).toString().length < 2 ? '0' + (value % 60) : (value % 60);
            var formatTime = HS + ':' + MS;
            return formatTime
          }

          this.timeMap[this.selectIndex].sTime = formatTime(this.selectRangeValue[0]);
          this.timeMap[this.selectIndex].eTime = formatTime(this.selectRangeValue[1]);
        }
      }
    },
    created(){
      this.getCompanyList()
    },
    methods: {
      back(){
        this.$router.back()
      },
      getCompanyList(){
        this.$api.get_service_address().then(res => {
          if (res.code == ERR_OK) {
            this.companyOptions = [];
            let data = res.serviceAddress;
            //根据默认id得出companyObj
            let defaultid = res.defaultCompanyId
            for (let i = 0; i < data.length; i++) {
              //因为radio的value只支持字符串 而我需要存入更多的信息
              var _value = JSON.stringify({address: data[i].allAddress, id: data[i].companyId});
              this.companyOptions.push({label: data[i].allAddress, value: _value})
              if (data[i].companyId == defaultid) {
                this.addressObj = {address: data[i].allAddress, id: data[i].companyId}
              }
            }
          }
        });
      },
      goAddress(){
        this.$router.push('/address')
        this.popupVisibleCompany = false
      },
      onValuesChange(pickeker, values) {
        this.popupValue = values;
      },
      toggleopen(){
        this.popupVisibleCompany = !this.popupVisibleCompany
        this.getCompanyList()
      },
      openPicker() {
        this.$refs.picker.open();
      },
      showmodal(){
        //点击其他的时候让模态的状态为展示
        if (this.promotionIndex == 4) {
          this.popupVisibleTime = true
        } else {
          this.popupVisibleTime = false
        }
      },
      deleteDate(index){
        this.timeMap.splice(index, 1);
        Toast(this.$t('message.Del_success'));
      },
      timeMapTable(){
        //对页面时间的处理
        this.timeMap = [];
        let _timeMap = this.splitDate();
        for (let i = 0; i < _timeMap[0].length; i++) {
          this.timeMap.push({
            'date': moment(_timeMap[0][i], 'YYYY-MM-DD').format('YYYY-MM-DD'),
            'sTime': this.startTime,
            's': this.rangeTimeOption.rangeTimeValue[0],
            'eTime': this.endTime,
            'e': this.rangeTimeOption.rangeTimeValue[1],
            'weekday': _timeMap[1][i]
          })
        }
//        this.getPriceLine()
      },
      timeChanged(){ //全局的世界滑块
        let _timeMap = this.timeMap
        for (let i = 0; i < _timeMap.length; i++) {
          this.timeMap[i].sTime = this.startTime;

          this.timeMap[i].eTime = this.endTime

        }
      },
      splitDate(){
        ///日期划分成每一天
        var start_time = this.startDate;
        var end_time = this.endDate;
        var bd = new Date(start_time), be = new Date(end_time);
        var bd_time = bd.getTime(), be_time = be.getTime(), time_diff = be_time - bd_time;
        var d_arr = [];
        for (let i = 0; i <= time_diff; i += 86400000) {
          var ds = new Date(bd_time + i);
          d_arr.push(moment(ds.getFullYear() + '-' + (ds.getMonth() + 1) + '-' + ds.getDate() + '', 'YYYY-MM-DD').format('YYYY-MM-DD'))
        }
        //算出周几
        var _weekDayArr = [];
        for (let i = 0; i < d_arr.length; i++) {
          //算出每天周几
          var zou = '';
          var weekday = moment(d_arr[i]).weekday();
          switch (weekday) {
            case 0:
              zou = this.$t('message.Sun');
              break;
            case 1:
              zou = this.$t('message.Mon');
              break;
            case 2:
              zou = this.$t('message.Tues');
              break;
            case 3:
              zou = this.$t('message.Wed');
              break;
            case 4:
              zou = this.$t('message.Thur');
              break;
            case 5:
              zou = this.$t('message.Fri');
              break;
            case 6:
              zou = this.$t('message.Sat');
              break;
          }
          if (moment().format('YYYY-MM-DD') == moment(d_arr[i]).format('YYYY-MM-DD')) {
            zou = this.$t('message.Today')
          }
//          if (moment().add(1, 'days').format('YYYY-MM-DD') == moment(d_arr[i]).format('YYYY-MM-DD')) {
//            zou = '明天';
//          }
          _weekDayArr.push(zou)
        }
        return [d_arr, _weekDayArr]
      },
      getPriceLine: function () {
        var _this = this;
        /*这里先做一个数据处理 提交过去的时间是页面表上的全部时间*/

        var _upTable = [];
        for (let i = 0; i < _upTable.length; i++) {
          _upTable.push({
            reservationDate: _this.timeMap.date,
            startTime: _this.timeMap.sTime,
            endTime: _this.timeMap.eTime
          })
        }
        var data = {
          companyId: this.addressObj.id,//服务点ID  要等服务点列表加载成功后才有值，所以先让图表隐藏
          oncallDateFrom: this.startDate//开始日期 yyyy-MM-dd
          , oncallDateTo: this.endDate//结束日期yyyy-MM-dd
          , oncallTimeFrom: this.startTime//开始时间 HH:ss
          , oncallTimeTo: this.endTime//结束时间   HH:ss
          , shortcutRadio: '0'//手机端这个没意义了避免报错传个默认
          , oncallReservationTimeVolist: _upTable
        };

        this.$api.get_price_line(data).then(res => {
          if (res.code == ERR_OK) {
            if (!!res.oncallPriceList && res.oncallPriceList != null) {
              this.GMoption = res.oncallPriceList;
              this.renderLine()
            } else {
              priceList = []; // 无返回则为包月
              this.showchart = false
            }
          }else{
              Toast(res.msg)
          }
        }).catch(err=>console.error(err))

      },
      onReady(instance) {
        console.log("ready", instance);
      },
      selectTime(index){
        this.popupVisibleSelectTime = true;
        this.selectIndex = index;
        this.selectRangeValue = [this.timeMap[index].s, this.timeMap[index].e];
        setTimeout(()=> {
          this.$refs.slider2.refresh()
        }, 400)
      },
      shouldDisableDate(date){
        return moment(this.startDate).valueOf() > moment(date).valueOf()
      }
      ,
      renderLine(){
        GM.Global.pixelRatio = 2;
        var Util = GM.Util;
        var data = this.GMoption;
        var chart = new GM.Chart({
          id: 'c1'
        });
        var defs = {
          minute: {
//            type: 'timeCat',
            mask: '',
            tickCount: 30,
            range: [0, 1],
            formatter: function (item) {
              if (item % 30 == 0) {
                return item + '’';
              }

            }
          },
          price: {
            tickCount: 5,
            min: 0,
            formatter: function (item) {
              return '¥' + parseInt(item);
            }
          }
        };
        //配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
        chart.axis('price', {
          label: {
            fontSize: 14
          }
        });
        chart.axis('minute', {
          label: {
            fontSize: 14
          }
        });
        chart.source(data, defs);
        chart.line().position('minute*price');
        chart.render();
      },
      anOrder(){
        let newData = [];
        for (var i = 0; i < this.timeMap.length; i++) {
          newData.push({
            reservationDate: this.timeMap[i].date,
            startTime: this.timeMap[i].sTime,
            endTime: this.timeMap[i].eTime
          })
        }
        var data = {
          "orgId": this.addressObj.id,
          "reservationtimeEntityList": newData,
          "callDetailEntity": {"customerEmployeeId": ''/*下单用户的ID 手机暂时无或者用登录用户的*/, "faultDesc": this.faultDesc}
        };
        this.$api.save_price_oncall(data).then(res=>{
            if(res.code==ERR_OK){
              Toast("预约成功")
            }else{
                alert(res.msg)
            }
        }).catch(err=>console.error(err))
      }
    },
    mounted(){
      if (this.promotionIndex == 4) {
        this.popupVisibleTime = !this.popupVisibleTime
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .oncall{
    background: #eee;
  }
  .wrapper-box{
    margin-bottom: 10px;
    background: #fff;
  }
  .title-box.mint-cell{
    min-height: 24px;
  }
  .title{
    font-size: 10px;
    color: #999;
  }
.an_order{
  border-radius: 0!important;
}
  .dateWrap {
    display: flex;
  }

  .dateItem {
    flex: 1;
    text-indent: 6px;;
    width: 50%;
  }

  .page-content {
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .mint-header.is-fixed {
    z-index: 9;
  }

  .echarts {
    width: 100%;
    height: 250px;
  }

  .oncall {
    text-align: left;
  }



  .itembox {
    margin-bottom: 5px;
    display: flex;
  }

  .itemlabel {
    width: 77px;
    line-height: 22px;
    padding: 6px;
  }
</style>
