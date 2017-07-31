<template >
  <div id="app" >
    <!--<transition name="slide-fade" mode="out-in"  appear>-->
    <router-view  ></router-view >
      <!--</transition>-->
  </div >
</template >

<script >

  export default {

    name: 'app',
    data(){
      return {
      }

    },
    watch: {

    },
    created(){
    },
    mounted(){

    }
  }
</script >

<style >
  .cell-swipe .mint-cell-wrapper{
    background: none !important;
  }
  .slide-fade-enter-active {
    transition: all .1s ease;
  }
  .slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-active {
    transform: translateX(-100%);
    /*opacity: 0;*/
  }
  .word-wrap
  {
    word-wrap:break-word;
  }
  textarea{
    width: 95%;
    margin: 0 auto;
    display: block;
    border: 1px solid #eee;
    outline: none;
  }
  .icon-zanwushuju{
    font-size: 100px;
    color: #ddd;
  }
  a {
    color: #26a2ff;
  }

  .mu-dialog {
    width: 310px !important;
  }

  .flexbox {
    display: flex;
    width: 90%;
    margin: 20px auto;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }

  .item {
    flex: 1;
    padding: 5px;
  }

  .an_order {
    width: 100%;
    float: right;
    background: #ea5a49;
    color: #fff
  }

  .gray {
    background: #ddd !important;
  }

  .mint-searchbar {
    padding: 6px;
    background-color: #eee
  }

  .b_btn {
    width: 100%;
    height: 40px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    line-height: 40px;
    text-align: center;

  }

  header {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  }

  .mint-searchbar-inner {
    padding: 0;
  }

  .mint-tab-item-icon .iconfont {
    font-size: 24px;
    line-height: 20px;
  }

  body {
    margin: 0;
    font-family: '-apple-system', "Helvetica Neue", "Roboto", "Segoe UI", sans-serif;
  }

  .mint-tabbar {
    background-image: -webkit-linear-gradient(top, #fafafa, #fafafa 50%, transparent 50%);
    background-image: linear-gradient(180deg, #fafafa, #fafafa 50%, transparent 50%);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  }

  .my-border-bottom {
    background-image: -webkit-linear-gradient(bottom, #eee, #eee 50%, transparent 0%);
    background-image: linear-gradient(180deg, #eee, #eee 50%, transparent 0%);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.15);
  }

  .mint-tab-item-icon {
    margin: 0 auto;
  }

  .mint-tab-item {
    padding: 2px 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0;
  }

  .my-cell .mint-cell-title {
    font-size: 14px;
  }

  .my-cell .mint-field-core {
    font-size: 14px;
  }

  .mint-cell-wrapper {
    font-size: 14px;
  }

  .von-button-bar {
    margin: 10px 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 100%;

  }

  .button.button-assertive.button-outline {
    border-color: #ea5a49;
    background: transparent;
    color: #ea5a49;
    border-style: solid;
  }

  .button {
    font-size: 12px;
    line-height: 28px;
    min-height: 30px;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display: block;
    overflow: hidden;
    padding: 0 16px;
    width: 0;
    border-width: 1px 0px 1px 1px;
    border-radius: 0;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-color: #ea5a49;
    background: transparent;
    color: #ea5a49;

  }

  .button.button-assertive {
    border-color: transparent;
    background-color: #ea5a49;
    color: #fff;
  }

  .button.button-assertive.button-outline {
    border-color: #ea5a49;
    background: transparent;
    color: #ea5a49;
  }

  .button:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  .button-small{
    padding: 0!important;
  }
  .button:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .textover {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .rating{
    line-height:35px;
  }
  .rating .text{
    vertical-align: top;
    padding: 2px 4px;
    border-radius: 10px;
  }
  .red {
    color: #dd4b39
  }

  .green {
    color: #1ab394
  }

  .blue {
    color: #26a2ff;
  }

  .yellow {
    color: #FFBD17;
  }
  .redbg {
    background: #dd4b39;
    color: #fff;
  }

  .greenbg {
    background: #1ab394;
    color: #fff;
  }

  .bluebg {
    background: #26a2ff;
    color: #fff;
  }

  .yellowbg {
    background: #FFBD17;
    color: #fff;
  }
</style >
