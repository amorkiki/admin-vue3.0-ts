<template>
  <div class="register">
    <div class="form-wrap">
      <a-form
        ref="loginRef"
        v-bind="layout"
        @finish="userLogin"
        :model="loginForm"
        :rules="loginRules"
      >
        <a-form-item name="username">
          <label>用户名</label>
          <a-input type="text" v-model:value="loginForm.username" autocomplete="off" />
        </a-form-item>

        <a-form-item name="userpass">
          <label>密码</label>
          <a-input
            type="password"
            v-model:value="loginForm.userpass"
            autocomplete="off"
          />
        </a-form-item>

        <a-form-item name="userconfirm">
          <label>确认密码</label>
          <a-input
            type="password"
            v-model:value="loginForm.userconfirm"
            autocomplete="off"
          />
        </a-form-item>

        <a-form-item name="usercode">
          <label>验证码</label>
          <a-row type="flex" justify="space-between">
            <a-col :span="15">
              <a-input
                maxlength="6"
                v-model:value="loginForm.usercode"
                type="text"
                autocomplete="off"
              />
            </a-col>
            <a-col :span="8">
              <a-button
                block
                type="primary"
                @click="getCode"
                :disabled="button_disabled"
                :loading="button_loading"
                >{{ button_text }}</a-button
              >
            </a-col>
          </a-row>
        </a-form-item>

        <a-form-item style="margin: 28px 0; width: 100%">
          <a-button block type="primary" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { message } from "ant-design-vue";
//要让 TypeScript 正确推断 Vue 组件选项中的类型，需要使用 defineComponent 全局方法定义组件
import { defineComponent, reactive, toRefs, onMounted } from "vue";
// 导入验证类的方法
import { checkPhone, checkPass, checkCode } from "../../utils/vertification";

// interface loginForm {
//   name: string;
//   pass: string;
//   confirm: string;
// }

export default defineComponent({
  name: "Register",
  setup() {
    //验证用户名
    const checkUsername = async (
      rule: any,
      value: string,
      callback: any
    ): Promise<any> => {
      if (!value) {
        return Promise.reject("请输入用户名");
      } else if (!checkPhone(value)) {
        return Promise.reject("请输入正确的手机号格式");
      } else {
        //callback
        return Promise.resolve();
      }
    };

    // 验证密码
    const checkPassword = async (
      rule: any,
      value: string,
      callback: any
    ): Promise<void> => {
      const confirm = state.loginForm.confirm;
      if (!value) {
        return Promise.reject("您还没输入密码呀");
      } else if (!checkPass(value)) {
        return Promise.reject("密码为6~20位的，数字+英文");
      } else if (value && confirm && value != confirm) {
        // 必须是两个密码都存在的情况下，才会检测密码是否一致。否则不检测
        return Promise.reject("两次密码不一致");
      } else {
        return Promise.resolve();
      }
    };
    //验证重置密码
    const checkConfrim = async (
      rule: any,
      value: string,
      callback: any
    ): Promise<void> => {
      const pas = state.loginForm.pass;
      if (!value) {
        return Promise.reject("您还没输入密码呀");
      } else if (!checkPass(value)) {
        return Promise.reject("密码为6~20位的，数字+英文");
      } else if (pas && value && pas != value) {
        return Promise.reject("两次密码不一致");
      } else {
        return Promise.resolve();
      }
    };

    // 验证验证码
    const checkCodes = async (rule: any, value: string, callback: any): Promise<void> => {
      if (!value) {
        return Promise.reject("请输入验证码");
      } else if (!checkCode(value)) {
        return Promise.reject("验证码为6为数字+英文");
      } else {
        return Promise.resolve();
      }
    };

    const state = reactive<any>({
      layout: {
        wrapperCol: { span: 24 },
      },
      loginForm: {
        username: "",
        userpass: "",
        userconfirm: "",
        usercode: "",
      },
      loginRules: {
        username: [{ validator: checkUsername, trigger: "change" }],
        userpass: [{ validator: checkPassword, trigger: "change" }],
        userconfirm: [{ validator: checkConfrim, trigger: "change" }],
        usercode: [{ validator: checkCodes, trigger: "change" }],
      },
    });

    const dataItem = reactive({
      // 获取验证码按钮
      button_text: "获取验证码",
      button_loading: false,
      button_disabled: false,
      sec: 60,
      // 定时器
      timer: null,
    });

    //获取验证码
    const getCode = (value: string) => {
      // 用户名不存在的情况
      if (!state.loginForm.username) {
        message.error("用户名不能为空");
        return false;
      }
      // 优先判断定时器是否存在，存在则先清除后再开启
      dataItem.timer && clearInterval(Number(dataItem.timer));
      // 开启定时器
      dataItem.timer = <any>setInterval(() => {
        const s = dataItem.sec--;
        dataItem.button_text = `${s}秒`;
        if (s <= 0) {
          clearInterval(Number(dataItem.timer));
          dataItem.button_text = `重新获取`;
        }
      }, 1000);
    };

    // 提交表单
    const userLogin = (value: any): void => {
      console.log(value);
    };

    return {
      ...toRefs(state),
      ...toRefs(dataItem),
      userLogin,
      getCode,
    };
  },
});
</script>
<style lang="less" scoped>
.register {
  width: 100vw;
  height: 100vh;
  background-color: #282828;
  display: flex;
  align-items: center;
  justify-content: center;
  .form-wrap {
    width: 280px;
    color: #fff;
    label {
      color: #fff;
      font-size: 14px;
      display: block;
    }
  }
}
</style>
