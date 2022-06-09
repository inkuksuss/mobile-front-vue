<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "MobileImageSet",
  props: {
    src: {
      type: String as PropType<string>,
      required: true,
    },
    alt: {
      type: String as PropType<string>,
      required: false,
    },
  },
});
</script>

<template>
  <img :src="src" :alt="alt" />
</template>

<style scoped></style>
