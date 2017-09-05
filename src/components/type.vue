<template>
  <div class="login">
    <div class="page-content">
      <div class="wrapper" style="text-align: left">
        <mt-radio
          title="账号类型"
          v-model="form.typeId"
          :options="[{label:'企业',value:'2'},{label:'个人',value:'1'}]">
        </mt-radio>
        <div class="help">一个邮箱只能注册一种类型账号</div>
        <div v-if="form.typeId==2">
          <mu-text-field label="企业名称" v-model="form.company" :errorText="error.company" labelFloat/>
          <div class="help">需与当地政府颁发的商业许可证或企业注册证上的企业名称完全一致，信息审核成功后，企业名称不可修改</div>
          <mu-text-field label="标示" v-model="form.mark" :errorText="error.mark" labelFloat/>
          <div class="help">标示即为公司英文简称</div>
          <mu-text-field label="营业执照注册号" v-model="form.companyIdNum" :errorText="error.companyIdNum" labelFloat/>
          <div class="help">请输入15位营业执照号或18位的统一社会信用代码</div>
          <mu-text-field label="管理员姓名" v-model="form.userName" :errorText="error.userName" labelFloat/>
          <mu-text-field label="管理员身份证号" v-model="form.idCard" :errorText="error.idCard" labelFloat/>
          <mu-text-field label="管理员手机号" v-model="form.phone" :errorText="error.phone" labelFloat/>
          <div>
            <mu-text-field label="短信验证码" v-model="form.code" :errorText="error.code" labelFloat style="width: 60%"/>
            <span style="display: inline-block;width: 30%;text-align: center" @click="getMsgCode">点击获取</span>
          </div>
        </div>
        <div v-if="form.typeId==1">
          <mu-text-field label="管理员姓名" v-model="form.userName" :errorText="error.userName" labelFloat/>
          <mt-radio
            title="性别"
            v-model="form.sex"
            :options="[{label:'男',value:'1'},{label:'女',value:'0'}]">
          </mt-radio>
          <mu-text-field label="管理员手机号" v-model="form.phone" :errorText="error.phone" labelFloat/>
          <div>
            <mu-text-field label="短信验证码" v-model="form.code" :errorText="error.code" labelFloat style="width: 60%"/>
            <span style="display: inline-block;width: 30%;text-align: center" @click="getMsgCode">点击获取</span>
          </div>
        </div>
        <button class="Button--primary Button--blue" @click="handleSubmit">提交</button>
      </div>
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
          code: ''
        },
        token: true,
//        error: {
//          company: '',
//          mark: '',
//          companyIdNum: '',
//          userName: '',
//          idCard: '',
//          phone: '',
//          code:''
//        },
        fail: true
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
              this.error.company = '必填项'
            } else {
              this.error.company = ''
            }
            let re = /^[a-z]+$/i
            if (val.mark == '') {
              this.error.mark = '必填项'
            } else if (!re.test(val.mark)) {
              this.error.mark = '标示只能为字母'
            } else {
              this.error.mark = ''
            }

            if (val.companyIdNum == '') {
              this.error.companyIdNum = '必填项'
            } else if (val.companyIdNum.toString().length !== 15 && val.companyIdNum.toString().length !== 18) {
              this.error.companyIdNum = '请输入正确的营业执照注册号'
            } else {
              this.error.companyIdNum = ''
            }
            if (val.userName == '') {
              this.error.userName = '必填项'
            } else {
              this.error.userName = ''
            }
            let re2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/
            if (val.idCard == '') {
              this.error.idCard = '必填项'
            } else if (!re2.test(val.idCard)) {
              this.error.idCard = '格式错误'
            } else {
              this.error.idCard = ''
            }

            let re3 = /^[1][3,4,5,7,8][0-9]{9}$/
            if (val.phone == '') {
              this.error.phone = '必填项'
            } else if (!re3.test(val.phone)) {
              this.error.phone = '格式错误'
            } else {
              this.error.phone = ''
            }
            if (val.code == '') {
              this.error.code = '必填项'
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
              this.error.phone = '必填项'
            } else if (!re3.test(val.phone)) {
              this.error.phone = '格式错误'
            } else {
              this.error.phone = ''
            }
            if (val.code == '') {
              this.error.code = '必填项'
            } else {
              this.error.code = ''
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
          let data = {
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
            code: this.form.code
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
              url = url.replace('type', 'login')
              window.location.href = url
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
        console.log('biu....')
        let data = {
          telephone: this.form.phone,
          type: 0
        }
        this.$api.GET_MSG_CODE(data).then(res => {
          if (res.code === 0) {
            if (res.state === 1) {
              this.$Message.info('短信已发出，请查收')
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

        if ((GetQueryString('source') || '') !== 'email') {
          this.source = false
//          this._getRegisterInfo()
          console.log('修改')
          return
        } else {
          this.source = true
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
        }
      },
    },
    created () {
//      this.checkToken()
    },
    mounted(){
      this.checkToken()
    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less" type="text/less">
  .mu-text-field {
    width: 100%;
    padding-left: 10px;
  }

  .mu-text-field.error .mu-text-field-help {
    padding-left: 10px !important;
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
