<template>
  <div class="oncall" style="height: 100%">
    <mt-header :title="$t('message.Timely_assistance')" fixed>
      <mt-button icon="back" @click.native='back()' slot="left">{{$t('message.Back')}}</mt-button>
    </mt-header>
    <div class="page-content" style="overflow: hidden;">
      <mt-badge type="error" v-if="noBindMobile">您还未绑定手机号，下单后我们将无法联系您,
        <router-link style="color: #fff" to="info?edit=1">前去绑定!</router-link>
      </mt-badge>
      <div class="wrapper-box">
        <div class="title-box">
          <span slot="title" class="title">{{$t('message.Address')}}</span>
        </div>
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
               @click="goAddress">{{$t('message.New_service_address')}}
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
      <div v-if="popupVisibleTime" class="wrapper-box border-bottom">
        <div class="title-box">
          <span class="title" slot="title">{{$t('message.Range_date')}}</span>
        </div>
        <div class="dateWrap">
          <span class="title">请选择开始日期</span>
          <mu-date-picker class="dateItem" :hintText="$t('message.Start_date')" :minDate="minDate" v-model="startDate"
                          :underlineShow="false" :okLabel="$t('message.Ok')" :cancelLabel="$t('message.Cancel')"/>
          <span class="title">请选择结束日期</span>
          <mu-date-picker class="dateItem" :hintText="$t('message.End_date')" :shouldDisableDate="shouldDisableDate"
                          :minDate="startDate"
                          v-model="endDate" :underlineShow="false" :okLabel="$t('message.Ok')"
                          :cancelLabel="$t('message.Cancel')"/>
        </div>
      </div>
      <!--服务时间选择组件s-->
      <div class="wrapper-box">
        <div class="flexBox">
          <div class="title-box">
            <span class="title" slot="title">{{$t('message.Range_time')}}</span>
          </div>
          <vue-slider ref="slider"
                      v-model="rangeTimeOption.rangeTimeValue"
                      :processStyle="rangeTimeOption.processStyle"
                      :bgStyle="rangeTimeOption.bgStyle"
                      :dotSize="rangeTimeOption.dotSize"
                      :interval="rangeTimeOption.interval"
                      :min="rangeTimeOption.min"
                      :max="rangeTimeOption.max"
                      :real-time="true"
                      :formatter="rangeTimeOption.formatter"
                      :tooltipStyle="rangeTimeOption.tooltipStyle"
          ></vue-slider>
          <div style="height: 20px" class="border-bottom"></div>
        </div>
      </div>
      <!--服务时间选择组件e-->
      <div class="wrapper-box">
        <div class="flexBox">
          <div class="title-box">
            <span class="title" slot="title">{{$t('message.Can_time_list')}}</span>
          </div>
          <table style="width: 100%" border="0" cellspacing="0" cellpadding="0">
            <tr v-for="(item,index) in timeMap" :key="index" :index="index" class="timeItem" v-if="timeMap.length>0">
              <td><span>&nbsp;&nbsp;{{item.date}}</span></td>
              <td><span class="label">{{item.weekday}}</span></td>
              <td @click="selectTime(index)">{{item.sTime}}</td>
              <td @click="selectTime(index)">{{item.eTime}}</td>
              <td @click="deleteDate(index)" class="del"><i class="iconfont icon-empty"></i>
                <!--{{$t('message.Delete')}}--></td>
            </tr>
          </table>
        </div>
      </div>
      <div style="margin-bottom: -1px">
        <div class="my-cell title-box">
          <span slot="title" class="title">{{$t('message.Server_need')}}</span>
        </div>
      </div>
      <div class="wrapper-box">
        <mt-field :placeholder="$t('message.Please_describe_oncall')" type="textarea" rows="2" v-model="faultDesc"></mt-field>
      </div>
      <div style="margin-bottom: -1px">
        <div class="my-cell title-box">
          <span slot="title" class="title">{{$t('message.engineer_need')}}</span>
        </div>
      </div>
      <div class="wrapper-box">
        <mt-field :placeholder="$t('message.Please_i')" type="textarea" rows="4" v-model="identify"></mt-field>
      </div>
      <mt-popup v-model="popupVisibleSelectTime" position="top" style="width: 100%;height: 160px;padding:10px">
        <div class="title">可上门时间编辑</div>
        <table style="width: 100%" border="0" cellspacing="0" cellpadding="0" v-if="timeMap.length>0&&selectIndex>=0">
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
          :interval="rangeTimeOption.interval"
          :min="rangeTimeOption.min"
          :max="rangeTimeOption.max"
          :formatter="rangeTimeOption.formatter"
          :real-time="true"
          :tooltipStyle="rangeTimeOption.tooltipStyle"></vue-slider>

      </mt-popup>
      <div class="wrapper-box">
        <mt-cell :title="$t('message.Price_curve')" v-if="addressObj.id&&addressObj.address">
          <mt-switch v-model="popupVisiblechart"></mt-switch>
        </mt-cell>
        <div v-if="popupVisiblechart" class="border-bottom">
          <div class="echarts" v-show="showchart" style="width: 100%;height: 300px;">
            <canvas id="c1" style="width:95%;height:218px;margin:0 auto;display: block"></canvas>
          </div>
          <div style="padding:0 10px 10px;color:#999" v-show="!showchart">
            <i class="iconfont icon-message"></i> {{$t('message.In_service')}}
          </div>
        </div>
      </div>
    </div>
    <mt-tabbar fixed style="z-index=99999999999999999999999999999">
      <div class="footerBar" style="position:fixed;top:100vh;left:0">
        <div class="b_btn  shadow-top">
          <mt-button class="an_order" @click="anOrder" type="danger"
                     :disabled="addressObj.id==null || faultDesc==''||timeMap==''">
            <i class="iconfont icon-task"></i> {{$t('message.Confirm')}}
          </mt-button>
        </div>
      </div>
    </mt-tabbar>
  </div>
