<template>
  <div class="login">
    <scroller class="page-content">
      <div class="wrapper">
        <div class="container">
          <div class="form" ref="form">
            <div style="margin-bottom: 10px">
              <img src="../.././statics/mobile/img/logo.png" alt="" width="150px">
            </div>
            <div class="errorMeg" v-if="error">{{errorMsg}}</div>
            <input type="text" class="fwone" :placeholder="$t('message.Account_name')" v-model.trim="username">
            <input type="password" :placeholder="$t('message.Account_password')" v-model.trim="password">
            <button class="login-button" @click="login">{{$t('message.Login')}}</button>
          </div>
          <div style="height: 30px;width: 100%"></div>
          <div class="footer-btn clearfix"><span @click="forget_password" class="pull-left"
                                                 style="padding-right: 50px;font-size: 12px"> {{$t('message.forget_password')}}</span>
            <span
              class="pull-right" style="padding-left: 50px;font-size: 12px"
              @click="toRegister">{{$t('message.signup')}}</span></div>
          <div style="text-align: left;width: 100%;margin:0 auto ;padding: 20px 0">
            <select style="padding: 8px;outline: none;background:rgba(255,255,255,.9);border: none;border-radius: 2px"
                    v-model="lang">
              <option value="EN">English</option>
              <option value="CN">中文简体</option>
              <option value="TN">中文繁体</option>
            </select>
          </div>
          <div style="color:#fff;padding:30px;" @click="guestLogin">{{$t('message.Visitors_login')}}</div>
        </div>
        <ul class="bg-bubbles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </scroller>
  </div>
