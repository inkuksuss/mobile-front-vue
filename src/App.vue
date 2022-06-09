<script lang="ts">
import { StoreMutType, useStore } from "./store";
import { defineComponent, onMounted } from "vue";
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
import AppConfig from "./constants";
import PopupManager from "@/components/layout/popup/PopupManager.vue";

export default defineComponent({
  components: { PopupManager, Footer, Header },
  setup() {
    const store = useStore();

    const setWindowResolution = () => {
      store.commit(
        StoreMutType.setResolution,
        window.innerWidth < 768 ? "mobile" : "web"
      );
    };

    const handleResize = () => {
      setWindowResolution();
    };

    window.addEventListener("resize", handleResize);

    onMounted(() => {
      setWindowResolution();
    });
    return {
      store,
    };
  },
});
</script>

<template>
  <Header />
  <div class="page">
    <router-view />
    <popup-manager />
  </div>
  <Footer />
</template>

<style lang="scss">
@import "assets/css/app.scss";
</style>
