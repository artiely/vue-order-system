<template>
  <div style="width: 100%">
  <table class="order-item" style="width: 100%">
    <tr class="item-header">
      <td colspan="3">
        <div class="flex-box">
          <div class="company-tit" >{{item.companyname}}</div>
          <!-- payway 等于1 并且是在支付状态下的单就显示支付按钮 -->
          <div v-if="item.payway==1 && orderStateId==6" class="pay-btn" @click="toPay(item.ordernumber)">{{$t('message.Pay')}}</div>
        </div>
      </td>
    </tr>
    <tr class="item-body">
      <td rowspan="4" width="70" class="text-center" style="border-right: 1px solid #eee;">
        <span v-if="item.busniesstypeid==5"><i class="iconfont icon-coordinates_fill"></i><br>{{$t('message.On_site')}} </span>
        <span v-if="item.busniesstypeid==2"><i
          class="iconfont icon-computer_fill"></i><br>{{$t('message.Remote_desktop')}} </span>
        <span v-if="item.busniesstypeid==1"><i
          class="iconfont icon-customerservice_fill"></i><br>{{$t('message.Telephone')}} </span>
      </td>
      <td class="text-left" ><span v-if="item.description.length!=0">{{item.description[0].yh}} </span></td>
      <td rowspan="4" width="20">
        <a v-if="item.orderstateid>0" @click="goDetail(item)" class="text-center orderBtn"
        >
          <!--{{$t('message.Detail')}}-->
          <i class="iconfont icon-enter"></i>
        </a>
        <a v-if="item.orderstateid==0 && orderStateId!=8" @click="goDelete(item)" class="text-center orderBtn cancleBtn"
        >
          <!--{{$t('message.Cancel')}}-->
          <i class="iconfont icon-empty_fill red" style="color: rgba(221, 75, 57,.5)"></i>
        </a>
      </td>
    </tr>
    <tr class="item-body nopadding">
      <!--<td class="text-left" style="font-size: 12px"> {{item.reporttime}}</td>-->
    </tr>
    <tr class="item-body nopadding">
      <td class="text-left" style="font-size: 12px">{{$t('message.NO')}}:{{item.ordernumber}} </td>
    </tr>
    <tr class="item-body ">
      <td class="text-left"> <div  v-if="item.description">
        <span style="color: #888;font-size: 11px" class="textover3" v-for="desc in item.description" v-if="item.description.length>0">{{desc.faultDescription}} </span>
        </div></td>
    </tr>
    </tbody>
    <tr class="item-body nopadding item-header">
      <td colspan="3" class="text-left" style="font-size: 10px;padding:9px 5px 7px 5px"> {{item.repairpersonname}} <span class="text-gray">报修于</span> {{item.reporttime}}<span class="yh pull-right" @click="showReservationTime">预约时间</span></td>
    </tr>
  </table>
  </div>
</template>
<script type="text/ecmascript-6">
  import {MessageBox} from 'mint-ui';
  import {mapState} from 'vuex';
  import {Toast} from 'mint-ui';
  export default {
    name: 'order-item',
    props: {
      item: {},
      orderStateId:''
    },
    data() {
      return {}
    },
    methods: {
      goDetail(item) {
        let payload = {
          id: item.id,
          oid: item.ordernumber,
          type: item.busniesstypeid
        }
        // 获取对应id的详情
        this.$store.dispatch('new_detail', payload)
        this.$emit('getsp');
        this.$router.push({path: '/orderdetail'});
      },
      goDelete(item) {
        let data = {
          id: item.id,
          fwoneCheckState: 20
        };
        MessageBox.confirm('确定执行此操作?').then(action => {
          this.$api.delete_order_updata(data).then(res => {
            if (res.code == ERR_OK) {
              Toast('取消成功');
              this.$emit('refresh')
            }
          });
        });
      },
      toPay(oid){
       this.$router.push({name:'pay',params:{oid:oid}})
      },
      showReservationTime(){
        var html = "";
        this.item.reservationtime.forEach(function(val,index){
          var d1 = new Date(val.reservationDate.substr(0,10));
          var a = ['星期日', '星期一','星期二','星期三','星期四','星期五','星期六'];
          html+=val.reservationDate.substr(0,10) +' '+
            val.startTime+'-'+ val.endTime+" "+a[d1.getDay()]+'<br>'
        })
        MessageBox.alert(html, "预约时间");
      }
    },

  }
</script>
<style scoped>
  .pay-btn{
    float: right;
    background: #ffbd17;
    color: #fff;
    padding: 2px 8px;
    border-radius: 4px;
    margin-top: -4px;
  }
  .company-tit{
    width: 200px;
    float: left;
    overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
  }
  .orderBtn {
    padding: 10px;
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
    box-shadow: 2px 3px 4px rgba(100, 100, 100, .1);
  }

  .status1 {
    border-color: #d5402b;
  }

  .item-header {
    background: #fafafa;
  }

  .ion-ios-location {
    margin-right: 4px;
  }

  .item-header td {
    padding: 5px 2px;
    text-align: left;
    text-indent: 4px;
    font-size: 13px;
  }

  .item-body {
  }

  .item-body td {
    text-align: left;
    padding: 5px;
    padding-right: 0;
    display: table-cell;
    vertical-align: middle;
    font-size: 13px;
  }

  .item-body.nopadding td {
    padding: 0 5px;
    padding-right: 0;
  }
</style>
