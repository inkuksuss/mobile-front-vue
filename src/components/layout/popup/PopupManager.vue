<script lang="ts">
import { computed, defineComponent } from "vue";
import Navigation from "@/components/layout/popup/Navigation.vue";
import { POPUP_TYPE, useStore } from "@/store";

export default defineComponent({
  name: "PopupManager",
  components: { Navigation },
  setup() {
    const store = useStore();
    const compPopup = computed(() => store.state.popup);
    return {
      compPopup,
      POPUP_TYPE,
    };
  },
});
</script>
<template>
  <div class="popup-wrapper">
    <navigation v-if="compPopup === POPUP_TYPE.NAVIGATION" />
    <div v-else style="display: none"></div>
  </div>
</template>

<style scoped></style>
