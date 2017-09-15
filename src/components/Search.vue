<template >
  <div class="search" >
    <header class="sBox" style="height: 40px;background:#fff;z-index: 99" >
      <div style="width: 10%;float: left" @click="goBack" ><i class="iconfont icon-return" ></i ></div >
      <div style="width: 90%;float: right;height: 44px" >
        <mt-search v-model="value" cancel-text="取消" placeholder="搜索" ></mt-search >
      </div >
    </header >
    <div class="my-header my-border-bottom flexbox" >
      <swiper :options="swiperOption" ref="mySwiper" class="mySwiper" style="height: 40px;padding-right: 45px">
        <!-- slides -->
        <swiper-slide v-for="(item,index) in status" @click.native="dosearch" :index="index">{{item}}</swiper-slide>
      </swiper>
      <i class="iconfont icon-guanjiaowangtubiao35" @click="toggleopen" ></i >
    </div >


      <scroller class="page-content"  :on-refresh="onRefresh" ref="myScroller" :on-infinite="onInfinite">
        <order-item  :item="item" v-for="item in orderinfo" ></order-item >
        <div v-if="query.page > totalPage" class="text-center" >没有更多数据</div >
      </scroller>


    <mt-popup v-model="popupVisible" position="right" style="height: 100%;width: 280px;"

    >
      <scroller class="filter_scroller">
      <div class="my-title" >
        按时间选择
      </div >
      <div class="von-button-bar">
        <a class="button button-assertive button-outline" >7天前</a ><a class="button button-assertive button-outline" >一个月前</a >
      </div>
      <div class="von-button-bar">
        <a class="button button-assertive button-outline" >一年前</a >  <a class="button button-assertive button-outline" >三年前</a >
      </div>
      <div class="von-button-bar">
        <a class="button button-assertive button-outline" >时间不限</a >
      </div>
      <div class="my-title" >
        按服务点选择
      </div >

        <select v-model="selected_company"  style="width: 100%;height: 30px"  placeholder="点击选择">
          <option value=""  v-for="item in company">{{item}}</option >
        </select >

      <div class="my-title" >
        按用户选择
      </div >
        <select v-model="selected_yh"  style="width: 100%;height: 30px"  placeholder="点击选择">
          <option value=""  v-for="item in yh">{{item}}</option >
        </select >


      <div class="my-title" >
        其他选择
      </div >
      <mt-cell class="my-cell" title="显示我的报修"><mt-switch v-model="query.sfbx"></mt-switch></mt-cell>
      <mt-cell class="my-cell" title="显示驻场工单" ><mt-switch v-model="query.sfzc"></mt-switch></mt-cell>
      <mt-cell class="my-cell" title="显示现场工单" ><mt-switch v-model="query.sfxc"></mt-switch></mt-cell>
        <div style="height: 60px;width: 100%"></div>
      </scroller>
      <div class="b_btn" >
        <div style="width: 40%;float: left;background: #eee">重置</div>
        <div style="width: 60%;float:right;background: #ea5a49;color: #fff">完成</div>
      </div>
    </mt-popup >

  </div >
</template >

