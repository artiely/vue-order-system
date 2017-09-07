<template>
  <div class="login">
    <div class="page-content">
      <div class="wrapper">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1">邮箱注册</mt-tab-item>
          <mt-tab-item id="2">手机号注册</mt-tab-item>
        </mt-navbar>
        <div style="background:#fff;">
          <div v-if="selected==1">
            <mu-text-field label="邮箱" v-model="form.email" type="email" :errorText="error.email" name="email" labelFloat   fullWidth @blur="checkEmail"/>
          </div>
          <div v-if="selected==2">
            <mu-text-field label="手机号" v-model="form.phone" type="number" :errorText="error.phone" name="phone"   labelFloat fullWidth @blur="checkPhone"/>
            <div style="text-align: left">
              <mu-text-field label="验证码" v-model="form.code" type="text" :errorText="error.code" name="code" labelFloat   style="width: 60%"/>
              <span style="display: inline-block;width: 30%;text-align: center" @click="getMsgCode">点击获取</span>
            </div>
          </div>
          <mu-text-field label="密码" v-model="form.pwd" type="password" :errorText="error.pwd" name="pwd" labelFloat    fullWidth/>

          <mu-text-field label="确认密码" v-model="form.pwd2" type="password" :errorText="error.pwd2" name="pwd2" labelFloat  fullWidth/>

          <button class="Button--primary Button--blue" @click="register">注册</button>
        </div>
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
        selected: '1',
        form: {
          pwd: '',
          pwd2: '',
          email: '',
          phone: '',
          code: ''
        },
        fail: true,
        isDanger: false,
        hasEmail: false
      }
    },
    computed: {
      error(){
        if (this.selected == '1') {
          return {
            pwd: '',
            pwd2: '',
            email: '',
          }
        } else {
          return {
            pwd: '',
            pwd2: '',
            phone: '',
            code: ''
          }
        }
      }
    },
    watch: {
      form: {
        handler(val){
          if (this.selected == '1') {
            let re = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            if (val.email == '') {
              this.error.email = '必填项'
            } else if (!re.test(val.email)) {
              this.error.email = '格式错误'
            } else {
              this.error.email = ''
            }
          } else {
            if (val.phone == '') {
              this.error.phone = '必填项'
            } else if (val.phone.toString().length != 11) {
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

          if (val.pwd == '') {
            this.error.pwd = '必填项'
          } else if (val.pwd.length < 6) {
            this.error.pwd = '至少6位'
          } else {
            this.error.pwd = ''
          }
          if (val.pwd2 == '') {
            this.error.pwd2 = '必填项'
          } else if (val.pwd2 != val.pwd) {
            this.error.pwd2 = '密码不一致'
          } else {
            this.error.pwd2 = ''
          }

          Object.values(this.error).map(item => {
            if (item == '') {
              this.fail = false
            } else {
              this.fail = true
            }
          })
          console.log(Object.values(this.error))
        },
        deep: true
      },
    },

    methods: {
      back(){
        this.$router.back()
      },
      checkEmail () {
        this.$api.CHECK_EMAIL({email: this.form.email}).then(res => {
          if (res.code === 0) {
            if (res.state === '-1') {
              this.error.email = '邮箱已经注册'
            } else {
              this.error.email = ''
            }
          } else {
            alert(JSON.stringify(res))
          }
        })
      },
      checkPhone () {
        this.$api.CHECK_PHONE({telephone: this.form.phone}).then(res => {
          console.log(res)
          if (res.code === 0) {
            if (res.state === '0') {
              this.error.phone = '已经注册'
            } else {
              this.error.phone = ''
            }
          } else {
            alert(JSON.stringify(res))
          }
        })
      },
      register () {
        if (!this.fail) {
          if (this.selected == '1') { // 邮箱
            this._postInfo()
          } else { // 手机号
            this._postInfoByMobile()
          }

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
              this.$toast('短信已发出，请查收')
            } else {
              alert(JSON.stringify(res))
            }
          } else {
            alert(JSON.stringify(res))
          }
        })
      },
      _postInfo () {
        let url = window.location.href
        if (window.location.search === '') {
          url = window.location.href
        } else {
          url = url.split(window.location.search)[0]
        }
        url = url.replace('register', 'type')
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
            alert(`激活信息已发送至${this.email},请注意查收并及时激活。`)
          }
        })
      },
      _postInfoByMobile () {
        let data = {
          telephone: this.form.phone,
          code: this.form.code,
          password: this.form.pwd
        }
        this.$api.REGISTER_BY_MOBILE(data).then(res => {
          if (res.code === 0) {
            if (res.state === '1') { // 成功
              this.router.push('/type')
            } else if (res.state == '2') { // 不正确
              alert('验证码错误')
              this.error.code = '验证码错误'
            } else if (res.state == '3') { // 过期
              alert('验证码过期')
              this.error.code = '验证码过期'
            }
          }
        })
      }
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

  .help.is-danger {
    font-size: 10px;
    color: #f00;
    text-align: left;
    padding-left: 10px;
  }

</style>
