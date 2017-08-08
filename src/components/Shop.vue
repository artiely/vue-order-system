<template>
  <div class="home">
    <mt-header fixed :title="$t('message.Service_introduction')"></mt-header>
    <scroller class="page-content">
      <div class="my-plan">
        <!--<i class="iconfont icon-biezhen"></i>-->
        <div class="entrance assertive">
          <h4><i class="icon ion-ios-flame"></i> {{$t('message.Timely_assistance')}}</h4>
          <!--<p>-->
            <!--&lt;!&ndash;服务时间&ndash;&gt;-->
          <!--<div class="r-t"><label>{{$('message.Appointment_Time')}} :</label>工程师根据客户期望的时间段内到达解决当前问题后即可离开</div>-->
          <!--</p>-->
          <p>
            <!--服务定义-->
          <div class="r-t"><label>{{ $t('message.Service_definition') }}：</label>{{ $t('message.Oncall_des') }}</div>
          </p>
          <mt-button type="primary" size="large" @click.native="clicked1()" class="my-btn">
             {{ $t('message.Go')}}
          </mt-button>
        </div>
      </div>
      <div class="my-plan">
        <div class="entrance energized">
          <h4><i class="icon ion-ios-star"></i> {{$t('message.Residency_service')}}</h4>
          <!--<p>-->
            <!--&lt;!&ndash;服务时间&ndash;&gt;-->
          <!--<div class="r-t"><label>{{$('message.Appointment_Time')}}：</label>工程师根据客户指定某个时间点前到达，根据客户指定某个时间点后离开</div>-->
          <!--</p>-->
          <p>
          <!--服务定义-->
          <div class="r-t"><label>{{ $t('message.Service_definition') }}：</label>
          {{$t('message.MA_des')}}
          </div>
          </p>
          <mt-button type="primary" size="large" @click.native="clicked2()" class="my-btn">
            {{ $t('message.Go')}}
          </mt-button>
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

<style scoped>
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
