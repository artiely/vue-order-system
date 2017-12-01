<template>
  <div class="address">
    <mt-header :title="$t('message.Address')" fixed style="z-index: 9;">
      <mt-button icon="back" @click="back" slot="left">{{$t('message.Back')}}</mt-button>
    </mt-header>
    <div class="page-content">
      <div v-if="!serviceAddress||serviceAddress.length==0" class="noData" style="text-align: center"><i
        class="iconfont icon-zanwushuju"></i>
        <div style="color: #999;font-size: 14px">{{$t('message.No_more_data')}}</div>
      </div>
      <mt-cell-swipe v-for="(item,index) in serviceAddress" :key="index" :id="item.companyId" class="cell-swipe"
                     :right="[
        {
          content: editIcon,
          style: {background: '#ff8f00', color: '#fff'},
          handler: () => editAddress(item)
        },
        {
          content: deleteIcon,
          style: {background: '#ff3b2f', color: '#fff'},
          handler: () => deleteAddress(item.companyId)
        }
      ]"
                     style="padding: 8px 6px">
        <div class="addressBox" slot="title">
          <table>
            <tr v-if="isCompany">
              <td><span class="top-icon"><i class="iconfont icon-homepage_fill"></i></span></td>
              <td><span style="color: #3F536E;font-size: 14px;">{{item.companyName}}</span></td>
            </tr>
            <tr>
              <td><span class="top-icon"><i class="iconfont icon-coordinates_fill"></i></span></td>
              <td><p style="margin: 0;color: #B9B9B9;font-size: 12px;line-height: 1.5;">
                {{item.newValue ? item.newValue.address : item.allAddress}}</p></td>
            </tr>
          </table>
        </div>
      </mt-cell-swipe>

      <div style="height: 39px;"></div>
    </div>
    <mt-popup v-model="addVisible" position="right" :closeOnClickModal="false" :modal="false"
              style="width: 100%;height: 100%">
      <mt-header :title="addressTit" style="z-index: 9;">
        <mt-button icon="back" @click="showAddM" slot="left">{{$t('message.Back')}}</mt-button>
      </mt-header>
      <div v-if="showEditAddress">
        <mt-field :label="$t('message.Company')" v-if="isCompany" :state="companyName.length>0?'success':'error'"
                  v-model="companyName"
                  :placeholder="$t('message.qingshuru')+$t('message.Company_name')" class="bg-img-bottom"></mt-field>
        <div @click="showAddress" class="cell-ad bg-img-bottom "><span
          class="cell-ad-title">{{ $t('message.Area')}}</span>{{ addressProvince }} {{ addressCity }}
          {{addressXian}}
          <i class="iconfont icon-enter pull-right"></i>
        </div>
        <div @click="showStreet" class="cell-ad">
          <span class="cell-ad-title">{{ $t('message.Street')}}</span>
          {{noStreet?addressStreet:"暂无可选街道"}}
          <i class="iconfont icon-enter pull-right"></i></div>
        <mt-field :label="$t('message.Detailed_address')" type="textarea"
                  :placeholder="$t('message.qingshuru')+$t('message.Detailed_address')"
                  id="" cols="4" rows="3" class="bg-img-bottom mt-textarea" style="margin-bottom: 10px"
                  v-model="desMore"></mt-field>
        <!--公司-->
        <mt-button v-if="isCompany" size="small" type="danger" class="" style="width:95%;"
                   :disabled="desMore.length<2||companyName.length==0" @click="saveAddress">{{$t('message.Save')}}
        </mt-button>
        <!--公司/-->
        <!--个人-->
        <mt-button v-else size="small" type="danger" style="width:95%;"
                   :disabled="desMore.length<2" @click="saveAddress">{{$t('message.Save')}}
        </mt-button>
        <!--个人/-->
      </div>
    </mt-popup>
    <mt-popup v-model="addressVisible" position="bottom" style="width: 100%;">
      <div class="page-picker-wrapper">
        <div style="padding:10px;color:#999">请选择所在区域</div>
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
    <div class="addAddressBtn border-top" @click="showAddM">{{ $t('message.Add')}} <span class="pull-right"><i
      class="iconfont icon-addition"></i></span></div>
  </div>
