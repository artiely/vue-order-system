<template >
  <div class="login" >
    <scroller style="background:#fafafa;height:100vh!important" >
      <div class="userbox" >
        <div class="admin" >
          <div class="nikicon" @click="()=>settingVisible=true" ><img src="../.././statics/mobile/img/logo.png" alt="" >
          </div >
          <div class="useritem" >{{state.person.personName}}</div >
        </div >
        <div class="companyname" >{{state.person.shortName}}</div >
        <div class="msgbox" >
          <div class="msgs" @click="showNotificationList" >
            <div class="msgitem" >{{customerNotificationList.length}}</div >
            <div class="msgitem" >通知</div >

          </div >
          <div class="msgs" @click="showMessage" >
            <div class="msgitem" >0</div >
            <div class="msgitem" >消息</div >
          </div >
        </div >
      </div >
      <div class="flexbox" >
        <div class="item" @click="goAddress" >
          <i class="iconfont icon-coordinates" ></i ><br >
          服务点
        </div >
        <div class="item" @click="goBalance" >
          <i class="iconfont icon-coupons" ></i ><br >
          余额
        </div >
        <div class="item" @click="goComplain" >
          <i class="iconfont icon-shielding" ></i ><br >
          投诉
        </div >
        <div class="item" @click="goUrge" >
          <i class="iconfont icon-prompt" ></i ><br >
          催单
        </div >

      </div >
    </scroller >
    <mt-popup v-model="settingVisible" position="left" style="width: 200px;height: 100%;text-align: left" >
      <mt-cell title="个人信息" is-link @click.native="showUserInfo" ></mt-cell >
      <mt-button type="danger" @click="loginOut" size="large" style="width: 100%;margin: 0 auto;position: absolute;bottom: 10px;" >退出登录</mt-button >
    </mt-popup >
    <mt-popup v-model="notificationListVisible" position="bottom" style="width: 100%;height:200px;text-align: left" >
      <scroller >
        <mt-cell v-for="(item,index) in customerNotificationList" :key="index" :title="item.content" is-link @click.native="jumpToInfo(item)" ></mt-cell >
      </scroller >
    </mt-popup >
  </div >
</template >

<script type="text/ecmascript-6" >
  import { Toast } from 'mint-ui';
  import { mapState } from 'vuex';
  export default {
    name: 'login',
    data () {
      return {
        person: {},
        settingVisible: false,
        customerNotificationList: [],
        notificationListVisible: false
      }
    },
    computed :mapState ({
      state: state => state.userInfo,
    }),
    methods: {
      goBalance(){
        this.$router.push({name: 'balance', path: '/balance'})
      },
      goComplain(){
        this.$router.push({name: 'complain', path: '/complain'})
      },
      goAddress(){
        this.$router.push({name: 'address', path: '/address'})
      },
      goUrge(){
        this.$router.push({name: 'urge', path: '/urge'})
      },
      loginOut(){
        this.$store.commit('LOGOUT')
        this.$router.push({path: '/'});
        console.log('退出成功')
      },
      showUserInfo(){
        Toast('敬请期待');
        this.settingVisible = !this.settingVisible
      },
      getCustomerNotification () {
        var _this = this;
        $.getJSON(localPath+"/customernotification/queryUnreadList", function (r) {
          _this.customerNotificationList = r.customerNotificationList
        });
      },
      showNotificationList(){
        this.notificationListVisible = !this.notificationListVisible
      },
      jumpToInfo(item){
        var _this=this;
        if (item.type == 44) {
          this.$router.push('/address')
        } else if (item.type == 42) {
          let str = item.content;
          var NO = str.substring(str.indexOf("(") + 4, str.indexOf(")"));
         let orderObj={
            name:'order',
            params:{
              orderNum:NO
            }
          };
          this.$router.push(orderObj);
        }
        $.ajax({
          type: "get",
          dataType: "json",
          url: localPath+"/customernotification/read/" + item.tableName + "/"+item.tableId,
          success: function (r) {
            if (r.code == 0) {
              Toast('消息已读');
              _this.getCustomerNotification()
            }
          }
        })
      },
      showMessage(){
        Toast('敬请期待')
      }
    },
    created(){
      var _this = this;
      this.getCustomerNotification();
      this.$store.dispatch('person_info')
    },
    mounted(){

    }
  }
</script >

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
.item .iconfont{
  font-size: 20px;
}
  .nikicon {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    background: #eee;
  }

  .nikicon img {
    width: 90%;
    display: block;
    vertical-align: middle;
    margin: 20px auto;
  }

  .user {
    background: #fafafa;
    height: 100%;
    width: 100%;
    margin: 0;
    font-size: 14px;
  }

  .userbox {
    margin: 20px auto;
    width: 90%;
    background: #fff;
    height: 150px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, .15);
    position: relative;
  }

  .companyname {
    position: absolute;
    top: 30px;
    right: 0px;
    height: 20px;
    line-height: 20px;
    padding: 2px 8px;
    font-size: 13px;
    border-bottom-left-radius: 12px;
    border-top-left-radius: 12px;
    background: #ef4f4f;
    color: #fff;
    max-width: 85%;
    overflow: hidden;
  }

  .admin {
    position: absolute;
    top: 10px;
    left: 0px;
    height: 20px;
    line-height: 20px;
    padding: 2px 8px;
    font-size: 13px;
    display: flex;
  }

  .useritem {
    flex: 1;
    line-height: 60px;
    padding-left: 10px;
    font-size: 14px;
  }

  .msgbox {
    display: flex;
    position: absolute;
    bottom: 20px;
    width: 100%;
  }

  .msgs {
    flex: 1;
  }

  .msgitem {
    flex: 1;
  }
</style >
