<template>
  <div class="container">
    <a-form-model
      ref="loginForm"
      :model="form.model"
      :rules="form.rules"
      layout="vertical"
      class="form-model"
      @keyup.enter.native="
        form.needAuthCode ? handleLogin() : handleLoginClick()
      "
    >
      <a-form-model-item
        v-if="!form.needAuthCode"
        class="animated fadeInUp"
        :style="{ 'animation-delay': '0.1s' }"
        prop="username"
      >
        <a-input placeholder="用户名/邮箱" v-model="form.model.username">
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item
        v-if="!form.needAuthCode"
        class="animated fadeInUp"
        :style="{ 'animation-delay': '0.2s' }"
        prop="password"
      >
        <a-input
          v-model="form.model.password"
          type="password"
          placeholder="密码"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item
        v-if="form.needAuthCode"
        class="animated fadeInUp"
        :style="{ 'animation-delay': '0.1s' }"
        prop="authcode"
      >
        <a-input
          placeholder="两步验证码"
          v-model="form.model.authcode"
          :maxLength="6"
        >
          <a-icon
            slot="prefix"
            type="safety-certificate"
            style="color: rgba(0,0,0,.25)"
          />
        </a-input>
      </a-form-model-item>
      <a-form-model-item
        class="animated fadeInUp"
        :style="{ 'animation-delay': '0.3s' }"
      >
        <a-button
          :loading="form.logging"
          type="primary"
          :block="true"
          @click="form.needAuthCode ? handleLogin() : handleLoginClick()"
          >{{ buttonName }}</a-button
        >
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import { haloAdminClient, doAuthorize } from "@/core/haloSdk";
export default {
  name: "LoginForm",
  data() {
    const authcodeValidate = (rule, value, callback) => {
      if (!value && this.form.needAuthCode) {
        callback(new Error("* 请输入两步验证码"));
      } else {
        callback();
      }
    };
    return {
      form: {
        model: {
          authcode: null,
          password: null,
          username: null
        },
        rules: {
          username: [
            {
              required: true,
              message: "* 用户名/邮箱不能为空",
              trigger: ["change"]
            }
          ],
          password: [
            { required: true, message: "* 密码不能为空", trigger: ["change"] }
          ],
          authcode: [{ validator: authcodeValidate, trigger: ["change"] }]
        },
        needAuthCode: false,
        logging: false
      }
    };
  },
  computed: {
    buttonName() {
      return this.form.needAuthCode ? "验证" : "登录";
    }
  },
  methods: {
    handleLoginClick() {
      const _this = this;
      _this.$refs.loginForm.validate(valid => {
        if (valid) {
          _this.form.logging = true;
          console.log("login pre check");
          haloAdminClient
            .needMFACode({ ...this.form.model })
            .then(response => {
              const data = response.data;
              if (data && data.needMFACode) {
                _this.form.needAuthCode = true;
                _this.form.model.authcode = null;
              } else {
                _this.handleLogin();
              }
            })
            .catch(error => {
              this.$message.error(error.message);
            })
            .finally(() => {
              setTimeout(() => {
                _this.form.logging = false;
              }, 300);
            });
        }
      });
    },
    handleLogin() {
      const _this = this;
      _this.$refs.loginForm.validate(valid => {
        if (valid) {
          _this.form.logging = true;
          console.log("login...");
          // 记住用户凭证
          doAuthorize(this.form.model)
            .then(() => {
              _this.form.logging = false;
              this.$router.replace({ name: "Dashboard" });
            })
            .catch(err => {
              this.$message.error(err.message);
            });
        }
      });
    }
  }
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
.form-model {
  width: 500px;
  margin: 0 auto;
  position: relative;
  top: 30%;
  padding: 30px 15px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 1px 20px #8c8c8c;
}
</style>
