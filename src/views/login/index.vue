<template>
    <!-- 大盒子 有且只能有一个 -->
    <div class="login-container">
        <!-- 登陆表单 -->
        <el-form ref="loginForm" class="login-form" autocomplete="on">
            <!-- 标题 -->
            <div class="title-container">
                <h3 class="title">基于 Vue.js 和 Element UI 实现的一个后台前端解决方案</h3>
            </div>
            <!-- 用户名 -->
            <el-form-item>
                <span class="svg-container">
                    <svg-icon icon-class="user"></svg-icon>
                </span>
                <!-- AutoComplete控件就是指用户在文本框输入前几个字母或是汉字的时候，该控件就能从存放数据的文本或是数据库里将所有以这些字母开头的数据提示给用户 -->
                <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" tabindex="1"
                    autocomplete="on" type="text"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-tooltip v-model="capsTooltip" content="大写锁定打开" placement="right" manual>
                <el-form-item prop="password">
                    <span class="svg-container">
                        <svg-icon icon-class="password"></svg-icon>
                    </span>
                    <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
                        placeholder="请输入密码" name="password" tabindex="2" aria-autocomplete="on"
                        @keyup.native="checkCapslock" @blur="capsTooltip = false"
                        @keyup.enter.native="handleLogin"></el-input>
                    <span class="show-pwd" @click="showPwd">
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                    </span>
                </el-form-item>
            </el-tooltip>
            <!-- 登录按钮 -->
            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
                @click.native.prevent="handleLogin">登录</el-button>
            <div style="position:relative">
                <div class="tips">
                    <span>Username : admin</span>
                    <span>Password : any</span>
                </div>
                <div class="tips">
                    <span style="margin-right:18px;">Username : editor</span>
                    <span>Password : any</span>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'Login',
    components: {},
    data() {
        return {
            loginForm: {
                username: 'admin',
                password: '111111'
            },
            passwordType: 'password',
            capsTooltip: false,
            loading: false
        }
    },
    methods: {
        checkCapslock(e) {
            const { key } = e
            this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    this.$store.dispatch('user/login', this.loginForm).then(() => {
                        this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
                        this.loading = false
                    }).catch(() => {
                        this.loading = false
                    })
                } else {
                    console.log("提交错误！")
                    return false
                }
            })
        },
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = ''
            } else {
                this.passwordType = 'password'
            }
            this.$nextTick(() => {
                this.$refs.password.focus()
            })
        }
    }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
    }
}

/* reset element-ui css */
.login-container {
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
            color: $light_gray;
            height: 47px;
            caret-color: $cursor;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
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

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;
    }

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
}
</style>
