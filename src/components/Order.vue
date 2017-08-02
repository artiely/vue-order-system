<template >
  <div class="order" transition="fadeOutLeft" >
    <div style="position: absolute;top: 0;left: 0;right: 0;z-index: 9" >
      <header class="sBox " style="height: 40px;background:#fff;z-index: 99" >
        <div style="height: 44px" >
          <mt-search style="height: 44px" v-model="query.on" cancel-text="取消" placeholder="工单号" ></mt-search >
        </div >
      </header >
      <header class="mint-header" >
        <swiper :options="swiperOption" ref="mySwiper" style="height: 40px;padding-right: 45px" >
          <!-- slides -->
          <swiper-slide v-for="(item,index) in status" @click.native="dosearch" :index="index" :key="index"
           :class="{'active':activeIndex[index]==query.orderStateId-1}" >
            <span class="itemname" >{{item.name}} </span >
            <mt-badge size="small" type="error" v-show="item.count>0" >{{item.count}}</mt-badge >
          </swiper-slide >
        </swiper >
        <i class="iconfont icon-guanjiaowangtubiao35" @click="toggleopen" ></i >
      </header >
    </div >
    <scroller class="page-content" :on-refresh="onRefresh" ref="myScroller" :on-infinite="onInfinite" >
      <div v-if="orderinfo.length==0" class="noData"><i class="iconfont icon-zanwushuju"></i></div>
      <order-item :item="item" v-for="(item,index) in orderinfo" :key="index"  v-on:getsp="getScrollPosition" v-on:refresh="onRefresh(function(){})"></order-item >
    </scroller >
    <mt-popup v-model="popupVisible" position="right" style="height: 100%;width: 280px;" >
      <scroller class="filter_scroller" >
        <div class="my-title" >
          按时间选择
        </div >
        <div class="von-button-bar" >
          <a class="button button-assertive button-outline" >上月</a ><a class="button button-assertive button-outline" >本月</a >
        </div >
        <div class="von-button-bar" >
          <a class="button button-assertive button-outline" >近三月</a >
          <a class="button button-assertive button-outline" >近半年</a >
        </div >
        <div class="von-button-bar" >
          <a class="button button-assertive button-outline" >今年</a >
          <a class="button button-assertive button-outline" >去年</a >
        </div >
        <div class="von-button-bar" >
          <a class="button button-assertive button-outline" >时间不限</a >
        </div >
        <div class="my-title" >
          按服务点选择
        </div >
        <select v-model="query.companyId" style="width: 100%;height: 30px" placeholder="点击选择" >
          <option :value="item.companyId" v-for="(item,index) in serviceAddress" :key="index" >{{item.companyName}}</option >
        </select >
        <div class="my-title" >
          按用户选择
        </div >
        <select v-model="query.yh" style="width: 100%;height: 30px" placeholder="点击选择" >
          <option :value="item.id" v-for="(item,index) in yhArr" :key="index" >{{item.personName}}</option >
        </select >
        <div class="my-title" >
          其他选择
        </div >
        <mt-cell class="my-cell" title="显示我的报修" >
          <mt-switch v-model="query.sfbx" ></mt-switch >
        </mt-cell >
        <mt-cell class="my-cell" title="显示驻场工单" >
          <mt-switch v-model="query.sfzc" ></mt-switch >
        </mt-cell >
        <mt-cell class="my-cell" title="显示现场工单" >
          <mt-switch v-model="query.sfxc" ></mt-switch >
        </mt-cell >
        <div style="height: 60px;width: 100%" ></div >
      </scroller >
      <div class="b_btn" >
        <div style="width: 40%;float: left;background: #eee" @click="resetQuery" >重置</div >
        <div style="width: 60%;float:right;background: #ea5a49;color: #fff" @click="onRefresh" >完成</div >
      </div >
    </mt-popup >
  </div >
