<template>
  <div class="login">
    <div class="page-content">
      <div class="wrapper" style="text-align: left;background:#fff;">
        <div v-if="editData.accountType==2">
          <div>
            <mu-text-field :label="$t('message.Company_name')" v-model="form.company" :errorText="error.company"
                           labelFloat/>
            <div class="help">{{$t('message.Company_name_help')}}</div>
            <mu-text-field :label="$t('message.Mark')" v-model="form.mark" :errorText="error.mark" labelFloat/>
            <div class="help">{{$t('message.Mark_help')}}</div>
            <mu-text-field :label="$t('message.Company_id_num')" v-model="form.companyIdNum"
                           :errorText="error.companyIdNum" labelFloat/>
            <div class="help">{{$t('message.Company_id_num_help')}}</div>
            <mu-text-field :label="$t('message.AdminName')" v-model="form.userName" :errorText="error.userName"
                           labelFloat/>
            <mu-text-field :label="$t('message.Admin_id_num')" v-model="form.idCard" :errorText="error.idCard"
                           labelFloat/>
            <mu-text-field :label="$t('message.Admin_phone_num')" v-model="form.phone"
                           :errorText="error.phone" labelFloat/>
            <div>
              <mu-text-field :label="$t('message.Msg_code')" v-model="form.code" :errorText="error.code" labelFloat
                             style="width: 60%"/>
              <span style="display: inline-block;width: 30%;text-align: center;padding: 10px 0;background:#eee;"
                    @click="getMsgCode" v-if="count==60">{{$t('message.click')}}</span>
              <span v-if="count!=60"
                    style="display: inline-block;width: 30%;text-align: center;padding: 10px 0;background:#eee;">
              {{count}}s {{$t('message.resend')}}
            </span>
            </div>
          </div>
        </div>
        <div v-if="editData.accountType==1">
          <div>
            <mu-text-field :label="$t('message.Name')" v-model="form.userName" :errorText="error.userName" labelFloat/>
            <mt-radio
              :title="$t('message.Gender')"
              v-model="form.sex"
              :options="[{label:this.$t('message.Male'),value:'1'},{label:this.$t('message.Female'),value:'0'}]">
            </mt-radio>

            <mu-text-field :label="$t('message.Phone_number')" v-model="form.phone" :errorText="error.phone"
                           labelFloat/>
            <div class="help">{{$t('message.cell-phone_help')}}</div>
            <div>
              <mu-text-field :label="$t('message.Msg_code')" v-model="form.code" :errorText="error.code" labelFloat
                             style="width: 60%"/>
              <span style="display: inline-block;width: 30%;text-align: center;padding: 10px 0;background:#eee;"
                    @click="getMsgCode" v-if="count==60">{{$t('message.click')}}</span>
              <span v-if="count!=60"
                    style="display: inline-block;width: 30%;text-align: center;padding: 10px 0;background:#eee;">
              {{count}}s {{$t('message.resend')}}
            </span>
            </div>
          </div>
        </div>
        <button class="Button--primary Button--blue" @click="handleSubmit">{{$t('message.Submit')}}</button>
      </div>
    </div>

  </div>
