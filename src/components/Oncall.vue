<template >
  <div class="oncall" >
    <mt-header title="及时雨服务" fixed >
      <router-link to="/shop" slot="left" >
        <mt-button icon="back" >返回</mt-button >
      </router-link >
    </mt-header >
    <div class="page-content" >
      <mt-cell title="服务点" ></mt-cell >
      <div class="companyName" @click.native="toggleopen" >
        <mt-field label="" :state="addressObj.address?'success':'error'" v-model="addressObj.address" readonly @click.native="toggleopen" placeholder="请选择服务点" ></mt-field >
      </div >


      <!--服务点模态s-->
      <mt-popup v-model="popupVisibleCompany" position="right" style="width: 280px;height: 100%;font-size: 14px" >
        <scroller >
          <mt-radio title="服务点列表" v-model="popupValue" :options='companyOptions' ></mt-radio >
        </scroller >
      </mt-popup >

      <!--服务点模态e-->
      <!--服务日期快捷选择按钮s-->
      <button-bar theme="assertive" :tab-items="promotions" :tab-index="promotionIndex" :on-tab-click="index => promotionIndex = index" @click.native="showmodal" ></button-bar >
      <!--服务日期快捷选择按钮e-->
      <div v-if="popupVisibleTime" class="">
        <mt-cell title="日期范围" ></mt-cell >
        <div class="dateWrap">
          <!--<date-picker class="dateItem" hintText="点击选择日期" :minDate="minDate" v-model="startDate" :underlineShow="false"></date-picker>-->
          <!--<date-picker class="dateItem" hintText="点击选择日期" :shouldDisableDate="shouldDisableDate" :minDate="startDate" v-model="endDate" :underlineShow="false"></date-picker>-->
        </div>
      </div>
      <!--服务时间选择组件s-->
      <div class="flexBox" >
        <mt-cell title="时间范围" ></mt-cell >
        <vue-slider ref="slider" v-model="rangeTimeOption.rangeTimeValue" :processStyle="rangeTimeOption.processStyle" :bgStyle="rangeTimeOption.bgStyle" :dotSize="rangeTimeOption.dotSize" :min="rangeTimeOption.min" :max="rangeTimeOption.max" :formatter="rangeTimeOption.formatter" :tooltipStyle="rangeTimeOption.tooltipStyle"  ></vue-slider >
        <div style="height: 20px;" ></div >
      </div >
      <!--服务时间选择组件e-->
      <div class="flexBox" >
        <mt-cell title="工程师可上门的时间列表" ></mt-cell >
        <table style="width: 100%" border="0" cellspacing="0" cellpadding="0" >
          <tr v-for="(item,index) in timeMap" :key="index" :index="index" class="timeItem" v-if="timeMap.length>0">
            <td >{{item.date}}</td >
            <td ><span class="label" >{{item.weekday}}</span ></td >
            <td @click="selectTime" >{{item.sTime}}</td >
            <td @click="selectTime" >{{item.eTime}}</td >
            <td @click="deleteDate" class="del" >删除</td >
          </tr >
        </table >
      </div >
      <div>
        <mt-cell class="my-cell" title="需求描述" >
        </mt-cell >
        <textarea  rows="4 " placeholder="简单描述故障..." v-model="faultDesc"></textarea>
      </div>
      <mt-popup v-model="popupVisibleSelectTime" position="top" style="width: 100%;height: 200px;font-size: 14px" >
        <div style="height: 30px;" ></div >
        <table style="width: 100%" border="0" cellspacing="0" cellpadding="0" >
          <tr class="timeItem" >
            <td >{{timeMap[selectIndex].date}}</td >
            <td ><span class="label" >{{timeMap[selectIndex].weekday}}</span ></td >
            <td >{{timeMap[selectIndex].sTime}}</td >
            <td >{{timeMap[selectIndex].eTime}}</td >
          </tr >
        </table >
        <div style="height: 50px;" ></div >
        <vue-slider ref="slider2" v-model="selectRangeValue" :processStyle="rangeTimeOption.processStyle" :bgStyle="rangeTimeOption.bgStyle" :dotSize="rangeTimeOption.dotSize" :min="rangeTimeOption.min" :max="rangeTimeOption.max" :formatter="rangeTimeOption.formatter" :real-time="true" :tooltipStyle="rangeTimeOption.tooltipStyle" ></vue-slider >

      </mt-popup >
      <mt-cell title="查看价格信息" >
        <mt-switch v-model="popupVisiblechart" ></mt-switch >
      </mt-cell >
      <div v-if="popupVisiblechart" >
        <div class="echarts" v-show="showchart" style="width: 100%;height: 300px;font-size: 14px" >
          <canvas id="c1" style="width:95%;height:218px;margin:0 auto;display: block"></canvas>
        </div >
        <div class="flexbox" v-show="!showchart" >
          您本次的请求已包含在【包月/包年】服务中。
          如产生其他的费用，群思服务台会和您进行沟通，感谢您选择群思，祝您工作愉快！
        </div >
      </div >
    </div >

    <div class="footerBar" >
      <div class="b_btn" >
        <mt-button class="an_order" @click="anOrder" type="danger" :disabled="addressObj.id==null">
          预约服务
        </mt-button >
      </div >
    </div >
  </div >
