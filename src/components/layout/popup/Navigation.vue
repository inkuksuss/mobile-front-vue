<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import MobileLink from "@/components/common/MobileLink.vue";
import { POPUP_TYPE, StoreMutType, useStore } from "@/store";
import AppConfig from "@/constants";
import { loadLocalData, removeLocalData } from "@/utils/common";
import { getApiClient } from "@/utils/apiCilent";
import { useRouter } from "vue-router";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Navigation",
  components: { MobileLink },
  setup() {
    const store = useStore();
    const router = useRouter();
    const showCrack = ref<boolean>(false);
    const showBoard = ref<boolean>(false);
    const loginState = ref<boolean>(false);
    const apiClient = getApiClient(AppConfig.API_SERVER, store);

    const changeCrackState = () => {
      if (showBoard.value) showBoard.value = false;
      showCrack.value = !showCrack.value;
    };

    const changeBoardState = () => {
      if (showCrack.value) showCrack.value = false;
      showBoard.value = !showBoard.value;
    };

    const closeNav = () => {
      store.commit(StoreMutType.setPopup, POPUP_TYPE.NONE);
    };

    const goLogin = () => {
      closeNav();
      router.push({ path: "/login" });
    };

    const goMyPage = () => {
      closeNav();
      router.push({ path: "/me" });
    };

    const goMain = () => {
      closeNav();
      router.push({ path: "/" });
    };

    const goSchedule = () => {
      closeNav();
      router.push({ path: "/schedule" });
    };

    const goCalendar = () => {
      closeNav();
      router.push({ path: "/calendar" });
    };

    const goExhibition = () => {
      closeNav();
      router.push({ path: "/exhibition" });
    };

    const goCommonPlace = () => {
      closeNav();
      router.push({ path: "/common-place" });
    };

    const doLogout = async () => {
      try {
        removeLocalData(AppConfig.KEY_LIST.CONST.LOGIN_TOKEN);
        store.commit(StoreMutType.setAuthToken, null);
        window.alert("로그아웃 완료");
        goLogin();
      } catch (e) {
        window.alert(e);
      }
    };

    onMounted(() => {
      const token = loadLocalData(AppConfig.KEY_LIST.CONST.LOGIN_TOKEN);
      if (token) loginState.value = true;
    });

    return {
      showCrack,
      showBoard,
      loginState,
      doLogout,
      changeCrackState,
      changeBoardState,
      closeNav,
      goLogin,
      goMyPage,
      goMain,
      goSchedule,
      goCalendar,
      goExhibition,
      goCommonPlace,
    };
  },
});
</script>
<template>
  <div class="nav-wrapper">
    <div v-if="loginState" class="nav-link-wrapper">
      <mobile-link href="#" @click="goMyPage">My Page</mobile-link>
    </div>
    <div v-else class="nav-link-wrapper">
      <mobile-link href="#" @click="goLogin">Login</mobile-link>
    </div>
    <div class="nav-link-wrapper">
      <mobile-link href="#" @click="goMain">Home</mobile-link>
    </div>
    <div class="nav-link-wrapper">
      <div @click="changeCrackState">Crack</div>
    </div>
    <ul
      :class="
        showCrack ? 'nav-link-sub-wrapper active' : 'nav-link-sub-wrapper'
      "
    >
      <li>
        <mobile-link href="#" @click="goSchedule">Schedule</mobile-link>
      </li>
      <li>
        <mobile-link href="#" @click="goCalendar">Calendar</mobile-link>
      </li>
    </ul>
    <div class="nav-link-wrapper">
      <div @click="changeBoardState">Board</div>
    </div>
    <ul
      :class="
        showBoard ? 'nav-link-sub-wrapper active' : 'nav-link-sub-wrapper'
      "
    >
      <li>
        <mobile-link href="#" @click="goExhibition">Exhibition</mobile-link>
      </li>
      <li>
        <mobile-link href="#" @click="goCommonPlace">Common place</mobile-link>
      </li>
    </ul>
    <div v-if="loginState" class="nav-link-wrapper">
      <div @click="doLogout">Logout</div>
    </div>
  </div>
</template>

<style scoped></style>
