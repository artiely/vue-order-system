<template>
  <div class="order" transition="fadeOutLeft">
    <div style="position: absolute;top: 0;left: 0;right: 0;z-index: 9">
      <header class="sBox " style="height: 40px;background:#fff;z-index: 99">
        <div style="height: 44px">
          <mt-search style="height: 44px" v-model="query.on" cancel-text="取消" placeholder="工单号"></mt-search>
        </div>
      </header>
      <header class="mint-header">
        <swiper :options="swiperOption" ref="mySwiper" style="height: 40px;padding-right: 45px" class="CN_swiper"
                v-if="lang=='CN'">
          <!-- slides -->
          <swiper-slide v-for="(item,index) in status" @click.native="dosearch(item)" :index="index" :key="index"
                        :class="{'active':item.orderStateId==query.orderStateId}">
            <span class="itemname">{{item.name}} </span>
            <mt-badge size="small" type="error" v-show="item.count>0">{{item.count}}</mt-badge>
          </swiper-slide>
        </swiper>
        <swiper :options="swiperOption" ref="mySwiper" style="height: 40px;padding-right: 45px" class="EN_swiper"
                v-if="lang=='EN'">
          <!-- slides -->
          <swiper-slide v-for="(item,index) in status" @click.native="dosearch(item)" :index="index" :key="index"
                        :class="{'active':item.orderStateId==query.orderStateId}">
            <span class="itemname">{{item.name}} </span>
            <mt-badge size="small" type="error" v-show="item.count>0">{{item.count}}</mt-badge>
          </swiper-slide>
        </swiper>
        <i class="iconfont icon-guanjiaowangtubiao35" @click="toggleopen"></i>
      </header>
    </div>
    <scroller class="page-content" :on-refresh="onRefresh" ref="myScroller" :on-infinite="onInfinite">
      <div v-if="orderinfo.length==0" class="noData"><i class="iconfont icon-zanwushuju"></i></div>
      <order-item :item="item" v-for="(item,index) in orderinfo" :key="index" v-on:getsp="getScrollPosition"
                  v-on:refresh="onRefresh"></order-item>
    </scroller>
    <mt-popup v-model="popupVisible" position="right" style="height: 100%;width: 280px;">
      <scroller class="filter_scroller">
        <div class="my-title">
          按时间选择 / 服务时间
        </div>
        <div class="">
          <mt-button class="bt-margin" :class="{'active':rangeDateActive==item.id}" v-for="(item,index) in rangeDate"
                     size="small" type="primary" @click.native="choiceRangeDate(item)">{{item.text}}
          </mt-button>
        </div>
        <div class="my-title">
          按服务点选择
        </div>
        <select v-model="query.companyId" style="width: 100%;height: 30px" placeholder="点击选择">
          <option :value="item.companyId" v-for="(item,index) in serviceAddress" :key="index">{{item.companyName}}
          </option>
        </select>
        <div class="my-title">
          按用户选择
        </div>
        <select v-model="query.yh" style="width: 100%;height: 30px" placeholder="点击选择">
          <option :value="item.id" v-for="(item,index) in yhArr" :key="index">{{item.personName}}</option>
        </select>
        <div class="my-title">
          其他选择
        </div>
        <mt-cell class="my-cell" title="显示我的报修">
          <mt-switch v-model="query.sfbx"></mt-switch>
        </mt-cell>
        <mt-cell class="my-cell" title="显示驻场工单">
          <mt-switch v-model="query.sfzc"></mt-switch>
        </mt-cell>
        <mt-cell class="my-cell" title="显示现场工单">
          <mt-switch v-model="query.sfxc"></mt-switch>
        </mt-cell>
        <div style="height: 60px;width: 100%"></div>
      </scroller>
      <div class="b_btn" @click="hiddenPop">
        <div style="width: 40%;float: left;background: #eee" @click="resetQuery">重置</div>
        <div style="width: 60%;float:right;background: #ea5a49;color: #fff" @click="onRefresh">完成</div>
      </div>
    </mt-popup>
  </div>