</template>
<script type="text/javascript">
  import vueSlider from 'vue-slider-component'
  import {Toast} from 'mint-ui'
  import {MessageBox} from 'mint-ui';
  import moment from 'moment'
  import GM from 'g2-mobile'

  export default {
    name: 'oncall',
    components: {
      vueSlider,
//      'date-picker':datePicker
    },
    data() {
      return {
        promotions: [this.$t('message.By_today'), this.$t('message.Before_Tomorrow'), this.$t('message.Within_Week'), this.$t('message.Before_week'), this.$t('message.Other')],
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
        timeMap: [/*{
          'date': moment().format('YYYY-MM-DD'),
          'sTime': moment().format('HH:mm'),
          's':moment().format('HH:mm').split(':')[0]*60+Number(moment().format('HH:mm').split(':')[1]),
          'eTime': '18:00',
          'e': 18 * 60,
          'weekday': this.$t('message.Today')
        }*/],//上门时间列表
        showOther: false,//是否显示其他可选日期
        selectIndex: 0,
        selectRangeValue: [8 * 60, 18 * 60],//选择后修改时间 和下面的全局初始一样
        companyOptions: [],
        customerEmployeeId: '',
        showchart: true,
        rangeTimeOption: {
          rangeTimeValue: [8 * 60, 18 * 60],
          formatter: function (value) {
            let HS = parseInt(value / 60).toString().length < 2 ? '0' + parseInt(value / 60) : parseInt(value / 60)
            let MS = (value % 60).toString().length < 2 ? '0' + (value % 60) : (value % 60)
            var formatTime = HS + ':' + MS
            return formatTime
          },
          processStyle: {
            'height': '2px',
            'backgroundColor': '#26a2ff',
          },
          tooltipStyle: {
            'backgroundColor': '#26a2ff',
            'borderColor': '#26a2ff'
          },
          bgStyle: {
            'height': '2px'
          },
          dotSize: 30,
          min: 0,
          max: 24 * 60,
//          data:[0,15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345, 360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125,1140],
          interval: 15,
          piecewise: true,
          lazy: true
        },
        loading: true,//控制图表的loading
        GMoptions: [],
        faultDesc: '',//故障描述,
        identify: '',
        noBindMobile: false,
        datepickerOption: {
          ok: this.$t('message.Ok'),
          cancel: this.$t('message.Cancel')
        },
        timer: ''
      }
    },
    created() {
//      var _arr = []
//      _arr.length = 1140
//      console.log('1', _arr)
//      for (let i = 0; i < 1140; i++) {
//        _arr[i] = i
//      }
//      _arr = _arr.filter(item => {
//        if (item % 15 == 0) {
//          return item
//        }
//      })
//      this.rangeTimeOption.data = _arr
//      console.log('3', _arr)
//      console.log('**************', this.rangeTimeOption.data)
    },
//    computed:{
//      'rangeTimeOption.data':function(){
//        var _arr=new Array(24*60)
//       return _arr.map((item,i)=>{
//          return i
//        })
//        .filter(item=>{
//          return item%15==0
//        })
//      }
//    },
    watch: {
      'popupValue': {
        handler: function (val) {
          this.addressObj = JSON.parse(val)
        },
        deep: true
      },
      'promotionIndex': {
        handler: function (val) {
          this.selectIndex = 0//每次选择前都得把之前修改过的select清0
          //判断用来展开模态
          if (val == 3) {
            this.showOther = true
          } else {
            this.showOther = false
          }
          //判断选择的是今天还是下周
          switch (val) {
            case 0:
              this.startDate = moment().format('YYYY-MM-DD')
              this.endDate = moment().format('YYYY-MM-DD')
              break
            case 1:
              this.startDate = moment().format('YYYY-MM-DD')
              this.endDate = moment().add(1, 'days').format('YYYY-MM-DD')
              break
            case 2:
              this.startDate = moment().format('YYYY-MM-DD')
              this.endDate = moment().isoWeekday(7).format('YYYY-MM-DD')
              break
            case 3:
              this.startDate = moment().format('YYYY-MM-DD')
              this.endDate = moment().isoWeekday(14).format('YYYY-MM-DD')
              break
            case 4:
              //此处在上面观察者中赋值
              break
          }
        }
      },
      'rangeTimeOption.rangeTimeValue': {
        handler: function (val, oldVal) {
//          console.log("changed", val);
          function formatTime(value) {
            let HS = parseInt(value / 60).toString().length < 2 ? '0' + parseInt(value / 60) : parseInt(value / 60)
            let MS = (value % 60).toString().length < 2 ? '0' + (value % 60) : (value % 60)
            var formatTime = HS + ':' + MS
            return formatTime
          }

          for (let i = 0; i < this.timeMap.length; i++) {
            this.timeMap[i].sTime = formatTime(val[0])
            this.timeMap[i].eTime = formatTime(val[1])
            this.timeMap[i].s = this.rangeTimeOption.rangeTimeValue[0]
            this.timeMap[i].e = this.rangeTimeOption.rangeTimeValue[1]
          }
        }
      },
      'startDate': {
        handler: function (val) {
          this.timeMapTable()
          if (moment(val).valueOf() > moment(this.endDate).valueOf()) {
            this.endDate = val
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
          this.timeChanged()
          this.startTime = val
        }
      },
      'endTime': {
        handler: function (val) {
          this.timeChanged()
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
      'timeMap': {
        handler() {
          if (this.popupVisiblechart == true) {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
              this.getPriceLine()
            }, 500)

          }
        },
        deep: true
      },
      'addressObj': {
        handler(val) {
          if (this.popupVisiblechart == true) {
//            this.popupVisiblechart=false
            this.getPriceLine()
          }
          if (val.id) {
            this.$api.WORK_TIME({id: val.id}).then(res => {
              if (res.code == 0) {
                this.startTime = res.defaultWorkTime.amWorkinTime
                this.endTime = res.defaultWorkTime.pmWorkoffTime
//                this.selectRangeValue=[this.startTime.split(":")[0]*60,this.endTime.split(":")[0]*60]
                this.$set(this.selectRangeValue, 0, this.startTime.split(":")[0] * 60)
                this.$set(this.selectRangeValue, 1, this.endTime.split(":")[0] * 60)
                console.log(this.selectRangeValue)
              }
            })
          }

        },
        deep: true
      },
      'selectRangeValue': {
        handler: function (val, oldVal) {
          this.timeMap[this.selectIndex].s = this.selectRangeValue[0]
          this.timeMap[this.selectIndex].e = this.selectRangeValue[1]

          function formatTime(value) {
            let HS = parseInt(value / 60).toString().length < 2 ? '0' + parseInt(value / 60) : parseInt(value / 60)
            let MS = (value % 60).toString().length < 2 ? '0' + (value % 60) : (value % 60)
            var formatTime = HS + ':' + MS
            return formatTime
          }

          this.timeMap[this.selectIndex].sTime = formatTime(this.selectRangeValue[0])
          this.timeMap[this.selectIndex].eTime = formatTime(this.selectRangeValue[1])
          this.timeMap[this.selectIndex].date = this.timeMap[this.selectIndex].date

        }
      },

    },
    methods: {
      back() {
        this.$router.back()
      },
      getCompanyList(cb) {
        this.$api.get_service_address().then(res => {
          if (res.code == ERR_OK) {
            this.companyOptions = []
            let data = res.serviceAddress
            //根据默认id得出companyObj
            let defaultid = res.defaultCompanyId
            for (let i = 0; i < data.length; i++) {
              //因为radio的value只支持字符串 而我需要存入更多的信息
              var _value = JSON.stringify({address: data[i].allAddress, id: data[i].companyId})
              this.companyOptions.push({label: data[i].allAddress, value: _value})
              if (data[i].companyId == defaultid) {
                this.addressObj = {address: data[i].allAddress, id: data[i].companyId}
              }
            }
            cb && cb()
          } else {
            MessageBox.alert(JSON.stringify(`获取服务点`, JSON.stringify(res)))
          }
        })
      },
      goAddress() {
        this.$router.push('/address')
        this.popupVisibleCompany = false
      },
      onValuesChange(pickeker, values) {
        this.popupValue = values
      },
      toggleopen() {
        this.popupVisibleCompany = !this.popupVisibleCompany
        this.getCompanyList()
      },
      openPicker() {
        this.$refs.picker.open()
      },
      showmodal() {
        //点击其他的时候让模态的状态为展示
        if (this.promotionIndex == 4) {
          this.popupVisibleTime = true
        } else {
          this.popupVisibleTime = false
        }
      },
      deleteDate(index) {
        console.log(index, this.selectIndex)
//        this.timeMap.splice(index, 1)  // 两种方法都可以
        this.$delete(this.timeMap, index)
        this.selectIndex = 0 // selectIndex 初始化为0 因为删除后selectIndex对应的值已不存在会报错
        Toast(this.$t('message.Del_success'))
      },
      timeMapTable() {
        //对页面时间的处理
        this.timeMap = []
        let _timeMap = this.splitDate()
        for (let i = 0; i < _timeMap[0].length; i++) {
          if (moment().format('YYYY-MM-DD') == moment(_timeMap[0][i]).format('YYYY-MM-DD')) {
            console.log("相等的")
            let _sh = moment().format('HH:mm')
            let _sa = _sh.split(':')
            console.log(_sh, moment().format('HH:mm'), Number(_sa[0]) * 60 + Number(_sa[1]))
            this.timeMap.push({
              'date': moment(_timeMap[0][i], 'YYYY-MM-DD').format('YYYY-MM-DD'),
              'sTime': _sh,
              's': Number(_sa[0]) * 60 + Number(_sa[1]),
              'eTime': this.endTime,
              'e': this.rangeTimeOption.rangeTimeValue[1],
              'weekday': _timeMap[1][i]
            })
          } else {
            console.log("不等的")
            this.timeMap.push({
              'date': moment(_timeMap[0][i], 'YYYY-MM-DD').format('YYYY-MM-DD'),
              'sTime': this.startTime,
              's': this.rangeTimeOption.rangeTimeValue[0],
              'eTime': this.endTime,
              'e': this.rangeTimeOption.rangeTimeValue[1],
              'weekday': _timeMap[1][i]
            })
          }
        }
        console.log('123', this.timeMap)

//          if (moment().format('YYYY-MM-DD') == moment(_timeMap[0][0]).format('YYYY-MM-DD')) {
//          let  zou = this.$t('message.Today')
//            let _sh=moment().format('HH:mm').split(':')
//            console.log(_sh)
//            this.timeMap[0].sTime= moment().format('HH:mm')
//            this.timeMap[0].s= Number(_sh[0])*60+Number(_sh[1] )
//
////            this.timeMap[0].sTime={
////              'date': moment().format('YYYY-MM-DD'),
////              'sTime': moment().format('HH:mm'),
////              's':Number(_sh[0])*60+Number(_sh[1] ),
////              'eTime': this.endTime,
////              'e': this.rangeTimeOption.rangeTimeValue[1],
////              'weekday':zou
////            }
//            console.log('123',this.timeMap)
//          }

//        this.getPriceLine()
      },
      timeChanged() { //全局的时间滑块
        let _timeMap = this.timeMap
        for (let i = 0; i < _timeMap.length; i++) {

          this.timeMap[i].sTime = this.startTime

          this.timeMap[i].eTime = this.endTime

        }
      },
      splitDate() {
        ///日期划分成每一天
        var start_time = this.startDate
        var end_time = this.endDate
        var bd = new Date(start_time), be = new Date(end_time)
        var bd_time = bd.getTime(), be_time = be.getTime(), time_diff = be_time - bd_time
        var d_arr = []
        for (let i = 0; i <= time_diff; i += 86400000) {
          var ds = new Date(bd_time + i)
          d_arr.push(moment(ds.getFullYear() + '-' + (ds.getMonth() + 1) + '-' + ds.getDate() + '', 'YYYY-MM-DD').format('YYYY-MM-DD'))
        }
        //算出周几
        var _weekDayArr = []
        for (let i = 0; i < d_arr.length; i++) {
          //算出每天周几
          var zou = ''
          var weekday = moment(d_arr[i]).weekday()
          switch (weekday) {
            case 0:
              zou = this.$t('message.Sun')
              break
            case 1:
              zou = this.$t('message.Mon')
              break
            case 2:
              zou = this.$t('message.Tues')
              break
            case 3:
              zou = this.$t('message.Wed')
              break
            case 4:
              zou = this.$t('message.Thur')
              break
            case 5:
              zou = this.$t('message.Fri')
              break
            case 6:
              zou = this.$t('message.Sat')
              break
          }
          if (moment().format('YYYY-MM-DD') == moment(d_arr[i]).format('YYYY-MM-DD')) {
            zou = this.$t('message.Today')
//            this.timeMap[0]={
//              'date': moment().format('YYYY-MM-DD'),
//              'sTime': moment().format('HH:mm'),
//              's': this.rangeTimeOption.rangeTimeValue[0],
//              'eTime': this.endTime,
//              'e': this.rangeTimeOption.rangeTimeValue[1],
//              'weekday':zou
//            }
          }
//          if (moment().add(1, 'days').format('YYYY-MM-DD') == moment(d_arr[i]).format('YYYY-MM-DD')) {
//            zou = '明天';
//          }
          _weekDayArr.push(zou)
        }
        return [d_arr, _weekDayArr]
      },
      getPriceLine: function () {
        var _this = this
        /*这里先做一个数据处理 提交过去的时间是页面表上的全部时间*/

        var _upTable = []
        /*[{oncallDate: "2017-10-13", oncallTimeFrom: "16:35", oncallTimeTo: "18:00", oncallWeek: "今天"},…]*/
        for (let i = 0; i < _this.timeMap.length; i++) {
          _upTable.push({
            oncallDate: _this.timeMap[i].date,
            oncallTimeFrom: _this.timeMap[i].sTime,
            oncallTimeTo: _this.timeMap[i].eTime,
            oncallWeek: _this.timeMap[i].weekday
          })
        }
        console.log(_upTable)
        console.log(_this.timeMap)
        var data = {
          companyId: this.addressObj.id,//服务点ID  要等服务点列表加载成功后才有值，所以先让图表隐藏
          oncallDateFrom: this.startDate//开始日期 yyyy-MM-dd
          , oncallDateTo: this.endDate//结束日期yyyy-MM-dd
          , oncallTimeFrom: this.startTime//开始时间 HH:ss
          , oncallTimeTo: this.endTime//结束时间   HH:ss
          , shortcutRadio: '0'//手机端这个没意义了避免报错传个默认
          , oncallReservationTimeVolist: _upTable
        }

        this.$api.get_price_line(data).then(res => {
          if (res.code == ERR_OK) {
            if (res.oncallPriceList) {
              this.showchart = true
              this.GMoption = res.oncallPriceList
              this.renderLine()
            } else {
              this.showchart = false
            }
          } else {
            Toast(res.msg)
          }
        }).catch(err => console.error(err))

      },
      onReady(instance) {
//        console.log("ready", instance);
      },
      selectTime(index) {
        this.popupVisibleSelectTime = true
        this.selectIndex = index
        this.selectRangeValue = [this.timeMap[index].s, this.timeMap[index].e]
        setTimeout(() => {
          this.$refs.slider2.refresh()
        }, 400)
      },
      shouldDisableDate(date) {
        return moment(this.startDate).valueOf() > moment(date).valueOf()
      }
      ,
      renderLine() {
        GM.Global.pixelRatio = 2
        var Util = GM.Util
        var data = this.GMoption
        var chart = new GM.Chart({
          id: 'c1'
        })
        var defs = {
          minute: {
//            type: 'timeCat',
            mask: '',
            tickCount: 30,
            range: [0, 1],
            formatter: function (item) {
              if (item % 30 == 0) {
                return item + '’'
              }
            }
          },
          price: {
            tickCount: 5,
            min: 0,
            formatter: function (item) {
              return '¥' + parseInt(item)
            }
          }
        }
        //配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
        chart.axis('price', {
          label: {
            fontSize: 14
          }
        })
        chart.axis('minute', {
          label: {
            fontSize: 14
          }
        })
        chart.source(data, defs)
        chart.line().position('minute*price')
        chart.render()
      },
      anOrder() {
        if (sessionStorage.getItem('isGuest') && sessionStorage.getItem('isGuest') == 'true') {
          this.$store.commit('GUEST_TIP')
          return
        }
        let newData = []
        for (var i = 0; i < this.timeMap.length; i++) {
          newData.push({
            reservationDate: this.timeMap[i].date,
            startTime: this.timeMap[i].sTime,
            endTime: this.timeMap[i].eTime
          })
        }
        var data = {
          'orgId': this.addressObj.id,
          'identify': this.identify,
          'reservationtimeEntityList': newData,
          'callDetailEntity': {
            'customerEmployeeId': this.customerEmployeeId/*下单用户的ID 手机暂时无或者用登录用户的*/,
            'faultDesc': this.faultDesc
          }
        }
        this.$api.save_price_oncall(data).then(res => {
          if (res.code == ERR_OK) {
            MessageBox.alert('预约成功')
            this.faultDesc = '' // 清空描述让button disabled
          } else {
            MessageBox.alert(`预约` + res.msg)
          }
        }).catch(err => console.error(err))
      },
      _getEmployeeId() {
        this.$api.GET_PERSON_ACCOUNT_USER().then(res => {
          if (res.code == 0) {
            this.customerEmployeeId = res.personId
          } else {
            MessageBox.alert(JSON.stringify(`获取用户` + res))
          }
        })
        this.$api.CHECK_BIND_MOBILE().then(res => {
          if (res.code == 0) {
            if (res.exist == 0) {
              this.noBindMobile = true
            } else {
              this.noBindMobile = false
            }
          } else {
            MessageBox.alert(JSON.stringify(`绑定手机` + res))
          }
        })
      },
      _checkAccountType(cb) {
        // 检查账号类型，是个人还是企业
        this.$api.CHECK_ACCOUNT_TYPE().then(res => {
          if (res.code == 0) {
            if (res.state == 2) {
              this.isCompany = true
            } else {
              this.isCompany = false
            }
            cb && cb()
          } else {
            MessageBox.alert(`获取账号类型出错` + JSON.stringify(res))
          }
        })
      },
      _getUser() {
        this.$api.get_yh({company: this.addressObj.id}).then(res => {
          this.customerEmployeeId = res.defaultLoginUser
        })
      }
    },
    mounted() {
      if (this.promotionIndex == 4) {
        this.popupVisibleTime = !this.popupVisibleTime
      }
      this.$nextTick(() => {
        this.promotionIndex = 2
      })
    },
    activated() {
//      this.timeMapTable()
      this._checkAccountType(() => {
        if (this.isCompany == false) {
          this._getEmployeeId()
        } else {
          this.getCompanyList(() => {
            this._getUser()
          })
        }
      })

      this.$store.dispatch('hasTelphone')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .oncall {
    background: #eee;
  }

  .wrapper-box {
    margin-bottom: 10px;
    background: #fff;
  }

  .title-box {
    min-height: 24px;
    line-height: 24px;
    padding-left: 10px;
    background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 30%, transparent 50%);
    background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 30%, transparent 50%);
    background-size: 150% 1px;
    background-repeat: no-repeat;
    background-position: top;
    background-color: white;
  }

  .title {
    font-size: 10px;
    color: #999;
  }

  .an_order {
    border-radius: 0 !important;
  }

  .dateWrap {
    display: flex;
  }

  .dateItem {
    flex: 1;
    text-indent: 6px;;
    width: 50%;
  }

  .mu-text-field-input {
    text-align: center;
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
