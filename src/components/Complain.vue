<template>
  <div class="balance">
    <mt-header title="我的投诉" fixed style="z-index: 9;">
      <mt-button icon="back" @click="back" slot="left">返回</mt-button>
    </mt-header>
    <mt-navbar v-model="selected" fixed style="top: 40px;">
      <mt-tab-item id="1">待受理
        <mt-badge type="error" size="small">{{count[0]}}</mt-badge>
      </mt-tab-item>
      <mt-tab-item id="2">已受理
        <mt-badge type="success" size="small">{{count[1]}}</mt-badge>
      </mt-tab-item>
      <mt-tab-item id="3">已完成
        <mt-badge type="primary" size="small">{{count[2]}}</mt-badge>
      </mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <scroller :on-infinite="onInfinite" :on-refresh="onRefresh" class="page-content">
      <mt-tab-container v-model="selected" class="content">
        <mt-tab-container-item id="1" class="container">
          <div v-if="dataList1.length==0" class="noData"><i class="iconfont icon-zanwushuju"></i></div>
          <div class="cell" v-for="(item,index) in dataList1" :key="item.callId">
            <div class="cellTit" @click="showOrderDetail({id:item.callId,oid:item.orderNumber})">
              <div class="oNum">{{item.orderNumber}}</div>
              <div class="pull-left"><i class="iconfont icon-enter"></i></div>
            </div>
            <div>
            </div>
            <div @click="showComplainDetail(index)">
              <div class="cellBody">
                <div class="td1">状态</div>
                <div class="td2"><span v-if="item.status==0" class="span redbg ">待受理</span>
                  <span v-if="item.status==1" class="span yellowbg">受理中</span>
                  <span v-if="item.status==2" class="span greenbg">已受理</span>
                  <span v-if="item.status==3" class="span bluebg">已完成</span></div>
              </div>
              <div class="cellBody">
                <div class="td1">投诉人</div>
                <div class="td2 textover">
                  {{item.createPersonname}}@ {{item.createCompanyShortName}}
                </div>
              </div>
              <div class="cellBody">
                <div class="td1">投诉内容</div>
                <div class="td2 textover">{{item.complainDesc}}</div>
              </div>
              <div class="cellBody">
                <div class="td1">投诉时间</div>
                <div class="td2 textover">{{item.createDate}}</div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2" class="container">
          <div v-if="dataList2.length==0" class="noData"><i class="iconfont icon-zanwushuju"></i></div>
          <div class="cell" v-for="(item,index) in dataList2" :key="item.callId">
            <div class="cellTit" @click="showOrderDetail({id:item.callId,oid:item.orderNumber})">
              <div class="oNum">{{item.orderNumber}}</div>
              <div class="pull-left"><i class="iconfont icon-enter"></i></div>
            </div>
            <div>
            </div>
            <div class="cellBody">
              <div class="td1">状态</div>
              <div class="td2"><span v-if="item.status==0" class="span redbg ">待受理</span>
                <span v-if="item.status==1" class="span yellowbg">受理中</span>
                <span v-if="item.status==2" class="span greenbg">已受理</span>
                <span v-if="item.status==3" class="span bluebg">已完成</span></div>
            </div>
            <div @click="showComplainDetail(index)">
              <div class="cellBody">
                <div class="td1">投诉人</div>
                <div class="td2 textover">
                  {{item.createPersonname}}@ {{item.createCompanyShortName}}
                </div>
              </div>
              <div class="cellBody">
                <div class="td1">投诉内容</div>
                <div class="td2 textover">{{item.complainDesc}}</div>
              </div>
              <div class="cellBody">
                <div class="td1">投诉时间</div>
                <div class="td2 textover">{{item.createDate}}</div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3" class="container">
          <div v-if="dataList3.length==0" class="noData"><i class="iconfont icon-zanwushuju"></i></div>
          <div class="cell" v-for="(item,index) in dataList3" :key="item.callId">
            <div class="cellTit" @click="showOrderDetail({id:item.callId,oid:item.orderNumber})">
              <div class="oNum">{{item.orderNumber}}</div>
              <div class="pull-left"><i class="iconfont icon-enter"></i></div>
            </div>
            <div>
            </div>
            <div @click="showComplainDetail(index)">
              <div class="cellBody">
                <div class="td1">状态</div>
                <div class="td2"><span v-if="item.status==0" class="span redbg ">待受理</span>
                  <span v-if="item.status==1" class="span yellowbg">受理中</span>
                  <span v-if="item.status==2" class="span greenbg">已受理</span>
                  <span v-if="item.status==3" class="span bluebg">已完成</span></div>
              </div>
              <div class="cellBody">
                <div class="td1">投诉人</div>
                <div class="td2 textover">
                  {{item.createPersonname}}@ {{item.createCompanyShortName}}
                </div>
              </div>
              <div class="cellBody">
                <div class="td1">投诉内容</div>
                <div class="td2 textover">{{item.complainDesc}}</div>
              </div>
              <div class="cellBody">
                <div class="td1">投诉时间</div>
                <div class="td2 textover">{{item.createDate}}</div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </scroller>
    <mt-popup v-model="complainDetail" position="right" style="width: 100%;height: 100%;font-size: 14px">
      <mt-header title="详情" fixed style="z-index: 9;">
        <mt-button icon="back" @click="showComplainDetail" slot="left">返回</mt-button>
      </mt-header>
      <scroller class="detail-content">
        <div>投诉主体-
          <span v-if="detailData.contentId">
            <span v-if="detailData.contentId==1">响应不及时</span>
            <span v-if="detailData.contentId==2">工程师解决能力低</span>
            <span v-if="detailData.contentId==3">工程师态度问题</span>
            <span v-if="detailData.contentId==4">工程师更换频繁</span>
            <span v-if="detailData.contentId==5">其他</span>
          </span>
        </div>
        <div class="ts-tit">投诉信息</div>
        <div>投诉人： {{detailData.createPersonname}} @{{detailData.createCompanyShortName}}</div>
        <div>投诉时间：{{detailData.createDate}}</div>
        <div>工单编号：{{detailData.orderNumber}}</div>
        <div>投诉对象：
          <span v-if="complainTargetObj[0]==1">工程师</span>
          <span v-if="complainTargetObj[1]==1">服务台</span>
          <span v-if="complainTargetObj[2]==1">其他</span>
        </div>
        <div>投诉内容：
          <div v-html="detailData.complainDesc"></div>
        </div>
        <div class="ts-tit">处理结果</div>
        <div v-if="selected==1">
          您的投诉正在受理中...请稍等...
        </div>
        <div v-if="selected>1">
          <div>处理人：{{detailData.processPersonname}}</div>
          <div>处理时间：{{detailData.processDate}}</div>
          <div>处理回复：
            <div v-html="detailData.processNotes"></div>
          </div>
          <div class="ts-tit">评价</div>
          <div>请您对本次处理结果进行评价</div>

          <div class="rating">
            <star-rating :star-size="30" v-model="detailData.rating" :show-rating="false" :inline="true"></star-rating>
            <span v-if="detailData.rating==0" class="text ">未评价</span>
            <span v-if="detailData.rating==1" class="text redbg">服务待跟进</span>
            <span v-if="detailData.rating==2" class="text yellowbg">不满意</span>
            <span v-if="detailData.rating==3" class="text bluebg">一般</span>
            <span v-if="detailData.rating==4" class="text bluebg">满意</span>
            <span v-if="detailData.rating==5" class="text greenbg">非常满意</span>
          </div>
        </div>
        <div style="height: 80px"></div>
      </scroller>
    </mt-popup>
  </div>