</template>
<script>
  import {mapState} from 'vuex';

  export default {
    name: 'login',
    data() {
      return {
        username: '',
        password: '',
        captcha: '',
        error: false,
        errorMsg: "",
        token: null,
        lang: 'CN'
      }
    },
    computed: mapState({
      state: state => state.userInfo,
    }),
    watch: {
      lang: function (val) {
        if (val == 'CN') {
          this.$i18n.locale = 'CN'
          window.localStorage.setItem('lang', 'CN')
        } else if (val == 'EN') {
          this.$i18n.locale = 'EN'
          window.localStorage.setItem('lang', 'EN')
        } else if (val == 'TN') {
          this.$i18n.locale = 'TN'
          window.localStorage.setItem('lang', 'TN')
        } else {
          this.$i18n.locale = 'CN'
          window.localStorage.setItem('lang', 'CN')
        }
        this.$store.commit('SET_LANG', val)
      }
    },
    methods: {
      guestLogin() {
//        let data = "username=lradmin666&password=123456&loginNum=1";
        let data = "username=Bq/visitor&password=123456&loginNum=1";
        this.$api.login(data).then((res) => {
          if (res.code == ERR_OK) { // 登录成功
            this.error = false;
            this.$api.get_user_id().then((r) => { // 获取userid作为登录凭证
              if (r.code == ERR_OK) {
                let userId = r.user.id;
                let personId = r.user.personId;
                this.$store.dispatch('login', {userId, personId});
                let redirect = decodeURIComponent(this.$route.query.redirect || '/');
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
                      this.$api.IS_GUEST().then(response => {
                        if (response.state == '1') {// 游客
                          this.$store.commit('IS_GUEST', true)
                        } else {
                          this.$store.commit('IS_GUEST', false)
                        }
                        if (!this.$api.initWeiXinOpenId(data, redirect)) {
                          this.$router.push({ // 跳到对应页面
                            path: redirect
                          });
                        }
                      })

                    }
                  } else {
                    alert(JSON.stringify(res))
                  }
                })

              } else {
                this.error = true;
                this.errorMsg = '连接失败'
              }
            })
          } else {
            this.error = true;
            this.errorMsg = res.msg
          }
        }).catch(err => console.error(err))
      },
      login() {
        if (this.username == '' || this.password == '') {
          this.error = true
          this.errorMsg = this.$t('message.name_password_empty')
          return
        }
        let data = "username=" + this.username + "&password=" + this.password + "&captcha=" + this.captcha + "&loginNum=1";
        this.$api.login(data).then((res) => {
          if (res.code == ERR_OK) { // 登录成功
            this.error = false;
            this.$api.get_user_id().then((r) => { // 获取userid作为登录凭证
              if (r.code == ERR_OK) {
                let userId = r.user.id;
                let personId = r.user.personId;
                this.$store.dispatch('login', {userId, personId});
                let redirect = decodeURIComponent(this.$route.query.redirect || '/');
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
                      this.$api.IS_GUEST().then(response => {
                        if (response.state == '1') {// 游客
                          this.$store.commit('IS_GUEST', true)
                        } else {
                          this.$store.commit('IS_GUEST', false)
                        }
                        if (!this.$api.initWeiXinOpenId(data, redirect)) {
                          this.$router.push({ // 跳到对应页面
                            path: redirect
                          });
                        }
                      })
                    }
                  } else {
                    alert(JSON.stringify(res))
                  }
                })

              } else {
                this.error = true;
                this.errorMsg = '连接失败'
              }
            })
          } else {
            this.error = true;
            this.errorMsg = res.msg
          }
        }).catch(err => console.error(err))
      },
      back() {
        this.$router.back()
      },
      toRegister() {
        this.$router.push('/register')
      },
      forget_password() {
        this.$router.push('/f_password')
      }
    },
    mounted() {

    },
    activated() {
      console.log('SERVER_BASE_URL', SERVER_BASE_URL)
      let lang = window.localStorage.getItem('lang')
      if (lang && (lang !== 'null' || lang !== 'undefined')) {
        this.lang = lang
      }
    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less" type="text/less">
  .login-button {
    border-radius: 2px !important;
    font-size: 16px !important;
    background-color: white;
  }

  .login-button:active {
    background: rgb(231, 231, 231);
    color: #2698f4;
  }

  .footer-btn {
    width: 100%;
    margin: 0 auto;
    color: #fff;
    font-weight: 600;
    span {
      padding: 2px;
      border-bottom: 2px solid rgba(255, 255, 255, .5);
    }
  }

  .errorMeg {
    background: rgba(254, 0, 13, 0.87);
    color: #fff;
    margin: 10px auto;
    padding: 8px 0;
    border-radius: 2px;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-weight: 300;
  }

  .page-content {
    background: #26a2ff;
    background: -webkit-linear-gradient(top left, #26a2ff 0%, #52d5f4 100%);
    background: -moz-linear-gradient(top left, #26a2ff 0%, #52d5f4 100%);
    background: -o-linear-gradient(top left, #26a2ff 0%, #52d5f4 100%);
    background: linear-gradient(to bottom right, #26a2ff 0%, #52d5f4 100%);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh !important;
    box-sizing: border-box
  }

  .container {
    max-width: 90%;
    margin: 0 auto;
    padding: 40px 0;
    height: 400px;
    text-align: center;
  }

  h1 {
    font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif;
    font-size: 30px;
    transition-duration: 2s;
    transition-timing-function: ease-in-out;
    font-weight: 200;
    transform: translateY(0px);
    color: #fff;
    padding: 0;
  }

  .form {
    padding: 8px 0;
    position: relative;
    z-index: 2;
    transition-duration: 1s;
  }

  .form input {
    appearance: none;
    outline: 0;
    border: none;
    border-bottom: 2px solid rgba(255, 255, 255, 0.4);
    background-color: rgba(255, 255, 255, 0.2);
    width: 100%;
    border-radius: 0;
    padding: 8px 15px;
    margin: 0 auto 10px auto;
    display: block;
    text-align: center;
    font-size: 18px;
    color: white;
    transition-duration: 0.25s;
    font-weight: 300;
    &::-webkit-input-placeholder {
      color: #fafafa !important;
    }
  }

  .form input :hover {
    background-color: rgba(255, 255, 255, 0.4);
  }

  .form input :focus {
    background-color: white;
    width: 300px;
    color: #26a2ff;
  }

  .form button {
    appearance: none;
    outline: 0;
    background-color: white;
    border: 0;
    padding: 8px 15px;
    color: #26a2ff;
    border-radius: 3px;
    width: 100%;
    cursor: pointer;
    font-size: 18px;
    transition-duration: 0.25s;
    background: -webkit-gradient(linear, left top, right top, from(#fff), to(#fafafa));
    background: linear-gradient(90deg, #fff, #fafafa);
    -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
    box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
  }

  .form button :hover {
    background-color: #f5f7f9;
  }

  .bg-bubbles {
    position: absolute;
    width: 100%;
    z-index: 1;
  }

  .bg-bubbles li {
    position: absolute;
    list-style: none;
    margin-right: 10px;
    display: block;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.15);
    bottom: -280px;
    -webkit-animation: square 10s infinite;
    animation: square 10s infinite;
    -webkit-transition-timing-function: linear;
    transition-timing-function: linear;
  }

  .bg-bubbles li:nth-of-type(1) {
    left: 0;
  }

  .bg-bubbles li:nth-of-type(2) {
    left: 20px;
    width: 80px;
    height: 80px;
    animation-delay: 2s;
    animation-duration: 17s;
  }

  .bg-bubbles li:nth-of-type(3) {
    left: 40px;
    animation-delay: 4s;
  }

  .bg-bubbles li:nth-of-type(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    animation-duration: 22s;
    background-color: rgba(255, 255, 255, 0.25);
  }

  .bg-bubbles li:nth-of-type(5) {
    left: 70%;
  }

  .bg-bubbles li:nth-of-type(6) {
    left: 80%;
    width: 10px;
    height: 10px;
    animation-delay: 3s;
    background-color: rgba(255, 255, 255, 0.2);
  }

  .bg-bubbles li:nth-of-type(7) {
    left: 32%;
    width: 15px;
    height: 15px;
    animation-delay: 7s;
  }

  .bg-bubbles li:nth-of-type(8) {
    left: 55%;
    width: 20px;
    height: 20px;
    animation-delay: 15s;
    animation-duration: 40s;
  }

  .bg-bubbles li:nth-of-type(9) {
    left: 25%;
    width: 30px;
    height: 30px;
    animation-delay: 2s;
    animation-duration: 40s;
    background-color: rgba(255, 255, 255, 0.3);
  }

  .bg-bubbles li:nth-of-type(10) {
    left: 90%;
    width: 20px;
    height: 20px;
    animation-delay: 11s;
  }

  @-webkit-keyframes square {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-700px) rotate(600deg);
    }
  }

  @keyframes square {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-700px) rotate(600deg);
    }
  }

</style>
