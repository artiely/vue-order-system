<template>
  <div class="login">
    <div class="page-content">
      <mt-header fixed title="FWONE">
        <mt-button icon="back" slot="left" @click="back"></mt-button>
      </mt-header>
      <div class="wrapper" style="text-align: left;background:#fff;padding-top: 40px">
        <div>
          <div>
            <mu-text-field :hintText="$t('message.Name')"  class="require" v-model="form.userName" />
            <mu-text-field :hintText="$t('message.Phone_number')"  class="require"  v-model="form.phone"  />
            <div class="help">{{$t('message.phone_can_login')}}</div>
            <!--只有微信注册手机号才可以为登录账号-->
            <div style="text-align: left">
              <mu-text-field :hintText="$t('message.Msg_code')"  class="require" v-model="form.code" type="text"
                             name="code"
                             style="width: 60%"/>
              <span class="countBtn"
                    @click="getMsgCode" v-if="count==60">{{$t('message.click')}}</span>
              <span v-if="count!=60"
                    class="countBtn">
                {{count}}s {{$t('message.resend')}}
              </span>
            </div>
            <mu-text-field :hintText="$t('message.Password')"  class="require" v-model="form.pwd" type="password"  name="pwd"
                           fullWidth/>
            <mu-text-field :hintText="$t('message.repeat_password')"  class="require" v-model="form.pwd2" type="password"  name="pwd2" fullWidth/>
          </div>
        </div>
        <span class="form-group__message" v-if="!$v.form.pwd.minLength">{{$t('message.password_error')}}.</span>
        <span class="form-group__message" v-if="$v.form.pwd.minLength&&!$v.form.pwd2.sameAs">{{$t('message.Entered_differ')}}.</span>
        <span class="form-group__message" v-if="!$v.form.phone.minLength||!$v.form.phone.maxLength||!$v.form.phone.minLength||!$v.form.phone.maxLength">{{$t('message.phone_error')}}.</span>
        <button class="Button--primary Button--blue" @click="handleSubmit">{{$t('message.Submit')}}</button>
      </div>
    </div>
  </div>
</template>
<script>
  import { GetQueryString } from '@/utils'
  import { validationMixin } from 'vuelidate'
  import { required, minLength, maxLength, sameAs, email,requiredUnless ,alpha}from 'vuelidate/lib/validators'
  export default {
    name: 'login',
    data () {
      return {
        count: 60,
        form: {
          userName: '',
          phone: '',
          code: '',
          pwd: '',
          pwd2: '',
        },
      }
    },
    validations: {
      form: {
        userName: {
          required,
        },
        phone:{
          required,
          minLength:minLength(11),
          maxLength:maxLength(11),
        },
        code:{
          required,
        },
        pwd: {
          required,
          minLength: minLength(6),
        },
        pwd2: {
          sameAs: sameAs('pwd'),
        }
      }
    },
    methods: {
      back(){
        this.$router.back()
      },
      handleSubmit () {
        if (this.$v.form.$invalid) {
          alert(this.$t('message.check_fields'))
          return
        } else {
          let data = {
            personName: this.form.userName,
            telephone: this.form.phone,
            code: this.form.code,
            companyId: GetQueryString('companyId') || '',
            password:this.form.pwd
          }

          this.$api.JOIN_COMPANY(data).then(res => {
            if (res.code === 0) {
              if (res.state !== '1') { // 验证码不通过
                alert(res.info)
                return
              }
              this.$router.push('/index')
            } else {
              alert(JSON.stringify(res))
            }
          }).catch(err => {
            this.loading = false
            console.error('哎哟~！', err)
          })
        }
      },
      getMsgCode () {
          if (this.form.phone.length != 11)return
          let data = {
            telephone: this.form.phone,
            type: 0
          }
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
              this.$toast('短信已发出，请查收')
            } else {
              alert(JSON.stringify(res))
            }
          } else {
            alert(JSON.stringify(res))
          }
        })
      },
   /*   checkPhone () { // 判断手机是否被注册
        this.$api.CHECK_PHONE({telephone: this.form.phone}).then(res => {
          if (res.code === 0) {
            if (res.state == '0') {
              this.form.hasPhone = true
              this.$set(this.form, this.form.x, this.form.x++)
            } else {
              this.form.hasPhone = false
              this.$set(this.form, this.form.x, this.form.x--)
            }
          } else {
            alert(JSON.stringify(res))
          }
        })
      }*/
    },
    created () {

    },
    activated(){
      this.$api.CHECK_ACCOUNT().then(res => { // 判断注册信息是否完善
        if (res.code === 0) {
          if (res.state == 4) { // 不完善

          } else {
            this.$router.push('/index');
          }
        } else {
          alert(JSON.stringify(res))
        }
      })
    }
  }
</script>
<style scoped lang="less">
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
