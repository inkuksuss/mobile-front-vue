<script lang="ts">
import { computed, defineComponent } from "vue";
import MobileButton from "@/components/common/MobileButton.vue";
import { POPUP_TYPE, StoreMutType, useStore } from "@/store";

export default defineComponent({
  name: "Header",
  components: { MobileButton },
  setup() {
    const store = useStore();
    const compPopup = computed(() => store.state.popup);

    const changePopup = (): void => {
      store.commit(
        StoreMutType.setPopup,
        compPopup.value === POPUP_TYPE.NAVIGATION
          ? POPUP_TYPE.NONE
          : POPUP_TYPE.NAVIGATION
      );
    };

    return {
      POPUP_TYPE,
      compPopup,
      changePopup,
    };
  },
});
</script>
<template>
  <header>
    <div class="header-wrapper">
      <div class="header-logo">
        <span>모바일응용실무</span>
      </div>
      <div class="header-btn">
        <mobile-button
          v-if="compPopup === POPUP_TYPE.NAVIGATION"
          class="header-icon-wrapper"
          @click="changePopup"
        >
          <font-awesome-icon icon="xmark" />
        </mobile-button>
        <mobile-button v-else class="header-icon-wrapper" @click="changePopup">
          <font-awesome-icon icon="bars" />
        </mobile-button>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
