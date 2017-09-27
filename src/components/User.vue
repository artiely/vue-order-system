<template>
  <div class="user">
    <scroller style="padding-bottom: 80px">
      <div class="userbox">
        <div class="nikicon" @click="()=>settingVisible=true"><img src="../.././statics/mobile/img/logo.png" alt="">
        </div>
        <div class="admin">
          <div class="useritem admin-item"><span class="top-icon"><i class="iconfont icon-mine"></i></span>
            {{userInfo.personName}}
          </div>
          <div class="companyname admin-item" v-if="isCompany"><span class="top-icon"><i class="iconfont icon-homepage"></i></span>
            {{userInfo.companyName}}
          </div>
        </div>
      </div>
      <div class="user-cell" @click="showNotificationList">
        <div class="left-icon">
          <i class="iconfont icon-mail"></i>
        </div>
        <div class="right-des">
          {{$t('message.Notifications')}}
          <span class="num" v-if="customerNotificationList.length>0">{{customerNotificationList.length}}</span>
        </div>
        <div class="right-icon">
          <i class="iconfont icon-enter"></i>
        </div>
      </div>
      <div class="user-cell" @click="goAddress">
        <div class="left-icon">
          <i class="iconfont icon-coordinates"></i>
        </div>
        <div class="right-des">
          {{$t('message.Address')}}
        </div>
        <div class="right-icon">
          <i class="iconfont icon-enter"></i>
        </div>
      </div>


      <div class="user-cell" @click="goBalance">
        <div class="left-icon">
          <i class="iconfont icon-transaction_fill"></i>
        </div>
        <div class="right-des">
          {{$t('message.Payment')}}
        </div>
        <div class="right-icon">
          <i class="iconfont icon-enter"></i>
        </div>
      </div>

      <div class="user-cell" @click="goCoupons">
        <div class="left-icon">
          <i class="iconfont icon-coupons"></i>
        </div>
        <div class="right-des">
          我的优惠券
        </div>
        <div class="right-icon">
          <i class="iconfont icon-enter"></i>
        </div>
      </div>

      <div class="user-cell" @click="goComplain">
        <div class="left-icon">
          <i class="iconfont icon-shielding"></i>
        </div>
        <div class="right-des">
          {{$t('message.complaint')}}
        </div>
        <div class="right-icon">
          <i class="iconfont icon-enter"></i>
        </div>
      </div>

      <div class="user-cell" @click="goUrge">
        <div class="left-icon">
          <i class="iconfont icon-prompt"></i>
        </div>
        <div class="right-des">
          {{$t('message.Reminder')}}
        </div>
        <div class="right-icon">
          <i class="iconfont icon-enter"></i>
        </div>
      </div>

      <div class="user-cell" @click="showUserInfo">
        <div class="left-icon">
          <i class="iconfont icon-addressbook"></i>
        </div>
        <div class="right-des">
          {{$t('message.Personal_information')}}
        </div>
        <div class="right-icon">
          <i class="iconfont icon-enter"></i>
        </div>
      </div>

      <div class="user-cell" @click="switchAccount">
        <div class="left-icon">
          <i class="iconfont icon-group"></i>
        </div>
        <div class="right-des">
          <!--{{$t('message.Account_Management')}}-->
          {{$t('message.Account_Management')}}
        </div>
        <div class="right-icon">
          <i class="iconfont icon-enter"></i>
        </div>
      </div>

      <div style="height: 100px;"></div>

    </scroller>
    <!--<mt-popup v-model="settingVisible" position="left" style="width: 200px;height: 100%;text-align: left">-->
    <!--<mt-cell :title="$t('message.Personal_information')" is-link @click.native="showUserInfo"></mt-cell>-->
    <!--<mt-button type="danger" @click="loginOut" size="large"-->
    <!--style="width: 100%;margin: 0 auto;position: absolute;bottom: 10px;">{{$t('message.Logout')}}-->
    <!--</mt-button>-->
    <!--</mt-popup>-->
    <mt-popup v-model="notificationListVisible" position="bottom" style="width: 100%;height:200px;text-align: left"
              v-if="customerNotificationList.length>0">
      <scroller>
        <mt-cell v-for="(item,index) in customerNotificationList" :key="index" :title="item.content" is-link
                 @click.native="jumpToInfo(item)"></mt-cell>
      </scroller>
    </mt-popup>
    <!--账号切换-->
    <mt-popup
      v-model="switchVisible"
      position="left"
      style="width: 70%;height: 100%">
      <div v-if="accountList.length>0">
        <div class="bluebg" style="color: #fff;padding: 6px">{{$t('message.Switchable_account')}}</div>
        <div class="greenbg account-btn" :class="{yellowbg:item.id==userId}" v-for="item in accountList"
             @click="changeAccount(item)">
          {{item.userName}}
        </div>
      </div>
      <div v-else class="bluebg" style="color: #fff;padding: 6px">{{$t('message.No_switch_account')}}</div>
      <div type="danger" @click="loginOut" size="large"
           style="width: 95%;margin: 40px auto;border-radius: 22px;padding: 8px" class="redbg">{{$t('message.Logout')}}
      </div>
    </mt-popup>
    <!--账号切换/-->
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  export default {
    name: 'user',
    data () {
      return {
        person: {},
        userId: 0,
        settingVisible: false,
        customerNotificationList: [],
        notificationListVisible: false,
        userInfo: {},
        switchVisible: false,
        accountList: [],
        isCompany:true
      }
    },
    computed: mapState({
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
      goCoupons(){
        this.$router.push('/coupons')
      },
      goUrge(){
        this.$router.push({name: 'urge', path: '/urge'})
      },
      loginOut(){
        this.$store.commit('LOGOUT')
        this.$api.LOGOUT()
        this.$router.push({path: '/shop', name: 'shop'});
        this.settingVisible = false
      },
      showUserInfo(){
        this.$router.push('/info?edit=1')
      },
      getCustomerNotification () {
        this.$api.get_notification_list().then(res => {
          if (res.code == ERR_OK) {
            this.customerNotificationList = res.customerNotificationList
          } else {
            alert(`获取消息`+res.msg)
          }
        })
      },
      showNotificationList(){
        this.notificationListVisible = !this.notificationListVisible
      },
      jumpToInfo(item){
        if (item.type == 44) {
          this.$router.push('/address')
        } else if (item.type == 42) {
          let str = item.content;
          var NO = str.substring(str.indexOf("(") + 4, str.indexOf(")"));
          let orderObj = {
            name: 'order',
            params: {
              orderNum: NO
            }
          };
          this.$router.push(orderObj);
        }
        this.$api.read_notification({tableName: item.tableName, tableId: item.tableId}).then(res => {
          if (res.code == ERR_OK) {
            this.$toast('消息已读');
            this.getCustomerNotification()
          } else {
            alert(`消息`+res.msg)
          }
        }).catch(err => console.error(err))
      },
      showMessage(){
//        Toast('敬请期待')
      },
      switchAccount () {
        this.switchVisible = true
      },
      changeAccount (item){
        if (item.id == this.userId)return
        this.$api.SWITCH_ACCOUNT({id: item.id}).then(res => {
          if (res.code == ERR_OK) {
            console.log('账号切换成功')
            this.switchVisible = false
            this.$store.dispatch('login', {userId: item.id});
            let url = window.location.href
            url = url.replace('user', 'index')
//            window.location.href = url
            window.location.reload()
          }else{
            alert(`账号切换`+JSON.stringify(res))
          }
        })
      },
      getIds(){
        this.$api.get_user_id().then((r) => { // 获取userid作为登录凭证
          if (r.code == ERR_OK) {
            let userId = r.user.id;
            this.userId = userId
            let personId = r.user.personId;
            this.$store.dispatch('login', {userId, personId});
            this.getPersonInfo()
          } else {
            alert(`登录`+JSON.stringify(res))
          }
        })
      },
      getAccountList () {
        this.$api.SHOW_SWITCH_ACCOUNT().then(res => {
          if (res.code === 0) {
            this.accountList = res.switchAccount
          } else {
            alert(`账号列表`+JSON.stringify(res))
          }
        })
      },
      getPersonInfo(){
        this.$api.get_person_info({personId: this.state.personId}).then(res => {
          if (res.code == ERR_OK) {
            this.userInfo = res.person
          }
        }).catch(err => console.error(err))
      },
      checkAccountType(){
        // 检查账号类型，是个人还是企业
        this.$api.CHECK_ACCOUNT_TYPE().then(res => {
          if (res.code == 0) {
            if (res.state == 2) {
              this.isCompany = true
            } else {
              this.isCompany = false
            }
          }else{
            alert(`获取账号类型出错`+JSON.stringify(res))
          }
        })
      }
    },
    created(){

    },
    activated(){
      this.getCustomerNotification()
      this.getIds()
      this.getAccountList()
      this.checkAccountType()
    },
    mounted(){

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .user{
    height:100vh;
  }
  .account-btn {
    width: 80%;
    margin: 8px auto;
    border-radius: 22px;
    padding: 6px;
    box-sizing: border-box;
  }

  .user-cell {
    display: flex;
    width: 95%;
    margin: 0 auto;
    padding: 0px 6px;
    box-sizing: border-box;
    height: 46px;
    line-height: 46px;
    background: #fff;
    margin-bottom: 1px;
    .left-icon {
      width: 30px;
      text-align: left;
      color: #ffbd7e;
      .iconfont {
        font-size: 20px;
      }
    }
    .right-des {
      color: #555;
      flex: 1;
      text-align: left;
      .num {
        position: relative;
        top: 12px;
        float: right;
        height: 18px;
        min-width: 18px;
        text-align: center;
        line-height: 1;
        padding: 2px;
        background: #fd3fb3;
        background: -webkit-linear-gradient(315deg, #fd3fb3 0, #fd3f81 30%, #fd3e4f 79%);
        background: -o-linear-gradient(315deg, #fd3fb3 0, #fd3f81 30%, #fd3e4f 79%);
        background: linear-gradient(135deg, #fd3fb3 0, #fd3f81 30%, #fd3e4f 79%);
        color: #fff;
        border-radius: 50%;
      }
    }
    .right-icon {
      text-align: right;
      width: 20px;
      color: #eee;
    }
  }

  .item .iconfont {
    font-size: 20px;
  }

  .item {
    font-size: 14px;
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
    width: 95%;
    background: #fff;
    padding: 8px 6px;
    box-shadow: 0 2px 10px rgba(3, 5, 200, .10);
    position: relative;
    display: flex;
    .admin-item {
      height: 30px;
      line-height: 30px;
    }
    .top-icon {
      color: #ffbd7e;
      .iconfont {
        font-size: 18px;
        position: relative;
        top: 2px;
      }
    }
    .nikicon {
      width: 60px;
      height: 60px;
      border-radius: 100%;
      background: #eee;
      img {
        width: 90%;
        display: block;
        vertical-align: middle;
        margin: 20px auto;
      }
    }
    .admin {
      text-align: left;
      flex: 1;
      left: 0px;
      padding: 2px 8px;
      font-size: 13px;
    }
  }

  .msgbox {
    display: flex;
    position: absolute;
    bottom: 20px;
    width: 100%;
  }

  .msgs {
    flex: 1;
    font-size: 14px;
  }

  .msgitem {
    flex: 1;
  }
</style>
