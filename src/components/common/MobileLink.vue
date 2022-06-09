<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";
import router from "@/router";

export default defineComponent({
  name: "MobileLink",
  props: {
    href: {
      type: String as PropType<string>,
      required: true,
    },
    onClick: {
      type: Function as PropType<() => void>,
      required: false,
    },
  },
  setup() {
    return {
      router: useRouter(),
    };
  },
  methods: {
    handleClick(e: Event) {
      e.stopPropagation();
      if (this.onClick) {
        this.onClick();
      } else {
        router.push(this.href);
      }
    },
  },
});
</script>

<template>
  <a class="mobile-link" :href="href" v-on:click.prevent.stop="handleClick"
    ><slot></slot
  ></a>
</template>

<style scoped></style>
