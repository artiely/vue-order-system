<template>
  <div class="login">
    <scroller class="page-content">
      <div class="wrapper">
        <mt-field placeholder="邮箱" type="email" v-validate="'required|email'" @blur.native="blur"
                  :class="{'is-danger': errors.has('email') }" name="email" v-model="email"></mt-field>
        <div v-show="errors.has('email')" class="help is-danger">邮箱格式错误</div>
        <div v-if="hasEmail" class="help is-danger">邮箱已存在</div>

        <mt-field placeholder="密码" type="password" v-validate="'required|min:6'" name="pwd" v-model="pwd"></mt-field>
        <div v-show="errors.has('pwd')" class="help is-danger">密码至少6位</div>

        <mt-field placeholder="确认密码" type="password" name="pwd2" v-model="pwd2"></mt-field>
        <div v-if="isDanger" class="help is-danger">密码不一致</div>
        <button class="Button--primary Button--blue" @click="register">注册</button>
      </div>
    </scroller>
  </div>
</template>
<script>
  import { GetQueryString } from '@/utils'
  export default {
    name: 'login',
    data () {
      return {
        pwd: '',
        pwd2: '',
        email: '',
        isDanger: false,
        hasEmail: false
      }
    },
    watch: {
      pwd: {
        handler(val){
          if (this.pwd2 !== '') {
            if (val !== this.pwd2) {
              this.isDanger = true
            } else {
              this.isDanger = false
            }
          }
        }
      },
      pwd2: {
        handler (val){
          if (this.pwd !== '') {
            if (val !== this.pwd) {
              this.isDanger = true
            } else {
              this.isDanger = false
            }
          }
        }
      }
    },
    methods: {
      back(){
        this.$router.back()
      },
      register () {
        this.$validator.validateAll().then((result) => {
          if (this.pwd !== this.pwd2) {
            this.isDanger = true
          }
          this.$api.CHECK_EMAIL({email: this.email}).then(res => {
            if (res.code === 0) {
              if (res.state === '-1') {
                this.hasEmail = true // 邮箱已存在
                return
              } else {
                this.hasEmail = false
                if (result && !this.isDanger) {
                  this.postInfo()
                  return;
                }
              }
            } else {
              alert(JSON.stringify(res))
            }
          })

        })
      },
      postInfo () {
        let url = window.location.href
        if (window.location.search === '') {
          url = window.location.href
        } else {
          url = url.split(window.location.search)[0]
        }
        url = url.replace('register', 'type')
        let data = {
          email: this.email,
          password: this.pwd,
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
      }
    },
    mounted(){

    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less" type="text/less">
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
