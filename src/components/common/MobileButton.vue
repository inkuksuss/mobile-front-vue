<script lang="ts">
import { defineComponent, PropType, toRefs } from "vue";

export default defineComponent({
  name: "MobileButton",
  props: {
    isDisabled: {
      type: Boolean as PropType<boolean>,
      isRequire: false,
      default: false,
    },
  },

  setup(props) {
    const disabled = toRefs(props).isDisabled;

    return { disabled };
  },
});
</script>

<template>
  <button class="mobile-button" :disabled="disabled"><slot></slot></button>
</template>

<style scoped></style>
