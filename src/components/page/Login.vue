<template>
    <div class="login-wrap">
            <el-form class="content" :model="param" :rules="rules" ref="login" label-width="0px">
                <div class="title">X-ERP系统</div>
                <el-form-item prop="username">
                    <span class="svg-container">
                        <i class="el-icon-user-solid" />
                    </span>
                    <el-input v-model="param.username" name="username" type="username" auto-complete="on" placeholder="账号" />
                </el-form-item>
                <el-form-item prop="password">
                    <span class="svg-container">
                        <i class="el-icon-unlock" />
                    </span>
                    <el-input
                    :type="textType"
                    v-model="param.password"
                    name="password"
                    auto-complete="on"
                    placeholder="密码"
                    @keyup.enter.native="handleLogin" />
                    <span class="show-pwd" @click="showPwd">
                        <i class="el-icon-view" />
                    </span>
                </el-form-item>
                <el-form-item>
                    <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="Login">
                    登录
                    </el-button>
                </el-form-item>
            </el-form>
    </div>
</template>

<script>
export default {
    data() {
      const usrValid = (rule, value, callback) => {
        if (value.length < 5) {
            callback(new Error('账号名不能小于5位'))
        } else {
            callback()
        }
      }
      return {
        textType:"password",
        param: {
            username: 'admin',
            password: '123456',
        },
        rules: {
            username: [{ required: true, trigger: 'blur', validator: usrValid }],
            password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        }
      };
    },
    methods: {
        Login() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    this.$message.success('登录成功');
                    localStorage.setItem('x_username', this.param.username);
                    this.$router.push('/');
                }
            });
        },
        showPwd() {
        if (this.textType === 'password') {
            this.textType = ''
        } else {
            this.textType = 'password'
        }
        },
    }
  }
</script>

<style lang="scss" scoped>
.login-wrap {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #2d3a4b;  
}
.content {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;  
}
.title{
    font-size: 26px;
    font-weight: 400;
    color: #eee;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
}
.svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
}
.show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
}
</style>

<style rel="stylesheet/scss" lang="scss">
.login-wrap {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #eee;
      height: 47px;
      &:-webkit-autofill { // 修改chrome浏览器自动填充的样式
        -webkit-box-shadow: 0 0 0px 1000px #2d3a4b inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>