</template>
<script>
  import s from '../../statics/mobile/json/address4.json'
  import {MessageBox} from 'mint-ui';

  export default {
    name: 'address',
    data() {
      return {
        addressTit: '',
        isEdit: false,
        editOval: '',
        companyName: '',
        deleteIcon: `<div style="display: block;height: 100%;padding:10px;display: flex; justify-content: center; flex-direction: column;"><i class="iconfont icon-close" style="font-size: 18px"></i></div>`,
        editIcon: `<div style="display: block;height: 100%;padding:10px;display: flex; justify-content: center; flex-direction: column;"><i class="iconfont icon-editor" style="font-size: 18px"></i></div>`,
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
            values: [''],
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
    computed: {
      isCompany() {
        return this.$store.state.userInfo.isCompany
      },
      accountInfo() {
        return this.$store.state.userInfo.accountInfo
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

      onStreetChange(picker, values) {
        this.addressStreet = values[0]
      },
      showAddress() {

        this.addressVisible = true
      },
      showStreet() {
        if (this.noStreet)
          this.streetVisible = true
      },
      showAddM() {
        if (sessionStorage.getItem('isGuest') && sessionStorage.getItem('isGuest') == 'true') {
          this.$store.commit('GUEST_TIP')
          return
        }
        this.addressTit = '添加'
        this.isEdit = false
        this.addVisible = !this.addVisible;
        this.showEditAddress = true
        setTimeout(() => {
          this.addressSlots[0].defaultIndex = 0;
        }, 20)

      },
      /**
       * 获取服务点数据
       */
      getServiceAddress() {
        this.$api.get_service_address().then((res) => {
          if (res.code == ERR_OK) {
            this.serviceAddress = res.serviceAddress.map(item => {
              if (item.newValue) {
                item.newValue = JSON.parse(item.newValue)
              }
              return item
            })
            console.log(this.serviceAddress)
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
      saveAddress() {

        let _this = this;
        let _city = '上海市'
        if (this.addressCity == '市辖区') {
          _city = this.addressProvince
        } else {
          _city = this.addressCity
        }

        function iGetInnerText(testStr) {
          var resultStr = testStr.replace(/\ +/g, ""); //去掉空格
          resultStr = testStr.replace(/[ ]/g, "");    //去掉空格
          resultStr = testStr.replace(/[\r\n]/g, ""); //去掉回车换行
          return resultStr;
        }

        let data = {
          address: this.addressProvince + this.addressCity + (this.addressXian ? this.addressXian : '') + (this.addressStreet ? this.addressStreet : '') + (iGetInnerText(this.desMore) ? iGetInnerText(this.desMore) : ''),
          cityName: _city,
          companyname: _this.companyName,
//          id: "151",//这个id pc上似乎是固定的
          newValue: this.addressProvince + this.addressCity + (this.addressXian ? this.addressXian : '') + (this.addressStreet ? this.addressStreet : '') + (iGetInnerText(this.desMore) ? iGetInnerText(this.desMore) : ''),
          operationType: 1,
          shortName: _this.companyName
        };
        /**
         * 如果是个人账号提交的公司名为用户名
         */
        if (!this.isCompany) {
          data.companyname = this.accountInfo.personName
        }
        ;

        if (this.isEdit == true) {
          let editData = {"id": this.editOval.companyId, "customerAlias": this.companyName, "newValue": data.address}
          this.$api.EDIT_ADDRESS(editData).then(res => {
            if (res.code == 0) {
              this.$toast('修改成功')
              this.addVisible = false;
              this.getServiceAddress()
            } else {
              alert(res.msg)
            }
          })
        } else {
          this.$api.save_service_address(data).then(res => {
            if (res.code == ERR_OK) {
              this.$toast(this.$t('message.Save_successful'));
              this.addVisible = false;
              this.getServiceAddress()
            } else {
              alert(res.msg)
            }
          })
        }
      },
      /* 编辑地址 目前类似重置 */
      editAddress(item) {
        console.log('------item----', item)
        if (sessionStorage.getItem('isGuest') && sessionStorage.getItem('isGuest') == 'true') {
          this.$store.commit('GUEST_TIP')
          return
        }
        this.editOval = item
        this.addressTit = '编辑'
        this.isEdit = true
        this.addVisible = true;
        this.showEditAddress = true

        this.companyName = item.companyName || ''
        setTimeout(() => {
          this.addressSlots[0].defaultIndex = 0;
        }, 20)

      },
      /**
       * 删除服务点地址
       */
      deleteAddress(id) {
        if (sessionStorage.getItem('isGuest') && sessionStorage.getItem('isGuest') == 'true') {
          this.$store.commit('GUEST_TIP')
          return
        }
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
            })
          }
        })
      },
    },
    watch: {
      'addressXian': {
        handler(val, oval) {
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
    created() {
    },
    activated() {
      this.getServiceAddress()
      this.$store.dispatch('isCompany_action')
      this.$store.dispatch('getAccountInfo')
    },
    mounted() {
    }
  }
</script>

<style scoped lang="less">
  .top-icon i {
    color: #bfbfbf;
    font-size: 18px;
  }

  .addressBox {
    padding-top: 8px;
    width: 100%;
    flex: 1
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
    height: 40px;
    line-height: 20px;
    font-size: 14px !important;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    color: #333;
    padding: 10px;
    text-align: center;
    background: #fff;
  }

  .addAddressBtn .iconfont {
    font-size: 26px;
    color: #999
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
    font-size: 14px;

  }

  .cell-ad .iconfont {
    color: #999;
  }

  .cell-ad-title {
    width: 105px;
    display: inline-block;
    text-align: right;
    padding-right: 35px;
    color: #999
  }

  a {
    color: #999 !important;
  }

  textarea {
    font-size: 15px;
    margin-top: 10px;
  }

  .cell-swipe {
    background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 30%, transparent 50%);
    background-image: linear-gradient(0deg, #d9d9d9, #d9d9d9 30%, transparent 50%);
    background-size: 150% 1px;
    background-repeat: no-repeat;
    background-position: bottom;
  }

  .bg-img-bottom {
    background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-position: 10px bottom;
  }
</style>
