<template >
  <div class="address" >
    <mt-header title="服务点" fixed style="z-index: 9;" >
      <mt-button icon="back" @click="back" slot="left" >返回</mt-button >
    </mt-header >
    <div class="page-content" >
      <mt-cell-swipe v-for="(item,index) in serviceAddress" :key="index" :id="item.companyId" class="cell-swipe" :title="item.allAddress" :right="[
        {
          content: '删除',
          style: {background: 'red', color: '#fff'},
          handler: () => deleteAddress(item.companyId)
        }
      ]" ></mt-cell-swipe >
      <mt-popup v-model="addVisible" position="right" :closeOnClickModal="false" :modal="false" style="width: 100%;height: 100%" >
        <mt-header title="新增服务点" style="z-index: 9;">
          <mt-button icon="back" @click="showAddM" slot="left" >返回</mt-button >
        </mt-header >
        <mt-popup v-model="addressVisible" position="bottom" style="width: 100%" >
          <div class="page-picker-wrapper" >
            <mt-picker :slots="addressSlots" class="picker" @change="onAddressChange" :visible-item-count="5" ></mt-picker >
          </div >
        </mt-popup >
        <mt-popup v-model="streetVisible" popup-="popup-fade" position="bottom" style="width: 100%" >
          <div class="page-picker-wrapper" >
              <mt-picker :slots="streetSlots" ref="picker" class="picker" @change="onStreetChange" :visible-item-count="5" ></mt-picker >
          </div >
        </mt-popup >
        <div >
          <mt-field label="" :state="companyName.length>0?'success':'error'" v-model="companyName"   placeholder="公司名" ></mt-field >
          <div @click="showAddress" class="cell-ad" >上门服务地址:{{ addressProvince }} {{ addressCity }} {{addressXian}}</div >
        </div >
        <div @click="showStreet" class="cell-ad" >选择街道：{{addressStreet}}</div >

        <textarea placeholder="详细地址" id="" cols="4" rows="3" v-model="desMore" ></textarea >
        <mt-button size="large" type="danger" style="width:95%;margin: 20px auto;" :disabled="desMore.length<3" @click="saveAddress" >保存</mt-button >
      </mt-popup >
      <div style="height: 80px;" ></div >
      <div class="addAddressBtn" @click="showAddM" >新增服务点地址</div >
    </div >
  </div >
</template >
<script type="text/ecmascript-6" >
  import axios from 'axios'
  import { Toast } from 'mint-ui';
  import s from '../../statics/mobile/json/address4.json'
  import { MessageBox } from 'mint-ui';
  export default {
    name: 'address',
    data () {
      return {
        companyName:'',
        addressSlots: [
          {
            flex: 1,
            defaultIndex: 1,
            values: Object.keys(s),
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot4'
          }, {
            flex: 1,
            values: [],
            className: 'slot5',
            textAlign: 'center'
          }
        ],
        streetSlots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        addressProvince: '省',
        addressCity: '市',
        addressXian: '区',
        addressStreet: '街道',
        desMore: '',
        xianObj: {},
        addVisible: false,
        addressVisible: false,
        streetVisible: false,
        serviceAddress: []
      }
    },
    methods: {
      back() {
        this.$router.back()
      },
      onAddressChange(picker, values) {
        let sheng = Object.keys(s);
        let shi = Object.keys(s[values[0]]);
        let xian = s[values[0]][shi[0]];
        this.xianObj = xian;
        picker.setSlotValues(1, shi);
        this.addressProvince = values[0];
        this.addressCity = values[1];
        this.addressXian = values[2];
        picker.setSlotValues(2, Object.keys(xian));
      },
      onStreetChange(picker, values){
        this.addressStreet = values[0]
      },
      showAddress(){
        this.addressVisible = true
      },
      showStreet(){
        this.streetVisible = true
      },
      showAddM(){
        this.addVisible = !this.addVisible
      },
      getServiceAddress () {
        var _this = this;
        $.ajax({
          url:localPath+"/company/getServiceAddress",
          dataType: 'json',
          success: function (r) {
            if (r.code == 0) {
              _this.serviceAddress = r.serviceAddress
            }
          }
        })
      },
      saveAddress(){
        let _this=this;
        let _city='上海市'
        if(this.addressCity=='市辖区'){
          _city=this.addressProvince
        }else {
          _city=this.addressCity
        }
        let data = {
          address: this.addressProvince+this.addressCity+this.addressXian+this.addressStreet+this.desMore,
          cityName: _city,
          companyname: _this.companyName,
          id: "151",//这个id pc上似乎是固定的
          newValue:this.addressProvince+this.addressCity+this.addressXian+this.addressStreet+this.desMore,
          operationType: 1,
          shortName: _this.companyName //公司名称 暂时无
        };
        $.ajax({
          url: localPath+'/company/saveByUser',
          type: "POST",
          dataType:'json',
          data: JSON.stringify(data),
          contentType: 'application/json',
          success: function (r) {
            if (r.code == 0) {
              console.log(r)
              Toast('保存成功');
              _this.addVisible = false;
              _this.getServiceAddress()
            }
          }

        })
      },
      deleteAddress(id){
        var  data={id:id};
        var _this=this;
        MessageBox.confirm('确定删除？').then(actions=>{
          $.ajax({
            url: localPath+'/company/deleteByUser',
            type: "POST",
            dataType:'json',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (r) {
              if (r.code == 0) {
                Toast('删除成功');
                _this.getServiceAddress()
              }
            }
          })
        })
      },
    },
    watch: {
      'addressXian': {
        handler(val, oval){
          let street = this.xianObj[this.addressXian]
          this.streetSlots[0].values = street
        }
      }
    },
    created(){
      this.getServiceAddress()

    },
    mounted(){
      this.$nextTick(() => {
        setInterval(() => {
          this.addressSlots[0].defaultIndex = 0;
        }, 1000);
      });



    }
  }
</script >

<style scoped >
  .cell-swipe {
    border-bottom: 2px solid #26a2ff;
    background: #fff;
    padding-bottom: 8px;
    margin-top: 10px;

  }

  .mint-cell-wrapper {
    background: none !important;
    text-align: left;
  }

  .addressBtnGroup button {
    border: 1px solid #666;
    background: #fff;
    border-radius: 6px;
    margin-top: 6px;
    outline: none;
    color: #777;

  }

  .addAddressBtn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fe000d;
    color: #fff;
    padding: 10px;
    text-align: center;

  }

  .page-content {
    text-align: left;
    position: relative;
    width: 100%;
    height: 100%;
    background: #f8f8f8;
  }

  .cell-ad {
    text-align: left;
    padding: 15px 10px;
    font-size: 15px;

  }

  textarea {
    font-size: 15px;
    margin-top: 10px;
  }

  .address {
    padding-top: 40px;
  }

  .page-picker-wrapper {
    margin-top: 40px;
  }

</style >
