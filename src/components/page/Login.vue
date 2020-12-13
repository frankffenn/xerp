<template>
    <div class="login-wrap">
            <el-form class="content" :model="param" :rules="rules" ref="login" label-width="0px">
                <!-- <div class="title"></div> -->
                <h2 class="title">X-ERP系统</h2>
                <el-form-item prop="username" class="input">
                    <span class="svg-container">
                        <i class="el-icon-user-solid" />
                    </span>
                    <el-input v-model="param.username" name="username" type="username" auto-complete="on" placeholder="账号" />
                </el-form-item>
                <el-form-item prop="password" class="input">
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
                this.$router.push('/home');
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

<style rel="stylesheet">

.login-wrap {
    background-color: #DCE1EE;
    font-family: 'Muli', sans-serif;
    display: flex;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
    margin: 0;
}

.content {
    width: 520px;
    background-color:#EDEFF2;
    max-width: 100%;
    max-height: 300px;
    padding: 35px 35px 15px;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgb(0, 0, 0, 0.1);
    position: relative;
}

h2 {
    opacity: 0.5;
    font-family: inherit;
    letter-spacing: 5px;
    padding-bottom: 20px;
    color: #212145;
}

.svg-container {
    color: #889aa4;
    width: 30px;
    position: absolute;
    z-index: 1;
}

.show-pwd {
    position: absolute;
    right: 10px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
}

.input {
    background-color: #fff;
    border-radius: 5px;
}

.el-input input {
   padding-left: 40px;
   border: 0px;
   background: transparent;
}

input:-webkit-autofill {
    box-shadow: 0 0 0px 1000px #ffffff inset !important;
}
</style>
