<template>
      <table class="order-item" >
        <tr class="item-header">
          <td colspan="3">{{item.companyname}}</td>
        </tr>
        <tr class="item-body">
          <td rowspan="3" width="70" class="text-center" style="border-right: 1px solid #eee;">
            <span v-if="item.busniesstypeid==5"><i class="iconfont icon-coordinates_fill"></i><br >现场支持 </span>
            <span v-if="item.busniesstypeid==2"><i class="iconfont icon-computer_fill"></i><br >远程连接 </span>
            <span v-if="item.busniesstypeid==1"><i class="iconfont icon-customerservice_fill"></i><br >电话协助 </span>
          </td>
          <td class="text-left"><span v-if="item.description.length!=0">{{item.description[0].yh}} </span></td>
          <td rowspan="3" width="20">
            <a v-if="item.orderstateid>0" @click="goDetail" class="text-center orderBtn" :data-id="item.id" :data-oid="item.ordernumber">详情
            </a >
            <a v-if="item.orderstateid==0" @click="goDelete(item.id)" class="text-center orderBtn cancleBtn" :data-id="item.id" >取消</a >
          </td>
        </tr>
        <tr  class="item-body nopadding">
          <td class="text-left"> {{item.reporttime}}</td>
        </tr>
        <tr  class="item-body">
          <td class="text-left">编号:{{item.ordernumber}} </td>
        </tr>
      </table>
</template>
<script type="text/ecmascript-6">
  import { MessageBox } from 'mint-ui';
  import { mapState } from 'vuex';
  import { Toast } from 'mint-ui';
  export default {
    name:'order-item',
    props:{item:{}},
    data () {
      return {

      }
    },
    beforeRouteEnter(){
      alert(1)
    },

    methods: {
      goDetail($event) {
        this.$router.push({ path: '/orderdetail'});
        this.getDetail($event)
      },
      goDelete(id) {
        let _this=this;
        var data = {id: id, fwoneCheckState: 20};
        MessageBox.confirm('确定执行此操作?').then( action => {
            $.ajax({
              url: localPath+'/orderinfo/update',
              type: 'POST',
              contentType: 'application/json',
              dataType:'json',
              data: JSON.stringify(data),
              success: function () {
                Toast('取消成功');
                _this.$emit('refresh')
              }
            });
      });
      },
      getDetail($event){
        this.$emit('getsp');
        //获取详情的数据
        let id=$($event.currentTarget).attr('data-id');
        let oid=$($event.currentTarget).attr('data-oid');
//        当前点击的id出入store（无实际用处）
        this.$store.dispatch('get_order_number',{id:id,oid:oid});
//        获取对应id的详情
        this.$store.dispatch('new_detail',{id:id,oid:oid})

      },

    },

  }
</script>
<style scoped>
  .orderBtn{
    padding:10px;
    display: block;
    color: #26a2ff;
  }
  .cancleBtn{
    color: #f44336;
  }
.text-left{
  text-align: left;
}
.item-body .iconfont{
  font-size: 24px;
  padding: 10px;
  color: #26a2ff;
}
  .text-over{
    width:100px;
    display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
  }
  .text-center{
    text-align: center !important;
  }
  .order-item{
    width: 95%;
    margin:auto;
    background: #fff;
    margin-bottom: 10px;
    display: table;
    border-top:2px solid #26a2ff;
    box-shadow: 2px 3px 4px rgba(100,100,100,.1);
  }
  .status1{
    border-color: #d5402b;
  }
  .item-header{
    background: #fafafa;
  }
  .ion-ios-location{
    margin-right: 4px;
  }
  .item-header td{
    padding:5px 2px;
    text-align: left;
    text-indent:4px;
    font-size: 13px;
  }
  .item-body{

  }

  .item-body td{
    text-align: left;
    padding:5px;
    padding-right: 0;
    display: table-cell;
    vertical-align: middle;
    font-size: 13px;
  }
  .item-body.nopadding td{
    padding: 0 5px;
    padding-right: 0;
  }
</style>