</template >
<script >

  import OrderItem from './items/Orderitem.vue'
  import  axios from 'axios'
  import $ from 'n-zepto'
  import { Toast } from 'mint-ui';
  import moment from 'moment'
  export default {
    name: 'order',
    components: {OrderItem},
    data () {
      return {
        orderinfo: [],
        totalPage: 1,
        popupVisible: false,//筛选的
        activeIndex:[0,1,2,3,4,5,7,6],//选中的 //    :class="{'active':index==query.orderStateId-1}"
        query: {
          limit: 10,
          page: 1,
          sidx: '',
          order: 'asc',
          orderStateId: 1,
          startDate: moment().subtract(3, 'month').startOf('month').format('YYYY-MM-DD'),
          endDate: moment().format('YYYY-MM-DD'),
          companyId: '',
          contractId: 1950,
          on: '',
          yh: '',
          sfzc: false,
          sfxc: false,
          sfbx: false
        },
        serviceAddress: [],
        yhArr: [],
        status: [
          {name: '待处理', count: 0},
          {name: '已过期', count: 0},
          {name: '处理中', count: 0},
          {name: '待评价', count: 0},
//          {name: '待定价', count: 0},
          {name: '待付款', count: 0},
          {name: '已取消', count: 0},
          {name: '全部', count: 0}],
        swiperOption: {
          pagination: '.swiper-pagination',
          slidesPerView: 'auto',
          paginationClickable: true,
          spaceBetween: 30,
          onTransitionStart(swiper){
            console.log(swiper)
          }
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
        if (_this.query.page == 1) {//如果是第一页重新加载数据
          _this.orderinfo = [];
          _this.totalPage = 2;
        }
        if (_this.query.page > _this.totalPage) {//不是第一页 无限加载 到完毕返回
          console.info('扯完了！');
            cb();
          return
        }
        if(_this.query.orderStateId==undefined){//重置后会变成undefined
          _this.query.orderStateId=''
        }
        var url_query =
                '?&limit=8&page=' + _this.query.page + '&sidx=&order=asc&orderStateId=' + _this.query.orderStateId + '&contractId=1950&startDate='+_this.query.startDate+' 00:00:00&endDate='+_this.query.endDate+' 23:59:59&companyId='+_this.query.companyId+'&on='+_this.query.on+'&yh='+_this.query.yh+'&sfzc='+_this.query.sfzc+'&sfxc='+this.query.sfxc+'&sfbx='+this.query.sfbx+'';


                let params={
                  limit:this.query.limit,
                  page:this.query.page,
                  order:asc,
                  orderStateId:this.query.orderStateId,
                  startDate:this.query.startDate,
                  endDate:this.query.endDate,
                  companyId:this.query.companyId,
                  on:this.query.on,
                  yh:this.query.yh,
                  sfzc:this.query.sfzc,
                  sfxc:this.query.sfxc,
                  sfbx:this.query.sfbx
                }

                this.$api.get_order_list(params).then(res=>{
                  if(res.code==ERR_OK){
                    console.info(res)
                  }
                })
        axios({
          method: 'get',
            url: localPath+'/orderinfo/listVo' + url_query
        }).then(function (r) {
          if (r.data.code == 0) {
            var list = _this.orderinfo.concat(r.data.page.list);
            _this.totalPage = r.data.page.totalPage;
            _this.orderinfo = list;
            console.info("list 列表数据", list);
            console.info("totalPage 总页码", _this.totalPage);
            console.info("page 当前页码", _this.query.page);
            //数据进来开启本地缓存 目的在于用户调至其他页面 或者详情 回来还在当前数据页面
            sessionStorage.setItem("orderinfo", JSON.stringify(list));
            sessionStorage.setItem("page", _this.query.page);
            sessionStorage.setItem("totalPage", _this.totalPage)
            sessionStorage.setItem("orderStateId", _this.query.orderStateId)
            sessionStorage.setItem("startDate", _this.query.startDate)
            sessionStorage.setItem("endDate", _this.query.endDate);
            sessionStorage.setItem('companyId',_this.query.companyId)
          } else {
            Toast('系统繁忙...请稍后重试...');
          }
          axios({
            method: 'get',
            url:localPath+'/orderinfo/count' + url_query,
            params: {orderStateIds: [1, 2, 3, 4, 5, 6, 7, 8]}
          }).then(function (r) {
            if (r.data.code == 0) {
              var orderStatusCount = r.data.result;
              var arr = []
              for (var i = 0; i < orderStatusCount.length; i++) {
                arr.push()
              }
              var statusArr = [
                {name: '待处理', count: orderStatusCount['1']},
                {name: '已过期', count: orderStatusCount['2']},
                {name: '处理中', count: orderStatusCount['3']},
                {name: '待评价', count: orderStatusCount['4']},
//                {name: '待定价', count: orderStatusCount['5']},
                {name: '待付款', count: orderStatusCount['6']},
                {name: '已取消', count: orderStatusCount['8']},
                {name: '全部', count: orderStatusCount['7']}];
              _this.status = statusArr;
              var status = JSON.stringify(statusArr)
              sessionStorage.setItem("status", status)
            }
          });
            cb()
        }).catch(function (error) {
          console.error(error);
        })
      },
      onRefresh(done) {
        this.query.page = 1;
        this.getdata(function () {
          done(true)
        })

      },
      onInfinite(done) {
        if (this.totalPage < this.query.page) {//当前页码大于总页码 停止无限加载
          this.$refs.myScroller.finishInfinite()
        } else {
          this.query.page++;
          this.getdata(function () {
            done(true)
          })
        }
      },
      dosearch($event){
        var _this = this;
        var index = $($event.currentTarget).attr('index');
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
//          case '4':
//            _this.query.orderStateId = 5;
//            break;
          case '4':
            _this.query.orderStateId = 6;
            break;
          case '5':
            _this.query.orderStateId = 8;
            break;
          case '6':
            _this.query.orderStateId = 7;
            break;
        }
        this.query.page = 1;
        this.totalPage = 1;
        this.getdata(function(){})
      },
      toggleopen(){//筛选的
        this.popupVisible = !this.popupVisible
      },
      getScrollPosition(){//记录滚动条的位置 绑定在子组件order-item v-on:getsp
       let p = this.$refs.myScroller.getPosition();
        sessionStorage.setItem('scrollTop', p.top)
      },
      dateRangePick(){
        let _this=this;
        //筛选所选择的日期范围。。一月前 一年前...
        var vonBtn=$('.von-button-bar').find('.button');
        vonBtn.click(function () {
          vonBtn.addClass('button-outline');
          let _rangeDate = $(this).removeClass('button-outline').text();
          _this.query.page=1;
          _this.totalPage=1;
          switch (_rangeDate) {
            case '上月':
              _this.query.startDate = moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
              _this.query.endDate = moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD');
              break;
            case '本月':
              _this.query.startDate = moment().startOf('month').format('YYYY-MM-DD');
              _this.query.endDate = moment().format('YYYY-MM-DD');
              break;
            case '近三月':
              _this.query.startDate = moment().subtract(3, 'month').startOf('month').format('YYYY-MM-DD');
              _this.query.endDate = moment().format('YYYY-MM-DD');
              break;
            case '近半年':
              _this.query.startDate = moment().subtract(6, 'month').startOf('month').format('YYYY-MM-DD');
              _this.query.endDate = moment().format('YYYY-MM-DD');
              break;
            case '今年':
              _this.query.startDate = moment().startOf('year').startOf('month').format('YYYY-MM-DD');
              _this.query.endDate = moment().format('YYYY-MM-DD');
              break;
            case '去年':
              _this.query.startDate = moment().subtract(1, 'year').startOf('year').format('YYYY-MM-DD');
              _this.query.endDate = moment().subtract(1, 'year').endOf('year').format('YYYY-MM-DD');
              break;
            case '时间不限':
              _this.query.startDate = moment([2012, 9, 18]).format('YYYY-MM-DD');
              _this.query.endDate = moment().format('YYYY-MM-DD');
              break;
          }
        })
      },
      getServiceAddress(){
        var _this = this;
        /*服务点*/
        $.ajax({
          url: localPath+'/company/getServiceAddress',
          dataType: 'json',
          success: function (r) {
            if (r.code == 0) {
              _this.serviceAddress = r.serviceAddress;
              window.sessionStorage.setItem('serviceAddress',JSON.stringify(r.serviceAddress))
            } else {
              console.error('获取服务点地址出错')
            }
          }
        })
      },
      getYh(){
        var _this = this;
        $.ajax({
          url: localPath+'/person/getCustomerUser?companyId=' + this.query.companyId + '',
          dataType: 'json',
          success: function (r) {
            if (r.code == 0) {
              _this.yhArr = r.customerUsers;
            }
          }
        });
      },
      resetQuery(){//筛选点击重置按钮执行的逻辑
        this.query.startDate = moment().subtract(3, 'month').startOf('month').format('YYYY-MM-DD');
        this.query.endDate = moment().format('YYYY-MM-DD');
        this.query.companyId = '';
        this.query.yh = '';
        this.query.sfzc = false;
        this.query.sfxc = false;
        this.query.sfbx = false;
        this.onRefresh();
        Toast('重置成功')
      },
      setScrollerPosition(){//设置滚动条位置
        let _this=this;
        let y=sessionStorage.getItem('scrollTop');
        setTimeout(function(){ _this.$refs.myScroller.scrollTo(0,y,false)},10)
      }
    },
    created(){
      //判断是否存在本地数据 不存在再加载
      let _orderinfo = sessionStorage.getItem("orderinfo");
      let page = sessionStorage.getItem("page");
      let totalPage = sessionStorage.getItem("totalPage");
      let _status = sessionStorage.getItem("status");
      let _orderStateId = sessionStorage.getItem("orderStateId");
      let _startDate = sessionStorage.getItem("startDate");
      let _endDate = sessionStorage.getItem("endDate");
      let _companyId = sessionStorage.getItem("companyId");
      let status = JSON.parse(_status);
      console.info("status 导航数据", _status);
      var orderinfo = JSON.parse(_orderinfo);
      if (orderinfo && orderinfo.length > 0) {
        this.orderinfo = orderinfo;
        this.query.page = page;
        this.totalPage = totalPage;
        this.status = status;
        this.query.orderStateId = _orderStateId;
        this.query.startDate = _startDate;
        this.query.endDate = _endDate;
        this.query.companyId = _companyId
      } else {
        this.getdata(function(){})
      }

     let oid =this.$route.params.orderNum;
      if(oid!=''&&oid!=undefined){
        this.query.page=1;
        this.query.on=oid;
        this.orderinfo=[];
        this.getdata(function(){})
      }
    },
    watch: {
      'query.companyId': {
        handler: function (val) {
          this.getYh()
        }
      }
    },
    mounted(){
      var _this=this;
      // 筛选 获得用户选择的日期范围
      this.dateRangePick();
      // 筛选获取 服务点 和用户
     let _erviceAddress= window.sessionStorage.getItem('serviceAddress');
      let serviceAddress=JSON.parse(_erviceAddress);
      if(_erviceAddress && serviceAddress.length>0){
        this.serviceAddress=serviceAddress
      }else{
        this.getServiceAddress();
      }
      //筛选 点击重置和确定都回到列表页面
      $('.b_btn').click(function(){
        _this.popupVisible = false;
      });
      this.$nextTick(function(){
        this.setScrollerPosition()
      });

      /*搜索*/
      $(document).keyup(function(e){
        if(e.keyCode==13){
          _this.query.page=1;
          _this.getdata(function(){})
        }
      })

    }
  }
</script >

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
  .active{
    color: #333!important;
  }
  .order {
    height: 100%;
  }
  .icon-guanjiaowangtubiao35 {
    box-shadow: -10px 0px 60px #1b83f7;
    height: 100%;
    line-height: 40px;
    position: relative;
    z-index: 99;
    width: 100px;
    display: inline-block;
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
  .flexbox {
    display: flex;
  }

  .home {
    margin: 0;
  }

  .mint-header {
    padding-right: 0;
    overflow: hidden;
  }

  .page-content {
    padding-top: 88px;
    box-sizing:border-box;
    height:100vh
  }

  .swiper-slide {
    width: 15%;
  }

  .swiper-slide .itemname {
    line-height: 40px;
  }
</style >
