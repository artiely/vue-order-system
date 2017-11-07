<template>
  <div class="reject">
    <div v-if="state==7" class="info-box"> 账号正在审核中，请耐心等待...</div>
    <div v-if="state==8" class="info-box"> 申请被拒绝，请联系公司管理员。</div>
    <a href="javascript:;" @click="checkAccount()" style="display: block;padding: 10px;text-align: center">刷新</a>
  </div>
</template>
<script>
  import { GetQueryString } from '@/utils'
  export default {
    name: 'reject',
    data () {
      return {
        state: ''
      }
    },
    methods:{
      checkAccount(){
        this.state = GetQueryString('state')
        /**
         * 进入页面再判断一下信息是否完整 是否在审核中...
         */
        this.$api.CHECK_ACCOUNT().then(res => { // 判断注册信息是否完善
          if (res.code === 0) {
            if (res.state == 4) { // 不完善
              this.$router.push('/type?state=4')
            } else if (res.state == 7) {
              this.$router.push('/reject?state=7')
              return
            } else if (res.state == 8) {
              this.$router.push('/reject?state=8')
              return
            } else {
              this.$router.push({ // 跳到对应页面
                path: '/login'
              });
            }
          } else {
            alert(JSON.stringify(res))
          }
        })
      }
    },
    activated(){
     this.checkAccount()
    }
  }
</script>
<style scoped lang="less">
  .info-box{
    background: #fff;
    padding: 20px;
    text-align: center;
    font-size: 20px;
    color: #999;
  }


  .help {
    font-size: 10px;
    color: rgba(206, 129, 17, 0.64);
    padding-left: 10px;
  }

  .help.is-danger {
    font-size: 10px;
    color: #f00;
    text-align: left;
    padding-left: 10px;
  }

</style>
