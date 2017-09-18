<template>
  <div class="login">
    <div class="page-content">
      <div class="wrapper" style="text-align: left;background:#fff;" v-if="token">
        <mt-navbar v-model="form.typeId" v-if="!isEdit">
          <mt-tab-item id="2">{{$t('message.Company')}}</mt-tab-item>
          <mt-tab-item id="1">{{$t('message.Personage')}}</mt-tab-item>
        </mt-navbar>
        <!--<div class="help">一个邮箱只能注册一种类型账号</div>-->
        <div v-if="form.typeId==2">
          <div v-if="isMobile">
            <mu-text-field :label="$t('message.Company_name')" v-model="form.company" :errorText="error.company" labelFloat/>
            <div class="help">{{$t('message.Company_name_help')}}</div>
            <mu-text-field :label="$t('message.Mark')" v-model="form.mark" :errorText="error.mark" labelFloat/>
            <div class="help">{{$t('message.Mark_help')}}</div>
            <mu-text-field :label="$t('message.Company_id_num')" v-model="form.companyIdNum" :errorText="error.companyIdNum" labelFloat/>
            <div class="help">{{$t('message.Company_id_num_help')}}</div>
            <mu-text-field :label="$t('message.AdminName')" v-model="form.userName" :errorText="error.userName" labelFloat/>
            <mu-text-field :label="$t('message.Admin_id_num')" v-model="form.idCard" :errorText="error.idCard" labelFloat/>
          </div>
          <div v-if="isWechat">
            <mu-text-field :label="$t('message.Company_name')" v-model="form.company" :errorText="error.company" labelFloat/>
            <div class="help">{{$t('message.Company_name_help')}}</div>
            <mu-text-field :label="$t('message.Mark')"  v-model="form.mark" :errorText="error.mark" labelFloat/>
            <div class="help">{{$t('message.Mark_help')}}</div>
            <mu-text-field :label="$t('message.Company_id_num')" v-model="form.companyIdNum" :errorText="error.companyIdNum" labelFloat/>
            <div class="help">{{$t('message.Company_id_num_help')}}</div>
            <mu-text-field :label="$t('message.AdminName')" v-model="form.userName" :errorText="error.userName" labelFloat/>
            <mu-text-field :label="$t('message.Admin_id_num')" v-model="form.idCard" :errorText="error.idCard" labelFloat/>
            <mu-text-field :label="$t('message.Admin_phone_num')" @input="checkPhone" v-model="form.phone" :errorText="error.phone" labelFloat/>
            <div class="help">{{$t('message.cell-phone_help')}}</div>
            <!--只有微信注册手机号才可以为登录账号-->
            <div>
              <mu-text-field :label="$t('message.Msg_code')" v-model="form.code" :errorText="error.code" labelFloat style="width: 60%"/>
              <span style="display: inline-block;width: 30%;text-align: center;padding: 10px 0;background:#eee;"
                    @click="getMsgCode" v-if="count==60">{{$t('message.click')}}</span>
              <span v-if="count!=60"
                    style="display: inline-block;width: 30%;text-align: center;padding: 10px 0;background:#eee;">
              {{count}}s {{$t('message.resend')}}
            </span>
            </div>
            <div v-if="!isEdit">
              <mu-text-field :label="$t('message.Password')" v-model="form.pwd" type="password" :errorText="error.pwd" name="pwd" labelFloat
                             fullWidth/>
              <mu-text-field :label="$t('message.repeat_password')" v-model="form.pwd2" type="password" :errorText="error.pwd2" name="pwd2"
                             labelFloat
                             fullWidth/>
            </div>
          </div>
          <div v-if="isEmail">
            <mu-text-field :label="$t('message.Company_name')" v-model="form.company" :errorText="error.company" labelFloat/>
            <div class="help">{{$t('message.Company_name_help')}}</div>
            <mu-text-field :label="$t('message.Mark')"  v-model="form.mark" :errorText="error.mark" labelFloat/>
            <div class="help">{{$t('message.Mark_help')}}</div>
            <mu-text-field :label="$t('message.Company_id_num')" v-model="form.companyIdNum" :errorText="error.companyIdNum" labelFloat/>
            <div class="help">{{$t('message.Company_id_num_help')}}</div>
            <mu-text-field :label="$t('message.AdminName')" v-model="form.userName" :errorText="error.userName" labelFloat/>
            <mu-text-field :label="$t('message.Admin_id_num')" v-model="form.idCard" :errorText="error.idCard" labelFloat/>
            <mu-text-field :label="$t('message.Admin_phone_num')" v-model="form.phone" @input="checkPhone" :errorText="error.phone" labelFloat/>
            <div>
              <mu-text-field :label="$t('message.Msg_code')" v-model="form.code" :errorText="error.code" labelFloat style="width: 60%"/>
              <span style="display: inline-block;width: 30%;text-align: center;padding: 10px 0;background:#eee;"
                    @click="getMsgCode" v-if="count==60">{{$t('message.click')}}</span>
              <span v-if="count!=60"
                    style="display: inline-block;width: 30%;text-align: center;padding: 10px 0;background:#eee;">
              {{count}}s {{$t('message.resend')}}
            </span>
            </div>
          </div>
          <div v-if="isEdit">
            <mu-text-field :label="$t('message.Company_name')" v-model="form.company" :errorText="error.company" labelFloat/>
            <div class="help">{{$t('message.Company_name_help')}}</div>
            <mu-text-field :label="$t('message.Mark')"  v-model="form.mark" :errorText="error.mark" labelFloat/>
            <div class="help">{{$t('message.Mark_help')}}</div>
            <mu-text-field :label="$t('message.Company_id_num')" v-model="form.companyIdNum" :errorText="error.companyIdNum" labelFloat/>
            <div class="help">{{$t('message.Company_id_num_help')}}</div>
            <mu-text-field :label="$t('message.AdminName')" v-model="form.userName" :errorText="error.userName" labelFloat/>
            <mu-text-field :label="$t('message.Admin_id_num')" v-model="form.idCard" :errorText="error.idCard" labelFloat/>
            <mu-text-field :label="$t('message.Admin_phone_num')" v-model="form.phone" @input="checkPhone" :errorText="error.phone" labelFloat/>
            <div>
              <mu-text-field :label="$t('message.Msg_code')" v-model="form.code" :errorText="error.code" labelFloat style="width: 60%"/>
              <span style="display: inline-block;width: 30%;text-align: center;padding: 10px 0;background:#eee;"
                    @click="getMsgCode" v-if="count==60">{{$t('message.click')}}</span>
              <span v-if="count!=60"
                    style="display: inline-block;width: 30%;text-align: center;padding: 10px 0;background:#eee;">
              {{count}}s {{$t('message.resend')}}
            </span>
            </div>
          </div>
        </div>
        <div v-if="form.typeId==1">
          <div v-if="isMobile">
            <mu-text-field :label="$t('message.Name')" v-model="form.userName" :errorText="error.userName" labelFloat/>
            <mt-radio
              :title="$t('message.Gender')"
              v-model="form.sex"
              :options="[{label:this.$t('message.Male'),value:'1'},{label:this.$t('message.Female'),value:'0'}]">
            </mt-radio>
          </div>
          <div v-if="isWechat">
            <mu-text-field :label="$t('message.Name')" v-model="form.userName" :errorText="error.userName" labelFloat/>
            <mt-radio
              :title="$t('message.Gender')"
              v-model="form.sex"
              :options="[{label:this.$t('message.Male'),value:'1'},{label:this.$t('message.Female'),value:'0'}]">
            </mt-radio>

            <!--<mu-text-field label="手机号" @input="checkPhone" @blur="checkPhone" v-model="form.phone" :errorText="error.phone" labelFloat/>-->
            <div class="help">{{$t('message.cell-phone_help')}}</div>
            <!--只有微信注册手机号才可以为登录账号-->
            <div>
              <mu-text-field :label="$t('message.Msg_code')" v-model="form.code" :errorText="error.code" labelFloat style="width: 60%"/>
              <span style="display: inline-block;width: 30%;text-align: center;padding: 10px 0;background:#eee;"
                    @click="getMsgCode" v-if="count==60">{{$t('message.click')}}</span>
              <span v-if="count!=60"
                    style="display: inline-block;width: 30%;text-align: center;padding: 10px 0;background:#eee;">
              {{count}}s {{$t('message.resend')}}
            </span>
            </div>
            <div v-if="!isEdit">
              <mu-text-field :label="$t('message.Password')" v-model="form.pwd" type="password" :errorText="error.pwd" name="pwd" labelFloat
                             fullWidth/>
              <mu-text-field :label="$t('message.repeat_password')" v-model="form.pwd2" type="password" :errorText="error.pwd2" name="pwd2"
                             labelFloat
                             fullWidth/>
            </div>
          </div>
          <div v-if="isEmail">
            <mu-text-field :label="$t('message.Name')" v-model="form.userName" :errorText="error.userName" labelFloat/>
            <mt-radio
              :title="$t('message.Gender')"
              v-model="form.sex"
              :options="[{label:this.$t('message.Male'),value:'1'},{label:this.$t('message.Female'),value:'0'}]">
            </mt-radio>

            <mu-text-field :label="$t('message.Phone_number')" v-model="form.phone" @input="checkPhone" :errorText="error.phone" labelFloat/>
            <div class="help">{{$t('message.cell-phone_help')}}</div>
            <div>
              <mu-text-field :label="$t('message.Msg_code')" v-model="form.code" :errorText="error.code" labelFloat style="width: 60%"/>
              <span style="display: inline-block;width: 30%;text-align: center;padding: 10px 0;background:#eee;"
                    @click="getMsgCode" v-if="count==60">{{$t('message.click')}}</span>
              <span v-if="count!=60"
                    style="display: inline-block;width: 30%;text-align: center;padding: 10px 0;background:#eee;">
              {{count}}s {{$t('message.resend')}}
            </span>
            </div>
          </div>
          <div v-if="isEdit">
            <mu-text-field :label="$t('message.Name')" v-model="form.userName" :errorText="error.userName" labelFloat/>
            <mt-radio
              :title="$t('message.Gender')"
              v-model="form.sex"
              :options="[{label:this.$t('message.Male'),value:'1'},{label:this.$t('message.Female'),value:'0'}]">
            </mt-radio>

            <mu-text-field :label="$t('message.Phone_number')" v-model="form.phone" :errorText="error.phone" @input="checkPhone" labelFloat/>
            <div class="help">{{$t('message.cell-phone_help')}}</div>
            <div>
              <mu-text-field :label="$t('message.Msg_code')" v-model="form.code" :errorText="error.code" labelFloat style="width: 60%"/>
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
      <div style="padding: 20px" v-if="isEmail&&!token"><h2>链接过期或无效 <router-link to="register" >重新发送邮件</router-link></h2></div>
    </div>

  </div>
