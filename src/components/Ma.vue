<template>
  <div class="ma">
    <mt-header :title="$t('message.Residency_service')" fixed style="z-index: 7;">
      <mt-button icon="back" @click.native="back()" slot="left">{{$t('message.Back')}}</mt-button>
    </mt-header>
    <div class="page-content">
      <div class="wrapper-box">
        <mt-cell class="title-box">
        <span class="title" slot="title">
          {{$t('message.Service_location')}}
        </span>
        </mt-cell>
        <div class="companyName" @click.native="toggleOpen">
          <mt-field label="" :state="stateTip" v-model="addressObj.label" readonly @click.native="toggleOpen"
                    :placeholder="$t('message.Choose_location')"></mt-field>
        </div>
      </div>
      <!--服务点模态s-->
      <mt-popup v-model="popupVisibleCompany" position="right"
                style="width: 80%;height: 100%;font-size: 14px;text-align: left">
        <scroller>
          <div class="bluebg"
               style="padding: 8px;width: 80%;margin: 0 auto;border-radius: 20px;text-align: center;margin-top: 8px"
               @click="goAddress">新增服务点
          </div>
          <mt-radio :title="$t('message.Location_list')" v-model="checkValue" :options='serviceAddress'></mt-radio>
        </scroller>
      </mt-popup>


      <!--其他s-->
      <div>
        <mt-cell class="my-cell" :title="$t('message.Lunch_break')">
          <mt-switch v-model="query.sfwx"></mt-switch>
        </mt-cell>
        <mt-cell class="my-cell" :title="$t('message.Working_day')">
          <mt-switch v-model="query.sfgzr"></mt-switch>
        </mt-cell>
        <mt-cell class="my-cell" :title="$t('message.Engineer_Headcount')">
          <select v-model="query.rysl" class="select">
            <option :value="item" v-for="item in query.ryzs">{{item}}</option>
          </select>
        </mt-cell>
      </div>
      <!--其他e-->
      <!--日期s-->
      <div class="wrapper-box">
        <mt-cell class="title-box">
          <span class="title" slot="title">
            {{$t('message.Range_date')}}
          </span>
        </mt-cell>
        <div class="dateWrap">
          <mu-date-picker
            class="dateItem"
            :hintText="$t('message.Start_date')"
            :minDate="minDate"
            v-model="startDate"
            :underlineShow="false"
            :okLabel="$t('message.Ok')"
            :cancelLabel="$t('message.Cancel')"
            :shouldDisableDate="disableWeekends"/>
          <mu-date-picker
            class="dateItem"
            :hintText="$t('message.End_date')"
            :shouldDisableDate="disableWeekends"
            :minDate="startDate"
            v-model="endDate"
            :underlineShow="false"
            :okLabel="$t('message.Ok')"
            :cancelLabel="$t('message.Cancel')"
          />
        </div>
      </div>
      <!--日期e-->
      <!--时间s-->
      <div class="flexBox wrapper-box">
        <mt-cell class="title-box">
          <span class="title" slot="title">{{$t('message.Range_time')}}</span>
        </mt-cell>
        <vue-slider
          ref="slider"
          v-model="rangeTimeOption.rangeTimeValue"
          :processStyle="rangeTimeOption.processStyle"
          :bgStyle="rangeTimeOption.bgStyle"
          :dotSize="rangeTimeOption.dotSize"
          :min="rangeTimeOption.min"
          :max="rangeTimeOption.max"
          :formatter="rangeTimeOption.formatter"
          :tooltipStyle="rangeTimeOption.tooltipStyle"
          :real-time="true"
        ></vue-slider>
        <div style="height: 20px;"></div>
      </div>
      <!--时间e-->
      <div class="wrapper-box">
        <mt-cell class="my-cell title-box">
          <span class="title" slot="title">{{$t('message.Fault_description')}}</span>
        </mt-cell>
        <mt-field type="textarea" rows="4" :placeholder="$t('message.Please_describe')" v-model="faultDesc"></mt-field>
      </div>
      <div>
        <mt-button type="primary" size="large" @click.native="getPriceMa" :disabled="checkValue==''||faultDesc==''">
          {{$t('message.Cost_Estimation')}}
        </mt-button>
      </div>
      <!--服务时间选择组件e-->
      <div class="flexBox">
        <mt-cell :title="$t('message.Can_time_list')" v-if="trPriceList.length>0"></mt-cell>
        <table style="width: 100%" border="0" cellspacing="0" cellpadding="0">
          <tr v-for="(item,index) in trPriceList" :key="index" :index="index" class="timeItem"
              v-if="trPriceList.length>0">
            <td>{{item.trDate}}</td>
            <td><span class="label">￥{{item.unitPrice}}</span></td>
            <td @click="selectTime(index)">{{item.trTimeFrom}}</td>
            <td @click="selectTime(index)">{{item.trTimeTo}}</td>
            <td @click="deleteDate(index)" class="del">{{$t('message.Delete')}}</td>
          </tr>
        </table>
      </div>
      <div style="height: 100px;"></div>

      <div class="footerBar">
        <div class="b_btn" style="z-index:7">
          <mt-button class="an_order" @click.native="anOrder" type="danger" :disabled="trPriceList.length==0">
            {{$t('message.Confirm')}}
          </mt-button>
        </div>
      </div>
      <!--单个调整-->
      <mt-popup v-model="popupVisibleSelectTime" position="top" style="width: 100%;height: 200px;font-size: 14px"
                v-if="popupVisibleSelectTime">
        <div style="height: 30px;"></div>
        <table style="width: 100%" border="0" cellspacing="0" cellpadding="0">
          <tr class="timeItem">
            <td>{{trPriceList[selectIndex].trDate}}</td>
            <td><span class="label">￥{{trPriceList[selectIndex].unitPrice}}</span></td>
            <td>{{trPriceList[selectIndex].trTimeFrom}}</td>
            <td>{{trPriceList[selectIndex].trTimeTo}}</td>
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
      <!--单个调整/-->

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
        addressTip: '',
        stateTip: 'error',
        popupVisibleCompany: false,
        checkValue: '',
        companyOptions: [],
        serviceAddress: [],
        addressObj: {},
        minDate: moment().format('YYYY-MM-DD'),
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
        rangeTime: ['08:00', '18:00'],
        rangeTimeOption: {
          rangeTimeValue: [8 * 60, 18 * 60],
          formatter: function (value) {
            let HS = parseInt(value / 60).toString().length < 2 ? '0' + parseInt(value / 60) : parseInt(value / 60);
            let MS = (value % 60).toString().length < 2 ? '0' + (value % 60) : (value % 60);
            let formatTime = HS + ':' + MS;
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
        query: {
          sfwx: false,
          sfgzr: false,
          rysl: 1,
          ryzs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        faultDesc: '',
        trPriceList: [],
        popupVisibleSelectTime: false,
        selectIndex: 0,
        selectRangeValue: []

      }
    },
    watch: {
      'checkValue': {
        handler: function (val) {
          this.addressObj = JSON.parse(val)
          this.stateTip = 'success'
        }
      },
      'startDate': {
        handler: function (val, oldVal) {
          if (moment(val).valueOf() > moment(this.endDate).valueOf()) {
            this.endDate = val;
          }
        }
      },
      'rangeTimeOption.rangeTimeValue': {
        handler(value){
          let arr = []
          if (value) {
            for (let i = 0; i < value.length; i++) {
              let HS = parseInt(value[i] / 60).toString().length < 2 ? '0' + parseInt(value[i] / 60) : parseInt(value[i] / 60);
              let MS = (value[i] % 60).toString().length < 2 ? '0' + (value[i] % 60) : (value[i] % 60);
              let formatTime = HS + ':' + MS;
              arr.push(formatTime)
            }
            this.rangeTime = arr
          }
        }
      },
      'selectRangeValue': {
        handler(value){
          let arr = []
          if (value) {
            for (let i = 0; i < value.length; i++) {
              let HS = parseInt(value[i] / 60).toString().length < 2 ? '0' + parseInt(value[i] / 60) : parseInt(value[i] / 60);
              let MS = (value[i] % 60).toString().length < 2 ? '0' + (value[i] % 60) : (value[i] % 60);
              let formatTime = HS + ':' + MS;
              arr.push(formatTime)
            }
            this.trPriceList[this.selectIndex].trTimeFrom = arr[0]
            this.trPriceList[this.selectIndex].trTimeTo = arr[1]
          }
        }
      }
    },
    created(){
      this.getServiceAddress()
    },
    methods: {
      back(){
        this.$router.back()
      },
      getServiceAddress () {
        this.$api.get_service_address().then(res => {
          if (res.code == ERR_OK) {
            let _temp = [];
            let _data = res.serviceAddress
            for (let i = 0; i < _data.length; i++) {
              _temp.push({
                label: _data[i].allAddress,
                value: JSON.stringify({label: _data[i].allAddress, id: _data[i].companyId})
              })
            }
            this.serviceAddress = _temp
          } else {
            alert(res.msg)
          }
        }).catch(err => console.error(err))

      },
      toggleOpen(){
        this.popupVisibleCompany = true
        this.getServiceAddress()
      },
      disableWeekends(date){
        if (this.query.sfgzr) {
          return date.getDay() === 0 || date.getDay() === 6
        } else {
          return
        }

      },
      selectTime(index){
        this.popupVisibleSelectTime = true;
        this.selectIndex = index;
        this.selectRangeValue = [this.rangeTimeOption.rangeTimeValue[0], this.rangeTimeOption.rangeTimeValue[1]]
        setTimeout(() => {
          this.$refs.slider2.refresh();
        }, 400)
      },
      deleteDate(index){
        this.trPriceList.splice(index, 1)
        Toast(this.$t('message.Del_success'));
      },
      getPriceMa(){
        let data = {
          amonut: this.query.rysl,
          companyIds: ["12317"],
          faultDesc: this.faultDesc,
          isReset: this.query.sfwx ? 1 : 0,
          isWorkDay: this.query.sfgzr ? 1 : 0,
          trDateFrom: this.startDate,
          trDateTo: this.endDate,
          trTimeFrom: this.rangeTime[0],
          trTimeTo: this.rangeTime[1],
        }
        this.$api.get_price_Ma(data).then(res => {
          if (res.code == ERR_OK) {
            this.trPriceList = res.trPriceList
          }
        })
      },
      anOrder(){
        var data = this.trPriceList;
        //cb 数据映射
        function ObjStory (orgId, amount, CallDetailEntity, reservationTimeEntity) //声明对象
        {
          this.orgId = orgId;
          this.amount = amount;
          this.CallDetailEntity = CallDetailEntity;
          this.reservationTimeEntity = reservationTimeEntity;
        }

        let newData = [];
        for (let i = 0; i < data.length; i++) {
          newData.push(new ObjStory(data[i].companyId, data[i].amount, {
            "faultDesc": data[i].faultDesc,
            "isLunchBreak": data[i].isRest
          }, {
            "reservationDate": data[i].trDate,
            "startTime": data[i].trTimeFrom,
            "endTime": data[i].trTimeTo

          }))
        }
        this.$api.save_price_Ma(newData).then(res => {
          if (res.code == ERR_OK) {
            Toast(this.$t('message.Checkout_success'));
            this.trPriceList = []
          } else {
            alert(res.msg)
          }
        }).catch(err => console.error(err))
      },
      goAddress(){
        this.$router.push('/address')
        this.popupVisibleCompany = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ma {
    background: #eee;
  }

  .wrapper-box {
    margin-bottom: 10px;
    background: #fff;
  }

  .title-box.mint-cell {
    min-height: 24px;
  }

  .title {
    font-size: 10px;
    color: #999;
  }

  .select {
    height: 32px;
    width: 52px;
    border: 1px solid #d9d9d9;
    border-radius: 16px;
    box-sizing: border-box;
    background: #fff;
  }

  .page-content {
    padding-top: 40px;
    text-align: left;
    padding-bottom: 40px;
  }

  .dateWrap {
    display: flex;
  }

  .dateItem {
    flex: 1;
    text-indent: 6px;;
    width: 50%;
  }
</style>
