<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from "vue";

export default defineComponent({
  name: "MobileInput",
  props: {
    placeholder: {
      type: String as PropType<string>,
    },
    type: {
      type: String as PropType<string>,
      default: "text",
    },
    modelValue: {
      type: String as PropType<string>,
    },
    borderColor: {
      type: String as PropType<string>,
      require: false,
    },
    appendIcon: {
      type: String as PropType<string>,
      required: false,
    },
    onEnter: {
      type: Function as PropType<(result: string) => void>,
      required: false,
    },
    readOnly: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
    length: {
      type: Number,
      required: false,
    },
  },
  setup(props) {
    const customBorderColor = computed(() => {
      return props.borderColor
        ? { "border-bottom": `1px solid ${props.borderColor}` }
        : {};
    });
    const inputValue = ref(props.modelValue || "");
    const compModelValue = computed(() => props.modelValue || "");
    const stopModelValue = watch(compModelValue, () => {
      inputValue.value = props.modelValue || "";
    });
    return {
      customBorderColor,
      inputValue,
      stopModelValue,
    };
  },
  unmounted() {
    this.stopModelValue();
  },
  methods: {
    handleKeyup(e: KeyboardEvent): void {
      if (e.code === "Enter") {
        if (this.onEnter) this.onEnter(this.inputValue);
      }
    },
    handleInput(e: Event): void {
      this.$emit(`update:modelValue`, (e.target as HTMLInputElement).value);
    },
    handleBlur(e: Event): void {
      this.$emit(`blur`, (e.target as HTMLInputElement).value);
    },
  },
});
</script>

<template>
  <div class="mobile-input full-width">
    <p class="icon-prepend" v-if="appendIcon"><i :class="appendIcon" /></p>
    <input
      :style="customBorderColor"
      :readonly="readOnly"
      :placeholder="placeholder"
      :type="type"
      :maxlength="length"
      v-model="inputValue"
      @input="handleInput"
      @keyup="handleKeyup"
      @blur="handleBlur"
      :autocomplete="type === 'password' ? 'off' : 'on'"
    />
  </div>
</template>

<style scoped></style>
