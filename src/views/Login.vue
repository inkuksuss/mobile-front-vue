<script lang="ts">
import { defineComponent, ref } from "vue";
import MobileInput from "@/components/common/MobileInput.vue";
import MobileLink from "@/components/common/MobileLink.vue";
import { LoginForm, ResultResponse } from "@/types/types";
import MobileButton from "@/components/common/MobileButton.vue";
import { getApiClient } from "@/utils/apiCilent";
import { StoreMutType, useStore } from "@/store";
import AppConfig from "@/constants";
import { useRouter } from "vue-router";
import { loadLocalData, saveLocalData } from "@/utils/common";

export default defineComponent({
  name: "Login",
  components: { MobileButton, MobileLink, MobileInput },
  setup() {
    const store = useStore();
    const router = useRouter();
    const apiClient = getApiClient(AppConfig.API_SERVER, store);
    const email = ref<string>("");
    const password = ref<string>("");

    const doLogin = async () => {
      if (formCheck()) {
        try {
          const response: ResultResponse = await apiClient.post(
            "/login",
            createForm()
          );
          if (response.data.resultCode === 0) {
            saveLocalData(
              AppConfig.KEY_LIST.CONST.LOGIN_TOKEN,
              response.data.data
            );
            store.commit(StoreMutType.setAuthToken, response.data.data);
            router.push({ path: "/" });
          } else {
            window.alert(response.data.resultMessage);
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        alert("form");
      }
    };

    const createForm = () => {
      return {
        memberEmail: email.value,
        memberPassword: password.value,
      };
    };

    const formCheck = (): boolean => {
      return true;
    };

    return {
      email,
      password,
      doLogin,
    };
  },
});
</script>

<template>
  <div class="login-wrapper">
    <mobile-input
      :model-value="email"
      @update:modelValue="email = $event"
      placeholder="이메일"
      type="text"
    />
    <mobile-input
      :model-value="password"
      @update:modelValue="password = $event"
      placeholder="비밀번호"
      type="password"
    />
    <mobile-button @click="doLogin">로그인</mobile-button>
    <mobile-button
      ><mobile-link class="link-join" href="/join"
        >회원가입</mobile-link
      ></mobile-button
    >
    <div class="link-wrapper">
      <mobile-link href="#">아이디 찾기</mobile-link>
      <span>&#10072;</span>
      <mobile-link href="#">비밀번호 찾기</mobile-link>
    </div>
  </div>
</template>

<style scoped></style>
