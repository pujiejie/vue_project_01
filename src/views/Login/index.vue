<script>
import { v4 as uid } from 'uuid';
import { login } from '@/api/user';

const validateUsername = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入用户名'))
    } else if (!/\w{6,24}/g.test(value)) {
        callback(new Error('用户名格式错误 请重新编写'))
    } else {
        callback()
    }
}

const validatePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else if (!/\w{6,24}/g.test(value)) {
        callback(new Error('密码格式错误 请重新编写'))
    } else {
        callback()
    }
}

const validateText = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入验证码'))
    } else {
        callback()
    }
}
export default {
    data() {
        return {
            ruleForm: {
                username: '',
                password: '',
                text: ''
            },
            rules: {
                username: [{ validator: validateUsername, trigger: 'blur' }],
                password: [{ validator: validatePassword, trigger: 'blur' }],
                text: [{ validator: validateText, trigger: 'blur' }],
            },
            uuid: '',
            codeImageUrl: '',
            timer: ''
        }
    },
    created() {
        this.changeImageUrl();

        this.timer = setInterval(() => {
            this.changeImageUrl()
        }, 1000 * 60)
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    methods: {
        submitForm() {
            this.$refs['ruleFormRef'].validate(async state => {
                if (state) {
                    // 验证通过 向后端发送请求 去登录
                    try {
                        const { data } = await login(Object.assign(this.ruleForm, { uuid: this.uuid }));
                        this.reRenderRuleForm();
                        if (data.status == 'error') {
                            this.$message.error(data.msg);
                        } else {
                            this.$message({
                                type: "success",
                                message: data.msg
                            })
                            localStorage.setItem('i', data.token);
                            this.$store.commit('saveToken', data.token);
                            this.$router.push('/');
                        }
                    } catch {
                        this.reRenderRuleForm();
                        this.$message.error(`服务器异常`);
                    }
                } else {
                    return false
                }
            })
        },
        reRenderImageUrl() {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.changeImageUrl()
            }, 1000 * 60)
        },
        changeImageUrl() {
            this.uuid = uid();
            this.codeImageUrl = `https://www.chengzier.cn:8000/api/generateimagecode?uuid=${this.uuid}`;
            this.reRenderImageUrl();
        },
        reRenderRuleForm() {
            this.ruleForm = {
                username: "",
                password: "",
                text: ""
            }
            this.changeImageUrl();
        }
    }
}
</script>

<template>
    <div class="login-container" ref="haha">
        <div class="login-form">
            <div class="title">
                <h1>后台管理系统</h1>
            </div>
            <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
                class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="验证码" prop="text">
                    <el-input v-model.number="ruleForm.text" maxlength="4" />
                    <img @click="changeImageUrl" :src="codeImageUrl" alt="">
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">Submit</el-button>
                    <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style scoped>
.login-container {
    background-color: #2d3a4b;
    height: inherit;
}

.login-form {
    width: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.login-form .title {
    text-align: center;
    color: #fff;
}
</style>
<style>
.login-form .el-form-item__label {
    color: #FFF;
}
</style>