</template >
<script type="text/javascript">
  import vueSlider from 'vue-slider-component'
  import { Toast } from 'mint-ui';
  import moment from 'moment'
  import GM from 'g2-mobile'
  export default {
    name: 'oncall',
    components: {
      vueSlider
    },
    data () {
      return {
        promotions: ["今天内", "明天前", "本周内", "下周前", "其他"],
        promotionIndex: 0,
        popupVisibleCompany: false,
        popupVisibleTime: false,
        popupVisiblechart: false,
        popupVisibleSelectTime: false,
        popupValue: '',
        addressObj: {},//选择的服务点地址和id对象
        stateTip:'error',
        pickerValue: '',
        minDate:moment().format('YYYY-MM-DD'),
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
          'weekday': '今天'
        }],//上门时间列表
        showOther: false,//是否显示其他可选日期
        selectIndex: 0,
        selectRangeValue:  [8 * 60, 18 * 60],//选择后修改时间 和下面的全局初始一样
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
        },
        loading: true,//控制图表的loading
        GMoptions:[],
        faultDesc:''//故障描述

      }
    },
    watch: {
      'popupValue': {
        handler: function (val, oldVal) {
          this.addressObj = JSON.parse(val);
        },
        deep: true
      },
      'promotionIndex': {
        handler: function (val, oldVal) {
          this.selectIndex=0;//每次选择前都得把之前修改过的select清0
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


          for(let i=0;i<this.timeMap.length;i++){
            this.timeMap[i].sTime = formatTime(val[0]);
            this.timeMap[i].eTime = formatTime(val[1]);
            this.timeMap[i].s= this.rangeTimeOption.rangeTimeValue[0];
            this.timeMap[i].e= this.rangeTimeOption.rangeTimeValue[1]
          }
        }
      },
      'startDate': {
        handler: function (val, oldVal) {
          this.timeMapTable();
          if(moment(val).valueOf()>moment(this.endDate).valueOf()){
            this.endDate=val;
          }
        }
      },
      'endDate': {
        handler: function (val, oldVal) {
          this.timeMapTable()
        }
      },
      'startTime': {
        handler: function (val, oldVal) {
          this.timeChanged();
          this.startTime = val
        }
      },
      'endTime': {
        handler: function (val, oldVal) {
          this.timeChanged();
          this.endTime = val
        }

      },
      'popupVisiblechart': {
        handler: function (val, oldVal) {
          if(val==true){
            this.getPriceLine()
          }
        }
      },
      'selectRangeValue':{
        handler: function (val, oldVal) {
          this.timeMap[this.selectIndex].s=this.selectRangeValue[0];
          this.timeMap[this.selectIndex].e=this.selectRangeValue[1];

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
      getCompanyList(){
        var _this = this;
        $.ajax({
          url:localPath+'/company/getServiceAddress',
          type: "post",
          contentType: "application/json;charset=utf-8",
          dataType: "json",
          success: function (d) {
            if (d.code == 0) {
              _this.companyOptions = [];
              let data = d.serviceAddress;
              //根据默认id得出companyObj
              let defaultid = d.defaultCompanyId
              for (let i = 0; i < data.length; i++) {
                //因为radio的value只支持字符串 而我需要存入更多的信息
                var _value = JSON.stringify({address: data[i].allAddress, id: data[i].companyId});
                _this.companyOptions.push({label: data[i].allAddress, value: _value})
                if (data[i].companyId == defaultid) {
                  _this.addressObj = {address: data[i].allAddress, id: data[i].companyId}
                }
              }


            }
          }
        })
      },
      onValuesChange(pickeker, values) {
        this.popupValue = values;
      },
      toggleopen(){
        this.popupVisibleCompany = !this.popupVisibleCompany
      },
      openPicker() {
        this.$refs.picker.open();
      },
      showmodal(){
        //点击其他的时候让模态的状态为展示
        if (this.promotionIndex == 4) {
          this.popupVisibleTime = true
        }else {
          this.popupVisibleTime = false
        }
      },
      deleteDate($event){
        var index = $($event.currentTarget).closest('tr').attr('index')
        this.timeMap.splice(index, 1);
        Toast('删除成功');
//        this.getPriceLine()
      },
      timeMapTable(){
        //对页面时间的处理
        this.timeMap = [];
        let _timeMap = this.splitDate();
        console.log("map", _timeMap);
        for (let i = 0; i < _timeMap[0].length; i++) {
          this.timeMap.push({
            'date':  moment(_timeMap[0][i],'YYYY-MM-DD').format('YYYY-MM-DD'),
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
        console.log("时间改变前的日期表", _timeMap)
        for (let i = 0; i < _timeMap.length; i++) {
          this.timeMap[i].sTime = this.startTime;

          this.timeMap[i].eTime = this.endTime

        }
//        this.getPriceLine()
      },
      splitDate(){
        ///日期划分成每一天
        var start_time = this.startDate;
        var end_time = this.endDate;
        var bd = new Date(start_time), be = new Date(end_time);
        var bd_time = bd.getTime(), be_time = be.getTime(), time_diff = be_time - bd_time;
        var d_arr = [];
        for (var i = 0; i <= time_diff; i += 86400000) {
          var ds = new Date(bd_time + i);
          d_arr.push(moment(ds.getFullYear() + '-' + (ds.getMonth() + 1) + '-' + ds.getDate() + '','YYYY-MM-DD').format('YYYY-MM-DD'))
        }
        //算出周几
        var _weekDayArr = [];
        for (var i = 0; i < d_arr.length; i++) {
          //算出每天周几
          var zou = '';
          var weekday = moment(d_arr[i]).weekday();
          switch (weekday) {
            case 0:
              zou = '周日';
              break;
            case 1:
              zou = '周一';
              break;
            case 2:
              zou = '周二';
              break;
            case 3:
              zou = '周三';
              break;
            case 4:
              zou = '周四';
              break;
            case 5:
              zou = '周五';
              break;
            case 6:
              zou = '周六';
              break;
          }
          if (moment().format('YYYY-MM-DD') == moment(d_arr[i]).format('YYYY-MM-DD')) {
            zou = '今天';
          }
          if (moment().add(1, 'days').format('YYYY-MM-DD') == moment(d_arr[i]).format('YYYY-MM-DD')) {
            zou = '明天';
          }
          _weekDayArr.push(zou)
        }
        return [d_arr, _weekDayArr]
      },
      getPriceLine: function () {
        var _this = this;
        /*这里先做一个数据处理 提交过去的时间是页面表上的全部时间*/

        var _upTable=[];
        for(let i=0;i<_upTable.length;i++){
          _upTable.push({reservationDate: _this.timeMap.date, startTime:_this.timeMap.sTime,  endTime: _this.timeMap.eTime})
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
        $.ajax({
          url:localPath+'/oncall/getOncallReservationTime',
          type: 'POST',
          contentType: "application/json;charset=utf-8",
          data: JSON.stringify(data),
          dataType: 'json',
          success: function (r) {
            _this.loading = false;
            if (r.code == 0) {
              if (!!r.oncallPriceList && r.oncallPriceList != null) {
                _this.GMoption=r.oncallPriceList;
                _this.renderLine()
              } else {
                priceList = [];// 无返回则为包月
                _this.showchart = false
              }
            } else {
              Toast("系统繁忙，请稍后重试...")
            }
          }
        })
      },
      onReady(instance) {
        console.log("ready", instance);
      },
      selectTime($event){
        this.popupVisibleSelectTime = true;
        var _index = $($event.currentTarget).closest('tr').attr('index');
        this.selectIndex = _index;
        this.selectRangeValue = [this.timeMap[_index].s, this.timeMap[_index].e];
        var _this = this;
        setTimeout(function () {
          _this.$refs.slider2.refresh()
        }, 400)
      },
      shouldDisableDate(date){
        return moment(this.startDate).valueOf()>moment(date).valueOf()
      }
      ,
      renderLine(){
        GM.Global.pixelRatio = 2;
        var Util = GM.Util;
        var data =this.GMoption;
        var chart = new GM.Chart({
          id: 'c1'
        });
        var defs = {
          minute: {
//            type: 'timeCat',
            mask: '',
            tickCount: 30,
            range:[0,1],
            formatter: function(item) {
              if(item%30==0){
                return item+'’' ;
              }

            }
          },
          price: {
            tickCount: 5,
            min: 0,
            formatter: function(item) {
              return '¥'+ parseInt(item);
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
        let newData=[];
               for(var i=0;i<this.timeMap.length;i++){
                 newData.push({reservationDate:this.timeMap[i].date,startTime:this.timeMap[i].sTime,endTime:this.timeMap[i].eTime})
               }
        var data = {
          "orgId": this.addressObj.id,
          "reservationtimeEntityList": newData,
          "callDetailEntity": {"customerEmployeeId": ''/*下单用户的ID 手机暂时无或者用登录用户的*/, "faultDesc": this.faultDesc}
        };
        $.ajax({
          url:localPath+'/oncall/saveOncallPrice',
          type: "POST",
          contentType: "application/json;charset=utf-8",
          data: JSON.stringify(data),
          dataType:'json',
          success: function (r) {
            if (r.code == 0) {
              Toast("预约成功")
            } else {
              Toast("系统忙，请稍后重试")
            }
          }
        })
      }
    },
    mounted(){
      if (this.promotionIndex == 4) {
        this.popupVisibleTime = !this.popupVisibleTime
      }
    }
  }
</script >

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >

.dateWrap{
  display: flex;
}
.dateItem{
  flex: 1;
  text-indent:6px;;
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

  .timeItem td {
    padding: 6px;
  }

  .timeItem td .label {
    color: #fff;
    background: #1ab394;
    border-radius: 10px;
    font-size: 13px;
    padding: 2px 4px;
  }

  .timeItem td.del {
    color: #dd4b39;
    text-decoration: underline;
    font-size: 13px;;
  }

  .timeItem {
    box-shadow: 0 0 10px rgba(100, 100, 100, .1);
    margin-top: -2px;
    overflow: hidden;
    background: #fff;
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
</style >
