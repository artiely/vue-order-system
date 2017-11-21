<template>
  <div class="login" style="background: white">
    <div class="page-content">
      <mt-header fixed :title="$t('message.Personal_information')">
        <mt-button icon="back" slot="left" @click="back"></mt-button>
      </mt-header>
      <div class="wrapper" style="text-align: left;background:#fff;padding-top: 40px">
        <div v-if="editData.accountType==2">
          <div class="form-content">
            <mu-text-field :hintText="$t('message.Company_name')" class="require" v-model="form2.company"
            />
            <div class="help">{{$t('message.Company_name_help')}}</div>
            <mu-text-field :hintText="$t('message.Mark')" v-model="form2.mark" class="require"/>
            <div class="help">{{$t('message.Mark_help')}}</div>
            <mu-text-field :hintText="$t('message.Company_id_num')" v-model="form2.companyIdNum"
            />
            <div class="help">{{$t('message.Company_id_num_help')}}</div>
            <mu-text-field :hintText="$t('message.AdminName')" class="require" v-model="form2.userName"
            />
            <mu-text-field :hintText="$t('message.Admin_phone_num')" class="require" v-model="form2.phone"
            />
            <div>
              <mu-text-field :hintText="$t('message.Msg_code')" class="require" v-model="form2.code"
                             style="width: 60%"/>
              <span class="countBtn"
                    @click="getMsgCode" v-if="count==60">{{$t('message.click')}}</span>
              <span v-if="count!=60"
                    class="countBtn">
              {{count}}s {{$t('message.resend')}}
            </span>
            </div>
            <div>
              <mu-text-field :hintText="$t('message.reset_pwd')" v-model="form2.password" :type="passType"
                             style="width:80%"/>
              <span style="width:15%;text-align:center;display:inline-block;float:right;line-height:36px"
                    @click="changeType"><i style="font-size:22px" class="iconfont"
                                           :class="passType=='text'?'icon-kejian':'icon-bukejian'"></i></span>
            </div>

          </div>
        </div>
        <div v-if="editData.accountType==1">
          <div class="form-content">
            <mu-text-field :hintText="$t('message.Name')" class="require" v-model="form1.userName"/>
            <mu-text-field :hintText="$t('message.Phone_number')" class="require" v-model="form1.phone"
            />
            <div class="help">{{$t('message.cell-phone_help')}}</div>
            <div>
              <mu-text-field :hintText="$t('message.Msg_code')" class="require" v-model="form1.code"
                             style="width: 60%"/>
              <span class="countBtn"
                    @click="getMsgCode" v-if="count==60">{{$t('message.click')}}</span>
              <span v-if="count!=60"
                    class="countBtn">
              {{count}}s {{$t('message.resend')}}
            </span>
            </div>
            <div>
              <mu-text-field :hintText="$t('message.reset_pwd')" v-model="form1.password" :type="passType"
                             style="width:80%"/>
              <span style="width:15%;text-align:center;display:inline-block;float:right;line-height:36px"
                    @click="changeType"><i style="font-size:22px" class="iconfont"
                                           :class="passType=='text'?'icon-kejian':'icon-bukejian'"></i></span>
            </div>
          </div>
        </div>

        <div>
          <span class="form-group__message" v-if="!$v.form2.companyIdNum.minLength||!$v.form2.companyIdNum.maxLength">{{$t('message.company_id_error')}}.</span>
          <span class="form-group__message" v-if="!$v.form2.mark.alpha">{{$t('message.mark_error')}}.</span>
          <span class="form-group__message" v-if="!$v.form1.password.minLength||!$v.form2.password.minLength">{{$t('message.password_error')}}</span>
          <span class="form-group__message" v-if="!$v.form2.phone.minLength||!$v.form2.phone.maxLength">{{$t('message.phone_error')}}.</span>
        </div>
        <div class="btn-block-wrapper">
          <button class="Button--primary Button--blue" @click="handleSubmit">{{$t('message.Submit')}}</button>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import {GetQueryString} from '@/utils'
  import {validationMixin} from 'vuelidate'
  import {required, minLength, maxLength, sameAs, email, requiredUnless, alpha} from 'vuelidate/lib/validators'

  export default {
    name: 'info',
    data() {
      return {
        passType: 'password',

        form: {
          typeId: '2', // 2 企业 1 个人
        },
        form1: {
          userName: '',
          phone: '',
          code: '',
          password: '',
        },
        form2: {
          company: '',
          mark: '',
          companyIdNum: '', // 营业执照号
          userName: '',
          phone: '',
          code: '',
          password: ''
        },
        editData: {},
        count: 60,
        fail: true,
      }
    },
    validations: {
      form1: {
        userName: {
          required,
        },
        phone: {
          required,
          minLength: minLength(11),
          maxLength: maxLength(11),
        },
        password: {
          minLength: minLength(6),
        },
        code: {
          required,
        },
      },
      form2: {
        company: {
          required,
        },
        companyIdNum: {
          minLength: minLength(15),
          maxLength: maxLength(20),
        },
        mark: {
          required,
          alpha
        },
        userName: {
          required,
        },
        phone: {
          required,
          minLength: minLength(11),
          maxLength: maxLength(11),
        },
        code: {
          required,
        },
        password: {
          minLength: minLength(6),
        },
      }
    },
    methods: {
      changeType() {
        if (this.passType == 'text') {
          this.passType = 'password'
        } else {
          this.passType = 'text'
        }
      },
      back() {
        this.$router.back()
      },
      handleSubmit() {
        if (this.form.typeId == '2') {
          console.log('----企业数据修改-----')
          if (this.$v.form2.$invalid) {
            alert(this.$t('message.check_fields'))
            return
          } else {
            // 如果是修改 提交参数略有不同
            let eData = {
              account_type: this.form.typeId,
              company_name: this.form2.company,
              comp_eng_short_name: this.form2.mark,
              business_license_number: this.form2.companyIdNum,
              personName: this.form2.userName,
              telephone: this.form2.phone,
              password: this.form2.password,
              code: this.form2.code,
              email: this.editData.email,
              personId: this.editData.personId,
              rowChangeLogId: this.editData.rowChangeLogId,
              sysUserId: this.editData.sysUserId,
              companyID: this.editData.companyID
            }
            this.__postData(eData)
          }
        } else {
          console.log('----个人数据修改-----')
          if (this.$v.form1.$invalid) {
            alert(this.$t('message.check_fields'))
            return
          } else {
            let eData = {
              account_type: this.form.typeId,
              personName: this.form1.userName,
              telephone: this.form1.phone,
              code: this.form1.code,
              password: this.form1.password,
              email: this.editData.email,
              personId: this.editData.personId,
              rowChangeLogId: this.editData.rowChangeLogId,
              sysUserId: this.editData.sysUserId,
              companyID: this.editData.companyID
            }
            this.__postData(eData)
          }
        }
        /*if (this.$v.form.$invalid) {
          alert(this.$t('message.check_fields'))
          return
        } else {
          // 如果是修改 提交参数略有不同
          var eData
          if (this.form.typeId === '2') { // 企业
            eData = {
              account_type: this.form.typeId,
              company_name: this.form2.company,
              comp_eng_short_name: this.form2.mark,
              business_license_number: this.form2.companyIdNum,
              personName: this.form2.userName,
              telephone: this.form2.phone,
              code: this.form2.code,
              email: this.editData.email,
              personId: this.editData.personId,
              rowChangeLogId: this.editData.rowChangeLogId,
              sysUserId: this.editData.sysUserId,
              companyID: this.editData.companyID
            }
          } else {
            eData = {
              account_type: this.form.typeId,
              personName: this.form1.userName,
              telephone: this.form1.phone,
              code: this.form1.code,
              email: this.editData.email,
              personId: this.editData.personId,
              rowChangeLogId: this.editData.rowChangeLogId,
              sysUserId: this.editData.sysUserId,
              companyID: this.editData.companyID
            }
          }
          this.$api.UPDATE_REGISTER_INFO(Object.assign({}, eData)).then(res => {
            if (res.code === 0) {
              if (res.state != '1') { // 验证码错误或过期
                alert(res.info)
                return false
              } else {
                let url = window.location.href
                if (window.location.search === '') {
                  url = window.location.href
                } else {
                  url = url.split(window.location.search)[0]
                }
                url = url.replace('info', 'user')
                this.$toast(this.$t('message.Reset_success'))
                window.location.href = url
              }

            } else {
              alert(JSON.stringify(res))
            }
          })

        }*/
      },
      __postData(eData) {
        this.$api.UPDATE_REGISTER_INFO(Object.assign({}, eData)).then(res => {
          if (res.code === 0) {
            if (res.state != '1') { // 验证码错误或过期
              alert(res.info)
              return false
            } else {
              let url = window.location.href
              if (window.location.search === '') {
                url = window.location.href
              } else {
                url = url.split(window.location.search)[0]
              }
              url = url.replace('info', 'user')
              this.$toast(this.$t('message.Reset_success'))
              window.location.href = url
            }

          } else {
            alert(JSON.stringify(res))
          }
        })
      },
      getMsgCode() {
        let data = {
          telephone: this.form.typeId == '1' ? this.form1.phone : this.form2.phone,
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
      _getRegisterInfo() {
        this.$api.GET_REGISTER_INFO().then(res => {
          if (res.code === 0) {
            let data = res.registeInfo[0]
            this.editData = data
            let {typeId, company, mark, companyIdNum, userName, phone, code} = {
              typeId: data.accountType,
              company: data.companyName,
              mark: data.compEngShortName,
              companyIdNum: data.businessLicenseNumber,
              userName: data.personName,
              phone: data.telephone,
              code: ''
            }
            this.form = {typeId}
            this.form1 = {userName, phone, code}
            this.form2 = {company, mark, companyIdNum, userName, phone, code}
          }
        })
      },
    },
    created() {
//      this._getRegisterInfo()
    },
    activated() {
      this._getRegisterInfo()
    },
    mounted() {
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