</template>
<script>
  import { GetQueryString } from '@/utils'
  export default {
    name: 'info',
    data () {
      return {
        form: {
          typeId: '2', // 2 企业 1 个人
          company: '',
          mark: '',
          companyIdNum: '', // 营业执照号
          userName: '',
          idCard: '',
          sex: '1',
          phone: '',
          code: ''
        },
        editData: {},
        count: 60,
        fail: true,
      }
    },
    computed: {
      error(){
        if (this.form.typeId == '2') {
          return {
            company: '',
            mark: '',
            companyIdNum: '',
            userName: '',
            idCard: '',
            phone: '',
            code: ''
          }

        } else {

          return {
            userName: '',
            phone: '',
            code: ''
          }

        }
      }
    },
    watch: {
      form: {
        handler(val){
          if (this.form.typeId == '2') {
            if (val.company == '') {
              this.error.company = this.$t('message.Required_fields')
            } else {
              this.error.company = ''
            }
            let re = /^[a-z]+$/i
            if (val.mark == '') {
              this.error.mark = this.$t('message.Required_fields')

            } else if (!re.test(val.mark)) {
              this.error.mark = this.$t('message.Letter_only')

            } else {
              this.error.mark = ''
            }

            if (val.companyIdNum == '') {
              this.error.companyIdNum = this.$t('message.Required_fields')

            } else if (val.companyIdNum.toString().length !== 15 && val.companyIdNum.toString().length !== 18) {
              this.error.companyIdNum = this.$t('message.Incorrect_format')

            } else {
              this.error.companyIdNum = ''
            }
            if (val.userName == '') {
              this.error.userName = this.$t('message.Required_fields')

            } else {
              this.error.userName = ''
            }
            let re2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}\w{1}$/
            if (val.idCard == '') {
              this.error.idCard = this.$t('message.Required_fields')

            } else if (!re2.test(val.idCard)) {
              this.error.idCard = this.$t('message.Incorrect_format')

            } else {
              this.error.idCard = ''
            }

            let re3 = /^[1][3,4,5,7,8][0-9]{9}$/
            if (val.phone == '') {
              this.error.phone = this.$t('message.Required_fields')

            } else if (!re3.test(val.phone)) {
              this.error.phone = this.$t('message.Incorrect_format')

            } else {
              this.error.phone = ''
            }

            if (val.code == '') {
              this.error.code = this.$t('message.Required_fields')

            } else {
              this.error.code = ''
            }

          } else {

            if (val.userName == '') {
              this.error.userName = '必填项'
            } else {
              this.error.userName = ''
            }

            let re3 = /^[1][3,4,5,7,8][0-9]{9}$/
            if (val.phone == '') {
              this.error.phone = ''
            } else if (!re3.test(val.phone)) {
              this.error.phone = this.$t('message.Incorrect_format')
            } else {
              this.error.phone = ''
            }
            if (val.phone.length == 11 && val.code == '') {  // 以下填写了手机号才是必填项
              this.error.code = this.$t('message.Required_fields')
            } else {
              this.error.code = ''
            }
          }
          Object.values(this.error).map(item => {
            if (item === '') {
              this.fail = false
            } else {
              this.fail = true
            }
          })
        },
        deep: true
      },
    },
    methods: {
      back(){
        this.$router.back()
      },
      handleSubmit () {
        if (this.fail) {
          alert('请完善信息')
          return
        } else {
          // 如果是修改 提交参数略有不同
          var eData
          if (this.form.typeId === '2') { // 企业
            eData = {
              account_type: this.form.typeId,
              company_name: this.form.company,
              comp_eng_short_name: this.form.mark,
              business_license_number: this.form.companyIdNum,
              personName: this.form.userName,
              personSex: this.form.idCard.substring(16, 1) % 2 ? '1' : '0',
              idCard: this.form.idCard,
              telephone: this.form.phone,
              code: this.form.code,
              email: this.editData.email,
              personId: this.editData.personId,
              rowChangeLogId: this.editData.rowChangeLogId,
              sysUserId: this.editData.sysUserId,
              companyID: this.editData.companyID
            }
          } else {
            eData = {
              account_type: this.form.typeId,
              personName: this.form.userName,
              personSex: this.form.sex,
              telephone: this.form.phone,
              code: this.form.code,
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
      _getRegisterInfo () {
        this.$api.GET_REGISTER_INFO().then(res => {
          if (res.code === 0) {
            let data = res.registeInfo[0]
            this.editData = data
            let {typeId, company, mark, companyIdNum, userName, idCard, sex, phone, code} = {
              typeId: data.accountType,
              company: data.companyName,
              mark: data.compEngShortName,
              companyIdNum: data.businessLicenseNumber,
              userName: data.personName,
              idCard: data.idCard,
              sex: data.personSex === '男' ? '1' : '0',
              phone: data.telephone,
              code: ''
            }
            this.form = {typeId, company, mark, companyIdNum, userName, idCard, sex, phone, code}
          }
        })
      },
    },
    created () {

    },
    activated(){
      this._getRegisterInfo()
    },
    mounted(){
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
