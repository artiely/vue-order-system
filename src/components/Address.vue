<template >
  <div class="address" >
    <mt-header title="服务点" fixed style="z-index: 9;" >
      <mt-button icon="back" @click="back" slot="left" >返回</mt-button >
    </mt-header >
    <scroller class="page-content" >
      <mt-cell-swipe v-for="(item,index) in serviceAddress" :key="index" :id="item.companyId" class="cell-swipe"  :right="[
        {
          content: '删除',
          style: {background: 'red', color: '#fff'},
          handler: () => deleteAddress(item.companyId)
        }
      ]" >
      <div class="addressBox" slot="title">
        <h4>{{item.companyName}}</h4>
        <p>{{item.allAddress}}</p>
      </div>
    </mt-cell-swipe >

      <div style="height: 90px;" ></div >
    </scroller >
    <mt-popup v-model="addVisible" position="right" :closeOnClickModal="false" :modal="false" style="width: 100%;height: 100%" >
      <mt-header title="新增服务点" style="z-index: 9;">
        <mt-button icon="back" @click="showAddM" slot="left" >返回</mt-button >
      </mt-header >
      <mt-popup v-model="addressVisible"  position="bottom" style="width: 100%" >
        <div class="page-picker-wrapper" >
          <mt-picker :slots="addressSlots" v-if="addressSlots" class="picker" @change="onAddressChange" :visible-item-count="5" ></mt-picker >
        </div >
      </mt-popup >
      <mt-popup v-model="streetVisible" popup="popup-fade" position="bottom" style="width: 100%" >
        <div class="page-picker-wrapper" >
            <mt-picker :slots="streetSlots" v-if="streetSlots" ref="picker" class="picker" @change="onStreetChange"  :visible-item-count="5" ></mt-picker >
        </div >
      </mt-popup >
      <div >
        <mt-field label="" :state="companyName.length>0?'success':'error'" v-model="companyName"   placeholder="公司名" ></mt-field >
        <div @click="showAddress" class="cell-ad" >上门服务地址:{{ addressProvince }} {{ addressCity }} {{addressXian}}</div >
      </div >
      <div @click="showStreet" class="cell-ad" v-if="noStreet" >选择街道：{{addressStreet}}</div >

      <textarea placeholder="详细地址" id="" cols="4" rows="3" v-model="desMore" ></textarea >
      <mt-button size="large" type="danger" style="width:95%;margin: 20px auto;" :disabled="desMore.length<3" @click="saveAddress" >保存</mt-button >
    </mt-popup >
    <div class="addAddressBtn" @click="showAddM" >新增服务点地址</div >
  </div >
</template >
<script >
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
        serviceAddress: [],
        noStreet:true
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
          let index=shi.indexOf(values[1])
          let xian = s[values[0]][shi[index]];
          this.xianObj = xian;
          picker.setSlotValues(1, shi);
          this.addressProvince = values[0];
          this.addressCity = values[1];
          this.addressXian = values[2];
          if(!values[2]){
            this.noStreet=false
          }else{
            this.noStreet=true
          }
          picker.setSlotValues(2, Object.keys(xian));
          console.log(values)
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
          this.addressSlots[0].defaultIndex = 0;
      },
      /**
       * 获取服务点数据
       */
      getServiceAddress () {
        this.$api.get_service_address().then((res)=>{
          if(res.code==ERR_OK){
              this.serviceAddress = res.serviceAddress
          }else{
              Toast(res.msg)
          }
        }).catch(err=>{
          console.error(err);
        })
      },
      /**
       * 保存服务点地址
       */
      saveAddress(){
        let _this=this;
        let _city='上海市'
        if(this.addressCity=='市辖区'){
          _city=this.addressProvince
        }else {
          _city=this.addressCity
        }
        let data = {
          address: this.addressProvince+this.addressCity+(this.addressXian?this.addressXian:'')+(this.addressStreet ? this.addressStreet:'') +(this.desMore?this.desMore:''),
          cityName: _city,
          companyname: _this.companyName,
          id: "151",//这个id pc上似乎是固定的
          newValue:this.addressProvince+this.addressCity+(this.addressXian?this.addressXian:'')+(this.addressStreet ? this.addressStreet:'')+(this.desMore?this.desMore:''),
          operationType: 1,
          shortName: _this.companyName //公司名称 暂时无
        };

        this.$api.save_service_address(data).then(res=>{
          if(res.code==ERR_OK){
            Toast('保存成功');
            this.addVisible = false;
            this.getServiceAddress()
          }else{
            alert(res.msg)
            // Toast(res.msg);//Toast的层级不够
          }
        }).catch(err=>{
          console.error(err);
        })

      },
      /**
       * 删除服务点地址
       */
      deleteAddress(id){
        let  data={id:id};
        MessageBox.confirm('确定删除？').then(actions=>{
          this.$api.delete_service_address(data).then(res=>{
            if(res.code==ERR_OK){
              Toast('删除成功');
              this.getServiceAddress()
            }else{
              Toast(res.msg);
            }
          }).catch(err=>{
            console.error(err)
          })

        })
      },
    },
    watch: {
      'addressXian': {
        handler(val, oval){
          let street = this.xianObj[this.addressXian]
          this.streetSlots[0].values = street;
          if(street.length==0){
            this.noStreet=false
          }else{
            this.noStreet=true
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
</script >

<style scoped >
.page-content{

}
  .cell-swipe {
    background: #fff;
    margin-top: 10px;


  }
  .addressBox{
    width:100%;
    flex:1
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
    height: 100vh;
    background: #f8f8f8;
    padding-top:40px;
    box-sizing:border-box;
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

</style >
