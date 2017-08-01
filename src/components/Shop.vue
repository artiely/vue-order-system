<template>
  <div class="home">
    <mt-header fixed title="预约服务"></mt-header>
    <div class="page-content">
      <div class="my-plan">
        <!--<i class="iconfont icon-biezhen"></i>-->
        <div class="entrance assertive"><h4><i class="icon ion-ios-flame"></i>及时雨（Oncall/包月）</h4>
          <p> <div class="r-t"><label>服务时间 :</label>工程师根据客户期望的时间段内到达解决当前问题后即可离开</div></p>
          <p><div class="r-t"><label>服务定义：</label>根据客户期望的时间段，为客户解决某问题，解决完毕后离开</div>
          </p>
            <mt-button  type="primary" size="large" @click.native="clicked1()" class="my-btn">
              前往
            </mt-button>
        </div>
      </div>
      <div class="my-plan">
        <div class="entrance energized"><h4><i class="icon ion-ios-star"></i>候鸟（驻场）</h4>
          <p><div class="r-t"><label>服务时间：</label>工程师根据客户指定某个时间点前到达，根据客户指定某个时间点后离开</div>
          </p>
          <p><div class="r-t"><label>服务定义：</label>根据客户定义上下班时间，无论是否有问题发生均在现场待命。</div>
          </p>
            <mt-button  type="primary" size="large" @click.native="clicked2()"  class="my-btn">
              前往
            </mt-button>
        </div>
      </div>
      <div style="height: 80px"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
    }
  },
  methods:{
    clicked1(){
      this.$router.push({ path: '/oncall' })
    },
    clicked2(){
      this.$router.push({ path: '/ma' })
    }
  }
}
</script>
<style scoped>
  .page-content{
    padding-top: 40px;
    box-sizing:border-box
  }
  .r-t{
    text-align: left;
    font-size: 12px;
  }
  .my-plan label{
    text-align: left;
    color: #26a2ff;
  }
  .my-plan p{
    display: flex;
  }
  .home{
    margin: 0;
  }
  h4{
    margin: 8px;
  }
  p{margin: 0}

  .my-plan{
    line-height:24px;
    font-size: 14px;
    margin: 20px auto;
    padding:10px;
    width: 90%;
    box-shadow: 0px 5px 30px rgba(0,0,0,.2);
  }
  .my-btn{
    border-radius: 0;
  }

</style>