<script >
  import OrderItem from './items/Orderitem.vue'
  import  axios from 'axios'
  import $ from 'n-zepto'
  export default {
    name: 'search',
    components: {OrderItem},
    data () {
      return {
        selected: null,
        company: ['1北京史塞克北京史塞克北京史塞克北京史塞克','2北京史塞克北京史塞克北京史塞克北京史塞克','3北京史塞克北京史塞克北京史塞克北京史塞克','4北京史塞克北京史塞克北京史塞克北京史塞克','5北京史塞克北京史塞克北京史塞克北京史塞克','6北京史塞克北京史塞克北京史塞克北京史塞克','1北京史塞克北京史塞克北京史塞克北京史塞克','2北京史塞克北京史塞克北京史塞克北京史塞克','3北京史塞克北京史塞克北京史塞克北京史塞克','4北京史塞克北京史塞克北京史塞克北京史塞克','5北京史塞克北京史塞克北京史塞克北京史塞克','6北京史塞克北京史塞克北京史塞克北京史塞克','1北京史塞克北京史塞克北京史塞克北京史塞克','2北京史塞克北京史塞克北京史塞克北京史塞克','3北京史塞克北京史塞克北京史塞克北京史塞克','4北京史塞克北京史塞克北京史塞克北京史塞克','5北京史塞克北京史塞克北京史塞克北京史塞克','6北京史塞克北京史塞克北京史塞克北京史塞克'],
        popupVisible: false,//筛选的
        popupVisible2: false,//地址的
        orderinfo: [],
        companyName:'北京史塞克北京史塞克北京史塞克北京史塞克',
        yh:['张三','张三','张三','张三','张三'],
        selected_yh:null,
        selected_company:null,
        totalPage:1,
        query: {
          limit: 10,
          page: 1,
          sidx: '',
          order: 'asc',
          orderStateId: 1,
          startDate: '2017-04-19',
          endDate: '2017-05-24',
          companyId: '',
          contractId: 1950,
          on: '',
          yh: '',
          sfzc: false,
          sfxc:false,
          sfbx: false
        },
        value: '',
        status: ['待处理', '已过期','处理中', '待评价','待定价','待付款',   '已取消', '全部'],
        swiperOption: {
          pagination: '.swiper-pagination',
          slidesPerView: 'auto',
          paginationClickable: true,
          spaceBetween: 30,
          // if you need use plugins in the swiper, you can config in here like this
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
          debugger: true,
          // swiper callbacks
          // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
          onTransitionStart(swiper){
//            console.log(swiper)
          },
          // more Swiper configs and callbacks...
          // ...
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods: {
      getdata(cb){
        var _this = this;
        if (_this.query.page == 1) {
          _this.orderinfo = [];
          _this.totalPage = 2;
//        Indicator.open();
        }
        if (_this.query.page > _this.totalPage) {
          console.info('扯完了！');
          if (cb) {
            cb()
          }
          return
        }

        axios({
          method: 'get',
          url: '/orderinfo/listVo?&limit=8&page=' + _this.query.page + '&sidx=&order=asc&orderStateId=' + _this.query.orderStateId + '&contractId=1950&startDate=2017-02-19&endDate=2017-05-24&companyId=&on=&yh=&sfzc=false&sfxc=false&sfbx=false',
        }).then(function (r) {
//        Indicator.close()
          if (r.data.code == 0) {
            var list = _this.orderinfo.concat(r.data.page.list);
            _this.totalPage = r.data.page.totalPage;
            _this.orderinfo = list;
//            console.log("list", list)
//            console.log("totalPage", _this.totalPage)
//            console.log("page", _this.query.page)
            sessionStorage.setItem("orderinfo", JSON.stringify(list))
            sessionStorage.setItem("page", _this.query.page)
            sessionStorage.setItem("totalPage", _this.totalPage)

          } else {
//          Indicator.open('系统繁忙...请稍后重试...');
//          setTimeout(Indicator.close(),3000)
          }

          if (cb) {
            cb()
          }
        }).catch(function (error) {
          console.error(error);
//        Indicator.open('系统繁忙...请稍后重试...');
//        setTimeout(Indicator.close(),3000)
        })
      },
      onRefresh(done) {
        this.query.page = 1;
        this.getdata(function () {
          done()
        })

      },
      onInfinite(done) {

        if(this.totalPage<this.query.page){
          this.$refs.myScroller.finishInfinite()
        }else{
//          console.log(111)
          this.query.page++;
          this.getdata(function () {
            done()
          })
        }
      },
      dosearch($event){
        var _this = this;
        var index = $($event.currentTarget).attr('index');
//        console.log(index)
        switch (index) {
          case '0':
            _this.query.orderStateId = 1;
            break;
          case '1':
            _this.query.orderStateId = 2;
            break;
          case '2':
            _this.query.orderStateId = 3;
            break;
          case '3':
            _this.query.orderStateId = 4;
            break;
          case '4':
            _this.query.orderStateId = 5;
            break;
          case '5':
            _this.query.orderStateId = 6;
            break;
          case '6':
            _this.query.orderStateId = 8;
            break;
          case '7':
            _this.query.orderStateId = 7;
            break;
        }
        this.query.page = 1;
        this.totalPage = 1;
        this.getdata()
      },
      goBack(){
        this.$router.back()
      },
      toggleopen(){//筛选的
        this.popupVisible = !this.popupVisible
      },
      toggleopen2(){//地址的
        this.popupVisible2 = !this.popupVisible2
      }
    },
    created(done){
      var _orderinfo = sessionStorage.getItem("orderinfo");
      var page = sessionStorage.getItem("page");
      var totalPage = sessionStorage.getItem("totalPage");

      var orderinfo = JSON.parse(_orderinfo);
      if (orderinfo.length > 0) {
        this.orderinfo = orderinfo;
        this.query.page = page;
        this.totalPage = totalPage
      } else {
        this.getdata()
      }
    },
    mounted(){
      var sbtn=$('.von-button-bar').find('.button');
      sbtn.click(function(){
        sbtn.addClass('button-outline');
        $(this).removeClass('button-outline')
      })

    }
  }
</script >

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
  .mySwiper{
    flex: 1;
  }
  .flexbox{
    display: flex;
  }
.b_btn{
  width: 100%;
  height:40px;
  position: fixed;
  bottom:0;
  left: 0;
  right:0;
  line-height:40px;

}
  .my-title {
    height: 30px;
    width: 100%;
    line-height: 30px;
    font-size: 13px;
    margin-top: 6px;
    text-indent: 8px;
    background: #fafafa;

  }

  .my-header {
    height: 40px;
    line-height: 40px;
    width: 100%;
    position: relative;
    z-index: 99;
    background: #fff;
  }

  .item {
    height: 40px;
    line-height: 40px;
    float: left;
    padding: 0 10px;
  }

  .icon-guanjiaowangtubiao35 {
    height: 40px;
    width: 50px;
    line-height: 40px;
    text-align: center;
    float: right;
  }

  .icon-return {
    height: 100%;
    line-height: 40px;
    position: relative;
    z-index: 99;
    width: 100%;
    text-align: center;
    display: inline-block;
  }

  .search {
    margin: 0;
    background: #fff;
  }

  .mint-header {
    padding-right: 0;
    overflow: hidden;
  }

  .page-content {
    margin-top: 88px;
  }

  .swiper-slide {
    width: 18%;
    line-height: 40px;
    padding-left: 10px;
  }
</style >
