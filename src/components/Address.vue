<template>
  <div class="address">
    <mt-header :title="$t('message.Address')" fixed style="z-index: 9;">
      <mt-button icon="back" @click="back" slot="left">{{$t('message.Back')}}</mt-button>
    </mt-header>
    <scroller class="page-content">
      <mt-cell-swipe v-for="(item,index) in serviceAddress" :key="index" :id="item.companyId" class="cell-swipe"
                     :right="[
        {
          content: deleteIcon,
          style: {background: 'red', color: '#fff'},
          handler: () => deleteAddress(item.companyId)
        }
      ]"
                     style="padding: 8px 6px">
        <div class="addressBox" slot="title">
          <table>
            <tr>
              <td><span class="top-icon"><i class="iconfont icon-homepage_fill"></i></span></td>
              <td><span style="color: #3F536E;font-size: 16px;">{{item.companyName}}</span></td>
            </tr>
            <tr>
              <td><span class="top-icon"><i class="iconfont icon-coordinates_fill"></i></span></td>
              <td><p style="margin: 0;color: #B9B9B9;font-size: 12px;line-height: 1.5;">{{item.allAddress}}</p></td>
            </tr>
          </table>
        </div>
      </mt-cell-swipe>

      <div style="height: 90px;"></div>
    </scroller>
    <mt-popup v-model="addVisible" position="right" :closeOnClickModal="false" :modal="false"
              style="width: 100%;height: 100%">
      <mt-header :title="$t('message.Add')" style="z-index: 9;">
        <mt-button icon="back" @click="showAddM" slot="left">{{$t('message.Back')}}</mt-button>
      </mt-header>
      <div v-if="showEditAddress">
        <mt-popup v-model="addressVisible" position="bottom" style="width: 100%">
          <div class="page-picker-wrapper">
            <mt-picker :slots="addressSlots" v-if="addressSlots" class="picker" @change="onAddressChange"
                       :visible-item-count="5"></mt-picker>
          </div>
        </mt-popup>
        <mt-popup v-model="streetVisible" popup="popup-fade" position="bottom" style="width: 100%">
          <div class="page-picker-wrapper">
            <mt-picker :slots="streetSlots" v-if="streetSlots" ref="picker" class="picker" @change="onStreetChange"
                       :visible-item-count="5"></mt-picker>
          </div>
        </mt-popup>
        <div>
          <mt-field label="" :state="companyName.length>0?'success':'error'" v-model="companyName"
                    :placeholder="$t('message.Company')"></mt-field>
          <div @click="showAddress" class="cell-ad">{{ $t('message.Area')}}:{{ addressProvince }} {{ addressCity }} {{addressXian}}</div>
        </div>
        <div @click="showStreet" class="cell-ad" v-if="noStreet">{{ $t('message.Street')}}：{{addressStreet}}</div>

        <mt-field type="textarea" :placeholder="$t('message.Detailed_address')" id="" cols="4" rows="3"
                  v-model="desMore"></mt-field>
        <mt-button size="large" type="danger" class="redbg" style="width:95%;margin: 20px auto;border-radius: 22px"
                   :disabled="desMore.length<3" @click="saveAddress">{{$t('message.Save')}}
        </mt-button>
      </div>
    </mt-popup>
    <div class="addAddressBtn " @click="showAddM" >{{ $t('message.Add')}}</div>
  </div>
