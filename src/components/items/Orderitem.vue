<template>
  <div style="width: 100%">
    <table class="order-item border-bottom" style="width: 100%">
      <tr class="item-header border-bottom">
        <td colspan="3">
          <span class="text-gray"> {{$t('message.NO')}} : </span>{{item.ordernumber}}
          <a v-if="item.orderstateid<4000 && orderStateId!=8" @click="goDelete(item)"
             class="text-center orderBtn cancleBtn pull-right">
            <i class="iconfont icon-empty_fill text-gray" style="color: rgba(221, 75, 57,.5)"></i>
          </a>
        </td>
      </tr>
      <tr class="item-header">
        <td colspan="3">
          <div class="flex-box">
            <div class="company-tit" v-if="isCompany"><i class="iconfont icon-homepage text-gray"></i> {{item.companyname}}</div>
            <!-- payway 等于1 并且是在支付状态下的单就显示支付按钮 -->
            <!--item.orderstateid>=7750 && (item.receiveStateMin<65 || !item.receiveStateMin)  && item.payway==1 && item.auditStatusMin ==11000 && item.fwoneCheckState!=20 && item.fwoneCheckState!=30" -->
            <div
              v-if="item.payway==1  && item.auditStatusMin ==11000 && item.fwoneCheckState!=20 && item.fwoneCheckState!=30 &&item.orderstateid>=7750&& (item.receiveStateMin<65 || !item.receiveStateMin)"
              class="pay-btn" @click="toPay(item.ordernumber)">{{$t('message.Pay')}}
            </div>
          </div>
        </td>
      </tr>
      <tr class="item-body">
        <td width="65" class="text-center"
            style="border-right: 1px dashed #eee;color:#26a2ff;font-size: 12px">
          <span v-if="item.busniesstypeid==5"><i class="iconfont icon-coordinates_fill"></i><br>{{$t('message.On_site')}} </span>
          <span v-if="item.busniesstypeid==2"><i
            class="iconfont icon-computer_fill"></i><br>{{$t('message.Remote_desktop')}} </span>
          <span v-if="item.busniesstypeid==1"><i
            class="iconfont icon-customerservice_fill"></i><br>{{$t('message.Telephone')}} </span>
        </td>
        <td class="text-left" @click="goDetail(item)"><span style="color: #333;font-size: 12px" class="textover3" v-for="desc in item.description"
                     v-if="item.description.length>0"><div class="user-tit" v-if="desc.yh "><i class="iconfont icon-mine" style="font-size:14px;padding:0;color:#999"></i> {{desc.yh}}</div>{{desc.faultDescription}} </span></td>
      </tr>
      <tr class="item-body nopadding"></tr>
      <tr class="item-body nopadding item-header">
        <td colspan="3" class="text-left" style="font-size: 10px;padding:9px 5px 7px 5px">
          {{item.repairpersonname}} <span class="text-gray">报修于</span> {{item.reporttime}}<span class="yh pull-right"
                                                                                                @click="showReservationTime">{{$t('message.yuyueshijian')}}</span>
        </td>
      </tr>
    </table>
  </div>
</template>
<script type="text/ecmascript-6">
  import { MessageBox } from 'mint-ui';
  import { mapState } from 'vuex';
  import { Toast } from 'mint-ui';
  export default {
    name: 'order-item',
    props: {
      item: {},
      orderStateId: '',
      index: ''
    },
    data() {
      return {}
    },
    computed: {
      isCompany(){
        return this.$store.state.userInfo.isCompany
      }
    },
    methods: {
      goDetail(item) {
        let payload = {
          id: item.id,
          oid: item.ordernumber,
          type: item.busniesstypeid,
          showDetail:true
        }
        // 获取对应id的详情
        this.$store.dispatch('new_detail', payload)
        this.$store.commit('SET_ORDER_INFO', item)
//        this.$emit('getsp');
//        this.$router.push({path: '/orderdetail'});
      },
      goDelete(item) {
        if(sessionStorage.getItem('isGuest')&&sessionStorage.getItem('isGuest')=='true'){
          this.$store.commit('GUEST_TIP')
          return
        }
        let data = {
          id: item.id,
          fwoneCheckState: 20,
          ordernumber: item.ordernumber
        };
        MessageBox.confirm('确定要取消此次服务?').then(action => {
          this.$api.delete_order_updata(data).then(res => {
            if (res.code == ERR_OK) {
              Toast('取消成功');
              this.$emit('refresh')
            }
          });
        });
      },
      toPay(oid){
        this.$store.commit('SET_ORDER_NUMBER', oid)
        this.$router.push({name: 'pay', params: {oid: oid}})
      },
      showReservationTime(){
        var html = "";
        var _this=this
        this.item.reservationtime.forEach(function (val, index) {
          var d1 = new Date(val.reservationDate.substr(0, 10));
          var a = [_this.$t('message.Sun'),_this.$t('message.Mon'), _this.$t('message.Tues'), _this.$t('message.Wed'), _this.$t('message.Thur'), _this.$t('message.Fri'), _this.$t('message.Sat')];
//         var a=['周日','周一','周二','周三','周四','周五','周六']
//         var a=['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
          html += val.reservationDate.substr(0, 10) + ' ' +
            val.startTime + '-' + val.endTime + " " + a[d1.getDay()] + '<br>'
        })
        MessageBox.alert(html,this.$t('message.yuyueshijian'));
      }
    },

  }
</script>
<style scoped>
  .pay-btn {
    float: right;
    background: #ffbd17;
    color: #fff;
    padding: 1px 7px 2px 3px;
    border-radius: 2px;
    margin-top: -4px;
    font-size: 12px;
  }

  .company-tit {
    width: 250px;
    float: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color:#666;
  }

  .company-tit .iconfont{
    font-size: 13px;
  }

  .user-tit {
    width: 200px;
    text-overflow: ellipsis;
    color:#666
  }

  .orderBtn {
    display: block;
    color: #26a2ff;
  }

  .cancleBtn {
    color: #f44336;
  }

  .text-left {
    text-align: left;
  }

  .item-body .iconfont {
    font-size: 24px;
    padding: 10px;
    color: #26a2ff;
  }

  .text-over {
    width: 100px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .text-center {
    text-align: center !important;
  }

  .order-item {
    width: 95%;
    margin: auto;
    background: #fff;
    margin-bottom: 10px;
    display: table;
    border-top: 2px solid #26a2ff;
  }

  .status1 {
    border-color: #d5402b;
  }

  .ion-ios-location {
    margin-right: 4px;
  }

  .item-header td {
    padding: 5px 5px 5px 2px;
    text-align: left;
    text-indent: 4px;
    font-size: 13px;
  }

  .item-body {
  }

  .item-body td {
    text-align: left;
    padding: 0 5px;
    display: table-cell;
    vertical-align: top;
    font-size: 13px;
  }

  .item-body.nopadding td {
    padding: 0 5px;
    padding-right: 0;
  }

  .text-gray{
    color: #999;
  }

  .yh {
    border: 1px solid lightgrey;
    border-radius: 3px;
    padding: 2px 3px 1px 1px;
    color: lightgrey;
    font-size: 8px !important;
  }
</style>