</template>
<script>
  import { GetQueryString } from '@/utils'
  export default {
    name: 'login',
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
          code: '',
          pwd: '',
          pwd2: '',
          hasPhone: false, //判断手机是否被注册
          x: 0
        },
        count: 60,
        token: true,
        fail: true,
        isEmail: false,
        isMobile: false, // 是否手机号登录
        isWechat: false, // 是否微信进入
        isEdit: false  // 是否是修改
      }
    },
    computed: {
      error(){
        if (this.form.typeId == '2') {
          if (this.isMobile) {
            return {
              company: '',
              mark: '',
              companyIdNum: '',
              userName: '',
              idCard: '',
            }
          } else if (this.isWechat) {
            return {
              company: '',
              mark: '',
              companyIdNum: '',
              userName: '',
              idCard: '',
              pwd: '',
              pwd2: ''
            }
          } else {
            return {
              company: '',
              mark: '',
              companyIdNum: '',
              userName: '',
              idCard: '',
              phone: '',
              code: ''
            }
          }
        } else {
          if (this.isMobile) {
            return {
              userName: '',
            }
          } else if (this.isWechat) {
            return {
              userName: '',
              phone: '',
              code: '',
              pwd: '',
              pwd2: ''
            }
          } else {
            return {
              userName: '',
              phone: '',
              code: ''
            }
          }
        }
      }
    },
    watch: {
      'form.typeId': {
        handler(){
          this.error.company = '',
            this.error.mark = '',
            this.error.companyIdNum = '',
            this.error.userName = '',
            this.error.idCard = '',
            this.error.pwd = '',
            this.error.pwd2 = ''
          this.error.phone = '',
            this.error.code = ''
        },
        deep: true
      },
      form: {
        handler(val){
          if (this.form.typeId == '2') {
            if (val.company == '') {
              this.error.company = this.$t('message.Required_fields')
              return
            } else {
              this.error.company = ''
            }
            let re = /^[a-z]+$/i
            if (val.mark == '') {
              this.error.mark = this.$t('message.Required_fields')
              return
            } else if (!re.test(val.mark)) {
              this.error.mark = this.$t('message.Letter_only')
              return
            } else {
              this.error.mark = ''
            }

            if (val.companyIdNum == '') {
              this.error.companyIdNum = this.$t('message.Required_fields')
              return
            } else if (val.companyIdNum.toString().length !== 15 && val.companyIdNum.toString().length !== 18) {
              this.error.companyIdNum = this.$t('message.Incorrect_format')
              return
            } else {
              this.error.companyIdNum = ''
            }
            if (val.userName == '') {
              this.error.userName = this.$t('message.Required_fields')
              return
            } else {
              this.error.userName = ''
            }
            let re2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}\w{1}$/
            if (val.idCard == '') {
              this.error.idCard = this.$t('message.Required_fields')
              return
            } else if (!re2.test(val.idCard)) {
              this.error.idCard = this.$t('message.Incorrect_format')
              return
            } else {
              this.error.idCard = ''
            }

            if (!this.isMobile) { // 是手机注册或登录就不用再验证手机
              let re3 = /^[1][3,4,5,7,8][0-9]{9}$/
              if (val.phone == '') {
                this.error.phone = this.$t('message.Required_fields')
                return
              } else if (!re3.test(val.phone)) {
                this.error.phone = this.$t('message.Incorrect_format')
                return
              } else if (val.hasPhone) {
                this.error.phone = this.$t('message.Already_exists')
                return
              } else {
                this.error.phone = ''
              }
              if (val.code == '') {
                this.error.code = this.$t('message.Required_fields')
                return
              } else {
                this.error.code = ''
              }
            }
            if (this.isWechat) { // 是微信注册 得填写密码
              if (val.pwd == '') {
                this.error.pwd = this.$t('message.Required_fields')
                return
              } else if (val.pwd.length < 6) {
                this.error.pwd = this.$t('message.Minimum_6')
                return
              } else {
                this.error.pwd = ''
              }
              if (val.pwd2 == '') {
                this.error.pwd2 = this.$t('message.Required_fields')
                return
              } else if (val.pwd2 != val.pwd) {
                this.error.pwd2 = this.$t('message.Entered_differ')
                return
              } else {
                this.error.pwd2 = ''
              }
            }
          } else {
            if (this.isMobile) {
              if (val.userName == '') { // 手机
                this.error.userName = this.$t('message.Required_fields')
              } else {
                this.error.userName = ''
              }
            } else if (this.isWechat) { // 微信验证规则
              if (val.userName == '') {
                this.error.userName = ''
//                this.error.userName = '必填项'
              } else {
                this.error.userName = ''
              }
              let re3 = /^[1][3,4,5,7,8][0-9]{9}$/
              if (val.phone == '') {
                this.error.phone = ''
                return
              } else if (!re3.test(val.phone)) {
                this.error.phone = this.$t('message.Incorrect_format')
                return
              } else if (val.hasPhone) {
                this.error.phone = this.$t('message.Already_exists')
                return
              } else {
                this.error.phone = ''
              }
              if (val.phone.length == 11 && val.code == '') {  // 以下填写了手机号才是必填项
                this.error.code = this.$t('message.Required_fields')
                return
              } else {
                this.error.code = ''
              }

              if (val.phone.length == 11 && val.pwd == '') {
                this.error.pwd = this.$t('message.Required_fields')
                return
              } else if (val.phone.length == 11 && val.pwd.length < 6) {
                this.error.pwd = this.$t('message.Minimum_6')
                return
              } else {
                this.error.pwd = ''
              }
              if (val.phone.length == 11 && val.pwd2 == '') {
                this.error.pwd2 = this.$t('message.Required_fields')
                return
              } else if (val.pwd2 != val.pwd) {
                this.error.pwd2 = this.$t('message.Entered_differ')
                return
              } else {
                this.error.pwd2 = ''
              }

            } else { // 邮箱验证规则
              if (val.userName == '') {
                this.error.userName = this.$t('message.Required_fields')
                return
              } else {
                this.error.userName = ''
              }
              let re3 = /^[1][3,4,5,7,8][0-9]{9}$/
              if (val.phone == '') {
                this.error.phone = this.$t('message.Required_fields')
                return
              } else if (!re3.test(val.phone)) {
                this.error.phone = this.$t('message.Incorrect_format')
                return
              }else if (val.hasPhone) {
                this.error.phone = this.$t('message.Already_exists')
                return
              }  else {
                this.error.phone = ''
              }
              if (val.code == '') {
                this.error.code = this.$t('message.Required_fields')
                return
              } else {
                this.error.code = ''
              }
            }
          }

          console.log(Object.values(this.error))
          Object.values(this.error).map(item => {
            if (item === '') {
              this.fail = false
            } else {
              this.fail = true
            }
          })

        },
        deep: true
      }
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
          let data
          if (this.form.typeId == 2) {
            data = {
              account_type: this.form.typeId,
              company_name: this.form.company,
              comp_eng_short_name: this.form.mark,
              business_license_number: this.form.companyIdNum,
              personName: this.form.userName,
              personSex: this.form.idCard.substring(16, 1) % 2 ? '1' : '0',
              idCard: this.form.idCard,
              telephone: this.form.phone,
              promotionTableName: GetQueryString('promotionTableName') || '',
              promotionTableId: GetQueryString('promotionTableId') || '',
              email: GetQueryString('e') || '',
              code: this.form.code,
              source: GetQueryString('source') || ''
            }
          } else {
            data = {
              account_type: this.form.typeId,
              personName: this.form.userName,
              personSex: this.form.sex,
              telephone: this.form.phone,
              promotionTableName: GetQueryString('promotionTableName') || '',
              promotionTableId: GetQueryString('promotionTableId') || '',
              email: GetQueryString('e') || '',
              code: this.form.code,
              source: GetQueryString('source') || ''
            }
          }
          if (this.isMobile) { // 手机注册改变来源
            data.source = 'telephone'
          }
          if (this.isWechat) { // 微信注册添加密码
            data.password = this.form.pwd
          }
          if (this.form.typeId == '1') { // 个人的话性别按照用户选择赋值
            data.personSex = this.form.sex
          }
          this.$api.POST_USER_INFO(data).then(res => {
            this.loading = false
            if (res.code === 0) {
              if (res.state !== '1') { // 验证码不通过
                alert(res.info)
                return
              }
              let url = window.location.href
              if (window.location.search === '') {
                url = window.location.href
              } else {
                url = url.split(window.location.search)[0]
              }
              if (this.isWechat) {
                url = url.replace('type', 'index')
                window.location.href = url
              } else {
                url = url.replace('type', 'login')
                window.location.href = url
              }
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
//        console.log('biu....')
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
      checkToken () {
        let data = {
          token: GetQueryString('token') || '',
          e: GetQueryString('e') || '',
          p: GetQueryString('p') || ''
        }
        // 如果有source=email 就是从邮件来的 就必须验证token

        if (GetQueryString('source') && GetQueryString('source') == 'email') {
          this.isEmail = true
          this.$api.CHECK_TOKEN(data).then(res => {
            if (res.code === 0) {
              if (res.state === '1') {
                this.token = true
                console.log('token有效')
              } else {
                console.log('token无效')
                this.token = false
              }
            }
          })
        } else if (GetQueryString('source') && GetQueryString('source') == 'wechat') {
          this.isEmail = false
          this.isWechat = true
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
        } else {
          this.isEmail = false
          if (GetQueryString('edit') && GetQueryString('edit') == '1') {
            this.isEdit = true
            this.isWechat = false
            this.isMobile = false
            this._getRegisterInfo()
          } else {
            this.isEdit = false
            this.checkMobile()
          }

        }
      },
      checkMobile () {
        this.$api.CHECK_BIND_MOBILE().then(res => {
          if (res.code === 0) {
            if (res.exist === 1) { // 是手机号登录(注册)
              this.isMobile = true
            } else {
              this.isMobile = false
            }
          } else {
            alert(JSON.stringify(res))
          }
        })
      },
      checkPhone (val) { // 判断手机是否被注册
        console.log("电话", val)
        if (val.length < 10)return
        this.$api.CHECK_PHONE({telephone: this.form.phone}).then(res => {
//          console.log(res)
          if (res.code === 0) {
            if (res.state == '0') {
              this.form.hasPhone = true
              this.$set(this.form, this.form.x, this.form.x++)
            } else {
              this.form.hasPhone = false
//              this.$set(this.form, this.form.x, this.form.x--)
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
            let {typeId, company, mark, companyIdNum, userName, idCard, sex, phone} = {
              typeId: data.accountType,
              company: data.companyName,
              mark: data.compEngShortName,
              companyIdNum: data.businessLicenseNumber,
              userName: data.personName,
              idCard: data.idCard,
              sex: data.personSex === '男' ? '1' : '0',
              phone: data.telephone
            }
            this.form = {typeId, company, mark, companyIdNum, userName, idCard, sex, phone}
//            console.log(data, this.form)
          }
        })
      },
    },
    created () {

    },
    activated(){
      this.checkToken()
//      if (GetQueryString('edit') && GetQueryString('edit') == -1) { // 修改跳转到这
//// 修改的时候隐藏类型选择
//        this.isWechat = false
//        this.isMobile = false
//        this.isEdit = true
//        this._getRegisterInfo()
//      } else { //  信息不全的跳转 不是修改
//        this.isEdit = false
//        if (GetQueryString('source') && GetQueryString('source') == 'email') { // 带source=email的验证token
//          this.checkToken()
//        } else if (GetQueryString('source') && GetQueryString('source') == 'wechat') { // wechat
//          this.isWechat = true
//          // 微信固定跳转的这个页面需要判断信息是否完整，完整就跳转首页 不完整留在此页
//          this.$api.CHECK_ACCOUNT().then(res => { // 判断注册信息是否完善
//            if (res.code === 0) {
//              if (res.state == 4) { // 不完善
//
//              } else {
//                this.$router.push('/index');
//              }
//            } else {
//              alert(JSON.stringify(res))
//            }
//          })
//        } else {
//          this.isWechat = false
//          this.checkMobile() // 验证是否手机号登录
//        }
//
//      }
    },
    mounted(){
//      this.checkToken()
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