</template>
<script>
  import s from '../../statics/mobile/json/address4.json'
  import { MessageBox } from 'mint-ui';
  export default {
    name: 'address',
    data () {
      return {
        companyName: '',
        deleteIcon: `<div style="display: block;height: 100%;padding:10px;display: flex; justify-content: center; flex-direction: column;"><i class="iconfont icon-close" style="font-size: 18px"></i></div>`,
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
            values: [''],
            className: 'slot3',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot4'
          }, {
            flex: 1,
            values: [''],
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
        serviceAddress: [],
        noStreet: true,
        showEditAddress: false
      }
    },
    methods: {
      back() {
        this.$router.back()
      },
      /**
       * [onAddressChange 添加服务地址]
       * @param  {[Object]} picker [picker实例对象]
       * @param  {[Array]} values [当前选择的值]
       */
      onAddressChange(picker, values) {
        let sheng = Object.keys(s);
        let shi = Object.keys(s[values[0]]);
        let index = shi.indexOf(values[1])
        let xian = s[values[0]][shi[index]];
        this.xianObj = xian;
        picker.setSlotValues(1, shi);
        this.addressProvince = values[0];
        this.addressCity = values[1];
        this.addressXian = values[2];
        if (!values[2]) {
          this.noStreet = false
        } else {
          this.noStreet = true
        }
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
        this.addVisible = !this.addVisible;
        this.showEditAddress = true
        setTimeout(() => {
          this.addressSlots[0].defaultIndex = 0;
        }, 20)

      },
      /**
       * 获取服务点数据
       */
      getServiceAddress () {
        this.$api.get_service_address().then((res) => {
          if (res.code == ERR_OK) {
            this.serviceAddress = res.serviceAddress
          } else {
            this.$toast(res.msg)
          }
        }).catch(err => {
          console.error(err);
        })
      },
      /**
       * 保存服务点地址
       */
      saveAddress(){
        let _this = this;
        let _city = '上海市'
        if (this.addressCity == '市辖区') {
          _city = this.addressProvince
        } else {
          _city = this.addressCity
        }
        let data = {
          address: this.addressProvince + this.addressCity + (this.addressXian ? this.addressXian : '') + (this.addressStreet ? this.addressStreet : '') + (this.desMore ? this.desMore : ''),
          cityName: _city,
          companyname: _this.companyName,
//          id: "151",//这个id pc上似乎是固定的
          newValue: this.addressProvince + this.addressCity + (this.addressXian ? this.addressXian : '') + (this.addressStreet ? this.addressStreet : '') + (this.desMore ? this.desMore : ''),
          operationType: 1,
          shortName: _this.companyName
        };

        this.$api.save_service_address(data).then(res => {
          if (res.code == ERR_OK) {
            this.$toast(this.$t('message.Save_successful'));
            this.addVisible = false;
            this.getServiceAddress()
          } else {
            alert(res.msg)
          }
        }).catch(err => {
          console.error(err);
        })

      },
      /**
       * 删除服务点地址
       */
      deleteAddress(id){
        let data = {id: id};
        MessageBox({
          message: this.$t('message.Sure_delete'),
          title: '',
          showCancelButton: true,
          confirmButtonText: this.$t('message.Ok'),
          cancelButtonText: this.$t('message.Cancel')
        }).then(actions => {
          if (actions == 'confirm') {
            this.$api.delete_service_address(data).then(res => {
              if (res.code == ERR_OK) {
                this.$toast(this.$t('message.Del_success'));
                this.getServiceAddress()
              } else {
                this.$toast(res.msg);
              }
            }).catch(err => {
              console.error(err)
            })
          }
        })
      },
    },
    watch: {
      'addressXian': {
        handler(val, oval){
          let street = this.xianObj[this.addressXian]
          this.streetSlots[0].values = street;
          if (street.length == 0) {
            this.noStreet = false
          } else {
            this.noStreet = true
          }
        }
      }
    },
    created(){
      this.getServiceAddress()
    },
    mounted(){
    }
  }
</script>

<style scoped lang="less">
  .top-icon i{
    color: #bfbfbf;
    font-size: 18px;
  }
  .mint-cell-wrapper {
    background: #ede020;
    background: -webkit-linear-gradient(315deg, #ede020 0, #f6cd10 34%, #ffba00 100%);
    background: -o-linear-gradient(315deg, #ede020 0, #f6cd10 34%, #ffba00 100%);
    background: linear-gradient(135deg, #ede020 0, #f6cd10 34%, #ffba00 100%);
  }

  .cell-swipe {
    /*background: #fff;*/
    margin-top: 10px;

  }

  .addressBox {
    padding-top: 8px;
    width: 100%;
    flex: 1
  }

  .mint-cell-wrapper {
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
    color: #fff;
    padding: 10px;
    text-align: center;
    background: #fd3fb3;
    background: -webkit-linear-gradient(45deg, #fd3fb3 0, #fd3f81 30%, #fd3e4f 79%);
    background: -o-linear-gradient(45deg, #fd3fb3 0, #fd3f81 30%, #fd3e4f 79%);
    background: linear-gradient(45deg, #fd3fb3 0, #fd3f81 30%, #fd3e4f 79%);
  }

  .page-content {
    text-align: left;
    position: relative;
    width: 100%;
    height: 100vh;
    background: #f8f8f8;
    padding-top: 40px;
    box-sizing: border-box;
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

  .page-picker-wrapper {
    margin-top: 40px;
  }

</style>
