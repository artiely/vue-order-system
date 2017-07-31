<template>
  <scroll :on-refresh="onRefresh" :on-infinite="onInfinite" class="page-content" >
    <order-item :item="item" v-for="(item,key,index) in orderinfo" ></order-item >
    <div v-if="page >= totalPage" slot="infinite" class="text-center" >没有更多数据</div >
  </scroll >
</template>
<script>
  import Orderitem from './Orderitem.vue'
  export default {
    name:'search-modal',
    data() {
      return {
        showMore: false,
        keywords: '',
        searching: false,
        infiniteCount: 0,
        orderinfo: [],
        page: '1'//默认页
        , totalPage: 1
      }
    },
    methods: {
      getdata(page, done){
        var _this = this;
        if (_this.page > _this.totalPage) {
          console.info('扯完了！');
          return
        }
        axios({
          method: 'get',
          url: '/orderinfo/listVo?&limit=8&page=' + page + '&sidx=&order=asc&orderStateId=1&contractId=1950&startDate=2017-04-19&endDate=2017-05-24&companyId=&on=&yh=&sfzc=false&sfxc=false&sfbx=false',
        }).then(function (r) {
          if (r.data.code == 0) {
            if (page == 1) {
              _this.orderinfo = [];
            }
            var list = _this.orderinfo.concat(r.data.page.list);
            _this.totalPage = r.data.page.totalPage;
            _this.orderinfo = list;

          } else {
            /* 显示一个文字提示，3秒后关闭 */
            $toast.show('系统繁忙...请稍后重试', 3000).then()
          }
          if (done) {
            done(true)
          }
        }).catch(function (error) {
          console.log(error);
        })
      },
      onRefresh(done) {
        this.getdata(1, done)

      },
      onInfinite(done) {
        this.page++;
        this.getdata(this.page, done)
      },
    }
  }
</script>
<style scoped>

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
    /*background: #fff;*/
    margin-bottom: 10px;
    display: table;
    border-top:2px solid rgb(100,210,227);
    box-shadow: 2px 3px 4px rgba(100,100,100,.1);
  }
  .status1{
    border-color: #d5402b;
  }
  .item-header{
    background: #eee;
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
    text-indent:4px;
    padding:5px 0;
    display: table-cell;
    vertical-align: middle;
    font-size: 13px;
  }
  .item-body.nopadding td{
    padding: 0;
  }
</style>