</template>
<script type="text/javascript">
  import OrderItem from './items/Orderitem.vue'
  import {
    Toast
  } from 'mint-ui';
  import moment from 'moment'
  export default {
    name: 'order',
    components: {
      OrderItem
    },
    data() {
      return {
        orderinfo: [],
        totalPage: 1,
        popupVisible: false, //筛选的
        activeIndex: [0, 1, 2, 3, 4, 5, 7, 6], //选中的 //    :class="{'active':index==query.orderStateId-1}"
        query: {
          limit: 10,
          page: 1,
          sidx: '',
          order: 'asc',
          orderStateId: 1,
          startDate: moment().subtract(3, 'month').startOf('month').format('YYYY-MM-DD'),
          endDate: moment().format('YYYY-MM-DD'),
          companyId: '',
          on: '',
          yh: '',
          sfzc: false,
          sfxc: false,
          sfbx: false
        },
        rangeDate: [{
          id: 1,
          text: '上月'
        }, {
          id: 2,
          text: '本月'
        }, {
          id: 3,
          text: '近三月'
        }, {
          id: 4,
          text: '近半年'
        }, {
          id: 5,
          text: '今年'
        }, {
          id: 6,
          text: '去年'
        }, {
          id: 7,
          text: '时间不限'
        }],
        rangeDateActive: 3,
        serviceAddress: [],
        yhArr: [],
        status: [
          {
            name: this.$t('message.Unprocessed'),
            count: 0,
            orderStateId: 1
          },
          {
            name: this.$t('message.Delayed'),
            count: 0,
            orderStateId: 2
          },
          {
            name: this.$t('message.Processing'),
            count: 0,
            orderStateId: 3
          },
          {
            name: this.$t('message.To_rate'),
            count: 0,
            orderStateId: 4
          },
          {
            name: this.$t('message.Awaiting_payment'),
            count: 0,
            orderStateId: 6
          },
          {
            name: this.$t('message.Cancelled'),
            count: 0,
            orderStateId: 8
          },
          {
            name: this.$t('message.Completed'),
            count: 0,
            orderStateId: 9
          },
          {
            name: this.$t('message.All_orders'),
            count: 0,
            orderStateId: 7
          },
        ],
        swiperOption: {
          pagination: '.swiper-pagination',
          slidesPerView: 'auto',
          paginationClickable: true,
          spaceBetween: 30,
          onTransitionStart(swiper) {
          }
        },
        lang: 'CN'
      }
    },
    watch: {
      'query.companyId': {
        handler(val) {
          this.getYh()
        }
      },
      'query.orderStateId': {
        handler() {
          this.$refs.myScroller.scrollTo(0, 0, false)
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods: {
      getdata(cb) {
        let params = {
          limit: this.query.limit,
          page: this.query.page,
          order: 'asc',
          orderStateId: this.query.orderStateId,
          startDate: `${this.query.startDate} 00:00:00`,
          endDate: `${this.query.endDate} 23:59:59`,
          companyId: this.query.companyId,
          on: this.query.on,
          yh: this.query.yh,
          sfzc: this.query.sfzc,
          sfxc: this.query.sfxc,
          sfbx: this.query.sfbx
        }

        this.$api.get_order_list(params).then(res => {
          if (res.code == ERR_OK) {
            let list = res.page.list;
            if (this.query.page == 1) {
              this.orderinfo = list
            } else {
              this.orderinfo = this.orderinfo.concat(list)
            }
          } else {
            Toast(res.msg)
          }
          if (cb && typeof cb == 'function') {
            cb()
          }
        }).catch(err => {
          console.error(err)
        });
        this.$api.get_order_count(Object.assign({}, {
          orderStateIds: [1, 2, 3, 4, 6, 7, 8, 9]
        }, params)).then(res => {
          if (res.code == ERR_OK) {
            let count = res.result;
            this.status[0].count = count['1']
            this.status[1].count = count['2']
            this.status[2].count = count['3']
            this.status[3].count = count['4']
            this.status[4].count = count['6']
            this.status[5].count = count['8']
            this.status[6].count = count['9']
            this.status[7].count = count['7']
            /*this.status = [
             {
             name: this.$t('message.Unprocessed'),
             count: count['1'],
             orderStateId: 1
             },
             {
             name: this.$t('message.Delayed'),
             count: count['2'],
             orderStateId: 2
             },
             {
             name: this.$t('message.Processing'),
             count: count['3'],
             orderStateId: 3
             },
             {
             name: this.$t('message.To_rate'),
             count: count['4'],
             orderStateId: 4
             },
             {
             name: this.$t('message.Awaiting_payment'),
             count: count['6'],
             orderStateId: 6
             },
             {
             name: this.$t('message.Cancelled'),
             count: count['8'],
             orderStateId: 8
             },
             {
             name: this.$t('message.Completed'),
             count: count['9'],
             orderStateId: 9
             },
             {
             name: this.$t('message.All_orders'),
             count: count['7'],
             orderStateId: 7
             },
             ]*/
          } else {
            Toast(res.msg)
          }
        }).catch(err => {
          console.log(err)
        })

      },
      onRefresh(done) {
        this.query.page = 1;
        this.getdata(function () {
          done(true)
        })

      },
      onInfinite(done) {
        this.query.page++;
        this.getdata(function () {
          done(true)
        })
      },
      dosearch(item) {
        let id = item.orderStateId
        switch (id) {
          case 1:
            this.query.orderStateId = 1;
            break;
          case 2:
            this.query.orderStateId = 2;
            break;
          case 3:
            this.query.orderStateId = 3;
            break;
          case 4:
            this.query.orderStateId = 4;
            break;
          case 6:
            this.query.orderStateId = 6;
            break;
          case 8:
            this.query.orderStateId = 8;
            break;
          case 7:
            this.query.orderStateId = 7;
            break;
          case 9:
            this.query.orderStateId = 9;
            break;
        }
        this.query.page = 1;
        this.getdata()
      },
      toggleopen() { //筛选的
        this.popupVisible = !this.popupVisible
      },
      getScrollPosition() { //记录滚动条的位置 绑定在子组件order-item v-on:getsp
        let p = this.$refs.myScroller.getPosition();
        sessionStorage.setItem('scrollTop', p.top)
      },
      dateRangePick() {
        let _this = this;
        //筛选所选择的日期范围。。一月前 一年前...
        var vonBtn = $('.von-button-bar').find('.button');
        vonBtn.click(function () {
          vonBtn.addClass('button-outline');
          let _rangeDate = $(this).removeClass('button-outline').text();
          _this.query.page = 1;
          _this.totalPage = 1;
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
      /**
       * 获取服务点
       */
      getServiceAddress() {
        this.$api.get_service_address().then(res => {
          if (res.code == ERR_OK) {
            this.serviceAddress = res.serviceAddress
          } else {
            alert(res.msg)
          }
        }).catch(err => console.error(err))
      },
      /**
       * 获取用户
       */
      getYh() {
        let params = {
          companyId: this.query.companyId
        }
        this.$api.get_yh(params).then(res => {
          if (res.code == ERR_OK) {
            this.yhArr = res.customerUsers
          } else {
            alert(res.msg)
          }
        }).catch(err => console.error(err))
      },
      resetQuery() { //筛选点击重置按钮执行的逻辑
        this.query.startDate = moment().subtract(3, 'month').startOf('month').format('YYYY-MM-DD');
        this.query.endDate = moment().format('YYYY-MM-DD');
        this.query.companyId = '';
        this.query.orderStateId = 1;
        this.query.yh = '';
        this.query.sfzc = false;
        this.query.sfxc = false;
        this.query.sfbx = false;
        this.onRefresh();
        Toast('重置成功')
      },
      hiddenPop() {
        this.popupVisible = false;
      },
      choiceRangeDate(item) {
        this.rangeDateActive = item.id
        switch (item.text) {
          case '上月':
            this.query.startDate = moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
            this.query.endDate = moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD');
            break;
          case '本月':
            this.query.startDate = moment().startOf('month').format('YYYY-MM-DD');
            this.query.endDate = moment().format('YYYY-MM-DD');
            break;
          case '近三月':
            this.query.startDate = moment().subtract(3, 'month').startOf('month').format('YYYY-MM-DD');
            this.query.endDate = moment().format('YYYY-MM-DD');
            break;
          case '近半年':
            this.query.startDate = moment().subtract(6, 'month').startOf('month').format('YYYY-MM-DD');
            this.query.endDate = moment().format('YYYY-MM-DD');
            break;
          case '今年':
            this.query.startDate = moment().startOf('year').startOf('month').format('YYYY-MM-DD');
            this.query.endDate = moment().format('YYYY-MM-DD');
            break;
          case '去年':
            this.query.startDate = moment().subtract(1, 'year').startOf('year').format('YYYY-MM-DD');
            this.query.endDate = moment().subtract(1, 'year').endOf('year').format('YYYY-MM-DD');
            break;
          case '时间不限':
            this.query.startDate = moment([2012, 9, 18]).format('YYYY-MM-DD');
            this.query.endDate = moment().format('YYYY-MM-DD');
            break;
        }
      },

      setScrollerPosition() { //设置滚动条位置
        let y = sessionStorage.getItem('scrollTop');
        if (!y) {
          y = 0
        }
        setTimeout(() => {
          this.$refs.myScroller.scrollTo(0, y, false)
        }, 10)
      }
    },
    created() {
      this.getdata()
    },
    activated(){
      let lang = window.localStorage.getItem('lang');
      if (lang) {
        this.lang = lang
      }
    },

    mounted() {
      var _this = this;
      // 筛选 获得用户选择的日期范围
      this.dateRangePick();
      this.getServiceAddress();

      this.$nextTick(() => {
        this.setScrollerPosition()
      });

      /*搜索*/
      document.onkeyup = function (e) {
        if (e.keyCode == 13) {
          _this.query.page = 1;
          _this.getdata()
        }
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .CN_swiper {
    .swiper-slide {
      width: 15%;

    }
  }

  .EN_swiper {
    .swiper-slide {
      /*width: 45%;*/
      &:nth-child(1) {
        width: 35%;
      }
      &:nth-child(2) {
        width: 20%;
      }
      &:nth-child(3) {
        width: 25%;
      }
      &:nth-child(4) {
        width: 10%;
      }
      &:nth-child(5) {
        width: 45%;
      }
      &:nth-child(6) {
        width: 26%;
      }
      &:nth-child(7) {
        width: 20%;
      }
      &:nth-child(8) {
        width: 20%;
      }
    }
  }

  .bt-margin {
    margin: 4px
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

  .mint-header {
    padding-right: 0;
    overflow: hidden;
  }

  .page-content {
    padding-top: 88px;
    box-sizing: border-box;
    height: 100vh
  }

  .swiper-slide .itemname {
    line-height: 40px;
  }
</style>
/style>

}
</

style

>
/
style >