</template>
<script type="text/ecmascript-6">
  import {Toast} from 'mint-ui';

  export default {
    name: 'balance',
    data () {
      return {
        complainDetail: false,
        detailData: {},
        complainTargetObj: [],
        rating: 0,
        selected: '1',
        dataList1: [],
        dataList2: [],
        dataList3: [],
        state1: 0, //待受理
        state2: 2,//已受理
        state3: 3, //已完成
        page1: 1,
        page2: 1,
        page3: 1,
        count: [0, 0, 0],
        callId: ''
      }
    },
    methods: {
      back() {
        this.$router.back()
      },
      showOrderDetail(parames){
        this.$store.dispatch('get_order_number', {id: parames.id, oid: parames.oid})
        this.$router.push({path: '/orderdetail'})
      },
      showComplainDetail(index){
        console.log(this.dataList1)
        this.complainDetail = !this.complainDetail;
        if (this.complainDetail == true) {
          if (this.selected == 1) {
            this.detailData = this.dataList1[index]
          } else if (this.selected == 2) {
            this.detailData = this.dataList2[index]
          } else if (this.selected == 3) {
            this.detailData = this.dataList3[index]
          }
          let tmp = JSON.parse(this.detailData.complainTarget)
          this.complainTargetObj = tmp
        }
      },
      onRefresh(done){
       this._init(() => done(true))
      },
      onInfinite(done){
        if (this.selected == 1) {
          this.page1++
          let params = {page: this.page1, limit: 10, status: this.state1}
          this.get_complain(params, () => done(true))
        } else if (this.selected == 2) {
          this.page2++
          let params = {page: this.page2, limit: 10, status: this.state2}
          this.get_complain(params, () => done(true))
        } else if (this.selected == 3) {
          this.page3++
          let params = {page: this.page3, limit: 10, status: this.state3}
          this.get_complain(params, () => done(true))
        }
      },
      get_complain(params, cb){
        this.$api.get_complain_list(params).then(res => {
          if (params.status == this.state1) {
            if (params.page == 1) {
              this.dataList1 = res.list
            } else {
              this.dataList1 = this.dataList1.concat(res.list)
            }

          } else if (params.status == this.state2) {
            if (params.page == 1) {
              this.dataList2 = res.list
            } else {
              this.dataList2 = this.dataList2.concat(res.list)
            }

          } else {
            if (params.page == 1) {
              this.dataList3 = res.list
            } else {
              this.dataList3 = this.dataList3.concat(res.list)
            }
          }
          if (cb && typeof cb == 'function') {
            cb()
          }
        }).catch(err => console.error(err))
      },
      get_count(){
        this.$api.get_complain_count().then(res => {
          this.count = res
        })
      },
      _init(cb){
        this.get_complain({page: 1, limit: 10, status: this.state1},cb)
        this.get_complain({page: 1, limit: 10, status: this.state2},cb)
        this.get_complain({page: 1, limit: 10, status: this.state3},cb)
        this.get_count()
      }
    },
    watch: {
      'detailData.rating': {
        handler(val, oval){
          let _this = this;
          if (val != oval && val > 0) {
            let data = {
              id: this.detailData.id, rating: this.detailData.rating, status: 3
            }
            this.$api.update_complain_rating(data).then(res => {
              if (res.code == ERR_OK) {
                Toast(r.msg)
                this._init()
              } else {
                alert(res.msg)
              }
            }).catch(err => console.log(err))
          }
        }
      }
    },
    created(){
      this._init()
    },
    mounted(){

    }
  }


</script>
<style scoped>
  .ts-tit {
    padding: 6px 0;
    background: #fafafa;
    color: #26a2ff;
    margin-top: 10px;
  }

  .detail-content {
    text-align: left;
    padding: 40px 10px;
  }

  .page-content {
    padding-top: 80px;
  }

  .td1 {
    text-align: left;
    color: #333;
    font-size: 13px;
    font-weight: 500;
    width: 60px;
  }

  .td2 {
    text-align: right;
    color: #999;
    font-size: 13px;
    flex: 1;
  }

  .cell {
    text-align: left;
    padding: 5px;
    width: 100%;
    border-bottom: 1px dashed #eee;
  }

  .cellTit {
    display: flex;
    background: #f8f8f8;
    padding: 4px;
    line-height:30px;
  }

  .cellBody {
    display: flex;
    padding: 4px;
  }

  .span {
    font-size: 12px;
    padding: 2px 4px;
    border-radius: 10px;
    float: right;
  }

  .oNum {
    flex: 1;
  }

  .pull-left {
    width: 50px;
    text-align: right;
  }

  .mint-navbar .mint-tab-item {
    padding: 10px 0;
  }

</style>
