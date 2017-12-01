<template>
  <div class="login" style="background: white">
    <div class="page-content">
      <div class="wrapper">
        <div style="padding: 10px;text-align: center">{{$t('message.retrieve_password')}}</div>
        <div style="background:#fff;text-align: left" v-if="step1" class="form-content">
          <!--手机号-->
          <div>
            <mu-text-field :hintText="$t('message.Phone_number')" v-model="form.phone" type="number"
                           name="phone" class="require"
                           fullWidth/>
            <div>
              <mu-text-field :hintText="$t('message.Msg_code')" v-model="form.code" type="text"
                             name="code" class="require"
                             style="width: 60%"/>
              <span
                class="countBtn"
                @click="getMsgCode(form.phone)" v-if="count==60">{{$t('message.click')}}</span>
              <span v-if="count!=60"
                    class="countBtn">
              {{count}}s {{$t('message.resend')}}
            </span>
            </div>
          </div>
          <!--手机号/-->
          <small v-if="error" style="font-size: 10px;color: #f44336">{{errorMsg}}</small>
          <button class="Button--primary Button--blue" @click="check" style="margin-top: 5px">{{$t('message.Submit')}}</button>
          <div class="return">
            <router-link to="login">{{$t('message.Back')}}</router-link>
          </div>
        </div>
        <!--step2-->
        <div v-if="step2">
          <div style="padding: 10px;text-align: center">{{$t('message.Select_account_reset_password')}}</div>
          <div class="greenbg account-btn" v-for="item in switchAccount"
               @click="changeAccount(item)">
            {{item.userName}}
          </div>
        </div>

        <!--step2/-->
        <div v-if="step3">
          <p style="text-align: center">{{$t('message.After_reset_mobile_number')}}</p>
          <mu-text-field :hintText="$t('message.password')" v-model="form.repwd" type="password"
                         name="phone" class="require"
                         fullWidth/>
          <mu-text-field :hintText="$t('message.repeat_password')" v-model="form.repwd2" type="password"
                         name="phone" class="require"
                         fullWidth/>
          <small v-if="error" style="font-size: 10px;color: #f44336;">{{errorMsg}}</small>
          <button class="Button--primary Button--blue" @click="repassword">{{$t('message.Submit')}}</button>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'login',
    data () {
      return {
        count: 60,
        error: false,
        errorMsg: '',
        form: {
          phone: '',
          code: '',
          repwd: '',
          repwd2: ''
        },
        switchAccount: [],
        step1: true,
        step2: false,
        step3: false
      }
    },

    methods: {
      back(){
        this.$router.back()
      },
      getMsgCode (val) {
        console.log(val)
        if (val.length != 11)return
        let data = {
          telephone: val,
          type: 2
        }
        this.count--
        let s = setInterval(() => {
          this.count--
          if (this.count == 0) {
            this.count = 60
            clearInterval(s)
          }
        }, 1000)

        this.$api.GET_MSG_CODE(data).then(res => {
          if (res.code === 0) {
            if (res.state === 1) {
              this.$toast(this.$t('message.Msg_send'))
            } else {
              alert(JSON.stringify(res))
            }
          } else {
            alert(JSON.stringify(res))
          }
        })
      },
      check(){
        if (this.form.phone.length != 11) {
          this.error = true;
          if (this.form.phone.length == 0)
            this.errorMsg = this.$t('message.Please_enter_phone_number')
          else
            this.errorMsg = this.$t('message.phone_error')
          return;
        }
        else if (this.form.code.length ==0) {
          this.error = true;
          this.errorMsg = this.$t('message.Please_enter_mobile_code')
          return;
        }
        this.$api.CHECK_TEL_CODE({telephone: this.form.phone, code: this.form.code}).then(res => {
          if (res.code == 0) {
            if (res.state == '1') {
              this.switchAccount = res.switchAccount
              this.step1 = false;
              this.step2 = true;
            } else {
              this.error = true;
              this.errorMsg = res.info
            }
          }
        })
      },
      changeAccount (item){
        if (item.id == this.userId)return
        this.$api.SWITCH_ACCOUNT({id: item.id}).then(res => {
          if (res.code == ERR_OK) {
            this.step2 = false
            this.step3 = true
          } else {
            alert(`账号切换` + JSON.stringify(res))
          }
        })
      },
      repassword(){
        if (this.form.repwd.length < 6) {
          this.error = true
          this.errorMsg = this.$t('message.password_error')
          return
        } else if (this.form.repwd != this.form.repwd2) {
          this.error = true
          this.errorMsg = this.$t('message.Entered_differ')
          return
        }
        this.$api.RESET_PASSWORD({password: this.form.repwd}).then(res => {
          if (res.code == 0) {
            alert('重置成功')
            this.$router.push('login')
          } else {
            alert('密码重置' + JSON.stringify(res))
          }
        })
      }

    },
    mounted(){

    },
    activated()  {
      this.step1 = true
      this.step2 = false
      this.step3 = false
    }
  }
</script>
<style scoped lang="less">
  .mu-text-field {
    margin-bottom: 0 !important;
    min-height: 0 !important;
    overflow: hidden;
  }

  #app .mu-text-field .mu-text-field-content {
    padding-bottom: 1px !important;
  }

  .Button--primary.Button--blue {
    border: none;
    outline: none;
    width: 100%;
    color: #fff;
    padding: 10px;
    background: -webkit-gradient(linear, left top, right top, from(#15b982), to(#01d18b));
    background: linear-gradient(90deg, #15b982, #01d18b);
    -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
    box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
  }

  .help.is-danger {
    font-size: 10px;
    color: #f00;
    text-align: left;
    padding-left: 10px;
  }

</style>
