<template>
  <div class="login">
    <div class="form-wrap">
      <a-form ref="loginRef" v-bind="layout">
        <a-form-item required>
          <label>用户名</label>
          <a-input autocomplete="off" />
        </a-form-item>

        <a-form-item>
          <label>密码</label>
          <a-input type="password" autocomplete="off" />
        </a-form-item>

        <a-form-item style="margin: 28px 0; width: 100%">
          <a-button block type="primary" html-type="submit">登录</a-button>
        </a-form-item>

        <a-form-item class="text-center fs-12">
          <a href="javascript:;" class="font-white">忘记密码 | </a>
          <router-link to="/register" class="font-white">注册</router-link>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
//要让 TypeScript 正确推断 Vue 组件选项中的类型，需要使用 defineComponent 全局方法定义组件
import { defineComponent, reactive, toRefs, onMounted } from "vue";
interface loginState {
  name: string;
  pass: string;
}

export default defineComponent({
  name: "Login",
  setup() {
    const state = reactive<any>({
      layout: {
        wrapperCol: { span: 24 },
      },
    });
    // const loginRef = ref();
    // const loginState: UnwrapRef<loginState> = reactive({
    //   pass: "",
    // });

    // const loginRules = {
    //   pass: [{ validator: validatePass, trigger: "change" }],
    //   checkPass: [{ validator: validatePass2, trigger: "change" }],
    // };

    return {
      ...toRefs(state),
    };
  },
});
</script>
<style lang="less" scoped>
.login {
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
