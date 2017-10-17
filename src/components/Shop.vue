<template>
  <div class="home">
    <mt-header fixed :title="$t('message.Service_introduction')"></mt-header>
    <scroller class="page-content">
      <div class="my-plan bg1">
        <!--<i class="iconfont icon-biezhen"></i>-->
        <div class="entrance assertive">
          <h4 class="tit"><i class="icon ion-ios-flame"></i> {{$t('message.Timely_assistance')}}</h4>
          <!--<p>-->
            <!--&lt;!&ndash;服务时间&ndash;&gt;-->
          <!--<div class="r-t"><label>{{$('message.Appointment_Time')}} :</label>工程师根据客户期望的时间段内到达解决当前问题后即可离开</div>-->
          <!--</p>-->
          <p>
            <!--服务定义-->
          <div class="r-t">
          <!--<label>{{ $t('message.Service_definition') }}：</label>-->
          {{ $t('message.Oncall_des') }}</div>
          </p>
          <div type="primary" size="large" @click="clicked1()" class="my-btn btnbg">
            <div class="btn-text">{{ $t('message.Go')}}</div>
            <span  class="btn-icon"><i class="iconfont icon-time"></i></span>
          </div>
        </div>
      </div>
      <div class="my-plan bg2">
        <div class="entrance energized">
          <h4 class="tit"><i class="icon ion-ios-star"></i> {{$t('message.Residency_service')}}</h4>
          <!--<p>-->
            <!--&lt;!&ndash;服务时间&ndash;&gt;-->
          <!--<div class="r-t"><label>{{$('message.Appointment_Time')}}：</label>工程师根据客户指定某个时间点前到达，根据客户指定某个时间点后离开</div>-->
          <!--</p>-->
          <p>
          <!--服务定义-->
          <div class="r-t">
          <!--<label>{{ $t('message.Service_definition') }}：</label>-->
          {{$t('message.MA_des')}}
          </div>
          </p>
          <div type="primary" size="large" @click="clicked2()" class="my-btn btnbg">

            <div class="btn-text">{{ $t('message.Go')}}</div>
            <span  class="btn-icon"><i class="iconfont icon-computer"></i></span>
          </div>
        </div>
      </div>
      <div style="height: 80px"></div>
    </scroller>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {}
    },
    methods: {
      clicked1() {
        this.$router.push({
          path: '/oncall'
        })
      },
      clicked2() {
        this.$router.push({
          path: '/ma'
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .bg1{
    background: #00deff;
    background: -webkit-linear-gradient(315deg,#00deff 0,#02caff 56%,#03b5ff 100%);
    background: -o-linear-gradient(315deg,#00deff 0,#02caff 56%,#03b5ff 100%);
    background: linear-gradient(135deg,#00deff 0,#02caff 56%,#03b5ff 100%);
    border-radius: 10px;
  }
  .bg2{
    background: #49e5f3;
    background: -webkit-linear-gradient(315deg,#49e5f3 0,#32e6d6 37%,#1be6b8 100%);
    background: -o-linear-gradient(315deg,#49e5f3 0,#32e6d6 37%,#1be6b8 100%);
    background: linear-gradient(135deg,#49e5f3 0,#32e6d6 37%,#1be6b8 100%);
    border-radius: 10px;
  }
  .btnbg{
    background: #424fff;
    background: -webkit-linear-gradient(232deg,#424fff 0,#338af0 62%,#23c4e1 100%);
    background: -o-linear-gradient(232deg,#424fff 0,#338af0 62%,#23c4e1 100%);
    background: linear-gradient(-142deg,#424fff 0,#338af0 62%,#23c4e1 100%);
    border: none;
    border-radius: 22px!important;
    font-size: 18px;
    height: 41px;
    line-height:41px;
    color: #fff;
    outline: 0;
    overflow: hidden;
    position: relative;
    text-align: center;
    display: flex;
    .btn-text{
      flex: 1;
      padding-left: 60px;
    }
    .btn-icon{
      width: 60px;
      height:41px;
      background: rgba(37,135,180,.8);
      display: inline-block;
      .iconfont{
        font-size: 24px;
      }
    }
  }
  .r-t{
    color: #fff;
  }
  .tit{
    font-size: 18px;
    color: #fff;
  }
  .page-content {
    padding-top: 40px;
    box-sizing: border-box
  }

  .r-t {
    text-align: left;
    font-size: 12px;
  }

  .my-plan label {
    text-align: left;
    color: #26a2ff;
  }

  .my-plan p {
    display: flex;
  }

  .home {
    margin: 0;
  }

  h4 {
    margin: 8px;
  }

  p {
    margin: 0
  }

  .my-plan {
    line-height: 24px;
    font-size: 14px;
    margin: 20px auto;
    padding: 10px;
    width: 90%;
    box-shadow: 0px 5px 30px rgba(0, 0, 0, .2);
  }

  .my-btn {
    border-radius: 0;
  }
</style>
