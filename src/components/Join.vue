<template>
  <div class="login">
    <div class="page-content">
      <div class="wrapper" style="text-align: left;background:#fff;">
        <div>
          <div>
            <mu-text-field label="姓名" v-model="form.userName" :errorText="error.userName" labelFloat/>
            <mt-radio
              title="性别"
              v-model="form.sex"
              :options="[{label:'男',value:'1'},{label:'女',value:'0'}]">
            </mt-radio>

            <mu-text-field label="手机号" @blur="checkPhone" v-model="form.phone" :errorText="error.phone" labelFloat/>
            <div class="help">手机号为登录账号</div>
            <!--只有微信注册手机号才可以为登录账号-->
            <div>
              <mu-text-field label="短信验证码" v-model="form.code" :errorText="error.code" labelFloat style="width: 60%"/>
              <span style="display: inline-block;width: 30%;text-align: center" @click="getMsgCode">点击获取</span>
            </div>
            <mu-text-field label="密码" v-model="form.pwd" type="password" :errorText="error.pwd" name="pwd" labelFloat
                           fullWidth/>
            <mu-text-field label="确认密码" v-model="form.pwd2" type="password" :errorText="error.pwd2" name="pwd2"
                           labelFloat
                           fullWidth/>
          </div>
        </div>
        <div style="height: 40px;"></div>
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
          userName: '',
          sex: '1',
          phone: '',
          code: '',
          pwd: '',
          pwd2: '',
          x:0
        },
        fail: true,
      }
    },
    computed: {
      error(){
        return {
          userName: '',
          phone: '',
          code: '',
          pwd: '',
          pwd2: ''
        }
      }
    },
    watch: {
      form: {
        handler(val){

              if (val.userName == '') {
                this.error.userName = '必填项'
                return
              } else {
                this.error.userName = ''
              }
              let re3 = /^[1][3,4,5,7,8][0-9]{9}$/
              if (val.phone == '') {
                this.error.phone = '必填项'
                return
              } else if (!re3.test(val.phone)) {
                this.error.phone = '格式错误'
                return
              } else if (val.hasPhone) {
                this.error.phone = '手机号已被注册'
                return
              } else {
                this.error.phone = ''
              }
              if (val.code == '') {  // 以下填写了手机号才是必填项
                this.error.code = '必填项'
                return
              } else {
                this.error.code = ''
              }

              if (val.pwd == '') {
                this.error.pwd = '必填项'
                return
              } else if (val.pwd.length < 6) {
                this.error.pwd = '至少6位'
                return
              } else {
                this.error.pwd = ''
              }
              if (val.pwd2 == '') {
                this.error.pwd2 = '必填项'
                return
              } else if (val.pwd2 != val.pwd) {
                this.error.pwd2 = '密码不一致'
                return
              } else {
                this.error.pwd2 = ''
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
            personName: this.form.userName,
            personSex: this.form.sex,
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
//        console.log('biu....')
        let data = {
          telephone: this.form.phone,
          type: 0
        }
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
      checkPhone () { // 判断手机是否被注册
        this.$api.CHECK_PHONE({telephone: this.form.phone}).then(res => {
//          console.log(res)
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
      }
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
