<template>
  <div class="login" style="background: white">
    <div class="page-content">
      <div class="wrapper">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1">{{$t('message.signup_email')}}</mt-tab-item>
          <mt-tab-item id="2">{{$t('message.signup_phone')}}</mt-tab-item>
          <mt-tab-item id="3">{{$t('message.join_company')}}</mt-tab-item>
        </mt-navbar>
        <div style="background:#fff;text-align: left">
          <!-- 邮箱-->
          <div v-if="selected==1" class="form-content">
            <mu-text-field :hintText="$t('message.Email')" v-model.trim="form.email" type="email"
                           name="email" class="require" @focus="focus" @blur="blur"
                           fullWidth/>
            <mu-text-field :hintText="$t('message.password')" v-model.trim="form.pwd" type="password"
                           name="pwd" class="require"
                           fullWidth/>
            <mu-text-field :hintText="$t('message.repeat_password')" v-model.trim="form.pwd2" type="password"
                           name="pwd2"
                           class="require"
                           fullWidth/>
          </div>
          <!-- 邮箱/-->
          <!--手机号-->
          <div v-if="selected==2" class="form-content">
            <mu-text-field :hintText="$t('message.Phone_number')" v-model.trim="form2.phone" type="number"
                           name="phone" class="require"
                           fullWidth/>
            <div>
              <mu-text-field :hintText="$t('message.Msg_code')" v-model.trim="form2.code" type="text"
                             name="code" class="require"
                             style="width: 60%"/>
              <span
                class="countBtn"
                @click="getMsgCode(form2.phone)" v-if="count==60">{{$t('message.click')}}</span>
              <span v-if="count!=60"
                    class="countBtn">
              {{count}}s {{$t('message.resend')}}
            </span>
            </div>
            <mu-text-field :hintText="$t('message.password')" v-model.trim="form2.pwd" type="password"
                           name="pwd" class="require"
                           fullWidth/>
            <mu-text-field :hintText="$t('message.repeat_password')" v-model.trim="form2.pwd2" type="password"
                           class="require"
                           name="pwd2"
                           fullWidth/>
          </div>
          <!--手机号/-->
          <!--加入公司-->

          <!--加入公司/-->
          <div v-if="selected==3" class="form-content">
            <mu-text-field :hintText="$t('message.Name')" v-model.trim="form3.personName" type="text"
                           name="personName" class="require"
                           fullWidth/>
            <mu-text-field :hintText="$t('message.InvitationCode')" v-model.trim="form3.InvitationCode" type="text"
                           name="InvitationCode" class="require"
                           fullWidth/>
            <mu-text-field :hintText="$t('message.Phone_number')" v-model.trim="form3.phone" type="number"
                           name="phone" class="require"
                           fullWidth/>
            <div>
              <mu-text-field :hintText="$t('message.Msg_code')" v-model.trim="form3.code" type="text"
                             name="code" class="require"
                             style="width: 60%"/>
              <span
                class="countBtn"
                @click="getMsgCode(form3.phone)" v-if="count==60">{{$t('message.click')}}</span>
              <span v-if="count!=60"
                    class="countBtn">
              {{count}}s {{$t('message.resend')}}
            </span>
            </div>
            <mu-text-field :hintText="$t('message.password')" v-model.trim="form3.pwd" type="password"
                           name="pwd" class="require"
                           fullWidth/>
            <mu-text-field :hintText="$t('message.repeat_password')" v-model.trim="form3.pwd2" type="password"
                           name="pwd2" class="require"
                           fullWidth/>
          </div>
          <!--错误信息-->
          <div v-if="selected==1" class="form-tip">
            <span class="form-group__message" v-if="!$v.form.email.email">{{$t('message.email_error')}}.</span>
            <span class="form-group__message" v-if="!$v.form.email.check">{{$t('message.email_used')}}.</span>
            <span class="form-group__message" v-if="!$v.form.pwd.minLength">{{$t('message.password_error')}}</span>
            <span class="form-group__message"
                  v-if="$v.form.pwd.minLength&&!$v.form.pwd2.sameAs&&this.form.pwd2.length>0">{{$t('message.Entered_differ')}}</span>
          </div>
          <div v-if="selected==2" class="form-tip">
            <span class="form-group__message" v-if="!$v.form2.phone.minLength||!$v.form2.phone.maxLength">{{$t('message.phone_error')}}.</span>
            <span class="form-group__message" v-if="!$v.form2.phone.isUnique">{{$t('message.phone_used')}}.</span>
            <span class="form-group__message" v-if="!$v.form2.pwd.minLength">{{$t('message.password_error')}}</span>
            <span class="form-group__message"
                  v-if="$v.form2.pwd.minLength&&!$v.form2.pwd2.sameAs&&this.form2.pwd2.length>0">{{$t('message.Entered_differ')}}</span>

          </div>
          <div v-if="selected==3" class="form-tip">
            <span class="form-group__message" v-if="!$v.form3.phone.minLength||!$v.form3.phone.maxLength">{{$t('message.phone_error')}}.</span>
            <span class="form-group__message" v-if="!$v.form3.pwd.minLength">{{$t('message.password_error')}}</span>
            <span class="form-group__message"
                  v-if="$v.form3.pwd.minLength&&!$v.form3.pwd2.sameAs&&this.form3.pwd2.length>0">{{$t('message.Entered_differ')}}</span>
          </div>
          <!--错误信息/-->
          <div class="btn-block-wrapper">
            <button class="Button--primary Button--blue" @click="register">{{$t('message.signup')}}</button>
          </div>
          <div style="padding: 0 20px;font-size: 12px">
            <router-link to="login">{{$t('message.Back')}}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {GetQueryString} from '@/utils'
  import {validationMixin} from 'vuelidate'
  import {required, minLength, maxLength, sameAs, email} from 'vuelidate/lib/validators'

  import { MessageBox } from 'mint-ui';
  export default {
    name: 'login',
    data() {
      return {
        cck: false,
        selected: '1',
        count: 60,
        form: {
          pwd: '',
          pwd2: '',
          email: '',
        },
        form2: {
          pwd: '',
          pwd2: '',
          phone: '',
          code: '',
        },
        form3: {
          pwd: '',
          pwd2: '',
          phone: '',
          code: '',
          InvitationCode: '',
          personName: '',
        },
      }
    },
    validations: {
      form: {
        email: {
          required,
          email,
          check(value) {
            if (!this.cck) {
              return true
            }
            return new Promise((resolve, reject) => {
              this.$api.CHECK_EMAIL({email: value}).then(res => {
                if (res.code === 0) {
                  if (res.state === '-1') {
                    resolve(false)
                  } else {
                    resolve(true)
                  }
                } else {
                  MessageBox.alert(JSON.stringify(res))
                }
              })
            })
          }
        },
        pwd: {
          required,
          minLength: minLength(6),
        },
        pwd2: {
          sameAs: sameAs('pwd'),
        }
      },
      form2: {
        phone: {
          required,
          minLength: minLength(11),
          maxLength: maxLength(11),
          isUnique(value) {
            // 长度不为11暂且就认为不是合法的手机号
            if (value.toString().length !== 11) return true
            return new Promise((resolve, reject) => {
              this.$api.CHECK_PHONE({telephone: value}).then(res => {
                if (res.code === 0) {
                  if (res.state == '0') {
                    // 表示号码不可用
                    resolve(false)
                  } else {
                    resolve(true)
                  }
                } else {
                  MessageBox.alert(JSON.stringify(res))
                }
              })

            })
          }
        },
        code: {
          required,
        },
        pwd: {
          required,
          minLength: minLength(6)
        },
        pwd2: {
          sameAs: sameAs('pwd')
        }
      },
      form3: {
        personName: {
          required
        },
        InvitationCode: {
          required
        },
        phone: {
          required,
          minLength: minLength(11),
          maxLength: maxLength(11),
        },
        code: {
          required,
        },
        pwd: {
          required,
          minLength: minLength(6)
        },
        pwd2: {
          sameAs: sameAs('pwd')
        }
      }
    },

    methods: {
      back() {
        this.$router.back()
      },
      focus() {
        this.cck = false
      },
      blur() {
        this.cck = true
      },
      checkEmail(val, cb) {
        console.log('邮箱', val)
        if (val.indexOf('@') <= 0 ) {
          return
        }
        this.$api.CHECK_EMAIL({email: this.form.email}).then(res => {
          if (res.code === 0) {
            if (res.state === '-1') {
              //
            } else {
              //
            }
            cb && cb()
          } else {
            alert(JSON.stringify(res))
          }
        })
      },
      checkPhone(val) {
        if (val.length < 10) return
        this.$api.CHECK_PHONE({telephone: this.form.phone}).then(res => {
          if (res.code === 0) {
            if (res.state == '0') {
              //
            } else {
              //
            }
          } else {
            MessageBox.alert(JSON.stringify(res))
          }
        })
      },
      register () {
          if (this.selected == '1') { // 邮箱
            /* 后端在此需要先验证邮箱再提交保证没有重复的账号*/
            if (!this.$v.form.$invalid) {
              this.checkEmail(this.form.email, () => {this._postInfo()})
            } else {
              MessageBox.alert(this.$t('message.check_fields'))
            }

          } else if (this.selected == '2') { // 手机号
            if (!this.$v.form2.$invalid) {
              this._postInfoByMobile()
            } else {
              MessageBox.alert(this.$t('message.check_fields'))
            }

          } else {// 加入公司
            if (!this.$v.form3.$invalid) {
              this._joinCompany()
            } else {
              MessageBox.alert(this.$t('message.check_fields'))
            }
          }
      },
      getMsgCode(val) {
        console.log(val)
        if (val.length != 11) return
        let data = {
          telephone: val,
          type: 1
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
              MessageBox.alert(JSON.stringify(res))
            }
          } else {
            MessageBox.alert(JSON.stringify(res))
          }
        })
      },
      _postInfo() {
        let url = window.location.href
        if (window.location.search === '') {
          var href = window.location.href.replace('&amp;', '&')
          var index = href.indexOf('?')
          if (index != -1) {
            url = href.substring(0, index)
          } else {
            url = window.location.href
          }
        } else {
          url = url.split(window.location.search)[0];
        }
        console.log('url', url)
        url = url.replace('mobile.html#/register', 'type.html') // 这里也换成pc的地址
        let data = {
          email: this.form.email,
          password: this.form.pwd,
          url: url,
          table_name: GetQueryString('table_name') || '',
          table_id: GetQueryString('table_id') || '',
          open_id: GetQueryString('open_id') || ''
        }
        this.$api.REGISTER(data).then(res => {
          if (res.code === 0) {
//            MessageBox.alert(`激活信息已发送至${this.form.email},请注意查收并及时激活。`)
            MessageBox.alert(this.$t('message.Send_email_des', {msg: this.form.email}))
          }
        })
      },
      _postInfoByMobile() {
        let data = {
          telephone: this.form2.phone,
          code: this.form2.code,
          password: this.form2.pwd,
          table_name: GetQueryString('table_name') || '',
          table_id: GetQueryString('table_id') || '',
        }
        this.$api.REGISTER_BY_MOBILE(data).then(res => {
          if (res.code === 0) {
            if (res.state === '1') { // 成功
              this.$router.push(`/type?table_id=${GetQueryString('table_id') || ''}&table_name=${GetQueryString('table_name') || ''}`)
            } else if (res.state == '2') { // 不正确
              MessageBox.alert(this.$t('message.Wrong_captcha'))
            } else if (res.state == '3') { // 过期
              MessageBox.alert(this.$t('message.Wrong_Verification'))
            }
          }
        })
      },
      _joinCompany() {
        let data = {
          inviteCode: this.form3.InvitationCode,
          code: this.form3.code,
          telephone: this.form3.phone,
          password: this.form3.pwd,
          personName: this.form3.personName
        }
        this.$api.CODE_JOIN_COMPANY(data).then(res => {

          /*返回:{"state":"3","code":0,"info":"验证码过期"}
          或者{"state":"2","code":0,"info":"验证码错误"}
          或者{"state":"1","code":0,"info":"保存成功"}
          或者{"state":"-1","code":0,"info":"已经存在该公司账号，请直接登录"}
          或者{"state":"-2","code":0,"info":"邀请码错误"}*/

          if (res.code == 0) {
            if (res.state == 1) {
              MessageBox.alert(this.$t('message.Success'))
              this.router.push('login')
            } else {
              if(res.state==3){
                MessageBox.alert(this.$t('message.Wrong_Verification'))
              }else if(res.state==2){
                MessageBox.alert(this.$t('message.Wrong_captcha'))
              }else if(res.state==-1){
                MessageBox.alert(this.$t('message.Already_exist_company'))
              }else if(state==-2){
                MessageBox.alert(this.$t('message.Invitation_code_error'))
              }

            }
          } else {
            MessageBox.alert(JSON.stringify(res))
          }
        })
      }
    },
    mounted() {

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
    border-radius: 2px;
  }

  .help.is-danger {
    font-size: 10px;
    color: #f00;
    text-align: left;
    padding-left: 10px;
  }

</style>
