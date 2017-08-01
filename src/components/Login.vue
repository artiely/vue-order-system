<template >
  <div class="login" >
    <scroller class="page-content" >
      <div class="wrapper" >
        <div class="container" >


          <div class="form" ref="form" >
            <h1 class="elegantshadow" >FWONE</h1 >
            <div class="errorMeg" v-if="error" >{{errorMsg}}</div >
            <input type="text" class="fwone" placeholder="用户名" v-model="username" >
            <input type="password" placeholder="密码" v-model="password" >
            <button id="login-button" @click="login" >登录</button >
          </div >
          <div @click="back" >返回</div >
        </div >

        <ul class="bg-bubbles" >
          <li ></li >
          <li ></li >
          <li ></li >
          <li ></li >
          <li ></li >
          <li ></li >
          <li ></li >
          <li ></li >
          <li ></li >
          <li ></li >
        </ul >
      </div >

    </scroller >
  </div >
</template >
<script >
  import { mapState } from 'vuex';

import axios from 'axios'
  export default {
    name: 'login',
    data () {
      return {
        username: '',
        password: '',
        captcha: '',
        error: false,
        errorMsg: "",
        token: null
      }
    },
    computed: mapState({
      state: state => state.userInfo,
    }),
    /* beforeRouteEnter (to, from, next) {
     //判断路由从哪来
     console.log("从哪来",from.path,"到哪去",to.path)
     next()
     },
     beforeRouteLeave (to, from, next) {
     //判断路由从哪来
     console.log("leave从哪来",from.path,"leave到哪去",to.path)
     next()
     },*/
    methods: {
      login(){

     let data = "username=" + this.username + "&password=" + this.password + "&captcha=" + this.captcha+"&loginNum=1";

         this.$api.login(data).then((res)=>{
          if(res.code==ERR_OK){
              this.error=false,
              this.$api.get_user_id().then((r)=>{
                  if(r.code==ERR_OK){
                    let userId = r.user.id
                          this.$store.dispatch('login', userId);
                          let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                          this.$router.push({
                            path: redirect
                          });
                  }else{
                     this.error=true,
                      this.errorMsg='连接失败'
                  }
              }).catch(err=>{
                  console.error(err)
              })
          }else{
            this.error=true,
            this.errorMsg=res.msg
          }
        }).catch(err=>{
          console.error(err)
        })
      },
      back(){
        this.$router.back()
      }
    },
    mounted(){
      $('input').focus(function () {
        $('form').css({
          'transform': 'translateY(-80px)'
        })
      }).blur(function () {
        $('form').css({
          'transform': 'translateY(0px)'
        })
      })
    }
  }
</script >
<style scoped lang="less" rel="stylesheet/less" type="text/less" >
  .fwone:focus {
    /*transform: translateY(-40px);*/
  }

  .errorMeg {
    background: rgba(254, 0, 13, 0.87);
    color: #fff;
    width: 250px;
    margin: 10px auto;
    padding: 8px 0;
    border-radius: 5px;
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
    box-sizing:border-box
  }

  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 80px 0;
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
    border: 1px solid rgba(255, 255, 255, 0.4);
    background-color: rgba(255, 255, 255, 0.2);
    width: 250px;
    border-radius: 3px;
    padding: 10px 15px;
    margin: 0 auto 10px auto;
    display: block;
    text-align: center;
    font-size: 18px;
    color: white;
    transition-duration: 0.25s;
    font-weight: 300;
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
    padding: 10px 15px;
    color: #26a2ff;
    border-radius: 3px;
    width: 250px;
    cursor: pointer;
    font-size: 18px;
    transition-duration: 0.25s;
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

</style >
