<template>
  <div id="app">
    <transition :name="transitionName" appear>
      <keep-alive>
        <router-view class="RouterView"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'app',
    data(){
      return {
        transitionName: 'slide-left'
      }
    },
    watch: {
      '$route': {
        handler(val, oval) {
          let isBack = this.$router.isBack;
          if (isBack) {
            this.transitionName = 'slide-right'
            if (val.path == '/login') {
              this.$router.push('/index')
            }
          } else {
            this.transitionName = 'slide-left'
          }
          this.$router.isBack = false
        }
      },
    },
  }
</script>
<style lang="less">
  #app {

  .is-textarea .mint-cell-title {
    align-self: start;
    padding-right: 20px
  }

  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #999;
  }

  input:-moz-placeholder, textarea:-moz-placeholder {
    color: #999;
  }

  input::-moz-placeholder, textarea::-moz-placeholder {
    color: #999;
  }

  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color: #999;
  }

  textarea {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

  .mint-navbar .mint-tab-item.is-selected {
    margin-bottom: 0;
  }

  .RouterView {
    background: #f3f9fd;
  }

  .mint-header {
    background: #00deff;
    background: -webkit-linear-gradient(90deg, #00deff 0, #02caff 56%, #03b5ff 100%);
    background: -o-linear-gradient(90deg, #00deff 0, #02caff 56%, #03b5ff 100%);
    background: linear-gradient(90deg, #00deff 0, #02caff 56%, #03b5ff 100%);
    box-shadow: 0 1px 3px rgba(3, 81, 55, .5);
  }

  .mu-text-field {
    width: 100%;
    padding-left: 10px;
  }

  .mu-text-field.error .mu-text-field-help {
    padding-left: 10px !important;
  }
  .mu-text-field-line{
    background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 30%, transparent 50%);
    background-image: linear-gradient(0deg, #d9d9d9, #d9d9d9 30%, transparent 50%);
    background-size: 150% 1px;
    background-repeat: no-repeat;
    background-position: bottom;
    background-color: white;
  }

  .border-bottom {
    background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 30%, transparent 50%);
    background-image: linear-gradient(0deg, #d9d9d9, #d9d9d9 30%, transparent 50%);
    background-size: 150% 1px;
    background-repeat: no-repeat;
    background-position: bottom;
  }

  .border-top {
    background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 30%, transparent 50%);
    background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 30%, transparent 50%);
    background-size: 150% 1px;
    background-repeat: no-repeat;
    background-position: top;
  }

  .border-top-pad {
    background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 30%, transparent 50%);
    background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 30%, transparent 50%);
    background-size: calc(100%-6px) 1px;
    background-repeat: no-repeat;
    background-position: 10px top;
  }
  .no-data-text{
    font-size: 14px;
  }
  }
  body{
    font-size: 14px;
    background: #f3f9fd ;
  }
  .star{
    -webkit-transform:scale(.7,.7);
    -moz-transform:scale(.7,.7);
  }
  .mu-day-button-bg,.mu-date-display{
    background-color: rgb(38, 162, 255)!important;
  }
  .mu-flat-button-label{
    color: rgb(38, 162, 255)
  }
  .button.button-assertive{
    background-color:rgb(38, 162, 255)!important;
  }
  .button.button-assertive.button-outline{
    border-color: rgb(38, 162, 255)!important;
    background-color: transparent!important;
    color: rgb(38, 162, 255)!important;
  }
  .span {
    font-size: 12px;
    padding: 2px 4px;
    border-radius: 4px;
  }
  .text-gray{
    color:#999
  }
  .mint-radiolist .mint-cell{
    min-height: 35px;
    font-size: 13px;
  }
  .mint-radiolist .mint-radio-label{
    line-height:30px
  }
  .mint-radio.is-right{
    padding-top:5px
  }
  .mint-checklist .mint-cell{
    min-height: 35px;
  }
  .mint-radiolist .mint-cell:last-child{
    background: white!important;
  }
  .my-cell2  .mint-cell-title{
    text-align:left;padding-left:20px
  }
  .title-box {
    min-height: 24px;
    line-height: 24px;
    padding-left:10px;
    background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 30%, transparent 50%);
    background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 30%, transparent 50%);
    background-size: 150% 1px;
    background-repeat: no-repeat;
    background-position: top;
    background-color: white;
  }
</style>
